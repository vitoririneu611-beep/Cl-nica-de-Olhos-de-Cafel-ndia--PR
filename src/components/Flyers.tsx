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
          
          {/* FLYER 1 — CUIDE DA SUA SAÚDE VISUAL */}
          <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col sm:flex-row">
            <div className="sm:w-5/12 relative aspect-16/10 sm:aspect-auto shrink-0 bg-slate-100 overflow-hidden">
              <img
                src="/images/hero_ophthalmology_clinic_1793846213304.jpg"
                alt="Profissional realizando atendimento ou exame de visão no Instituto de Olhos Cafelândia"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-blue-900/90 text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">
                Prevenção
              </div>
            </div>

            <div className="p-4 xs:p-5 sm:p-7 sm:w-7/12 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                  Saúde Ocular Contínua
                </p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug break-words">
                  Sua saúde visual merece atenção.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Encontre atendimento e acompanhamento visual no Instituto de Olhos Cafelândia.
                </p>
              </div>

              <div className="pt-4 sm:pt-6 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Cafelândia — PR</span>
                <button
                  onClick={onBookClick}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer min-h-[36px]"
                >
                  <span>Agendar consulta</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* FLYER 2 — DESENVOLVIMENTO VISUAL INFANTIL */}
          <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col sm:flex-row">
            <div className="sm:w-5/12 relative aspect-16/10 sm:aspect-auto shrink-0 bg-slate-100 overflow-hidden">
              <img
                src="/images/pediatric_eye_care_1793846215247.jpg"
                alt="Acompanhamento visual para crianças e adolescentes com Maryanne Eloize Bussolaro"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-sky-800/90 text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">
                Pediatria & Neuro
              </div>
            </div>

            <div className="p-4 xs:p-5 sm:p-7 sm:w-7/12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-100 mb-2">
                  <span>Maryanne Eloize Bussolaro</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug break-words">
                  O desenvolvimento visual começa desde cedo.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Acompanhamento visual para crianças e adolescentes. Neuro-optometria e optometria pediátrica com carinho e acolhimento.
                </p>
              </div>

              <div className="pt-4 sm:pt-6 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Crianças & Jovens</span>
                <button
                  onClick={onNavigateToDoctors}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer min-h-[36px]"
                >
                  <span>Conhecer profissional</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* FLYER 3 — CUIDADO ESPECIALIZADO / OFTALMOLOGIA */}
          <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col sm:flex-row">
            <div className="sm:w-5/12 relative aspect-16/10 sm:aspect-auto shrink-0 bg-slate-100 overflow-hidden">
              <img
                src="/images/ophthalmic_diagnostic_equipment_1793846214636.jpg"
                alt="Equipamento oftalmológico moderno e avaliação com Dr. Herculino Netto"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-indigo-900/90 text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">
                Oftalmologia
              </div>
            </div>

            <div className="p-4 xs:p-5 sm:p-7 sm:w-7/12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 mb-2">
                  <span>Dr. Herculino Netto</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug break-words">
                  Cuidado especializado para a saúde dos seus olhos.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Avaliação oftalmológica e acompanhamento de doenças oculares. Especialista em cirurgia de catarata e retina com alta tecnologia.
                </p>
              </div>

              <div className="pt-4 sm:pt-6 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Catarata & Retina</span>
                <button
                  onClick={onNavigateToServices}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer min-h-[36px]"
                >
                  <span>Ver serviços</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* FLYER 4 — ATENDIMENTO A UM CLIQUE */}
          <div className="group bg-gradient-to-br from-blue-700 to-indigo-950 text-white rounded-2xl border border-blue-900/40 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col sm:flex-row">
            {/* Visual calendar graphic on left */}
            <div className="sm:w-5/12 p-4 xs:p-5 sm:p-7 bg-blue-800/40 flex flex-col items-center justify-center text-center border-b sm:border-b-0 sm:border-r border-white/10 shrink-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/10 flex items-center justify-center text-sky-300 mb-2 sm:mb-3 border border-white/15">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-sky-200">
                Atendimento Rápido
              </p>
              <div className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold font-display text-white">
                Prático & Seguro
              </div>
              <p className="text-[10px] sm:text-[11px] text-sky-100/80 mt-1">
                Agende online ou converse diretamente no WhatsApp
              </p>
            </div>

            <div className="p-4 xs:p-5 sm:p-7 sm:w-7/12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-sky-200 mb-1">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Facilidade de Atendimento</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight leading-snug break-words">
                  Seu próximo atendimento está a um clique.
                </h3>
                <p className="text-xs sm:text-sm text-sky-100/90 mt-2 leading-relaxed">
                  Entre em contato com nossa equipe e solicite seu agendamento de forma rápida e descomplicada.
                </p>
              </div>

              <div className="pt-4 sm:pt-6 mt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-sky-200/80">Cafelândia</span>
                <button
                  onClick={onBookClick}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer min-h-[36px]"
                >
                  <span>Solicitar agendamento</span>
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
