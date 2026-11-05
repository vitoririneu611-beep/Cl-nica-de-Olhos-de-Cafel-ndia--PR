import React from 'react';
import { MapPin, Navigation, Clock, Phone, CheckCircle2 } from 'lucide-react';
import { ClinicSettings } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface LocationSectionProps {
  settings: ClinicSettings;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ settings }) => {
  const destinationAddress = encodeURIComponent(
    'Rua Senador Nereu Ramos, 340, Centro, Cafelândia - PR, Brasil'
  );

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationAddress}`;
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${destinationAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="localizacao" className="py-12 sm:py-20 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-blue-800 uppercase tracking-widest mb-2.5">
            <span>Localização e Acesso</span>
            <span aria-hidden="true" className="text-blue-300">·</span>
            <span>Centro de Cafelândia</span>
          </div>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight break-words">
            Onde estamos
          </h2>
          <p className="mt-2.5 text-xs xs:text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Localização privilegiada e de fácil acesso no centro de Cafelândia, Paraná, 
            com infraestrutura planejada para o seu conforto.
          </p>
        </div>

        {/* 2-Column Grid: Address & Info details + Responsive Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Address Information Card */}
          <div className="lg:col-span-5 bg-slate-50/80 rounded-2xl border border-slate-200/90 p-5 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5 sm:space-y-6">
              
              {/* Institution Identity */}
              <div>
                <span className="text-[11px] sm:text-xs font-semibold text-blue-700 uppercase tracking-wider">
                  Clínica Oftalmológica
                </span>
                <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mt-0.5">
                  Instituto de Olhos de Cafelândia
                </h3>
              </div>

              {/* Exact Address */}
              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="p-2 sm:p-2.5 rounded-xl bg-blue-100 text-blue-700 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                    Endereço Oficial
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">
                    {settings.street}, nº {settings.number}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Bairro {settings.neighborhood}
                  </p>
                  <p className="text-xs text-slate-600">
                    {settings.city} — Estado do {settings.state}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    CEP: {settings.cep}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="p-2 sm:p-2.5 rounded-xl bg-blue-100 text-blue-700 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                    Horário de Atendimento
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">
                    {settings.operatingDays}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {settings.operatingHours}
                  </p>
                </div>
              </div>

              {/* Clinic Facilities */}
              <div className="pt-2 space-y-2 border-t border-slate-200/80">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>Estacionamento facilitado nas proximidades</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>Acesso térreo com rampa de acessibilidade</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>Recepção climatizada e atendimento com hora marcada</span>
                </div>
              </div>

            </div>

            {/* Action Buttons: "Como Chegar" */}
            <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition-colors min-h-[44px]"
              >
                <Navigation className="w-4 h-4 shrink-0" />
                <span>Como chegar (Abrir GPS)</span>
              </a>

              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                  'Olá! Gostaria de orientações sobre como chegar ao Instituto de Olhos de Cafelândia.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors min-h-[44px]"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Embedded Responsive Google Map */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 min-h-[280px] xs:min-h-[340px] sm:min-h-[380px] lg:min-h-[460px] relative">
            <iframe
              title="Localização do Instituto de Olhos de Cafelândia no Google Maps"
              src={googleMapsEmbedUrl}
              className="w-full h-full min-h-[280px] xs:min-h-[340px] sm:min-h-[380px] lg:min-h-[460px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating indicator */}
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-slate-200/80 shadow-xs text-[10px] sm:text-[11px] text-slate-800 flex items-center gap-1.5 sm:gap-2 pointer-events-none max-w-[calc(100%-1.25rem)] truncate">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <span className="font-semibold truncate">Rua Senador Nereu Ramos, 340</span>
              <span className="text-slate-400 shrink-0">· Cafelândia - PR</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
