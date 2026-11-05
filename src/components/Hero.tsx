import React from 'react';
import { Calendar, ShieldCheck, HeartHandshake, Eye, Sparkles } from 'lucide-react';
import { ClinicSettings } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroProps {
  settings: ClinicSettings;
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ settings, onBookClick }) => {
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Acessei o site do Instituto de Olhos Cafelândia e gostaria de obter mais informações sobre os atendimentos.'
  )}`;

  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white pt-6 sm:pt-16 pb-12 sm:pb-16 lg:pb-24">
      {/* Subtle architectural background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-72 sm:w-96 h-72 sm:h-96 bg-blue-100/50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-60 sm:w-80 h-60 sm:h-80 bg-sky-100/40 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Anchor: Clean unboxed metadata with typographic separators */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-[11px] sm:text-xs font-semibold text-blue-800 uppercase tracking-wider sm:tracking-widest mb-3 sm:mb-4">
          <span>Clínica Oftalmológica</span>
          <span aria-hidden="true" className="text-blue-300">·</span>
          <span>Cafelândia — PR</span>
          <span aria-hidden="true" className="text-blue-300">·</span>
          <span className="text-slate-600 font-medium">Adultos e Crianças</span>
        </div>

        {/* 2-Column Split: Hero Headline & Value proposition + Photographic Focal Carrier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography and CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2] text-balance break-words">
              Enxergar bem é{' '}
              <span className="text-blue-700 underline decoration-blue-200 underline-offset-4 sm:underline-offset-8">
                viver melhor.
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
              No Instituto de Olhos Cafelândia, cuidamos da sua saúde visual com atenção,
              profissionalismo e atendimento humanizado.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4">
              <button
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer min-h-[46px] w-full xs:w-auto"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-sky-200 shrink-0" />
                <span>Agendar consulta</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-200 rounded-xl transition-all duration-200 min-h-[46px] w-full xs:w-auto"
              >
                <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                <span>Falar pelo WhatsApp</span>
              </a>
            </div>

            {/* Quick Humanized Reassurance Note */}
            <div className="pt-2 sm:pt-4 flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-y-2 gap-x-6 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Corpo clínico qualificado</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Ambiente acolhedor para a família</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Equipamentos diagnósticos modernos</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Photographic Anchor */}
          <div className="lg:col-span-5">
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-1.5 sm:-inset-2 bg-gradient-to-tr from-blue-600/20 to-sky-400/20 rounded-2xl blur-lg opacity-70" />

              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xl bg-slate-100 aspect-16/10 sm:aspect-16/11 lg:aspect-4/3 w-full">
                <img
                  src="/images/hero_ophthalmology_clinic_1793846213304.jpg"
                  alt="Atendimento no Instituto de Olhos Cafelândia"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />

                {/* Subtle scrim overlay with trust badge */}
                <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent text-white">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-sky-200 mb-0.5 sm:mb-1">
                    <Eye className="w-3.5 h-3.5 shrink-0" />
                    <span>Cuidado Integral da Visão</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                    Atendimento humanizado no centro de Cafelândia
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width 4-Column Feature Strip */}
        <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
          <div className="space-y-1 p-2 sm:p-0">
            <p className="font-display text-sm sm:text-base font-bold text-slate-900">Atendimento Humanizado</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Respeito, empatia e paciência para você e seus familiares em todas as etapas.
            </p>
          </div>
          <div className="space-y-1 p-2 sm:p-0">
            <p className="font-display text-sm sm:text-base font-bold text-slate-900">Adultos e Crianças</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Oftalmopediatria dedicada e acompanhamento preventivo da infância à maturidade.
            </p>
          </div>
          <div className="space-y-1 p-2 sm:p-0">
            <p className="font-display text-sm sm:text-base font-bold text-slate-900">Tecnologia Diagnóstica</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Equipamentos precisos para tonometria, mapeamento de retina e refração ocular.
            </p>
          </div>
          <div className="space-y-1 p-2 sm:p-0">
            <p className="font-display text-sm sm:text-base font-bold text-slate-900">Fácil Acesso</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Rua Senador Nereu Ramos, 340, Centro de Cafelândia, com agendamento online.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
