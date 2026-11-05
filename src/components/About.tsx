import React from 'react';
import { Eye, ShieldCheck, Heart, Stethoscope, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-12 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-800 uppercase tracking-widest mb-3">
            <span>Sobre o Instituto</span>
            <span aria-hidden="true" className="text-blue-300">·</span>
            <span>Tradição e Cuidado</span>
          </div>
          <h2 className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Cuidado humanizado e compromisso com a saúde dos seus olhos
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal">
            "Um espaço dedicado ao cuidado da sua visão e ao bem-estar de toda a família.
            Nosso objetivo é oferecer atendimento oftalmológico com atenção, responsabilidade
            e cuidado em cada etapa."
          </p>
        </div>

        {/* 2-Column Presentation: Story & Clinical Pillars + Visual Clinic Environments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Story & Commitments */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              O <strong className="text-slate-900 font-semibold">Instituto de Olhos de Cafelândia</strong> nasceu 
              com a missão de oferecer à população de Cafelândia e municípios vizinhos uma clínica oftalmológica 
              de referência, combinando tecnologia diagnóstica, consultórios modernos e profissionais comprometidos 
              com o bem-estar visual de cada paciente.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Entendemos que a visão é um dos sentidos mais preciosos da vida humana. Por isso, desde a primeira consulta
              preventiva na infância até o acompanhamento de adultos e idosos, priorizamos escuta atenta, explicações claras
              e condutas médicas embasadas nas melhores evidências científicas.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Atendimento Humanizado</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Tempo e paciência para ouvir suas queixas e sanar dúvidas.</p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Rigor Técnico e Ética</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Profissionais qualificados com registro em conselho médico.</p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Estrutura Completa</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Consultórios equipados para exames refrativos e clínicos.</p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Respeito e Transparência</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Orientações claras para o paciente e familiares em Cafelândia.</p>
                </div>
              </div>
            </div>

            {/* Checklist of clinical guarantees */}
            <div className="pt-2 space-y-2">
              <div className="flex items-start sm:items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                <span>Instalações com acessibilidade para idosos e pessoas com mobilidade reduzida</span>
              </div>
              <div className="flex items-start sm:items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                <span>Ambiente climatizado, silencioso e preparado para o acolhimento infantil</span>
              </div>
              <div className="flex items-start sm:items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                <span>Prontuário digital seguro com histórico completo de evolução e exames</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Clinic Showcase (Espaço reservado para fotografias reais) */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 aspect-16/10 w-full">
              <img
                src="/src/assets/images/ophthalmic_diagnostic_equipment_1793846214636.jpg"
                alt="Ambiente clínico e equipamentos de alta precisão do Instituto de Olhos de Cafelândia"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Dual mini-showcase cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <p className="text-[10px] sm:text-[11px] font-semibold uppercase text-blue-700 tracking-wider">Espaço da Clínica</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">Consultório Moderno</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Iluminação médica e aparelhos oftálmicos de ponta.</p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <p className="text-[10px] sm:text-[11px] font-semibold uppercase text-blue-700 tracking-wider">Localização</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">Centro de Cafelândia</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Fácil estacionamento e acesso na Rua Senador Nereu Ramos.</p>
              </div>
            </div>

            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2">
              <span>Espaço preparado para fotografias da clínica real</span>
              <span className="font-semibold text-blue-700">Cafelândia - PR</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
