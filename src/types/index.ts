export interface Doctor {
  id: string;
  name: string;
  title: string;
  crm: string;
  rqe?: string;
  specialty: string;
  education: string;
  bio: string;
  areasOfExpertise: string[];
  photoUrl: string;
  availableDays: number[]; // 0=domingo, 1=segunda, ..., 6=sábado
  availableHours: string[]; // ['08:00', '08:45', ...]
  isDemonstrative: boolean;
}

export interface ClinicService {
  id: string;
  name: string;
  category: 'consulta' | 'exame' | 'infantil' | 'especial';
  shortDescription: string;
  fullDescription: string;
  durationMinutes: number;
  priceNote: string;
  active: boolean;
  requiresSpecialPreparation?: string;
  highlight?: boolean;
}

export interface Appointment {
  id: string;
  protocolCode: string;
  serviceId: string;
  serviceName: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  patientBirthDate?: string;
  patientNotes?: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface BlockedSlot {
  id: string;
  doctorId: string; // 'all' or specific doctor id
  date: string; // YYYY-MM-DD
  timeSlot: string; // 'all-day' or specific slot HH:MM
  reason: string;
}

export interface ClinicSettings {
  name: string;
  tagline: string;
  address: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  phone: string;
  whatsappNumber: string; // digits only e.g. 5545998243400
  whatsappDisplay: string; // formatted e.g. (45) 99824-3400
  operatingHours: string;
  operatingDays: string;
  email: string;
  adminPin: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  supabaseConnected?: boolean;
}
