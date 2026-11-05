import React, { useState } from 'react';
import { ClinicService } from '../types';
import { Eye, Stethoscope, Baby, Clock, ArrowRight, X, Calendar, AlertCircle } from 'lucide-react';

interface ServicesProps {
  services: ClinicService[];
  onSelectServiceForBooking: (serviceId: string) => void;
  onOpenAdmin: () => void;
}

export const Services: React.FC<ServicesProps> = ({
  services,
  onSelectServiceForBooking,
  onOpenAdmin,
}) => {
  const [selectedService, setSelectedService] = useState<ClinicService | null>(null);

  const getCategoryIcon = (category: ClinicService['category']) => {
    switch (category) {
      case 'consulta':
        return <Stethoscope className="w-5 h-5 text-blue-600" />;
      case 'infantil':
        return <Baby className="w-5 h-5 text-sky-600" />;
      case 'exame':
        return <Eye className="w-5 h-5 text-indigo-600" />;
      default:
        return <Eye className="w-5 h-5 text-blue-600" />;
    }
  };

  const getCategoryLabel = (category: ClinicService['category']) => {
    switch (category) {
      case 'consulta':
        return 'Atendimento Clínico';
      case 'infantil':
        return 'Desenvolvimento Infantil';
      case 'exame':
        return 'Exame Diagnóstico';
      default:
        return 'Atendimento Especializado';
    }
  };

  return (
    <section id="servicos" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-800 uppercase tracking-widest mb-3">
              <span>Nossos Serviços</span>
              <span aria-hidden="true" className="text-blue-300">·</span>
              <span>Saúde Ocular Completa</span>
            </div>
            <h2 className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Cuidado completo para a sua visão
            </h2>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Apresentamos os principais atendimentos, exames e especialidades do Instituto de Olhos Cafelândia.
              Cada área conta com profissionais dedicados ao diagnóstico preciso e ao desenvolvimento visual.
            </p>
          </div>

          <div className="text-left md:text-right shrink-0">
            <button
              onClick={onOpenAdmin}
              className="text-xs font-medium text-slate-500 hover:text-blue-700 underline underline-offset-4 cursor-pointer"
            >
              Gerenciar serviços no painel administrativo
            </button>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between p-4 xs:p-5 sm:p-7 relative"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
                  <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-100/60 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shrink-0">
                    {getCategoryIcon(service.category)}
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    {getCategoryLabel(service.category)}
                  </span>
                </div>

                <h3 className="font-display text-base sm:text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors break-words">
                  {service.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed line-clamp-3">
                  {service.shortDescription}
                </p>

                {/* Duration and availability note */}
                <div className="mt-4 pt-3 sm:pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>~{service.durationMinutes} minutos</span>
                  </span>
                  <span>{service.priceNote}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 sm:mt-6 pt-2 flex items-center gap-2">
                <button
                  onClick={() => setSelectedService(service)}
                  className="flex-1 py-2.5 px-3 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors text-center cursor-pointer min-h-[40px]"
                >
                  Saiba mais
                </button>
                <button
                  onClick={() => onSelectServiceForBooking(service.id)}
                  className="flex-1 py-2.5 px-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition-colors text-center inline-flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
                >
                  <Calendar className="w-3.5 h-3.5 text-sky-200 shrink-0" />
                  <span>Agendar</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Validation / Disclaimer Note per user instructions */}
        <div className="mt-8 sm:mt-12 p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3 text-xs text-slate-600">
          <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p>
            <strong className="font-semibold text-slate-900">Nota de Validação Clínica:</strong> Todos os exames e procedimentos são realizados sob estrita indicação e avaliação do corpo clínico oftalmológico. A disponibilidade de datas específicas é atualizada dinamicamente em nosso agendamento online.
          </p>
        </div>

      </div>

      {/* Service Detail Modal ("Saiba Mais") */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 xs:p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-left">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2 pr-8">
              <span>{getCategoryLabel(selectedService.category)}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedService.durationMinutes} min de atendimento</span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-3 pr-6 break-words">
              {selectedService.name}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              {selectedService.fullDescription}
            </p>

            {selectedService.requiresSpecialPreparation && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-3.5 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900">
                <p className="font-semibold mb-1">Recomendação de Preparo:</p>
                <p>{selectedService.requiresSpecialPreparation}</p>
              </div>
            )}

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span>Condições de atendimento:</span>
              <span className="font-semibold text-slate-900">{selectedService.priceNote}</span>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl text-center min-h-[40px] cursor-pointer"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  const id = selectedService.id;
                  setSelectedService(null);
                  onSelectServiceForBooking(id);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm text-center min-h-[42px] cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-sky-200 shrink-0" />
                <span>Agendar este serviço</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
