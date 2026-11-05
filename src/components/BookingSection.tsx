import React, { useState, useEffect } from 'react';
import { Doctor, ClinicService, Appointment, ClinicSettings } from '../types';
import { dataService } from '../services/dataService';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  Search,
  Check,
  ChevronRight,
  Shield,
  Printer,
  CalendarPlus,
  RefreshCw,
  XCircle
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface BookingSectionProps {
  doctors: Doctor[];
  services: ClinicService[];
  settings: ClinicSettings;
  preSelectedDoctorId?: string;
  preSelectedServiceId?: string;
  onClearPreSelections?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  doctors,
  services,
  settings,
  preSelectedDoctorId,
  preSelectedServiceId,
  onClearPreSelections,
}) => {
  const [activeTab, setActiveTab] = useState<'new' | 'lookup'>('new');

  // Step state for new booking
  // 1: Service -> 2: Doctor -> 3: Date & Time -> 4: Patient Info -> 5: Confirmed
  const [step, setStep] = useState<number>(1);

  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  // Patient inputs
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientBirthDate, setPatientBirthDate] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [lgpdConsent, setLgpdConsent] = useState(true);

  // Availability & loading
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [completedAppointment, setCompletedAppointment] = useState<Appointment | null>(null);

  // Lookup state
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState<Appointment | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [cancelFeedback, setCancelFeedback] = useState<string | null>(null);

  // Sync pre-selections from other sections (e.g. clicking Doctor card or Service card)
  useEffect(() => {
    if (preSelectedServiceId) {
      setSelectedServiceId(preSelectedServiceId);
      if (step < 2) setStep(2);
    }
  }, [preSelectedServiceId]);

  useEffect(() => {
    if (preSelectedDoctorId) {
      setSelectedDoctorId(preSelectedDoctorId);
      if (step < 3 && selectedServiceId) setStep(3);
    }
  }, [preSelectedDoctorId, selectedServiceId]);

  // Recalculate available slots whenever date or doctor changes
  useEffect(() => {
    if (selectedDate && selectedDoctorId) {
      const slots = dataService.getAvailableSlots(selectedDate, selectedDoctorId);
      setAvailableSlots(slots);
      // Reset selected time if it's no longer available
      if (selectedTimeSlot && !slots.includes(selectedTimeSlot)) {
        setSelectedTimeSlot('');
      }
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, selectedDoctorId, selectedTimeSlot]);

  // Phone input formatting (Brazil: (XX) XXXXX-XXXX)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    setPatientPhone(value);
  };

  // Generate selectable dates for next 35 days (excluding Sundays)
  const generateSelectableDates = () => {
    const dates: Array<{ dateStr: string; displayLabel: string; dayName: string }> = [];
    const today = new Date();
    
    for (let i = 1; i <= 35; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const dayOfWeek = d.getDay();
      
      // Skip Sundays (0)
      if (dayOfWeek === 0) continue;

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      
      dates.push({
        dateStr,
        displayLabel: `${day} de ${monthNames[d.getMonth()]}`,
        dayName: dayNames[dayOfWeek],
      });
    }
    return dates;
  };

  const selectableDates = generateSelectableDates();

  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!patientName.trim()) {
      setSubmissionError('Por favor, informe o seu nome completo.');
      return;
    }

    if (!patientPhone.trim() || patientPhone.replace(/\D/g, '').length < 10) {
      setSubmissionError('Por favor, informe um número de telefone/WhatsApp válido com DDD.');
      return;
    }

    if (!lgpdConsent) {
      setSubmissionError('É necessário autorizar o uso dos dados para confirmação do agendamento.');
      return;
    }

    setIsSubmitting(true);

    const result = await dataService.createAppointment({
      serviceId: selectedServiceId,
      doctorId: selectedDoctorId,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      patientName,
      patientPhone,
      patientEmail,
      patientBirthDate,
      patientNotes,
    });

    setIsSubmitting(false);

    if (result.success && result.appointment) {
      setCompletedAppointment(result.appointment);
      setStep(5);
    } else {
      setSubmissionError(result.error || 'Não foi possível confirmar o agendamento.');
      // Refresh slots
      const slots = dataService.getAvailableSlots(selectedDate, selectedDoctorId);
      setAvailableSlots(slots);
      setSelectedTimeSlot('');
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError(null);
    setCancelFeedback(null);

    if (!lookupQuery.trim()) {
      setLookupError('Informe o código de protocolo (ex: IOC-2026-XXXX) ou seu telefone cadastrado.');
      return;
    }

    const apt = dataService.getAppointmentByProtocol(lookupQuery);
    if (apt) {
      setLookupResult(apt);
    } else {
      setLookupResult(null);
      setLookupError('Nenhum agendamento encontrado para os dados informados. Verifique o número digitado.');
    }
  };

  const handleCancelAppointment = (id: string) => {
    if (window.confirm('Tem certeza que deseja cancelar este agendamento no Instituto de Olhos de Cafelândia?')) {
      const ok = dataService.cancelAppointment(id);
      if (ok) {
        setCancelFeedback('Agendamento cancelado com sucesso. O horário foi liberado.');
        const updated = dataService.getAppointmentByProtocol(lookupQuery);
        setLookupResult(updated);
      }
    }
  };

  const handleResetForm = () => {
    setStep(1);
    setSelectedServiceId('');
    setSelectedDoctorId('');
    setSelectedDate('');
    setSelectedTimeSlot('');
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setPatientBirthDate('');
    setPatientNotes('');
    setCompletedAppointment(null);
    setSubmissionError(null);
    if (onClearPreSelections) onClearPreSelections();
  };

  const currentService = services.find((s) => s.id === selectedServiceId);
  const currentDoctor = doctors.find((d) => d.id === selectedDoctorId);

  // Formatting date for display (e.g. 15 de Outubro de 2026)
  const formatFriendlyDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  return (
    <section id="agendamento" className="py-12 sm:py-20 lg:py-24 bg-white border-b border-slate-100 scroll-mt-10">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-blue-800 uppercase tracking-widest mb-2.5">
            <span>Atendimento Online</span>
            <span aria-hidden="true" className="text-blue-300">·</span>
            <span>Disponibilidade em Tempo Real</span>
          </div>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight break-words">
            Agende sua Consulta Oftalmológica
          </h2>
          <p className="mt-2.5 text-xs xs:text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Escolha o atendimento desejado, selecione o profissional e consulte os horários disponíveis. 
            Sem filas e com confirmação imediata.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-5 sm:mt-6 inline-flex flex-col xs:flex-row w-full xs:w-auto p-1 bg-slate-100 rounded-xl border border-slate-200/80 gap-1 xs:gap-0">
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 sm:px-5 py-2.5 xs:py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer min-h-[38px] ${
                activeTab === 'new'
                  ? 'bg-white text-blue-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Novo Agendamento
            </button>
            <button
              onClick={() => setActiveTab('lookup')}
              className={`px-4 sm:px-5 py-2.5 xs:py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer min-h-[38px] ${
                activeTab === 'lookup'
                  ? 'bg-white text-blue-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Consultar / Cancelar Agendamento
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: NOVO AGENDAMENTO FLUXO EM 5 PASSOS                */}
        {/* ======================================================== */}
        {activeTab === 'new' && (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md p-4 xs:p-6 sm:p-10">
            
            {/* Step Indicator (1 to 4) */}
            {step < 5 && (
              <div className="mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-slate-100">
                <div className="flex items-center justify-between max-w-xl mx-auto text-xs px-1">
                  <div className={`flex items-center gap-1.5 sm:gap-2 ${step >= 1 ? 'text-blue-700 font-bold' : 'text-slate-400'}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${step >= 1 ? 'bg-blue-700 text-white' : 'bg-slate-100'}`}>
                      1
                    </span>
                    <span className="hidden sm:inline">Serviço</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 shrink-0" />

                  <div className={`flex items-center gap-1.5 sm:gap-2 ${step >= 2 ? 'text-blue-700 font-bold' : 'text-slate-400'}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${step >= 2 ? 'bg-blue-700 text-white' : 'bg-slate-100'}`}>
                      2
                    </span>
                    <span className="hidden sm:inline">Médico</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 shrink-0" />

                  <div className={`flex items-center gap-1.5 sm:gap-2 ${step >= 3 ? 'text-blue-700 font-bold' : 'text-slate-400'}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${step >= 3 ? 'bg-blue-700 text-white' : 'bg-slate-100'}`}>
                      3
                    </span>
                    <span className="hidden sm:inline">Data & Horário</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 shrink-0" />

                  <div className={`flex items-center gap-1.5 sm:gap-2 ${step >= 4 ? 'text-blue-700 font-bold' : 'text-slate-400'}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${step >= 4 ? 'bg-blue-700 text-white' : 'bg-slate-100'}`}>
                      4
                    </span>
                    <span className="hidden sm:inline">Seus Dados</span>
                  </div>
                </div>
              </div>
            )}

            {/* PASSO 1: ESCOLHA DO TIPO DE ATENDIMENTO */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="text-left">
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    1. Escolha o tipo de atendimento
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Selecione o serviço ou exame desejado para consultar os profissionais habilitados.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.filter(s => s.active).map((service) => {
                    const isSelected = selectedServiceId === service.id;
                    return (
                      <div
                        key={service.id}
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-100'
                            : 'border-slate-200 hover:border-blue-300 bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider">
                              {service.category === 'infantil' ? 'Pediatria' : service.category === 'exame' ? 'Diagnóstico' : 'Clínico'}
                            </span>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          <h4 className="font-display text-base font-bold text-slate-900">
                            {service.name}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {service.shortDescription}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs text-slate-500">
                          <span>~{service.durationMinutes} min</span>
                          <span>{service.priceNote}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    disabled={!selectedServiceId}
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl shadow-xs transition-colors cursor-pointer min-h-[44px]"
                  >
                    <span>Continuar para Escolha do Médico</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PASSO 2: ESCOLHA DO PROFISSIONAL */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="text-left flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      2. Escolha o profissional
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Serviço selecionado: <strong className="text-slate-800">{currentService?.name}</strong>
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer self-start xs:self-auto py-1"
                  >
                    Alterar serviço
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {doctors.map((doctor) => {
                    const isSelected = selectedDoctorId === doctor.id;
                    return (
                      <div
                        key={doctor.id}
                        onClick={() => setSelectedDoctorId(doctor.id)}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col xs:flex-row items-start xs:items-center gap-3.5 sm:gap-4 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-100'
                            : 'border-slate-200 hover:border-blue-300 bg-white'
                        }`}
                      >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                          <img
                            src={doctor.photoUrl}
                            alt={doctor.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 w-full">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-blue-700">
                              {doctor.title}
                            </span>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          <h4 className="font-display text-base font-bold text-slate-900">
                            {doctor.name}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                            {doctor.specialty}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            {doctor.crm}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer text-center min-h-[40px] flex items-center justify-center"
                  >
                    Voltar
                  </button>

                  <button
                    disabled={!selectedDoctorId}
                    onClick={() => setStep(3)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl shadow-xs transition-colors cursor-pointer min-h-[44px]"
                  >
                    <span>Ver Calendário e Horários</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PASSO 3: VISUALIZAÇÃO DO CALENDÁRIO COM DATAS E HORÁRIOS DISPONÍVEIS */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="text-left flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      3. Escolha a data e o horário
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Com <strong className="text-slate-800">{currentDoctor?.name}</strong> para <strong className="text-slate-800">{currentService?.name}</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer self-start xs:self-auto py-1"
                  >
                    Trocar médico
                  </button>
                </div>

                {/* Date Picker Grid */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Datas com Expediente em Cafelândia (Próximos 35 dias)
                  </label>

                  <div className="flex gap-2 overflow-x-auto pb-3 pt-1 -mx-1 px-1 sm:mx-0 sm:px-0 touch-pan-x scrollbar-thin">
                    {selectableDates.map((item) => {
                      const isDateSelected = selectedDate === item.dateStr;
                      return (
                        <button
                          key={item.dateStr}
                          type="button"
                          onClick={() => {
                            setSelectedDate(item.dateStr);
                            setSelectedTimeSlot('');
                          }}
                          className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border min-w-[74px] sm:min-w-[80px] shrink-0 transition-all cursor-pointer min-h-[68px] ${
                            isDateSelected
                              ? 'border-blue-700 bg-blue-700 text-white shadow-sm'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/30'
                          }`}
                        >
                          <span className={`text-[10px] sm:text-[11px] font-semibold uppercase ${isDateSelected ? 'text-sky-200' : 'text-slate-400'}`}>
                            {item.dayName}
                          </span>
                          <span className="text-base font-bold mt-0.5">
                            {item.displayLabel.split(' ')[0]}
                          </span>
                          <span className={`text-[10px] ${isDateSelected ? 'text-sky-100' : 'text-slate-500'}`}>
                            {item.displayLabel.split(' ')[2]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Available Hours Engine */}
                {selectedDate ? (
                  <div className="pt-2">
                    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 mb-2.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                        <span>Horários Realmente Livres em {formatFriendlyDate(selectedDate)}</span>
                      </label>
                      <span className="text-[11px] text-slate-500">
                        {availableSlots.length} horários disponíveis
                      </span>
                    </div>

                    {availableSlots.length > 0 ? (
                      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-2.5">
                        {availableSlots.map((time) => {
                          const isSlotSelected = selectedTimeSlot === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTimeSlot(time)}
                              className={`py-2.5 px-2 sm:px-3 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer border min-h-[42px] ${
                                isSlotSelected
                                  ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                                  : 'bg-slate-50 hover:bg-blue-50/50 text-slate-800 border-slate-200 hover:border-blue-300'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-5 sm:p-6 rounded-2xl bg-amber-50 border border-amber-200/80 text-center text-xs text-amber-900">
                        <AlertCircle className="w-5 h-5 mx-auto mb-1 text-amber-600" />
                        <p className="font-semibold">Nenhum horário livre nesta data.</p>
                        <p className="mt-0.5 text-amber-800">
                          Todos os horários deste dia já foram reservados ou bloqueados para procedimentos. Por favor, selecione outra data acima.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/70 text-center text-xs text-slate-500">
                    <CalendarIcon className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                    Selecione uma data acima para visualizar a grade de horários disponíveis.
                  </div>
                )}

                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer text-center min-h-[40px] flex items-center justify-center"
                  >
                    Voltar
                  </button>

                  <button
                    disabled={!selectedDate || !selectedTimeSlot}
                    onClick={() => setStep(4)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl shadow-xs transition-colors cursor-pointer min-h-[44px]"
                  >
                    <span>Preencher Dados do Paciente</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PASSO 4: PREENCHIMENTO DOS DADOS DO PACIENTE */}
            {step === 4 && (
              <form onSubmit={handleCreateAppointment} className="space-y-6 animate-in fade-in duration-200">
                <div className="text-left flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      4. Dados para o Agendamento
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Coletamos somente as informações necessárias para confirmar seu atendimento.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="text-xs text-blue-700 hover:underline cursor-pointer"
                  >
                    Alterar data/horário
                  </button>
                </div>

                {/* Summary Pill Bar */}
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-400">Atendimento: </span>
                    <strong className="text-slate-900">{currentService?.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Profissional: </span>
                    <strong className="text-slate-900">{currentDoctor?.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Data e Horário: </span>
                    <strong className="text-blue-800">{formatFriendlyDate(selectedDate)} às {selectedTimeSlot}</strong>
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nome completo do paciente *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="Ex: Maria Aparecida da Silva"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Telefone / WhatsApp com DDD *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        placeholder="(45) 99999-9999"
                        value={patientPhone}
                        onChange={handlePhoneChange}
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Enviaremos o lembrete e a confirmação para este número.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Data de nascimento do paciente (Opcional)
                    </label>
                    <input
                      type="date"
                      value={patientBirthDate}
                      onChange={(e) => setPatientBirthDate(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      E-mail para confirmação (Opcional)
                    </label>
                    <input
                      type="email"
                      placeholder="paciente@exemplo.com.br"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Observações ou queixas principais (Opcional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ex: Primeira consulta, dor de cabeça ao ler, interesse em lentes de contato..."
                      value={patientNotes}
                      onChange={(e) => setPatientNotes(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* LGPD Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={lgpdConsent}
                      onChange={(e) => setLgpdConsent(e.target.checked)}
                      className="w-4 h-4 mt-0.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-600 leading-normal">
                      Concordo com o tratamento dos meus dados de contato estritamente para fins de agendamento e confirmação da consulta, em conformidade com a LGPD.
                    </span>
                  </label>
                </div>

                {submissionError && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{submissionError}</span>
                  </div>
                )}

                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer text-center min-h-[40px] flex items-center justify-center"
                  >
                    Voltar
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 text-xs xs:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-50 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer min-h-[48px]"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                        <span>Verificando e confirmando...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-sky-200 shrink-0" />
                        <span>Confirmar Solicitação de Agendamento</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* PASSO 5: CONFIRMAÇÃO DO AGENDAMENTO COM PROTOCOLO */}
            {step === 5 && completedAppointment && (
              <div className="text-center py-4 sm:py-6 space-y-5 sm:space-y-6 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>

                <div>
                  <span className="text-[11px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest">
                    Agendamento Confirmado com Sucesso!
                  </span>
                  <h3 className="font-display text-xl xs:text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 break-words">
                    Aguardamos você no Instituto de Olhos de Cafelândia
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto">
                    Seu horário foi reservado em nosso sistema. Guarde seu número de protocolo para qualquer consulta ou alteração.
                  </p>
                </div>

                {/* Protocol Card */}
                <div className="max-w-md mx-auto p-4 sm:p-6 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-3.5">
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between border-b border-slate-200/80 pb-3 gap-1.5">
                    <span className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      Protocolo de Atendimento
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-blue-800 bg-blue-100/70 px-2.5 py-1 rounded-md self-start xs:self-auto">
                      {completedAppointment.protocolCode}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Paciente:</span>
                      <strong className="text-slate-800 text-sm break-words">{completedAppointment.patientName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Telefone:</span>
                      <strong className="text-slate-800 text-sm">{completedAppointment.patientPhone}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Médico:</span>
                      <strong className="text-slate-800">{completedAppointment.doctorName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Serviço:</span>
                      <strong className="text-slate-800">{completedAppointment.serviceName}</strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex flex-col xs:flex-row xs:items-center justify-between text-xs gap-1">
                    <span className="text-slate-500">Data e Horário:</span>
                    <strong className="text-blue-900 text-sm font-bold">
                      {formatFriendlyDate(completedAppointment.date)} às {completedAppointment.timeSlot}
                    </strong>
                  </div>

                  <div className="text-[11px] text-slate-500 pt-1">
                    Endereço: {settings.address}
                  </div>
                </div>

                {/* Helpful post-booking action buttons */}
                <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2">
                  {/* WhatsApp confirmation */}
                  <a
                    href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                      `Olá! Acabei de agendar uma consulta no Instituto de Olhos de Cafelândia.\n\nProtocolo: ${completedAppointment.protocolCode}\nPaciente: ${completedAppointment.patientName}\nData: ${formatFriendlyDate(completedAppointment.date)} às ${completedAppointment.timeSlot}\nMédico: ${completedAppointment.doctorName}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors min-h-[44px]"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Enviar no WhatsApp</span>
                  </a>

                  {/* Print receipt */}
                  <button
                    onClick={() => window.print()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer min-h-[44px]"
                  >
                    <Printer className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Imprimir Comprovante</span>
                  </button>
                </div>

                <div className="pt-2 sm:pt-4">
                  <button
                    onClick={handleResetForm}
                    className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer min-h-[36px]"
                  >
                    Fazer outro agendamento
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CONSULTAR / CANCELAR AGENDAMENTO EXISTENTE       */}
        {/* ======================================================== */}
        {activeTab === 'lookup' && (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md p-4 xs:p-6 sm:p-10 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="font-display text-xl font-bold text-slate-900">
                Consultar ou Gerenciar seu Agendamento
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Digite o código de protocolo fornecido na confirmação ou o telefone cadastrado.
              </p>
            </div>

            <form onSubmit={handleLookup} className="flex flex-col xs:flex-row gap-2 mb-6">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Ex: IOC-2026-8142 ou (45) 99123-4567"
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden min-h-[44px]"
                />
              </div>
              <button
                type="submit"
                className="w-full xs:w-auto inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition-colors cursor-pointer min-h-[44px]"
              >
                Buscar
              </button>
            </form>

            {lookupError && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 mb-6">
                {lookupError}
              </div>
            )}

            {cancelFeedback && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{cancelFeedback}</span>
              </div>
            )}

            {lookupResult && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Protocolo</span>
                    <p className="font-mono text-sm font-bold text-blue-900">{lookupResult.protocolCode}</p>
                  </div>
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                      lookupResult.status === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : lookupResult.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {lookupResult.status === 'confirmed'
                        ? 'Confirmado'
                        : lookupResult.status === 'cancelled'
                        ? 'Cancelado'
                        : 'Pendente'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">Paciente:</span>
                    <p className="font-semibold text-slate-800 break-words">{lookupResult.patientName}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Telefone:</span>
                    <p className="font-semibold text-slate-800">{lookupResult.patientPhone}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Serviço:</span>
                    <p className="font-semibold text-slate-800">{lookupResult.serviceName}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Médico:</span>
                    <p className="font-semibold text-slate-800">{lookupResult.doctorName}</p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex flex-col xs:flex-row xs:items-center justify-between text-xs gap-1">
                  <span className="text-slate-500">Data e Horário:</span>
                  <strong className="text-blue-900 font-bold">
                    {formatFriendlyDate(lookupResult.date)} às {lookupResult.timeSlot}
                  </strong>
                </div>

                {lookupResult.status !== 'cancelled' && (
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200">
                    <span className="text-[11px] text-slate-500">
                      Precisa alterar a data? Cancele e escolha um novo horário.
                    </span>
                    <button
                      onClick={() => handleCancelAppointment(lookupResult.id)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors cursor-pointer min-h-[38px]"
                    >
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Cancelar Agendamento</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
