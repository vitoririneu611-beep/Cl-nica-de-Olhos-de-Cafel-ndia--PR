import React from 'react';
import { ClinicSettings } from '../types';
import { Calendar, MapPin, Clock, Phone, Mail, Shield, Lock } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  settings: ClinicSettings;
  onNavigate: (sectionId: string) => void;
  onOpenPrivacy: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onOpenPrivacy,
  onOpenAdmin,
}) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (id: string) => {
    onNavigate(id);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 sm:pt-16 pb-10 sm:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 pb-10 sm:pb-12 border-b border-slate-800">
          
          {/* Column 1: Institution Brand & Summary (Col span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white ring-2 ring-blue-500/30 shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" fill="#38BDF8" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="1" fill="#0B2545" />
                </svg>
              </div>
              <div>
                <span className="font-display font-bold text-base sm:text-lg text-white tracking-tight block">
                  Instituto de Olhos
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-sky-400 tracking-wider uppercase block">
                  de Cafelândia
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Cuidado oftalmológico humanizado, ético e responsável para adultos e crianças em Cafelândia e região oeste do Paraná.
            </p>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => handleLinkClick('agendamento')}
                className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-600 px-4 py-2.5 rounded-lg transition-colors w-full sm:w-fit cursor-pointer min-h-[42px]"
              >
                <Calendar className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                <span>Agendar Consulta Online</span>
              </button>

              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                  'Olá! Gostaria de falar com o Instituto de Olhos de Cafelândia.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors w-full sm:w-fit py-1"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp: {settings.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (Col span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleLinkClick('inicio')}
                  className="hover:text-white transition-colors cursor-pointer py-1"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('sobre')}
                  className="hover:text-white transition-colors cursor-pointer py-1"
                >
                  Sobre o Instituto
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('medicos')}
                  className="hover:text-white transition-colors cursor-pointer py-1"
                >
                  Nossos Médicos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('servicos')}
                  className="hover:text-white transition-colors cursor-pointer py-1"
                >
                  Serviços e Exames
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('flyers')}
                  className="hover:text-white transition-colors cursor-pointer py-1"
                >
                  Destaques da Clínica
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('localizacao')}
                  className="hover:text-white transition-colors cursor-pointer py-1"
                >
                  Onde Estamos
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours (Col span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Atendimento & Horários
            </h4>

            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200">{settings.operatingDays}</p>
                  <p className="mt-0.5">{settings.operatingHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200">Telefone da Recepção</p>
                  <p className="mt-0.5">{settings.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div className="overflow-hidden">
                  <p className="font-semibold text-slate-200">E-mail Institucional</p>
                  <p className="mt-0.5 truncate">{settings.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Location in Cafelândia PR (Col span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Endereço em Cafelândia
            </h4>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200">{settings.street}, nº {settings.number}</p>
                  <p>Bairro {settings.neighborhood}</p>
                  <p>{settings.city} — {settings.state}</p>
                  <p className="text-slate-500 mt-1">CEP: {settings.cep}</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    'Rua Senador Nereu Ramos, 340, Centro, Cafelandia - PR'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-sky-400 hover:text-sky-300 underline underline-offset-4 inline-block py-1"
                >
                  Abrir rota no Google Maps →
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Administrative Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div>
            © {currentYear} Instituto de Olhos de Cafelândia. Todos os direitos reservados.
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 gap-y-2">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer py-1"
            >
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span>Privacidade & LGPD</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className="hover:text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer py-1"
              title="Acesso exclusivo para funcionários e médicos da clínica"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>Área Restrita da Clínica</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
