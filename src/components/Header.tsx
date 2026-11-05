import React, { useState } from 'react';
import { Menu, X, Calendar, Lock } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre nós', href: '#sobre' },
    { label: 'Nossos médicos', href: '#medicos' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Destaques', href: '#flyers' },
    { label: 'Agendamento', href: '#agendamento' },
    { label: 'Onde estamos', href: '#localizacao' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    onNavigate(targetId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-8 h-18 sm:h-20">
          
          {/* Zone 1: Single text element wordmark with bespoke eye logo */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#inicio');
            }}
            className="flex items-center gap-2 sm:gap-3 group text-left shrink-0 max-w-[65%] sm:max-w-none"
            title="Instituto de Olhos de Cafelândia - Página Inicial"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-950 flex items-center justify-center text-white shadow-sm ring-2 sm:ring-4 ring-blue-50 group-hover:scale-105 transition-transform duration-200 shrink-0">
              {/* Bespoke clean ophthalmology iris monogram */}
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
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
            <div className="flex flex-col min-w-0">
              <span className="font-display font-bold text-sm xs:text-base sm:text-xl text-slate-900 tracking-tight leading-none group-hover:text-blue-700 transition-colors truncate">
                Instituto de Olhos
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-blue-600 tracking-wider uppercase mt-0.5 truncate">
                de Cafelândia
              </span>
            </div>
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
                className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 py-1 hover:border-b-2 hover:border-blue-600"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + administrative portal */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={() => handleLinkClick('#agendamento')}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[38px] sm:min-h-[42px]"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-200" />
              <span className="hidden xs:inline">Agendar consulta</span>
              <span className="xs:hidden">Agendar</span>
            </button>

            {/* Quiet admin login button (visible on sm+) */}
            <button
              onClick={onOpenAdmin}
              className="hidden sm:inline-flex p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors min-h-[40px] min-w-[40px] items-center justify-center cursor-pointer"
              title="Área Administrativa da Clínica"
              aria-label="Acessar painel administrativo"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-18 sm:top-20 bg-slate-900/40 backdrop-blur-xs z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-40 lg:hidden border-t border-slate-100 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className="flex items-center min-h-[44px] px-3 py-2.5 text-base font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50/50 rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => handleLinkClick('#agendamento')}
                  className="w-full flex items-center justify-center gap-2 min-h-[46px] py-3 px-4 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-sky-200" />
                  Agendar consulta online
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full flex items-center justify-center gap-2 min-h-[42px] py-2.5 px-4 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Acesso Restrito / Painel Administrativo
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
