
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={onCancel} />

            <div className="bg-white rounded-[3rem] shadow-2xl p-12 w-full max-w-lg relative z-10 border border-slate-200 animate-zoom-in">
                <div className="flex flex-col items-center text-center">
                    {/* Warning Icon */}
                    <div className="bg-amber-50 p-8 rounded-[2.5rem] mb-10 border border-amber-100 relative group">
                        <AlertTriangle className="w-12 h-12 text-amber-500 relative z-10" />
                    </div>

                    <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tighter uppercase elite-heading">Finalizar Simulado?</h3>

                    <p className="text-slate-500 mb-10 font-bold leading-relaxed tracking-wide text-sm italic">
                        Você concluiu <strong className="text-cyan-600 font-black not-italic">{answeredCount}</strong> de <strong className="text-slate-800 font-black not-italic">{totalQuestions}</strong> questões. Deseja encerrar sua sessão agora?
                    </p>

                    <div className="flex flex-col w-full gap-4">
                        <Button
                            variant="primary"
                            onClick={onConfirm}
                            className="w-full py-6 rounded-2xl bg-cyan-600 hover:bg-cyan-700 shadow-md text-white font-black"
                        >
                            SIM, FINALIZAR
                        </Button>
                        <Button
                            variant="outline"
                            onClick={onCancel}
                            className="w-full py-5 rounded-2xl border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                        >
                            CONTINUAR ESTUDANDO
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
