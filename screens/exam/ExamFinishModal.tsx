
import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface ExamFinishModalProps {
    answeredCount: number;
    totalQuestions: number;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ExamFinishModal: React.FC<ExamFinishModalProps> = ({
    answeredCount,
    totalQuestions,
    onConfirm,
    onCancel
}) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onCancel} />

            <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-10 w-full max-w-md relative z-10 animate-in zoom-in-95 fade-in duration-300">
                <div className="flex flex-col items-center text-center">
                    <div className="bg-amber-100 p-6 rounded-[2rem] mb-8 relative">
                        <div className="absolute inset-0 bg-amber-500/20 rounded-[2rem] animate-ping opacity-20" />
                        <AlertTriangle className="w-10 h-10 text-amber-600 relative z-10" />
                    </div>

                    <h3 className="text-2xl font-black text-navy-900 mb-4 tracking-tight">Finalizar Simulado?</h3>

                    <p className="text-slate-500 mb-8 font-medium leading-relaxed">
                        Você concluiu <strong className="text-navy-900">{answeredCount}</strong> de <strong className="text-navy-900">{totalQuestions}</strong> questões até o momento. Tem certeza que deseja encerrar agora?
                    </p>

                    <div className="flex flex-col w-full gap-3">
                        <Button
                            variant="primary"
                            onClick={onConfirm}
                            className="w-full py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-100"
                        >
                            Sim, Finalizar Prova
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={onCancel}
                            className="w-full py-4 text-slate-400 hover:text-slate-600 font-bold uppercase tracking-widest text-[10px]"
                        >
                            Continuar Respondendo
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
