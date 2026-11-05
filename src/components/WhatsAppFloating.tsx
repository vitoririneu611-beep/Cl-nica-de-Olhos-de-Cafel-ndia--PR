import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ClinicSettings } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface WhatsAppFloatingProps {
  settings: ClinicSettings;
}

export const WhatsAppFloating: React.FC<WhatsAppFloatingProps> = ({ settings }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = encodeURIComponent(
    'Olá! Gostaria de falar com a equipe do Instituto de Olhos de Cafelândia para tirar dúvidas e saber mais sobre consultas.'
  );

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end max-w-[calc(100vw-2rem)]">
      {/* Floating Tooltip Box */}
      {showTooltip && (
        <div className="mb-2.5 sm:mb-3 max-w-[260px] xs:max-w-xs bg-white rounded-2xl p-3 sm:p-3.5 shadow-xl border border-slate-200 text-xs text-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
            aria-label="Fechar mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1.5 font-semibold text-slate-900 pr-4">
            <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Precisa de ajuda?</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Tire suas dúvidas e fale com nossa equipe em Cafelândia.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800 text-[11px] min-h-[30px]"
          >
            <span>Iniciar conversa no WhatsApp</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      )}

      {/* Floating Action Circle Button with Official WhatsApp Symbol */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 ring-4 ring-emerald-500/20 group cursor-pointer"
        aria-label="Falar com a equipe pelo WhatsApp"
        title="Falar com o Instituto de Olhos de Cafelândia pelo WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
