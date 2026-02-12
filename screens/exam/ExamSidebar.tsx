
import React from 'react';
import { Clock, ArrowRight, ArrowLeft, LogOut, Check, Settings2 } from 'lucide-react';

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

const ToggleRow = ({ label, checked, onChange }: any) => (
    <label className="flex items-center justify-between cursor-pointer group select-none relative">
        <span className={`text-[10px] font-black tracking-widest transition-all duration-300 uppercase ${checked ? 'text-slate-800' : 'text-slate-400'}`}>
            {label}
        </span>
        <button
            onClick={() => onChange(!checked)}
            className={`
                w-12 h-6 rounded-full relative transition-all duration-300 border
                ${checked ? 'bg-cyan-500 border-cyan-400' : 'bg-slate-100 border-slate-200'}
            `}
        >
            <div className={`
                absolute top-0.5 w-4.5 h-4.5 rounded-full transition-all duration-300 shadow-sm
                ${checked ? 'translate-x-[26px] bg-white' : 'translate-x-[4px] bg-white'}
            `} />
        </button>
    </label>
);

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
        <div className="space-y-6 sticky top-10">
            {/* Elite HUD Timer Module */}
            {showTimer && (
                <div className="bg-white px-8 py-10 rounded-[3rem] shadow-sm border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">TEMPO RESTANTE</span>
                    </div>

                    <div className="text-5xl font-black text-slate-800 elite-heading tracking-tighter relative z-10 flex items-center gap-4">
                        <div className="w-1.5 h-8 rounded-full bg-cyan-500 shadow-sm" />
                        <span className="tabular-nums">{formatTime(timeLeft)}</span>
                    </div>
                </div>
            )}

            {/* Tactical Navigation Interface */}
            <div className="flex gap-4">
                <button
                    onClick={onPrev}
                    disabled={currentQuestionIndex === 0}
                    className="flex-1 bg-white border border-slate-200 text-slate-400 rounded-2xl py-6 hover:bg-slate-50 hover:text-slate-600 transition-all active:scale-95 disabled:opacity-20 disabled:pointer-events-none shadow-sm"
                >
                    <ArrowLeft className="w-6 h-6 mx-auto" />
                </button>
                <button
                    onClick={onNext}
                    disabled={currentQuestionIndex === totalQuestions - 1}
                    className="flex-[2] bg-cyan-600 text-white rounded-2xl py-6 font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-cyan-700 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-20 disabled:pointer-events-none"
                >
                    PRÓXIMA QUESTÃO <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            {/* Cockpit Configuration Module */}
            <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm space-y-6 relative overflow-hidden group/config">
                <div className="flex items-center gap-3 mb-2">
                    <Settings2 className="w-4 h-4 text-cyan-600" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Opções de Estudo</span>
                </div>

                <div className="space-y-6">
                    <ToggleRow label="Salto Automático" checked={autoAdvance} onChange={onToggleAutoAdvance} />
                    <ToggleRow label="Respostas Imediatas" checked={showAnswerKey} onChange={onToggleAnswerKey} />
                    <ToggleRow label="Comentário Técnico" checked={showExplanation} onChange={onToggleExplanation} />
                    <ToggleRow label="Cronômetro Ativo" checked={showTimer} onChange={onToggleTimer} />
                </div>
            </div>

            {/* Critical Mission Actions */}
            <div className="bg-white p-4 rounded-[3rem] border border-slate-200 shadow-sm space-y-3">
                <button
                    onClick={onSaveAndExit}
                    className="w-full rounded-2xl py-5 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95 group"
                >
                    <LogOut className="w-4 h-4" /> Salvar Sessão
                </button>

                <button
                    onClick={onFinish}
                    className="w-full rounded-2xl py-6 bg-emerald-600 text-white font-black text-[11px] uppercase tracking-widest shadow-sm hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                    <Check className="w-5 h-5 border-2 border-white/30 rounded-full p-0.5" /> FINALIZAR SIMULADO
                </button>
            </div>

            {/* Telemetry Footer */}
            <div className="px-8 text-center opacity-40">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-relaxed">
                    Elite Sim Engine v4.2<br />
                    Ambiente de Foco Ativo
                </p>
            </div>
        </div>
    );
};
