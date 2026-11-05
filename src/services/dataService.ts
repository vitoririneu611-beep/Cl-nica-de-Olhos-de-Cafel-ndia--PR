import { Doctor, ClinicService, Appointment, BlockedSlot, ClinicSettings } from '../types';

const STORAGE_KEYS = {
  DOCTORS: 'ioc_doctors_v1',
  SERVICES: 'ioc_services_v1',
  APPOINTMENTS: 'ioc_appointments_v1',
  BLOCKED_SLOTS: 'ioc_blocked_slots_v1',
  SETTINGS: 'ioc_settings_v1',
};

const DEFAULT_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Marcelo Silva',
    title: 'Médico Oftalmologista',
    crm: 'CRM/PR 34.892 (Demonstrativo)',
    rqe: 'RQE 21.450',
    specialty: 'Oftalmologia Geral, Catarata & Cirurgia Refrativa',
    education: 'Graduação em Medicina pela Universidade Estadual de Londrina (UEL). Residência Médica em Oftalmologia no Hospital de Olhos do Paraná. Membro Titular do Conselho Brasileiro de Oftalmologia (CBO).',
    bio: 'Dedicado ao diagnóstico preciso e tratamento humanizado de patologias oculares, com foco em catarata, glaucoma e cirurgia refrativa. Atua com excelência técnica e atenção individualizada para cada paciente.',
    areasOfExpertise: [
      'Avaliação Clínica Completa',
      'Diagnóstico de Catarata',
      'Pressão Intraocular & Glaucoma',
      'Prescrição de Lentes Corretivas',
    ],
    photoUrl: '/src/assets/images/doctor_male_ophthalmologist_1793846213567.jpg',
    availableDays: [1, 2, 3, 4, 5], // Seg a Sex
    availableHours: ['08:00', '08:45', '09:30', '10:15', '11:00', '13:30', '14:15', '15:00', '15:45', '16:30', '17:15'],
    isDemonstrative: true,
  },
  {
    id: 'doc-2',
    name: 'Dra. Camila Souza',
    title: 'Médica Oftalmologista',
    crm: 'CRM/PR 38.415 (Demonstrativo)',
    rqe: 'RQE 24.118',
    specialty: 'Oftalmologia Pediátrica, Estrabismo & Córnea',
    education: 'Graduação em Medicina pela Universidade Federal do Paraná (UFPR). Especialização em Oftalmopediatria e Estrabismo pelo Centro Oftalmológico de Curitiba. Membro da Sociedade Brasileira de Oftalmologia Pediátrica (SBOP).',
    bio: 'Especialista no acolhimento de bebês, crianças e jovens, tornando o exame de visão uma experiência leve, acolhedora e positiva. Experiência em desenvolvimento visual infantil e reabilitação refrativa.',
    areasOfExpertise: [
      'Oftalmopediatria & Teste do Olhinho',
      'Diagnóstico e Tratamento de Estrabismo',
      'Miopia Infantil e Controle de Progressão',
      'Adaptação de Lentes de Contato',
    ],
    photoUrl: '/src/assets/images/doctor_female_ophthalmologist_1793846214981.jpg',
    availableDays: [1, 2, 3, 4, 5], // Seg a Sex
    availableHours: ['08:30', '09:15', '10:00', '10:45', '11:30', '14:00', '14:45', '15:30', '16:15', '17:00'],
    isDemonstrative: true,
  },
];

const DEFAULT_SERVICES: ClinicService[] = [
  {
    id: 'srv-1',
    name: 'Consultas Oftalmológicas',
    category: 'consulta',
    shortDescription: 'Avaliação clínica completa da saúde ocular, acuidade visual e prescrição individualizada de lentes.',
    fullDescription: 'Exame oftalmológico minucioso que investiga tanto a nitidez visual quanto a integridade física dos olhos. Inclui biomicroscopia, teste de acuidade visual para longe e perto, refratometria e avaliação das estruturas oculares.',
    durationMinutes: 40,
    priceNote: 'Aceitamos convênios e particular',
    active: true,
    highlight: true,
  },
  {
    id: 'srv-2',
    name: 'Exames de Visão e Diagnósticos',
    category: 'exame',
    shortDescription: 'Tonometria (pressão dos olhos), mapeamento de retina e refração computadorizada com precisão.',
    fullDescription: 'Bateria de exames complementares de alta precisão para diagnóstico precoce de patologias como glaucoma, degeneração macular, retinopatia diabética e alterações do fundo de olho.',
    durationMinutes: 45,
    priceNote: 'Sob agendamento prévio',
    active: true,
    requiresSpecialPreparation: 'Alguns exames de retina podem necessitar de dilatação da pupila. Recomenda-se trazer acompanhante.',
    highlight: true,
  },
  {
    id: 'srv-3',
    name: 'Atendimento Oftalmológico Infantil',
    category: 'infantil',
    shortDescription: 'Avaliação do desenvolvimento visual de bebês e crianças em ambiente lúdico, empático e acolhedor.',
    fullDescription: 'Consulta humanizada e paciente para identificar precocemente estrabismo, ambliopia (olho preguiçoso), erros refrativos e dificuldades escolares associadas à visão.',
    durationMinutes: 45,
    priceNote: 'Atendimento especializado',
    active: true,
    highlight: true,
  },
  {
    id: 'srv-4',
    name: 'Adaptação de Lentes de Contato',
    category: 'especial',
    shortDescription: 'Teste de tolerância, curvatura corneana e acompanhamento médico para uso seguro e confortável.',
    fullDescription: 'Avaliação da topografia corneana, qualidade do filme lacrimal e indicação da lente de contato ideal (gelatinosa, tórica, multifocal ou rígida) com treinamento de manuseio e higiene.',
    durationMinutes: 40,
    priceNote: 'Consulte tipos de lentes disponíveis',
    active: true,
  },
  {
    id: 'srv-5',
    name: 'Teste do Olhinho (Reflexo Vermelho)',
    category: 'infantil',
    shortDescription: 'Triagem neonatal essencial para recém-nascidos e bebês, detectando alterações congênitas.',
    fullDescription: 'Exame rápido, indolor e fundamental realizado nas primeiras semanas e meses de vida para descartar catarata congênita, glaucoma congênito, retinoblastoma e outras anomalias.',
    durationMinutes: 30,
    priceNote: 'Exame preventivo infantil',
    active: true,
  },
  {
    id: 'srv-6',
    name: 'Avaliação Prévia e Acompanhamento Clínico',
    category: 'consulta',
    shortDescription: 'Acompanhamento contínuo de pacientes com doenças crônicas ou indicação cirúrgica.',
    fullDescription: 'Monitoramento regular de pressão intraocular, controle de astigmatismo, avaliação para cirurgias e emissão de laudos oftalmológicos para concursos, renovação de CNH e perícias.',
    durationMinutes: 35,
    priceNote: 'Consulte documentação necessária',
    active: true,
  },
];

const DEFAULT_SETTINGS: ClinicSettings = {
  name: 'Instituto de Olhos de Cafelândia',
  tagline: 'Enxergar bem é viver melhor',
  address: 'Rua Senador Nereu Ramos, nº 340, Centro, Cafelândia - PR',
  street: 'Rua Senador Nereu Ramos',
  number: '340',
  neighborhood: 'Centro',
  city: 'Cafelândia',
  state: 'PR',
  cep: '85415-000',
  phone: '(45) 3241-1000',
  whatsappNumber: '5545998243400',
  whatsappDisplay: '(45) 99824-3400',
  operatingHours: '08:00 às 12:00 e 13:30 às 18:00',
  operatingDays: 'Segunda a Sexta-feira',
  email: 'contato@institutodeolhoscafelandia.com.br',
  adminPin: 'clinica2026',
  supabaseConnected: false,
};

// Seed 3 realistic initial appointments for demonstration in Admin
const SEED_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-seed-1',
    protocolCode: 'IOC-2026-8142',
    serviceId: 'srv-1',
    serviceName: 'Consultas Oftalmológicas',
    doctorId: 'doc-1',
    doctorName: 'Dr. Marcelo Silva',
    patientName: 'Antônio Ferreira de Castro',
    patientPhone: '(45) 99123-4567',
    patientEmail: 'antonio.castro@email.com',
    patientBirthDate: '1974-06-15',
    patientNotes: 'Queixa de vista cansada para leitura de perto há 3 meses.',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Amanhã
    timeSlot: '09:30',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'apt-seed-2',
    protocolCode: 'IOC-2026-9031',
    serviceId: 'srv-3',
    serviceName: 'Atendimento Oftalmológico Infantil',
    doctorId: 'doc-2',
    doctorName: 'Dra. Camila Souza',
    patientName: 'Sofia Rocha (Mãe: Helena Rocha)',
    patientPhone: '(45) 99876-5432',
    patientEmail: 'helena.rocha@email.com',
    patientBirthDate: '2020-03-10',
    patientNotes: 'Primeira consulta oftalmológica da criança antes do início das aulas.',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Amanhã
    timeSlot: '14:00',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
];

class DataService {
  private listeners: (() => void)[] = [];

  constructor() {
    this.init();
  }

  private init() {
    if (!localStorage.getItem(STORAGE_KEYS.DOCTORS)) {
      localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(DEFAULT_DOCTORS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(SEED_APPOINTMENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BLOCKED_SLOTS)) {
      localStorage.setItem(STORAGE_KEYS.BLOCKED_SLOTS, JSON.stringify([]));
    }
  }

  public subscribe(callback: () => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  private notify() {
    this.listeners.forEach((callback) => callback());
  }

  // --- DOCTORS ---
  public getDoctors(): Doctor[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOCTORS);
      return data ? JSON.parse(data) : DEFAULT_DOCTORS;
    } catch {
      return DEFAULT_DOCTORS;
    }
  }

  public getDoctorById(id: string): Doctor | undefined {
    return this.getDoctors().find((d) => d.id === id);
  }

  public updateDoctor(updated: Doctor): void {
    const list = this.getDoctors().map((d) => (d.id === updated.id ? updated : d));
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(list));
    this.notify();
  }

  // --- SERVICES ---
  public getServices(): ClinicService[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return data ? JSON.parse(data) : DEFAULT_SERVICES;
    } catch {
      return DEFAULT_SERVICES;
    }
  }

  public getServiceById(id: string): ClinicService | undefined {
    return this.getServices().find((s) => s.id === id);
  }

  public updateService(updated: ClinicService): void {
    const list = this.getServices().map((s) => (s.id === updated.id ? updated : s));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(list));
    this.notify();
  }

  public addService(newService: Omit<ClinicService, 'id'>): ClinicService {
    const id = `srv-${Date.now()}`;
    const fullService: ClinicService = { ...newService, id };
    const list = [...this.getServices(), fullService];
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(list));
    this.notify();
    return fullService;
  }

  public deleteService(id: string): void {
    const list = this.getServices().filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(list));
    this.notify();
  }

  // --- SETTINGS ---
  public getSettings(): ClinicSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  public updateSettings(partial: Partial<ClinicSettings>): void {
    const current = this.getSettings();
    const updated = { ...current, ...partial };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    this.notify();
  }

  // --- BLOCKED SLOTS ---
  public getBlockedSlots(): BlockedSlot[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BLOCKED_SLOTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public addBlockedSlot(slot: Omit<BlockedSlot, 'id'>): BlockedSlot {
    const fullSlot: BlockedSlot = { ...slot, id: `blk-${Date.now()}` };
    const list = [...this.getBlockedSlots(), fullSlot];
    localStorage.setItem(STORAGE_KEYS.BLOCKED_SLOTS, JSON.stringify(list));
    this.notify();
    return fullSlot;
  }

  public removeBlockedSlot(id: string): void {
    const list = this.getBlockedSlots().filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BLOCKED_SLOTS, JSON.stringify(list));
    this.notify();
  }

  // --- APPOINTMENTS & REAL AVAILABILITY ENGINE ---
  public getAppointments(): Appointment[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public getAppointmentByProtocol(codeOrPhone: string): Appointment | null {
    const cleanQuery = codeOrPhone.trim().toLowerCase().replace(/\D/g, '');
    const cleanRaw = codeOrPhone.trim().toLowerCase();
    const appointments = this.getAppointments();

    const found = appointments.find((apt) => {
      const aptProto = apt.protocolCode.toLowerCase();
      const aptPhoneClean = apt.patientPhone.replace(/\D/g, '');
      return (
        aptProto === cleanRaw ||
        (cleanQuery.length >= 8 && aptPhoneClean.includes(cleanQuery))
      );
    });

    return found || null;
  }

  /**
   * Calculates actual free time slots for a given date and doctor.
   * Excludes:
   * 1. Slots already booked and not cancelled
   * 2. Slots blocked in the BlockedSlot table
   * 3. Doctor's non-working days
   */
  public getAvailableSlots(dateStr: string, doctorId: string): string[] {
    const doctors = this.getDoctors();
    const targetDoc = doctors.find((d) => d.id === doctorId);

    // Parse date day of week (0=Sunday, 6=Saturday)
    const [year, month, day] = dateStr.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const dayOfWeek = dateObj.getDay();

    // Closed on Sundays
    if (dayOfWeek === 0) {
      return [];
    }

    // Default pool of hours
    const allCandidateHours = targetDoc
      ? targetDoc.availableHours
      : ['08:00', '08:45', '09:30', '10:15', '11:00', '13:30', '14:15', '15:00', '15:45', '16:30'];

    if (targetDoc && !targetDoc.availableDays.includes(dayOfWeek)) {
      return [];
    }

    // Check all-day block for this doctor or all doctors
    const blockedSlots = this.getBlockedSlots();
    const isDayBlocked = blockedSlots.some(
      (b) =>
        b.date === dateStr &&
        (b.doctorId === 'all' || b.doctorId === doctorId) &&
        b.timeSlot === 'all-day'
    );
    if (isDayBlocked) {
      return [];
    }

    // Existing active bookings for this doctor on this day
    const appointments = this.getAppointments();
    const bookedTimes = appointments
      .filter(
        (apt) =>
          apt.date === dateStr &&
          apt.doctorId === doctorId &&
          apt.status !== 'cancelled'
      )
      .map((apt) => apt.timeSlot);

    // Specific time slot blocks
    const blockedTimes = blockedSlots
      .filter(
        (b) =>
          b.date === dateStr &&
          (b.doctorId === 'all' || b.doctorId === doctorId) &&
          b.timeSlot !== 'all-day'
      )
      .map((b) => b.timeSlot);

    // Filter available slots
    return allCandidateHours.filter(
      (time) => !bookedTimes.includes(time) && !blockedTimes.includes(time)
    );
  }

  /**
   * Atomic double-booking protection:
   * Re-checks availability immediately before creating the appointment.
   */
  public async createAppointment(params: {
    serviceId: string;
    doctorId: string;
    date: string;
    timeSlot: string;
    patientName: string;
    patientPhone: string;
    patientEmail?: string;
    patientBirthDate?: string;
    patientNotes?: string;
  }): Promise<{ success: boolean; appointment?: Appointment; error?: string }> {
    // Artificial small delay to simulate server transaction
    await new Promise((resolve) => setTimeout(resolve, 250));

    // Double check availability
    const availableSlots = this.getAvailableSlots(params.date, params.doctorId);
    if (!availableSlots.includes(params.timeSlot)) {
      return {
        success: false,
        error:
          'O horário selecionado acabou de ser reservado por outro paciente ou foi bloqueado pela clínica. Por favor, escolha outro horário.',
      };
    }

    const doctor = this.getDoctorById(params.doctorId);
    const service = this.getServiceById(params.serviceId);

    // Generate random 4-digit protocol
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const protocolCode = `IOC-${new Date().getFullYear()}-${randNum}`;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      protocolCode,
      serviceId: params.serviceId,
      serviceName: service ? service.name : 'Consulta Oftalmológica',
      doctorId: params.doctorId,
      doctorName: doctor ? doctor.name : 'Corpo Clínico do Instituto',
      patientName: params.patientName.trim(),
      patientPhone: params.patientPhone.trim(),
      patientEmail: params.patientEmail?.trim() || '',
      patientBirthDate: params.patientBirthDate || '',
      patientNotes: params.patientNotes?.trim() || '',
      date: params.date,
      timeSlot: params.timeSlot,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const currentList = this.getAppointments();
    const updatedList = [newAppointment, ...currentList];
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updatedList));

    this.notify();
    return { success: true, appointment: newAppointment };
  }

  public updateAppointmentStatus(id: string, status: Appointment['status']): void {
    const appointments = this.getAppointments().map((apt) =>
      apt.id === id ? { ...apt, status, updatedAt: new Date().toISOString() } : apt
    );
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
    this.notify();
  }

  public cancelAppointment(id: string): boolean {
    const found = this.getAppointments().find((a) => a.id === id);
    if (!found) return false;
    this.updateAppointmentStatus(id, 'cancelled');
    return true;
  }

  public rescheduleAppointment(id: string, newDate: string, newTime: string): boolean {
    const appointments = this.getAppointments();
    const target = appointments.find((a) => a.id === id);
    if (!target) return false;

    // Check if new slot is free
    const free = this.getAvailableSlots(newDate, target.doctorId);
    if (!free.includes(newTime)) {
      return false;
    }

    const updated = appointments.map((apt) =>
      apt.id === id
        ? {
            ...apt,
            date: newDate,
            timeSlot: newTime,
            status: 'confirmed' as const,
            updatedAt: new Date().toISOString(),
          }
        : apt
    );

    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
    this.notify();
    return true;
  }

  public resetToDefaults(): void {
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(DEFAULT_DOCTORS));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(SEED_APPOINTMENTS));
    localStorage.setItem(STORAGE_KEYS.BLOCKED_SLOTS, JSON.stringify([]));
    this.notify();
  }
}

export const dataService = new DataService();
