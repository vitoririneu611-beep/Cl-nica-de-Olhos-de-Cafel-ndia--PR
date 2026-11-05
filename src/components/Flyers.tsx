import React from 'react';
import { Calendar, ArrowRight, Eye, Sparkles } from 'lucide-react';

interface FlyersProps {
  onBookClick: () => void;
  onNavigateToServices: () => void;
  onNavigateToDoctors: () => void;
}

export const Flyers: React.FC<FlyersProps> = ({
  onBookClick,
  onNavigateToServices,
  onNavigateToDoctors,
}) => {
  return (
    <section id="flyers" className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-800 uppercase tracking-widest mb-3">
            <span>Destaques Institucionais</span>
            <span aria-hidden="true" className="text-blue-300">·</span>
            <span>Campanhas de Saúde Ocular</span>
          </div>
          <h2 className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Informação, prevenção e cuidado contínuo
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Peças informativas para conscientização sobre a saúde dos seus olhos e a facilidade do atendimento 
            no Instituto de Olhos de Cafelândia.
          </p>
        </div>

        {/* The 4 Distinctive Institutional Flyers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-8">
          
          {/* FLYER 1 — CUIDE DA SUA VISÃO */}
          <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col sm:flex-row">
            <div className="sm:w-5/12 relative aspect-16/10 sm:aspect-auto shrink-0 bg-slate-100 overflow-hidden">
              <img
                src="/src/assets/images/hero_ophthalmology_clinic_1793846213304.jpg"
                alt="Profissional oftalmológico realizando atendimento visual"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-blue-900/90 text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">
                Prevenção
              </div>
            </div>

            <div className="p-4 xs:p-5 sm:p-7 sm:w-7/12 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                  Check-up Oftalmológico
                </p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug break-words">
                  Sua visão merece atenção.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Cuide da saúde dos seus olhos com acompanhamento oftalmológico preventivo e periódico.
                </p>
              </div>

              <div className="pt-4 sm:pt-6 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Cafelândia — PR</span>
                <button
                  onClick={onBookClick}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer min-h-[36px]"
                >
                  <span>Agendar check-up</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* FLYER 2 — ATENDIMENTO INFANTIL */}
          <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col sm:flex-row">
            <div className="sm:w-5/12 relative aspect-16/10 sm:aspect-auto shrink-0 bg-slate-100 overflow-hidden">
              <img
                src="/src/assets/images/pediatric_eye_care_1793846215247.jpg"
                alt="Atendimento oftalmológico infantil em ambiente acolhedor"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-sky-800/90 text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">
                Oftalmopediatria
              </div>
            </div>

            <div className="p-4 xs:p-5 sm:p-7 sm:w-7/12 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
                  Saúde Visual Infantil
                </p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug break-words">
                  Cuidar da visão desde cedo faz a diferença.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  A saúde visual das crianças também merece atenção especial, com diagnóstico lúdico e acolhedor.
                </p>
              </div>

              <div className="pt-4 sm:pt-6 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Bebês e Crianças</span>
                <button
                  onClick={onNavigateToDoctors}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer min-h-[36px]"
                >
                  <span>Conhecer médicos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* FLYER 3 — EXAMES OFTALMOLÓGICOS */}
          <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col sm:flex-row">
            <div className="sm:w-5/12 relative aspect-16/10 sm:aspect-auto shrink-0 bg-slate-100 overflow-hidden">
              <img
                src="/src/assets/images/ophthalmic_diagnostic_equipment_1793846214636.jpg"
                alt="Equipamento moderno de exame oftalmológico"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-indigo-900/90 text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">
                Diagnósticos
              </div>
            </div>

            <div className="p-4 xs:p-5 sm:p-7 sm:w-7/12 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">
                  Precisão Tecnológica
                </p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug break-words">
                  Conheça nossos serviços e exames.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Encontre atendimento e avaliações para cuidar melhor da sua visão com tecnologia avançada.
                </p>
              </div>

              <div className="pt-4 sm:pt-6 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Refração & Retina</span>
                <button
                  onClick={onNavigateToServices}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer min-h-[36px]"
                >
                  <span>Ver todos os exames</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* FLYER 4 — AGENDAMENTO ONLINE */}
          <div className="group bg-gradient-to-br from-blue-700 to-indigo-950 text-white rounded-2xl border border-blue-900/40 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col sm:flex-row">
            {/* Visual calendar graphic on left */}
            <div className="sm:w-5/12 p-4 xs:p-5 sm:p-7 bg-blue-800/40 flex flex-col items-center justify-center text-center border-b sm:border-b-0 sm:border-r border-white/10 shrink-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/10 flex items-center justify-center text-sky-300 mb-2 sm:mb-3 border border-white/15">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-sky-200">
                Disponibilidade Real
              </p>
              <div className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold font-display text-white">
                24h / 7 dias
              </div>
              <p className="text-[10px] sm:text-[11px] text-sky-100/80 mt-1">
                Agendamento prático pelo celular ou computador
              </p>
            </div>

            <div className="p-4 xs:p-5 sm:p-7 sm:w-7/12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-sky-200 mb-1">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Comodidade para o Paciente</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight leading-snug break-words">
                  Agende seu atendimento sem sair de casa.
                </h3>
                <p className="text-xs sm:text-sm text-sky-100/90 mt-2 leading-relaxed">
                  Escolha uma data e consulte os horários disponíveis em tempo real com confirmação imediata.
                </p>
              </div>

              <div className="pt-4 sm:pt-6 mt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-sky-200/80">Sem filas</span>
                <button
                  onClick={onBookClick}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer min-h-[36px]"
                >
                  <span>Agendar agora</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-300" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
