
import React from 'react';
import { Clock, ArrowRight, ArrowLeft, LogOut, Check, X, Shield, Settings2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface ExamSidebarProps {
    timeLeft: number;
    showTimer: boolean;
    autoAdvance: boolean;
    showAnswerKey: boolean;
    showExplanation: boolean;
    currentQuestionIndex: number;
    totalQuestions: number;
    onToggleTimer: (v: boolean) => void;
    onToggleAutoAdvance: (v: boolean) => void;
    onToggleAnswerKey: (v: boolean) => void;
    onToggleExplanation: (v: boolean) => void;
    onNext: () => void;
    onPrev: () => void;
    onSaveAndExit: () => void;
    onFinish: () => void;
}

export const ExamSidebar: React.FC<ExamSidebarProps> = ({
    timeLeft,
    showTimer,
    autoAdvance,
    showAnswerKey,
    showExplanation,
    currentQuestionIndex,
    totalQuestions,
    onToggleTimer,
    onToggleAutoAdvance,
    onToggleAnswerKey,
    onToggleExplanation,
    onNext,
    onPrev,
    onSaveAndExit,
    onFinish
}) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-4 sticky top-6">
            {/* Timer Card */}
            {showTimer && (
                <div className="bg-navy-900 px-6 py-5 rounded-3xl shadow-xl shadow-navy-100 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
                        <Clock className="w-20 h-20" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 relative z-10">Tempo Restante</span>
                    <div className="text-3xl font-black text-white tracking-tighter relative z-10 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary-500" />
                        {formatTime(timeLeft)}
                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    onClick={onPrev}
                    disabled={currentQuestionIndex === 0}
                    className="flex-1 rounded-2xl py-6"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <Button
                    variant="primary"
                    onClick={onNext}
                    disabled={currentQuestionIndex === totalQuestions - 1}
                    className="flex-[2] rounded-2xl py-6"
                >
                    Próxima <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            </div>

            {/* Settings Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center gap-2 mb-2">
                    <Settings2 className="w-4 h-4 text-slate-400" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Configurações</span>
                </div>

                <ToggleRow
                    label="Próxima Automática"
                    checked={autoAdvance}
                    onChange={onToggleAutoAdvance}
                />
                <ToggleRow
                    label="Mostrar Gabarito"
                    checked={showAnswerKey}
                    onChange={onToggleAnswerKey}
                />
                <ToggleRow
                    label="Ver Explicação"
                    checked={showExplanation}
                    onChange={onToggleExplanation}
                />
                <ToggleRow
                    label="Cronômetro"
                    checked={showTimer}
                    onChange={onToggleTimer}
                />
            </div>

            {/* Actions Card */}
            <div className="bg-white p-2 rounded-[2rem] border border-slate-200 shadow-sm space-y-2">
                <Button
                    variant="ghost"
                    onClick={onSaveAndExit}
                    className="w-full rounded-2xl py-4 text-slate-500 hover:text-primary-600 hover:bg-primary-50"
                >
                    <LogOut className="w-4 h-4 mr-2" /> Salvar Prova
                </Button>

                <Button
                    variant="primary"
                    onClick={onFinish}
                    className="w-full rounded-2xl py-5 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100"
                >
                    <Check className="w-5 h-5 mr-2" /> Finalizar Agora
                </Button>
            </div>

            <div className="px-4 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                    Ref: Simulado ANAC v2026.1
                </p>
            </div>
        </div>
    );
};

const ToggleRow = ({ label, checked, onChange }: any) => (
    <label className="flex items-center justify-between cursor-pointer group select-none">
        <span className="text-slate-600 text-[13px] font-black tracking-tight group-hover:text-primary-600 transition-colors uppercase">{label}</span>
        <button
            onClick={() => onChange(!checked)}
            className={`
                w-10 h-5 rounded-full relative transition-all duration-300
                ${checked ? 'bg-primary-500' : 'bg-slate-200'}
            `}
        >
            <div className={`
                absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 shadow-sm
                ${checked ? 'right-1' : 'left-1'}
            `} />
        </button>
    </label>
);
