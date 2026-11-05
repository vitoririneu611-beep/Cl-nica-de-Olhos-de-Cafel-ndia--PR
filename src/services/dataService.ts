import { Doctor, ClinicService, Appointment, BlockedSlot, ClinicSettings } from '../types';

const STORAGE_KEYS = {
  DOCTORS: 'ioc_doctors_v2',
  SERVICES: 'ioc_services_v2',
  APPOINTMENTS: 'ioc_appointments_v2',
  BLOCKED_SLOTS: 'ioc_blocked_slots_v2',
  SETTINGS: 'ioc_settings_v2',
};

const DEFAULT_DOCTORS: Doctor[] = [
  {
    id: 'doc-maryanne',
    name: 'Maryanne Eloize Bussolaro',
    title: 'Especialista em Neuro-optometria e Optometria Pediátrica',
    crm: 'Neuro-optometria e Optometria Pediátrica',
    specialty: 'Neuro-optometria e Optometria Pediátrica',
    education: 'Atuação voltada à avaliação e ao tratamento visual, contribuindo para o desenvolvimento da visão e do aprendizado.',
    bio: 'Atuação voltada à avaliação e ao tratamento visual, contribuindo para o desenvolvimento da visão e do aprendizado.',
    areasOfExpertise: [
      'Neuro-optometria: avaliação da relação entre a visão e o sistema nervoso',
      'Optometria pediátrica: acompanhamento visual de crianças e adolescentes',
      'Terapia visual: avaliação e reabilitação visual',
      'Desenvolvimento visual: acompanhamento das habilidades visuais e do desenvolvimento da visão',
    ],
    photoUrl: '/images/doctor_female_ophthalmologist_1793846214981.jpg',
    availableDays: [1, 2, 3, 4, 5, 6], // Seg a Sáb
    availableHours: ['08:00', '08:45', '09:30', '10:15', '11:00', '13:30', '14:15', '15:00', '15:45', '16:30', '17:15'],
    isDemonstrative: false,
  },
  {
    id: 'doc-herculino',
    name: 'Dr. Herculino Netto',
    title: 'Médico Oftalmologista',
    crm: 'Oftalmologia · Cirurgia de Catarata e Retina',
    specialty: 'Oftalmologia · Especialista em Cirurgia de Catarata e Retina',
    education: 'Atendimento oftalmológico especializado, com foco na saúde ocular, avaliação completa e acompanhamento de doenças dos olhos.',
    bio: 'Atendimento oftalmológico especializado, com foco na saúde ocular, avaliação completa e acompanhamento de doenças dos olhos.',
    areasOfExpertise: [
      'Cirurgia de catarata',
      'Tratamento de doenças da retina',
      'Avaliação oftalmológica completa',
      'Acompanhamento de doenças oculares',
      'Utilização de tecnologia para maior precisão e segurança nos procedimentos',
    ],
    photoUrl: '/images/doctor_male_ophthalmologist_1793846213567.jpg',
    availableDays: [1, 2, 3, 4, 5, 6], // Seg a Sáb
    availableHours: ['08:30', '09:15', '10:00', '10:45', '11:30', '14:00', '14:45', '15:30', '16:15', '17:00'],
    isDemonstrative: false,
  },
];

const DEFAULT_SERVICES: ClinicService[] = [
  {
    id: 'srv-oftalmologico',
    name: 'Atendimento Oftalmológico',
    category: 'consulta',
    shortDescription: 'Avaliação da saúde ocular, consultas e acompanhamento oftalmológico completo.',
    fullDescription: 'Atendimento oftalmológico especializado focado na avaliação minuciosa da saúde ocular, acompanhamento clínico e diagnóstico de patologias dos olhos.',
    durationMinutes: 40,
    priceNote: 'Dr. Herculino Netto',
    active: true,
    highlight: true,
  },
  {
    id: 'srv-optometrico',
    name: 'Atendimento Optométrico',
    category: 'consulta',
    shortDescription: 'Avaliação das funções visuais e acompanhamento da saúde visual.',
    fullDescription: 'Avaliação detalhada das funções visuais, testes de capacidade refrativa e acompanhamento preventivo da saúde da visão.',
    durationMinutes: 40,
    priceNote: 'Maryanne Eloize Bussolaro',
    active: true,
    highlight: true,
  },
  {
    id: 'srv-pediatrica',
    name: 'Optometria Pediátrica',
    category: 'infantil',
    shortDescription: 'Avaliação e acompanhamento do desenvolvimento visual de crianças e adolescentes.',
    fullDescription: 'Cuidado especializado voltado à infância e adolescência, garantindo que as habilidades visuais estejam plenamente alinhadas ao desenvolvimento global e escolar.',
    durationMinutes: 45,
    priceNote: 'Maryanne Eloize Bussolaro',
    active: true,
    highlight: true,
  },
  {
    id: 'srv-neuro',
    name: 'Neuro-optometria',
    category: 'especial',
    shortDescription: 'Avaliação das relações entre a visão e o sistema nervoso.',
    fullDescription: 'Abordagem especializada para investigar a integração funcional entre o processamento visual e o sistema neurológico, auxiliando no aprendizado e na reabilitação.',
    durationMinutes: 50,
    priceNote: 'Maryanne Eloize Bussolaro',
    active: true,
    highlight: true,
  },
  {
    id: 'srv-terapia',
    name: 'Terapia Visual',
    category: 'especial',
    shortDescription: 'Avaliação e reabilitação das habilidades visuais.',
    fullDescription: 'Programa individualizado de exercícios e estímulos direcionados para fortalecer e recuperar as funções visuais e a coordenação binocular.',
    durationMinutes: 45,
    priceNote: 'Maryanne Eloize Bussolaro',
    active: true,
    highlight: false,
  },
  {
    id: 'srv-acuidade',
    name: 'Acuidade Visual',
    category: 'exame',
    shortDescription: 'Avaliação da capacidade de enxergar e identificar detalhes.',
    fullDescription: 'Medição quantitativa e qualitativa da nitidez da visão em diferentes distâncias, essencial para diagnosticar necessidades refrativas.',
    durationMinutes: 30,
    priceNote: 'Exame diagnóstico',
    active: true,
    highlight: false,
  },
  {
    id: 'srv-fundoscopia',
    name: 'Fundoscopia',
    category: 'exame',
    shortDescription: 'Exame utilizado para avaliar estruturas internas do olho, incluindo a retina.',
    fullDescription: 'Visualização direta da retina, disco óptico e vasos sanguíneos para diagnóstico de doenças retinianas e monitoramento preventivo.',
    durationMinutes: 30,
    priceNote: 'Dr. Herculino Netto',
    active: true,
    highlight: true,
  },
  {
    id: 'srv-biomicroscopia',
    name: 'Biomicroscopia',
    category: 'exame',
    shortDescription: 'Exame que permite observar estruturas oculares com auxílio de equipamento específico.',
    fullDescription: 'Exame minucioso com lâmpada de fenda de alta tecnologia para avaliação precisa de córnea, íris, cristalino e estruturas anteriores dos olhos.',
    durationMinutes: 30,
    priceNote: 'Exame diagnóstico',
    active: true,
    highlight: false,
  },
];

const DEFAULT_SETTINGS: ClinicSettings = {
  name: 'Instituto de Olhos Cafelândia',
  tagline: 'Enxergar bem é viver melhor',
  address: 'Rua Senador Nereu Ramos, 340, Sala 01, Centro, Cafelândia - PR, CEP 85415-000',
  street: 'Rua Senador Nereu Ramos',
  number: '340, Sala 01',
  neighborhood: 'Centro',
  city: 'Cafelândia',
  state: 'PR',
  cep: '85415-000',
  phone: '(45) 99944-1123',
  whatsappNumber: '5545999441123',
  whatsappDisplay: '(45) 99944-1123',
  operatingHours: 'Segunda a Sexta: 08h às 18h | Sábado: 08h às 11h30',
  operatingDays: 'Segunda a Sábado',
  email: 'contato@institutodeolhoscafelandia.com.br',
  adminPin: 'clinica2026',
  supabaseConnected: false,
};

// Seed realistic initial appointments for demonstration in Admin
const SEED_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-seed-1',
    protocolCode: 'IOC-2026-8142',
    serviceId: 'srv-oftalmologico',
    serviceName: 'Atendimento Oftalmológico',
    doctorId: 'doc-herculino',
    doctorName: 'Dr. Herculino Netto',
    patientName: 'Antônio Ferreira de Castro',
    patientPhone: '(45) 99944-1123',
    patientEmail: 'antonio.castro@email.com',
    patientBirthDate: '1974-06-15',
    patientNotes: 'Avaliação oftalmológica para acompanhamento de visão.',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Amanhã
    timeSlot: '09:30',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'apt-seed-2',
    protocolCode: 'IOC-2026-9031',
    serviceId: 'srv-pediatrica',
    serviceName: 'Optometria Pediátrica',
    doctorId: 'doc-maryanne',
    doctorName: 'Maryanne Eloize Bussolaro',
    patientName: 'Sofia Rocha (Mãe: Helena Rocha)',
    patientPhone: '(45) 99944-1123',
    patientEmail: 'helena.rocha@email.com',
    patientBirthDate: '2020-03-10',
    patientNotes: 'Acompanhamento do desenvolvimento visual infantil.',
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
