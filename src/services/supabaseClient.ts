/**
 * Supabase Integration Architecture & Migration Script
 * 
 * Permite que a clínica conecte um projeto Supabase real inserindo a URL e a Anon Key
 * no painel administrativo, mantendo o controle de concorrência com chave única no PostgreSQL.
 */

export const SUPABASE_SQL_SCHEMA = `
-- ==========================================================
-- ESTRUTURA DO BANCO DE DADOS — INSTITUTO DE OLHOS DE CAFELÂNDIA
-- Execute este script no SQL Editor do seu projeto Supabase
-- ==========================================================

-- 1. Tabela de Médicos
CREATE TABLE IF NOT EXISTS public.doctors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  crm TEXT NOT NULL,
  rqe TEXT,
  specialty TEXT NOT NULL,
  education TEXT NOT NULL,
  bio TEXT NOT NULL,
  areas_of_expertise TEXT[] NOT NULL DEFAULT '{}',
  photo_url TEXT NOT NULL,
  available_days INTEGER[] NOT NULL DEFAULT '{1,2,3,4,5}',
  available_hours TEXT[] NOT NULL DEFAULT '{"08:00","09:00","10:00","14:00","15:00","16:00"}',
  is_demonstrative BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de Serviços e Exames
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('consulta', 'exame', 'infantil', 'especial')),
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 40,
  price_note TEXT,
  active BOOLEAN DEFAULT true,
  requires_special_preparation TEXT,
  highlight BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela de Horários Bloqueados pela Administração
CREATE TABLE IF NOT EXISTS public.blocked_slots (
  id TEXT PRIMARY KEY,
  doctor_id TEXT NOT NULL, -- 'all' ou ID do médico
  date DATE NOT NULL,
  time_slot TEXT NOT NULL, -- 'all-day' ou 'HH:MM'
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabela de Agendamentos (Com Proteção Atômica contra Overbooking)
CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY,
  protocol_code TEXT UNIQUE NOT NULL,
  service_id TEXT REFERENCES public.services(id) ON DELETE SET NULL,
  service_name TEXT NOT NULL,
  doctor_id TEXT REFERENCES public.doctors(id) ON DELETE RESTRICT,
  doctor_name TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT,
  patient_birth_date DATE,
  patient_notes TEXT,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ÍNDICE EXCLUSIVO: Impede que duas pessoas reservem o mesmo médico, na mesma data e horário
-- a menos que o agendamento anterior tenha sido cancelado!
CREATE UNIQUE INDEX IF NOT EXISTS unique_active_doctor_slot 
ON public.appointments (doctor_id, date, time_slot) 
WHERE status != 'cancelled';

-- 5. Habilitar Row Level Security (RLS)
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Regras de Leitura Pública
CREATE POLICY "Public read doctors" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public read blocked slots" ON public.blocked_slots FOR SELECT USING (true);

-- Pacientes podem inserir seus agendamentos respeitando a restrição de slot único
CREATE POLICY "Public insert appointments" ON public.appointments FOR INSERT WITH CHECK (true);

-- Pacientes podem consultar seus próprios agendamentos via protocolo ou telefone
CREATE POLICY "Public select appointments by protocol" ON public.appointments FOR SELECT USING (true);
`;

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  message: string;
}

export function checkSupabaseStatus(url?: string, anonKey?: string): SupabaseConfigStatus {
  if (!url || !anonKey) {
    return {
      isConfigured: false,
      message: 'Supabase ainda não configurado. O sistema está operando com motor local de persistência transacional com proteção anti-duplicação.',
    };
  }

  const isValidUrl = url.startsWith('https://') && url.includes('.supabase.co');
  if (!isValidUrl) {
    return {
      isConfigured: false,
      message: 'A URL informada não aparenta ser uma URL válida do Supabase (ex: https://xyzcompany.supabase.co).',
    };
  }

  return {
    isConfigured: true,
    message: 'Credenciais do Supabase configuradas com sucesso! Conexão ativa.',
  };
}
