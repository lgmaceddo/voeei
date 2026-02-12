
import React from 'react';
import { Check, X, Target, BarChart3 } from 'lucide-react';

interface ExamStatsBarProps {
    correctCount: number;
    incorrectCount: number;
    totalQuestions: number;
}

export const ExamStatsBar: React.FC<ExamStatsBarProps> = ({ correctCount, incorrectCount, totalQuestions }) => {
    const answeredCount = correctCount + incorrectCount;
    const progress = (answeredCount / totalQuestions) * 100;

    return (
        <div className="space-y-8 mb-10">
            <div className="space-y-6 mb-8">
                {/* Elite Telemetry HUD - Progress Track */}
                <div className="relative pt-4 overflow-visible">
                    <div className="absolute -top-1 left-0 w-full flex justify-between px-1 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                        <span>PROGRESSO</span>
                        <span className="text-cyan-600 font-bold">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden p-[1px]">
                        <div
                            className="h-full bg-cyan-500 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full relative"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-5">
                    <div className="bg-white p-5 rounded-[2rem] border border-slate-200 flex items-center gap-4 group transition-all duration-500 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                            <Check className="w-5 h-5" strokeWidth={3} />
                        </div>
                        <div>
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Acertos</div>
                            <div className="text-2xl font-black text-slate-800 elite-heading leading-none tracking-tighter">{correctCount}</div>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-[2rem] border border-slate-200 flex items-center gap-4 group transition-all duration-500 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 group-hover:bg-rose-500 group-hover:text-white transition-all">
                            <X className="w-5 h-5" strokeWidth={3} />
                        </div>
                        <div>
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Erros</div>
                            <div className="text-2xl font-black text-slate-800 elite-heading leading-none tracking-tighter">{incorrectCount}</div>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-[2rem] border border-slate-200 flex items-center gap-4 group transition-all duration-500 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Faltam</div>
                            <div className="text-2xl font-black text-slate-800 elite-heading leading-none tracking-tighter">{totalQuestions - answeredCount}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
