import React from 'react';
import { X, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { ClinicSettings } from '../types';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ClinicSettings;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, settings }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 xs:p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-left">
        
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-blue-700 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 pr-8">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Privacidade e Proteção de Dados (LGPD)</span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-4 pr-8 break-words">
          Política de Privacidade do {settings.name}
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            O <strong className="text-slate-800">{settings.name}</strong>, sediado em {settings.city} — {settings.state}, preza pela segurança, confidencialidade e privacidade de todos os seus pacientes, familiares e visitantes do site institucional.
          </p>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">1. Coleta Mínima de Dados Pessoais</h4>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD), coletamos exclusivamente as informações estritamente indispensáveis para o agendamento de consultas e exames: nome completo, telefone para confirmação, data de nascimento e queixa inicial voluntária.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">2. Finalidade do Tratamento</h4>
            <p>
              Os dados fornecidos têm finalidade única e restrita de:
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Organizar a escala e disponibilidade de atendimento dos profissionais da clínica;</li>
              <li>Enviar lembretes e instruções prévias necessárias para exames via WhatsApp ou ligação telefônica;</li>
              <li>Emitir protocolo de atendimento e garantir que não ocorram reservas duplicadas para o mesmo horário.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">3. Não Compartilhamento com Terceiros</h4>
            <p>
              O Instituto de Olhos Cafelândia não comercializa, não aluga e não compartilha dados de pacientes com empresas de marketing, publicidade ou quaisquer terceiros não autorizados.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">4. Direitos do Titular dos Dados</h4>
            <p>
              O paciente pode, a qualquer momento, solicitar a consulta, correção ou exclusão de seus registros de agendamento através da nossa recepção pelo WhatsApp <strong className="text-slate-800">{settings.whatsappDisplay}</strong> ou presencialmente em nossa sede na {settings.address}.
            </p>
          </div>

          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-2 text-xs text-blue-900">
            <Lock className="w-4 h-4 text-blue-700 shrink-0" />
            <span>Seus dados são protegidos com sigilo médico profissional e ética clínica.</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition-colors cursor-pointer min-h-[44px]"
          >
            Entendido e Concordo
          </button>
        </div>

      </div>
    </div>
  );
};
