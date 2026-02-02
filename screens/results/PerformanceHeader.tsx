
import React from 'react';
import { Trophy, AlertCircle, Clock } from 'lucide-react';
import { ExamCategory } from '../../types';

interface PerformanceHeaderProps {
    category: ExamCategory;
    percentage: number;
    isPassing: boolean;
    timeTakenSeconds: number;
    correctCount: number;
    incorrectCount: number;
}

export const PerformanceHeader: React.FC<PerformanceHeaderProps> = ({
    category,
    percentage,
    isPassing,
    timeTakenSeconds,
    correctCount,
    incorrectCount
}) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    const getProgressStyles = (p: number) => {
        if (p >= 90) return { gradient: 'from-primary-400 via-primary-500 to-primary-600', shadow: 'shadow-primary-200', text: 'text-primary-600' };
        if (p >= 70) return { gradient: 'from-emerald-400 via-green-500 to-teal-600', shadow: 'shadow-emerald-200', text: 'text-emerald-600' };
        if (p >= 50) return { gradient: 'from-amber-300 via-orange-400 to-orange-500', shadow: 'shadow-amber-200', text: 'text-amber-600' };
        return { gradient: 'from-rose-400 via-red-500 to-red-600', shadow: 'shadow-rose-200', text: 'text-rose-600' };
    };

    const style = getProgressStyles(percentage);

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative mb-6">
            <div className="p-8 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left: Status */}
                    <div className="flex-1 flex items-center gap-6 w-full">
                        <div className={`p-5 rounded-[2rem] shrink-0 shadow-lg ${isPassing ? 'bg-emerald-50 text-emerald-600 shadow-emerald-100' : 'bg-rose-50 text-rose-600 shadow-rose-100'}`}>
                            {isPassing ? <Trophy className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 block">Candidato Comissário</span>
                            <h1 className={`text-4xl font-black uppercase tracking-tighter leading-none ${isPassing ? 'text-emerald-700' : 'text-rose-700'}`}>
                                {isPassing ? 'Aprovado' : 'Reprovado'}
                            </h1>
                            <p className="text-slate-500 font-bold mt-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-slate-300" />
                                {category.title}
                            </p>
                        </div>
                    </div>

                    {/* Right: Detailed Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner">
                        <StatItem label="Nota" value={`${percentage}%`} color={style.text} />
                        <StatItem label="Tempo" value={formatTime(timeTakenSeconds)} icon={<Clock className="w-4 h-4 text-slate-300" />} />
                        <StatItem label="Acertos" value={correctCount.toString()} color="text-emerald-600" />
                        <StatItem label="Erros" value={incorrectCount.toString()} color="text-rose-500" />
                    </div>
                </div>

                {/* Progress Visualizer */}
                <div className="relative pt-4">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
                        <span>Línha de Base: 0%</span>
                        <span className="text-emerald-600 flex items-center gap-1">
                            <Trophy className="w-3 h-3" /> Meta ANAC: 70%
                        </span>
                        <span>Altitude Max: 100%</span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-6 overflow-hidden relative shadow-inner group">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #64748b, #64748b 1px, transparent 1px, transparent 10px)' }}></div>

                        {/* 70% Target Marker */}
                        <div className="absolute top-0 bottom-0 w-1 bg-white/50 z-10" style={{ left: '70%' }}></div>

                        <div
                            className={`h-full rounded-full bg-gradient-to-r ${style.gradient} shadow-lg relative transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
                            style={{ width: `${percentage}%` }}
                        >
                            <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatItem = ({ label, value, color = "text-slate-700", icon }: any) => (
    <div className="text-center px-2 min-w-[70px]">
        {icon ? <div className="flex justify-center mb-1">{icon}</div> : <span className={`block text-2xl font-black tracking-tighter ${color}`}>{value}</span>}
        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mt-1">{label}</span>
        {icon && <span className={`block text-sm font-black tracking-tight text-slate-700 mt-1`}>{value}</span>}
    </div>
);
