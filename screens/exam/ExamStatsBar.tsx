
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
        <div className="space-y-4 mb-6">
            {/* Minimal Progress Bar */}
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                <div
                    className="h-full bg-primary-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 group hover:border-emerald-200 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <Check className="w-4 h-4" strokeWidth={3} />
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Acertos</div>
                        <div className="text-lg font-black text-emerald-600 leading-none">{correctCount}</div>
                    </div>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 group hover:border-rose-200 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 group-hover:bg-rose-500 group-hover:text-white transition-all">
                        <X className="w-4 h-4" strokeWidth={3} />
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Erros</div>
                        <div className="text-lg font-black text-rose-600 leading-none">{incorrectCount}</div>
                    </div>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 group hover:border-blue-200 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Restam</div>
                        <div className="text-lg font-black text-blue-600 leading-none">{totalQuestions - answeredCount}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
