import React, { useState, useEffect } from 'react';
import { Doctor, ClinicService, Appointment, BlockedSlot, ClinicSettings } from '../types';
import { dataService } from '../services/dataService';
import { SUPABASE_SQL_SCHEMA, checkSupabaseStatus } from '../services/supabaseClient';
import {
  X,
  Lock,
  LogOut,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  Edit,
  Database,
  Phone,
  Settings as SettingsIcon,
  Search,
  Filter,
  Check,
  XCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  doctors: Doctor[];
  services: ClinicService[];
  settings: ClinicSettings;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  doctors: initialDoctors,
  services: initialServices,
  settings: initialSettings,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('ioc_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'schedule' | 'blocks' | 'doctors' | 'services' | 'settings'>('overview');

  // Local state synced with dataService
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [services, setServices] = useState<ClinicService[]>(initialServices);
  const [settings, setSettings] = useState<ClinicSettings>(initialSettings);

  // Filters for Appointments
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [doctorFilter, setDoctorFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');

  // Form states for adding/editing
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [editingService, setEditingService] = useState<ClinicService | null>(null);
  const [newBlockDate, setNewBlockDate] = useState('');
  const [newBlockDoctorId, setNewBlockDoctorId] = useState('all');
  const [newBlockTimeSlot, setNewBlockTimeSlot] = useState('all-day');
  const [newBlockReason, setNewBlockReason] = useState('');

  // Supabase settings fields
  const [sbUrl, setSbUrl] = useState(settings.supabaseUrl || '');
  const [sbKey, setSbKey] = useState(settings.supabaseAnonKey || '');
  const [copiedSql, setCopiedSql] = useState(false);

  // Sync state from dataService
  const refreshData = () => {
    setAppointments(dataService.getAppointments());
    setBlockedSlots(dataService.getBlockedSlots());
    setDoctors(dataService.getDoctors());
    setServices(dataService.getServices());
    setSettings(dataService.getSettings());
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = pinInput.trim();
    if (
      entered === 'Clinica2026' ||
      entered === 'clinica2026' ||
      (settings.adminPin && entered.toLowerCase() === settings.adminPin.toLowerCase())
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem('ioc_admin_auth', 'true');
      setAuthError('');
      setPinInput('');
    } else {
      setAuthError('Senha incorreta. Verifique a senha com a administração da clínica.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ioc_admin_auth');
  };

  if (!isOpen) return null;

  // Format date
  const formatFriendlyDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter((a) => a.date === todayStr && a.status !== 'cancelled');
  const activeAppointments = appointments.filter((a) => a.status !== 'cancelled');

  // Filtered appointments list
  const filteredAppointments = appointments.filter((apt) => {
    if (statusFilter !== 'all' && apt.status !== statusFilter) return false;
    if (doctorFilter !== 'all' && apt.doctorId !== doctorFilter) return false;
    if (dateFilter && apt.date !== dateFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = apt.patientName.toLowerCase().includes(q);
      const matchPhone = apt.patientPhone.includes(q);
      const matchProto = apt.protocolCode.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchProto) return false;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-6xl w-full h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Top Header of Admin Panel */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden pr-2">
            <div className="p-1.5 sm:p-2 bg-blue-600 rounded-xl shrink-0">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="overflow-hidden">
              <h2 className="font-display font-bold text-sm sm:text-lg text-white truncate">
                Painel Administrativo
              </h2>
              <p className="hidden sm:block text-xs text-slate-400">
                Gestão restrita de agendamentos, equipe médica, serviços e disponibilidade
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer min-h-[36px]"
                title="Sair do painel administrativo"
              >
                <LogOut className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Encerrar Sessão</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Fechar painel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AUTHENTICATION GATE */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-slate-50 overflow-y-auto">
            <div className="max-w-md w-full bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-lg text-center space-y-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                  Área Administrativa
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Acesso restrito à equipe da clínica. Digite a senha para continuar.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 text-left mb-1.5">
                    Senha de Acesso
                  </label>
                  <input
                    type="password"
                    placeholder="Digite a senha..."
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden min-h-[44px]"
                    autoFocus
                  />
                </div>

                {authError && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 text-left">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition-colors cursor-pointer min-h-[44px]"
                >
                  Entrar na Área Administrativa
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED WORKSPACE */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Left Sidebar Navigation */}
            <aside className="w-full md:w-60 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-2 sm:p-4 shrink-0 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-y-auto touch-pan-x scrollbar-none">
              <button
                onClick={() => setActiveTab('overview')}
                className={`shrink-0 md:w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors whitespace-nowrap cursor-pointer min-h-[38px] ${
                  activeTab === 'overview'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <Clock className="w-4 h-4 shrink-0" />
                <span>Visão Geral & Hoje</span>
              </button>

              <button
                onClick={() => setActiveTab('appointments')}
                className={`shrink-0 md:w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors whitespace-nowrap cursor-pointer min-h-[38px] ${
                  activeTab === 'appointments'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Todos os Agendamentos</span>
              </button>

              <button
                onClick={() => setActiveTab('schedule')}
                className={`shrink-0 md:w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors whitespace-nowrap cursor-pointer min-h-[38px] ${
                  activeTab === 'schedule'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span>Agenda por Médico</span>
              </button>

              <button
                onClick={() => setActiveTab('blocks')}
                className={`shrink-0 md:w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors whitespace-nowrap cursor-pointer min-h-[38px] ${
                  activeTab === 'blocks'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <XCircle className="w-4 h-4 shrink-0" />
                <span>Bloquear Horários</span>
              </button>

              <button
                onClick={() => setActiveTab('doctors')}
                className={`shrink-0 md:w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors whitespace-nowrap cursor-pointer min-h-[38px] ${
                  activeTab === 'doctors'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <Stethoscope className="w-4 h-4 shrink-0" />
                <span>Editar Médicos (CRM)</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`shrink-0 md:w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors whitespace-nowrap cursor-pointer min-h-[38px] ${
                  activeTab === 'services'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <Edit className="w-4 h-4 shrink-0" />
                <span>Serviços e Exames</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`shrink-0 md:w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors whitespace-nowrap cursor-pointer min-h-[38px] ${
                  activeTab === 'settings'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <Database className="w-4 h-4 shrink-0" />
                <span>WhatsApp & Supabase</span>
              </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-white">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      Painel de Controle da Clínica
                    </h3>
                    <p className="text-xs text-slate-500">
                      Resumo da movimentação diária e ocupação dos horários do Instituto de Olhos de Cafelândia.
                    </p>
                  </div>

                  {/* 4 KPI Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
                      <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                        Atendimentos Hoje
                      </span>
                      <p className="font-display text-3xl font-extrabold text-blue-900 mt-1">
                        {todayAppointments.length}
                      </p>
                      <span className="text-[11px] text-slate-500">{formatFriendlyDate(todayStr)}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Total Confirmados
                      </span>
                      <p className="font-display text-3xl font-extrabold text-slate-900 mt-1">
                        {activeAppointments.length}
                      </p>
                      <span className="text-[11px] text-slate-500">Agendamentos ativos</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                      <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                        Corpo Clínico
                      </span>
                      <p className="font-display text-3xl font-extrabold text-emerald-900 mt-1">
                        {doctors.length}
                      </p>
                      <span className="text-[11px] text-slate-500">Médicos ativos</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                      <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                        Bloqueios Ativos
                      </span>
                      <p className="font-display text-3xl font-extrabold text-amber-900 mt-1">
                        {blockedSlots.length}
                      </p>
                      <span className="text-[11px] text-slate-500">Dias/Horários bloqueados</span>
                    </div>
                  </div>

                  {/* Today's appointments list */}
                  <div className="p-5 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-sm text-slate-900">
                        Pacientes Agendados para Hoje ({formatFriendlyDate(todayStr)})
                      </h4>
                      <span className="text-xs text-slate-500">{todayAppointments.length} paciente(s)</span>
                    </div>

                    {todayAppointments.length > 0 ? (
                      <div className="divide-y divide-slate-100">
                        {todayAppointments.map((apt) => (
                          <div key={apt.id} className="py-3 flex items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-slate-900">{apt.patientName}</span>
                                <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                                  {apt.timeSlot}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {apt.serviceName} · com {apt.doctorName}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <a
                                href={`https://wa.me/55${apt.patientPhone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg text-xs"
                                title="Falar no WhatsApp"
                              >
                                <WhatsAppIcon className="w-4 h-4" />
                              </a>
                              <button
                                onClick={() => {
                                  dataService.updateAppointmentStatus(apt.id, 'completed');
                                  refreshData();
                                }}
                                className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg"
                              >
                                Concluir Atendimento
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-xs text-slate-500">
                        Nenhum atendimento agendado para o dia de hoje.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: TODOS OS AGENDAMENTOS */}
              {activeTab === 'appointments' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-bold text-slate-900">
                        Gestão Completa de Agendamentos
                      </h3>
                      <p className="text-xs text-slate-500">
                        Consulte, altere status e gerencie todas as consultas e exames do Instituto.
                      </p>
                    </div>
                  </div>

                  {/* Filter Toolbar */}
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-wrap items-center gap-3 text-xs">
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Buscar por paciente, telefone ou protocolo..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 bg-white rounded-lg border border-slate-300 text-xs"
                      />
                    </div>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-1.5 bg-white rounded-lg border border-slate-300 text-xs text-slate-700"
                    >
                      <option value="all">Todos os Status</option>
                      <option value="confirmed">Confirmados</option>
                      <option value="completed">Concluídos</option>
                      <option value="cancelled">Cancelados</option>
                    </select>

                    <select
                      value={doctorFilter}
                      onChange={(e) => setDoctorFilter(e.target.value)}
                      className="px-3 py-1.5 bg-white rounded-lg border border-slate-300 text-xs text-slate-700"
                    >
                      <option value="all">Todos os Médicos</option>
                      {doctors.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>

                    <input
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="px-3 py-1.5 bg-white rounded-lg border border-slate-300 text-xs text-slate-700"
                    />

                    {(searchQuery || statusFilter !== 'all' || doctorFilter !== 'all' || dateFilter) && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setStatusFilter('all');
                          setDoctorFilter('all');
                          setDateFilter('');
                        }}
                        className="text-xs text-blue-700 hover:underline"
                      >
                        Limpar filtros
                      </button>
                    )}
                  </div>

                  {/* Appointments Table */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                          <tr>
                            <th className="p-3.5">Protocolo</th>
                            <th className="p-3.5">Paciente & Contato</th>
                            <th className="p-3.5">Data & Horário</th>
                            <th className="p-3.5">Médico & Serviço</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredAppointments.length > 0 ? (
                            filteredAppointments.map((apt) => (
                              <tr key={apt.id} className="hover:bg-slate-50/50">
                                <td className="p-3.5 font-mono font-bold text-blue-800">
                                  {apt.protocolCode}
                                </td>
                                <td className="p-3.5">
                                  <p className="font-bold text-slate-900">{apt.patientName}</p>
                                  <p className="text-slate-500 text-[11px]">{apt.patientPhone}</p>
                                  {apt.patientNotes && (
                                    <p className="text-slate-400 text-[10px] italic mt-0.5 truncate max-w-xs">
                                      Obs: {apt.patientNotes}
                                    </p>
                                  )}
                                </td>
                                <td className="p-3.5 whitespace-nowrap">
                                  <p className="font-semibold text-slate-800">{formatFriendlyDate(apt.date)}</p>
                                  <p className="text-blue-700 font-bold">{apt.timeSlot}</p>
                                </td>
                                <td className="p-3.5">
                                  <p className="font-semibold text-slate-800">{apt.doctorName}</p>
                                  <p className="text-slate-500 text-[11px]">{apt.serviceName}</p>
                                </td>
                                <td className="p-3.5">
                                  <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                    apt.status === 'confirmed'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : apt.status === 'completed'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {apt.status === 'confirmed'
                                      ? 'Confirmado'
                                      : apt.status === 'completed'
                                      ? 'Concluído'
                                      : 'Cancelado'}
                                  </span>
                                </td>
                                <td className="p-3.5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    {apt.status === 'confirmed' && (
                                      <>
                                        <button
                                          onClick={() => {
                                            dataService.updateAppointmentStatus(apt.id, 'completed');
                                            refreshData();
                                          }}
                                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"
                                          title="Marcar como Concluído"
                                        >
                                          <Check className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => {
                                            if (window.confirm(`Cancelar o agendamento de ${apt.patientName}?`)) {
                                              dataService.cancelAppointment(apt.id);
                                              refreshData();
                                            }
                                          }}
                                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                          title="Cancelar Agendamento"
                                        >
                                          <X className="w-4 h-4" />
                                        </button>
                                      </>
                                    )}
                                    {apt.status === 'cancelled' && (
                                      <button
                                        onClick={() => {
                                          dataService.updateAppointmentStatus(apt.id, 'confirmed');
                                          refreshData();
                                        }}
                                        className="text-[10px] font-semibold text-blue-700 hover:underline"
                                      >
                                        Reativar
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="p-8 text-center text-slate-500">
                                Nenhum agendamento encontrado com os filtros aplicados.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: AGENDA POR MÉDICO */}
              {activeTab === 'schedule' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      Agenda por Profissional
                    </h3>
                    <p className="text-xs text-slate-500">
                      Consulte os horários ocupados e a grade de atendimento individual de cada médico.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {doctors.map((doctor) => {
                      const docAppointments = appointments.filter(
                        (a) => a.doctorId === doctor.id && a.status !== 'cancelled'
                      );

                      return (
                        <div key={doctor.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200">
                              <img
                                src={doctor.photoUrl}
                                alt={doctor.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-base text-slate-900">{doctor.name}</h4>
                              <p className="text-xs text-blue-700">{doctor.specialty}</p>
                              <p className="text-[11px] text-slate-400">{doctor.crm}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs mb-3">
                            <span className="font-semibold text-slate-700">
                              Próximos Atendimentos ({docAppointments.length})
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Horários configurados: {doctor.availableHours.length} slots/dia
                            </span>
                          </div>

                          {docAppointments.length > 0 ? (
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                              {docAppointments.map((apt) => (
                                <div
                                  key={apt.id}
                                  className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between text-xs"
                                >
                                  <div>
                                    <p className="font-bold text-slate-900">{apt.patientName}</p>
                                    <p className="text-slate-500 text-[11px]">{apt.serviceName}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-blue-800">{formatFriendlyDate(apt.date)}</p>
                                    <p className="text-xs text-slate-600">{apt.timeSlot}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-6 text-center text-xs text-slate-400 bg-white rounded-xl border border-slate-200">
                              Nenhum atendimento futuro para este médico no momento.
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: BLOQUEIO DE HORÁRIOS */}
              {activeTab === 'blocks' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      Bloqueio de Horários e Recessos
                    </h3>
                    <p className="text-xs text-slate-500">
                      Bloqueie dias inteiros ou faixas de horários para cirurgias, cursos, recessos ou feriados em Cafelândia.
                    </p>
                  </div>

                  {/* Add Block Form */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                      Cadastrar Novo Bloqueio
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-600 mb-1 font-semibold">Data do Bloqueio *</label>
                        <input
                          type="date"
                          value={newBlockDate}
                          onChange={(e) => setNewBlockDate(e.target.value)}
                          className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-600 mb-1 font-semibold">Profissional *</label>
                        <select
                          value={newBlockDoctorId}
                          onChange={(e) => setNewBlockDoctorId(e.target.value)}
                          className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                        >
                          <option value="all">Toda a Clínica (Todos os Médicos)</option>
                          {doctors.map((d) => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-600 mb-1 font-semibold">Horário *</label>
                        <select
                          value={newBlockTimeSlot}
                          onChange={(e) => setNewBlockTimeSlot(e.target.value)}
                          className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                        >
                          <option value="all-day">O Dia Todo (Integral)</option>
                          <option value="08:00">08:00</option>
                          <option value="09:00">09:00</option>
                          <option value="10:00">10:00</option>
                          <option value="14:00">14:00</option>
                          <option value="15:00">15:00</option>
                          <option value="16:00">16:00</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-600 mb-1 font-semibold">Motivo / Descrição *</label>
                        <input
                          type="text"
                          placeholder="Ex: Recesso, Cirurgia, Manutenção"
                          value={newBlockReason}
                          onChange={(e) => setNewBlockReason(e.target.value)}
                          className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => {
                          if (!newBlockDate) {
                            alert('Informe a data do bloqueio.');
                            return;
                          }
                          dataService.addBlockedSlot({
                            date: newBlockDate,
                            doctorId: newBlockDoctorId,
                            timeSlot: newBlockTimeSlot,
                            reason: newBlockReason || 'Bloqueio administrativo',
                          });
                          refreshData();
                          setNewBlockDate('');
                          setNewBlockReason('');
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Confirmar Bloqueio</span>
                      </button>
                    </div>
                  </div>

                  {/* Blocked Slots Table */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
                        <tr>
                          <th className="p-3">Data</th>
                          <th className="p-3">Médico</th>
                          <th className="p-3">Horário</th>
                          <th className="p-3">Motivo</th>
                          <th className="p-3 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {blockedSlots.length > 0 ? (
                          blockedSlots.map((b) => (
                            <tr key={b.id} className="hover:bg-slate-50">
                              <td className="p-3 font-semibold text-slate-900">{formatFriendlyDate(b.date)}</td>
                              <td className="p-3 text-slate-700">
                                {b.doctorId === 'all'
                                  ? 'Todos os Médicos'
                                  : doctors.find((d) => d.id === b.doctorId)?.name || b.doctorId}
                              </td>
                              <td className="p-3 text-blue-700 font-bold">
                                {b.timeSlot === 'all-day' ? 'Dia Todo' : b.timeSlot}
                              </td>
                              <td className="p-3 text-slate-600">{b.reason}</td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => {
                                    dataService.removeBlockedSlot(b.id);
                                    refreshData();
                                  }}
                                  className="text-red-600 hover:text-red-800 p-1 rounded"
                                  title="Remover Bloqueio"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="p-6 text-center text-slate-400">
                              Nenhum bloqueio cadastrado no momento. Todos os horários regulares estão abertos conforme a agenda.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: EDITAR MÉDICOS (CRM, RQE, BIO) */}
              {activeTab === 'doctors' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      Cadastro e Edição dos Médicos
                    </h3>
                    <p className="text-xs text-slate-500">
                      Conforme solicitado, os dois espaços individuais contam com campos editáveis para inserir os nomes, CRMs, RQEs e formações verdadeiras.
                    </p>
                  </div>

                  {editingDoctor ? (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <h4 className="font-bold text-sm text-slate-900">
                          Editando Perfil de {editingDoctor.name}
                        </h4>
                        <button
                          onClick={() => setEditingDoctor(null)}
                          className="text-xs text-slate-500 hover:text-slate-800"
                        >
                          Cancelar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Nome Completo *</label>
                          <input
                            type="text"
                            value={editingDoctor.name}
                            onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Título Profissional *</label>
                          <input
                            type="text"
                            value={editingDoctor.title}
                            onChange={(e) => setEditingDoctor({ ...editingDoctor, title: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">CRM *</label>
                          <input
                            type="text"
                            value={editingDoctor.crm}
                            onChange={(e) => setEditingDoctor({ ...editingDoctor, crm: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">RQE (Registro de Especialidade)</label>
                          <input
                            type="text"
                            value={editingDoctor.rqe || ''}
                            onChange={(e) => setEditingDoctor({ ...editingDoctor, rqe: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-semibold text-slate-700 mb-1">Especialidade / Foco Clínico *</label>
                          <input
                            type="text"
                            value={editingDoctor.specialty}
                            onChange={(e) => setEditingDoctor({ ...editingDoctor, specialty: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-semibold text-slate-700 mb-1">Formação Acadêmica e Residência *</label>
                          <textarea
                            rows={3}
                            value={editingDoctor.education}
                            onChange={(e) => setEditingDoctor({ ...editingDoctor, education: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-semibold text-slate-700 mb-1">Biografia e Filosofia de Atendimento</label>
                          <textarea
                            rows={3}
                            value={editingDoctor.bio}
                            onChange={(e) => setEditingDoctor({ ...editingDoctor, bio: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-3">
                        <button
                          onClick={() => setEditingDoctor(null)}
                          className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-xl"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => {
                            dataService.updateDoctor(editingDoctor);
                            refreshData();
                            setEditingDoctor(null);
                          }}
                          className="px-5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl"
                        >
                          Salvar Alterações
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {doctors.map((doctor, idx) => (
                        <div key={doctor.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                              <img
                                src={doctor.photoUrl}
                                alt={doctor.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                                {idx === 0 ? 'Espaço Doutor 1' : 'Espaço Doutora 2'}
                              </span>
                              <h4 className="font-bold text-base text-slate-900 mt-1">{doctor.name}</h4>
                              <p className="text-xs text-slate-600">{doctor.crm}</p>
                              {doctor.rqe && <p className="text-[11px] text-slate-400">{doctor.rqe}</p>}
                            </div>
                          </div>

                          <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                            <p><strong className="text-slate-800">Especialidade:</strong> {doctor.specialty}</p>
                            <p className="line-clamp-2"><strong className="text-slate-800">Formação:</strong> {doctor.education}</p>
                          </div>

                          <button
                            onClick={() => setEditingDoctor({ ...doctor })}
                            className="w-full py-2 px-3 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Editar Informações do Médico</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: SERVIÇOS E EXAMES */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-slate-900">
                        Gerenciamento de Serviços e Exames
                      </h3>
                      <p className="text-xs text-slate-500">
                        Adicione, ative ou edite exames de visão e procedimentos oferecidos pela clínica.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const newS = dataService.addService({
                          name: 'Novo Procedimento Oftalmológico',
                          category: 'exame',
                          shortDescription: 'Descrição breve do procedimento para avaliação dos pacientes.',
                          fullDescription: 'Descrição detalhada dos objetivos clínicos e benefícios para a saúde ocular.',
                          durationMinutes: 30,
                          priceNote: 'Consulte valores na recepção',
                          active: true,
                        });
                        refreshData();
                        setEditingService(newS);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Novo Serviço</span>
                    </button>
                  </div>

                  {editingService ? (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <h4 className="font-bold text-sm text-slate-900">
                          Editando Serviço: {editingService.name}
                        </h4>
                        <button
                          onClick={() => setEditingService(null)}
                          className="text-xs text-slate-500 hover:text-slate-800"
                        >
                          Cancelar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Nome do Serviço *</label>
                          <input
                            type="text"
                            value={editingService.name}
                            onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Categoria *</label>
                          <select
                            value={editingService.category}
                            onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                            className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                          >
                            <option value="consulta">Consulta Oftalmológica</option>
                            <option value="exame">Exame de Visão / Diagnóstico</option>
                            <option value="infantil">Atendimento Infantil</option>
                            <option value="especial">Procedimento Especial</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Duração Estimada (minutos) *</label>
                          <input
                            type="number"
                            value={editingService.durationMinutes}
                            onChange={(e) => setEditingService({ ...editingService, durationMinutes: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Nota de Preço / Convênio *</label>
                          <input
                            type="text"
                            value={editingService.priceNote}
                            onChange={(e) => setEditingService({ ...editingService, priceNote: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-semibold text-slate-700 mb-1">Descrição Curta *</label>
                          <input
                            type="text"
                            value={editingService.shortDescription}
                            onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-semibold text-slate-700 mb-1">Descrição Completa</label>
                          <textarea
                            rows={3}
                            value={editingService.fullDescription}
                            onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                            className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-3">
                        <button
                          onClick={() => setEditingService(null)}
                          className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-xl"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => {
                            dataService.updateService(editingService);
                            refreshData();
                            setEditingService(null);
                          }}
                          className="px-5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl"
                        >
                          Salvar Serviço
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <div key={service.id} className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="font-semibold text-blue-700 uppercase tracking-wider text-[10px]">
                                {service.category}
                              </span>
                              <span className="text-slate-400">~{service.durationMinutes} min</span>
                            </div>
                            <h4 className="font-bold text-sm text-slate-900">{service.name}</h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{service.shortDescription}</p>
                          </div>

                          <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                            <button
                              onClick={() => setEditingService({ ...service })}
                              className="text-xs font-semibold text-blue-700 hover:underline"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Excluir o serviço "${service.name}"?`)) {
                                  dataService.deleteService(service.id);
                                  refreshData();
                                }
                              }}
                              className="text-red-500 hover:text-red-700 text-xs"
                            >
                              Excluir
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 7: SETTINGS & SUPABASE */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      Configurações da Clínica & Conexão Supabase
                    </h3>
                    <p className="text-xs text-slate-500">
                      Configure o número de WhatsApp oficial, horários de expediente e ative a persistência com Supabase.
                    </p>
                  </div>

                  {/* WhatsApp & Clinic Details */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                      <span>WhatsApp e Canais da Clínica</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Número do WhatsApp (com DDI e DDD) *
                        </label>
                        <input
                          type="text"
                          placeholder="5545998243400"
                          value={settings.whatsappNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            dataService.updateSettings({ whatsappNumber: val });
                            refreshData();
                          }}
                          className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                        />
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          Somente dígitos (ex: 5545998243400).
                        </span>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          WhatsApp Exibição Formatada *
                        </label>
                        <input
                          type="text"
                          placeholder="(45) 99824-3400"
                          value={settings.whatsappDisplay}
                          onChange={(e) => {
                            dataService.updateSettings({ whatsappDisplay: e.target.value });
                            refreshData();
                          }}
                          className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Horário de Funcionamento *
                        </label>
                        <input
                          type="text"
                          value={settings.operatingHours}
                          onChange={(e) => {
                            dataService.updateSettings({ operatingHours: e.target.value });
                            refreshData();
                          }}
                          className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    {/* Security & Access Password */}
                    <div className="pt-3 border-t border-slate-200">
                      <div className="max-w-xs">
                        <label className="block text-slate-700 font-semibold mb-1">
                          Senha de Acesso da Equipe (PIN) *
                        </label>
                        <input
                          type="text"
                          value={settings.adminPin || 'Clinica2026'}
                          onChange={(e) => {
                            dataService.updateSettings({ adminPin: e.target.value.trim() });
                            refreshData();
                          }}
                          className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 font-mono text-sm"
                        />
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          Senha atual da clínica (definida como Clinica2026).
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Supabase Integration Section */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Database className="w-5 h-5 text-emerald-400" />
                        <div>
                          <h4 className="font-bold text-sm text-white">Integração com Banco de Dados Supabase</h4>
                          <p className="text-[11px] text-slate-400">
                            Estrutura oficial com proteção atômica contra sobreposição de horários (PostgreSQL).
                          </p>
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        checkSupabaseStatus(sbUrl, sbKey).isConfigured
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {checkSupabaseStatus(sbUrl, sbKey).isConfigured ? 'Conectado' : 'Modo Local Ativo'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Supabase Project URL</label>
                        <input
                          type="text"
                          placeholder="https://xyzproject.supabase.co"
                          value={sbUrl}
                          onChange={(e) => setSbUrl(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-blue-500 outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Supabase Anon Public Key</label>
                        <input
                          type="password"
                          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                          value={sbKey}
                          onChange={(e) => setSbKey(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-blue-500 outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                      <p className="text-slate-400 text-[11px]">
                        {checkSupabaseStatus(sbUrl, sbKey).message}
                      </p>
                      <button
                        onClick={() => {
                          dataService.updateSettings({
                            supabaseUrl: sbUrl,
                            supabaseAnonKey: sbKey,
                            supabaseConnected: checkSupabaseStatus(sbUrl, sbKey).isConfigured,
                          });
                          refreshData();
                          alert('Configurações salvas!');
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold cursor-pointer"
                      >
                        Salvar Credenciais
                      </button>
                    </div>

                    {/* Copyable SQL Schema Script */}
                    <div className="pt-4 border-t border-slate-800/80">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-300">
                          Script SQL de Criação de Tabelas (Execute no SQL Editor do Supabase)
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
                            setCopiedSql(true);
                            setTimeout(() => setCopiedSql(false), 2500);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-sky-300 rounded-lg transition-colors cursor-pointer"
                        >
                          {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedSql ? 'Copiado!' : 'Copiar Script SQL'}</span>
                        </button>
                      </div>

                      <pre className="p-3 bg-slate-950 text-slate-300 text-[10px] font-mono rounded-xl max-h-40 overflow-y-auto border border-slate-800">
                        {SUPABASE_SQL_SCHEMA}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

            </main>
          </div>
        )}

      </div>
    </div>
  );
};
