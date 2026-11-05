import React from 'react';
import { Doctor } from '../types';
import { Calendar, Award, GraduationCap, CheckCircle2 } from 'lucide-react';

interface DoctorsProps {
  doctors: Doctor[];
  onSelectDoctorForBooking: (doctorId: string) => void;
  onOpenAdmin?: () => void;
}

export const Doctors: React.FC<DoctorsProps> = ({
  doctors,
  onSelectDoctorForBooking,
}) => {
  return (
    <section id="profissionais" className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-100 scroll-mt-10 relative">
      {/* Anchor alias for existing links */}
      <span id="medicos" className="absolute -top-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-800 uppercase tracking-widest mb-3">
              <span>Corpo Clínico Especializado</span>
              <span aria-hidden="true" className="text-blue-300">·</span>
              <span>Saúde e Desenvolvimento Visual</span>
            </div>
            <h2 className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Conheça nossos profissionais
            </h2>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Atendimento especializado, com foco na saúde ocular, avaliação completa e acompanhamento
              personalizado para crianças, jovens e adultos no Instituto de Olhos Cafelândia.
            </p>
          </div>

          {/* Transparent Notice */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3 text-xs w-full md:w-auto md:max-w-md shrink-0">
            <div className="min-w-0">
              <p className="font-semibold text-slate-800 truncate">Atendimento Especializado</p>
              <p className="text-slate-500 text-[11px] leading-tight">
                Cuidado dedicado e tecnologia diagnóstica em Cafelândia - PR.
              </p>
            </div>
          </div>
        </div>

        {/* 2 Individual Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {doctors.map((doctor) => {
            const isMaryanne = doctor.id === 'doc-maryanne' || doctor.name.includes('Maryanne');
            const isHerculino = doctor.id === 'doc-herculino' || doctor.name.includes('Herculino');

            return (
              <div
                key={doctor.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col"
              >
                {/* Profile Header Banner with Photo & Core Identity */}
                <div className="p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-center border-b border-slate-100 bg-gradient-to-r from-blue-50/40 via-sky-50/20 to-white">
                  <div className="relative shrink-0 mx-auto sm:mx-0">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden ring-4 ring-white shadow-md bg-slate-100">
                      <img
                        src={doctor.photoUrl}
                        alt={`Fotografia profissional de ${doctor.name}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold mb-1.5">
                      {isMaryanne && (
                        <>
                          <span className="bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                            Neuro-optometria
                          </span>
                          <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                            Optometria Pediátrica
                          </span>
                        </>
                      )}
                      {isHerculino && (
                        <>
                          <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                            Oftalmologia
                          </span>
                          <span className="bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                            Cirurgia de Catarata & Retina
                          </span>
                        </>
                      )}
                      {!isMaryanne && !isHerculino && (
                        <span className="text-blue-700 font-semibold">{doctor.title}</span>
                      )}
                    </div>

                    <h3 className="font-display text-lg sm:text-2xl font-bold text-slate-900 tracking-tight break-words">
                      {doctor.name}
                    </h3>

                    <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1 break-words">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>

                {/* Profile Details Body */}
                <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 flex-1 flex flex-col justify-between">
                  
                  <div className="space-y-4 sm:space-y-5">
                    {/* Apresentação */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Apresentação
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 italic">
                        "{doctor.bio}"
                      </p>
                    </div>

                    {/* Áreas de Atuação */}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                        <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Áreas de Atuação</span>
                      </div>
                      <div className="space-y-2">
                        {doctor.areasOfExpertise.map((area, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action: Schedule directly with this professional */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <span className="text-xs text-slate-500 text-center sm:text-left">
                      Atendimento no Instituto de Olhos Cafelândia
                    </span>
                    <button
                      onClick={() => onSelectDoctorForBooking(doctor.id)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs hover:shadow transition-all cursor-pointer min-h-[42px] w-full sm:w-auto"
                    >
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>Agendar atendimento</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
