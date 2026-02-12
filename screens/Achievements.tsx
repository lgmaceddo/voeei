
import React from 'react';
import { Trophy, Plane, TrendingUp, Moon, ShieldCheck, BrainCircuit, Lock, CheckCircle2, Medal, Star } from 'lucide-react';
import { Achievement, User } from '../types';
import { ACHIEVEMENTS_LIST } from '../constants';
import { ArrowLeft } from 'lucide-react';

interface AchievementsProps {
    user: User;
    onBack: () => void;
}

const Achievements: React.FC<AchievementsProps> = ({ user, onBack }) => {
    const earnedIds = user.achievements || [];

    const getIcon = (iconName: string, isUnlocked: boolean) => {
        const props = { className: `w-8 h-8 ${isUnlocked ? 'text-cyan-400' : 'text-slate-600'}` };
        switch (iconName) {
            case 'Plane': return <Plane {...props} />;
            case 'Trophy': return <Trophy {...props} />;
            case 'TrendingUp': return <TrendingUp {...props} />;
            case 'Moon': return <Moon {...props} />;
            case 'ShieldCheck': return <ShieldCheck {...props} />;
            case 'BrainCircuit': return <BrainCircuit {...props} />;
            default: return <Medal {...props} />;
        }
    };

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'STUDY': return 'Protocolo de Estudo';
            case 'PERFORMANCE': return 'Alta Performance';
            case 'PRO': return 'Profissionalismo';
            default: return category;
        }
    };

    const totalPossible = ACHIEVEMENTS_LIST.length;
    const totalEarned = earnedIds.length;
    const progressPercentage = Math.round((totalEarned / totalPossible) * 100);

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-24 animate-fade-in relative z-10">
            {/* Header - Mission Milestones */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-l-4 border-cyan-500 pl-8">
                <div className="flex-1">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-all text-[11px] font-black uppercase tracking-[0.3em] mb-6 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
                        RETORNAR AO COMANDO
                    </button>
                    <h1 className="text-5xl font-black text-white elite-heading tracking-tighter uppercase leading-none mb-4">
                        REGISTRO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">MÉRITO</span>
                    </h1>
                    <p className="text-slate-400 font-bold max-w-xl italic tracking-wide">
                        Sua jornada para o cockpit é medida em medalhas técnicas e marcos operacionais superados.
                    </p>
                </div>

                {/* Tactical Progress Card */}
                <div className="bg-[#1E293B]/40 backdrop-blur-xl rounded-[2.5rem] p-8 text-white flex items-center gap-8 border border-white/5 shadow-2xl min-w-[340px] group hover:border-cyan-500/30 transition-all duration-700">
                    <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="40" cy="40" r="34" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                            <circle cx="40" cy="40" r="34" fill="transparent" stroke="#06b6d4" strokeWidth="6" strokeDasharray={213.6} strokeDashoffset={213.6 - (213.6 * progressPercentage / 100)} strokeLinecap="round" className="transition-all duration-[2000ms] ease-out" />
                        </svg>
                        <span className="absolute text-sm font-black elite-heading group-hover:text-cyan-400 transition-colors">{progressPercentage}%</span>
                        <div className="absolute inset-0 rounded-full border border-cyan-500/20 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-2">PROGRESSÃO DE CARREIRA</p>
                        <h3 className="text-2xl font-black uppercase elite-heading">{totalEarned} / {totalPossible}</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Insígnias Desbloqueadas</p>
                    </div>
                </div>
            </div>

            {/* Achievement Grid - Standardized Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ACHIEVEMENTS_LIST.map((achievement: Achievement) => {
                    const isUnlocked = earnedIds.includes(achievement.id);

                    return (
                        <div
                            key={achievement.id}
                            className={`
                                relative p-10 rounded-[3rem] border transition-all duration-700 group overflow-hidden flex flex-col h-full
                                ${isUnlocked
                                    ? 'bg-[#1E293B]/60 border-cyan-500/20 shadow-2xl hover:border-cyan-500/40 hover:scale-[1.02]'
                                    : 'bg-[#1E293B]/20 border-white/5 opacity-60 hover:opacity-100 grayscale hover:grayscale-0'}
                            `}
                        >
                            {/* Watermark Icon */}
                            <div className="absolute -top-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 transform group-hover:scale-125">
                                {getIcon(achievement.icon, isUnlocked)}
                            </div>

                            {isUnlocked && (
                                <div className="absolute top-8 right-8 animate-pulse">
                                    <CheckCircle2 className="w-6 h-6 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                                </div>
                            )}

                            <div className={`
                                w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-xl transition-all duration-700 border border-white/10
                                ${isUnlocked ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white' : 'bg-white/5 text-slate-600'}
                            `}>
                                {getIcon(achievement.icon, isUnlocked)}
                            </div>

                            <div className="space-y-4 flex-1">
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isUnlocked ? 'text-cyan-400' : 'text-slate-500'}`}>
                                        {getCategoryLabel(achievement.category)}
                                    </span>
                                    {!isUnlocked && <Lock className="w-3 h-3 text-slate-600" />}
                                </div>
                                <h3 className={`text-2xl font-black uppercase tracking-tight elite-heading ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                                    {achievement.title}
                                </h3>
                                <p className={`text-sm font-bold leading-relaxed italic tracking-wide ${isUnlocked ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {achievement.description}
                                </p>
                            </div>

                            {isUnlocked && (
                                <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">REGISTRADO EM</span>
                                    <span className="text-[10px] font-black text-cyan-400 bg-cyan-500/10 px-4 py-2 rounded-xl border border-cyan-500/20 uppercase tracking-widest">02 / 2026</span>
                                </div>
                            )}

                            {/* Elite Corner Accent */}
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    );
                })}
            </div>

            {/* Motivation Section - Hero Style Card */}
            <div className="bg-[#1E293B]/40 backdrop-blur-3xl rounded-[3rem] p-12 lg:p-16 border border-cyan-500/20 text-white relative overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
                {/* Tech Highlights */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-[2000ms]" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_50px_rgba(6,182,212,0.3)] group-hover:scale-110 transition-transform duration-700">
                        <Star className="w-12 h-12 text-white fill-current animate-pulse" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 elite-heading">Continue Voando Alto</h2>
                        <p className="text-slate-400 font-bold text-lg max-w-2xl italic">
                            Cada simulado concluído aproxima você da sua próxima insígnia e, mais importante, da sua aprovação na ANAC. Mantenha o foco operacional.
                        </p>
                    </div>
                    <button
                        onClick={onBack}
                        className="bg-white text-[#0F172C] font-black px-12 py-6 rounded-2xl shadow-[0_15px_40px_rgba(255,255,255,0.15)] hover:shadow-[0_20px_60px_rgba(6,182,212,0.4)] transform transition-all hover:scale-105 active:scale-95 uppercase text-xs tracking-[0.3em] min-w-[240px]"
                    >
                        INICIAR MISSÃO
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Achievements;
