
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
        if (p >= 90) return { gradient: 'from-cyan-500 to-blue-600', shadow: 'shadow-cyan-100', text: 'text-cyan-700', bg: 'bg-cyan-50' };
        if (p >= 70) return { gradient: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-100', text: 'text-emerald-700', bg: 'bg-emerald-50' };
        if (p >= 50) return { gradient: 'from-orange-500 to-amber-600', shadow: 'shadow-orange-100', text: 'text-orange-700', bg: 'bg-orange-50' };
        return { gradient: 'from-rose-500 to-red-600', shadow: 'shadow-rose-100', text: 'text-rose-700', bg: 'bg-rose-50' };
    };

    const style = getProgressStyles(percentage);

    return (
        <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden relative mb-10 shadow-sm group">
            <div className="p-10 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-12">
                    {/* Left: Mission Status */}
                    <div className="flex items-center gap-8 w-full lg:w-auto">
                        <div className={`p-6 rounded-[2.5rem] shrink-0 shadow-sm transition-all duration-700 group-hover:scale-110 border ${isPassing ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                            {isPassing ? <Trophy className="w-12 h-12" /> : <AlertCircle className="w-12 h-12" />}
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block italic">Portal de Resultados</span>
                            <h1 className={`text-6xl font-black uppercase tracking-tighter leading-none elite-heading ${isPassing ? 'text-slate-800' : 'text-slate-800'}`}>
                                {isPassing ? 'Missão: ' : 'Status: '}
                                <span className={isPassing ? 'text-emerald-600' : 'text-rose-600'}>
                                    {isPassing ? 'Sucesso' : 'Reprovado'}
                                </span>
                            </h1>
                            <div className="flex items-center gap-4 mt-4">
                                <span className="text-cyan-700 font-black text-[11px] uppercase tracking-widest bg-cyan-50 px-4 py-1.5 rounded-lg border border-cyan-100 shadow-sm">
                                    REF: {category.id}
                                </span>
                                <span className="text-slate-500 font-bold text-sm tracking-wide">{category.title}</span>
                            </div>
                        </div>
                    </div>

                    {/* Center/Right: Telemetry */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full lg:w-auto bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-inner relative overflow-hidden">
                        <StatItem label="Eficiência" value={`${percentage}%`} color={style.text} />
                        <StatItem label="Duração" value={formatTime(timeTakenSeconds)} icon={<Clock className="w-4 h-4 text-slate-400" />} />
                        <StatItem label="Acertos" value={correctCount.toString()} color="text-emerald-600" />
                        <StatItem label="Erros" value={incorrectCount.toString()} color="text-rose-600" />
                    </div>
                </div>

                {/* Progress Visualizer */}
                <div className="relative pt-6 border-t border-slate-100">
                    <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">
                        <span>Zero</span>
                        <span className="text-emerald-600 flex items-center gap-3 bg-emerald-50 px-6 py-2 rounded-full border border-emerald-100 shadow-sm">
                            <Trophy className="w-4 h-4" /> Meta: 70%
                        </span>
                        <span>Máximo</span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-[1.5rem] h-8 overflow-hidden relative shadow-inner border border-slate-200">
                        {/* 70% Target Marker */}
                        <div className="absolute top-0 bottom-0 w-0.5 bg-slate-300 z-20" style={{ left: '70%' }}>
                            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-slate-400 rounded-full" />
                        </div>

                        <div
                            className={`h-full rounded-r-[1rem] bg-gradient-to-r ${style.gradient} relative transition-all duration-[2000ms] ease-out flex items-center justify-end pr-4 overflow-hidden`}
                            style={{ width: `${percentage}%` }}
                        >
                            <div className="w-2.5 h-2.5 bg-white/40 rounded-full relative z-20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatItem = ({ label, value, color = "text-slate-400", icon, isElite }: any) => (
    <div className="text-center px-4 min-w-[100px] relative z-10 flex flex-col justify-center items-center">
        {icon ? (
            <div className="mb-2 opacity-50">{icon}</div>
        ) : (
            <span className={`block text-3xl font-black tracking-tighter elite-heading ${color} ${isElite ? 'drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]' : ''}`}>{value}</span>
        )}
        <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest block mt-2 opacity-80">{label}</span>
        {icon && <span className={`block text-base font-black tracking-tight text-slate-200 mt-2`}>{value}</span>}
    </div>
);
