
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
        const props = { className: `w-8 h-8 ${isUnlocked ? 'text-primary-500' : 'text-slate-300'}` };
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
            case 'STUDY': return 'Estudo';
            case 'PERFORMANCE': return 'Performance';
            case 'PRO': return 'Profissional';
            default: return category;
        }
    };

    const totalPossible = ACHIEVEMENTS_LIST.length;
    const totalEarned = earnedIds.length;
    const progressPercentage = Math.round((totalEarned / totalPossible) * 100);

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-fade-in font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-400 hover:text-primary-600 transition-all text-xs font-black uppercase tracking-widest mb-4 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Voltar ao Painel
                    </button>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase leading-none">
                        Suas Conquistas
                    </h1>
                    <p className="text-slate-500 font-bold mt-3">
                        Sua jornada para o cockpit é medida em medalhas e marcos superados.
                    </p>
                </div>

                {/* Progress Card */}
                <div className="bg-navy-900 rounded-3xl p-6 text-white flex items-center gap-6 shadow-xl shadow-navy-100 min-w-[300px]">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="32" cy="32" r="28" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                            <circle cx="32" cy="32" r="28" fill="transparent" stroke="#0ea5e9" strokeWidth="6" strokeDasharray={175.9} strokeDashoffset={175.9 - (175.9 * progressPercentage / 100)} strokeLinecap="round" />
                        </svg>
                        <span className="absolute text-sm font-black">{progressPercentage}%</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary-400 mb-1">Status de Carreira</p>
                        <h3 className="text-xl font-black uppercase">{totalEarned} / {totalPossible}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Conquistas Desbloqueadas</p>
                    </div>
                </div>
            </div>

            {/* Categories Tabs or Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ACHIEVEMENTS_LIST.map((achievement: Achievement) => {
                    const isUnlocked = earnedIds.includes(achievement.id);

                    return (
                        <div
                            key={achievement.id}
                            className={`
                relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 group
                ${isUnlocked
                                    ? 'bg-white border-primary-100 shadow-xl shadow-primary-50 hover:shadow-primary-100 hover:-translate-y-1'
                                    : 'bg-slate-50 border-slate-100 grayscale hover:grayscale-0'}
              `}
                        >
                            {isUnlocked && (
                                <div className="absolute top-6 right-6">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-50" />
                                </div>
                            )}

                            <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-all duration-500
                ${isUnlocked ? 'bg-primary-50 scale-110' : 'bg-slate-200'}
              `}>
                                {getIcon(achievement.icon, isUnlocked)}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${isUnlocked ? 'text-primary-600' : 'text-slate-400'}`}>
                                        {getCategoryLabel(achievement.category)}
                                    </span>
                                    {!isUnlocked && <Lock className="w-3 h-3 text-slate-400" />}
                                </div>
                                <h3 className={`text-xl font-black uppercase tracking-tighter ${isUnlocked ? 'text-slate-800' : 'text-slate-400'}`}>
                                    {achievement.title}
                                </h3>
                                <p className={`text-sm font-bold leading-relaxed ${isUnlocked ? 'text-slate-500' : 'text-slate-300'}`}>
                                    {achievement.description}
                                </p>
                            </div>

                            {isUnlocked && (
                                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Conquistado em</span>
                                    <span className="text-xs font-black text-primary-600 bg-primary-50 px-2.5 py-1 rounded-lg">JAN 2026</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Future Unlocks / Motivation */}
            <div className="bg-gradient-to-br from-primary-600 to-indigo-700 rounded-[3rem] p-12 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                    <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center backdrop-blur-md">
                        <Star className="w-10 h-10 text-white fill-current animate-pulse" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Continue Voando Alto</h2>
                        <p className="text-primary-100 font-bold max-w-xl">
                            Cada simulado concluído aproxima você da sua próxima conquista e, mais importante, da sua aprovação na ANAC.
                        </p>
                    </div>
                    <button
                        onClick={onBack}
                        className="bg-white text-primary-600 font-black px-8 py-4 rounded-2xl shadow-xl shadow-black/10 hover:shadow-black/20 transform transition-all active:scale-95 uppercase text-sm tracking-widest"
                    >
                        Fazer Simulado
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Achievements;
