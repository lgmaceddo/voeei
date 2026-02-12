
import React, { useState } from 'react';
import { BookOpen, Radio, ShieldCheck, Trophy, ChevronRight, Volume2, Globe, ArrowLeft } from 'lucide-react';

interface LanguageHubProps {
    onBack: () => void;
    onStartExam: (language: 'ENGLISH' | 'SPANISH', level: string) => void;
}

const LanguageHub: React.FC<LanguageHubProps> = ({ onBack, onStartExam }) => {
    const [selectedLang, setSelectedLang] = useState<'ENGLISH' | 'SPANISH' | null>(null);

    const languages = [
        {
            id: 'ENGLISH',
            title: 'ENGLISH CREW',
            subtitle: 'GLOBAL OPERATIONS STANDARD',
            flag: '🇺🇸',
            color: 'from-blue-500 to-cyan-600',
            levels: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']
        },
        {
            id: 'SPANISH',
            title: 'ESPAÑOL AÉREO',
            subtitle: 'LATAM & IBERIA FOCUS',
            flag: '🇪🇸',
            color: 'from-amber-500 to-rose-600',
            levels: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']
        }
    ];

    return (
        <div className="relative min-h-screen bg-[#0F172C] text-slate-100 p-6 md:p-10 flex flex-col gap-12 font-sans overflow-hidden">

            {/* Tactical Grid Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="hub-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#06B6D4" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#hub-grid)" />
                </svg>
            </div>

            {/* Header */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="flex items-center gap-4 mb-2">
                    <button
                        onClick={onBack}
                        className="p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-cyan-400" />
                    </button>
                    <div className="bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em]">
                        Operational Module
                    </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter elite-heading uppercase leading-none">
                    AVIATION LANGUAGE <span className="text-cyan-400">HUB</span>
                </h1>
                <p className="text-slate-500 max-w-2xl font-bold uppercase tracking-widest text-[11px] italic">
                    Prepare-se para o padrão internacional ICAO com simulações acústicas de cabine e cenários reais de voo.
                </p>
            </div>

            {/* Selection Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">
                {languages.map((lang) => (
                    <div
                        key={lang.id}
                        className={`bg-[#1E293B]/40 backdrop-blur-xl rounded-[3rem] p-10 border transition-all duration-700 relative overflow-hidden group
                            ${selectedLang === lang.id ? 'border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.1)]' : 'border-white/5 hover:border-white/10'}
                        `}
                    >
                        {/* Background Gradient Detail */}
                        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${lang.color} opacity-[0.02] group-hover:opacity-[0.05] transition-opacity blur-3xl`} />

                        <div className="flex items-center gap-6 mb-12">
                            <div className="text-4xl">{lang.flag}</div>
                            <div>
                                <h3 className="text-3xl font-black elite-heading tracking-tight">{lang.title}</h3>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{lang.subtitle}</p>
                            </div>
                            <div className="ml-auto flex flex-col items-end">
                                <Radio className={`w-6 h-6 ${selectedLang === lang.id ? 'text-cyan-400' : 'text-slate-700'}`} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {lang.levels.map((level) => (
                                <button
                                    key={level}
                                    onClick={() => onStartExam(lang.id as any, level)}
                                    className="w-full flex items-center justify-between p-6 bg-[#0F172C]/60 rounded-3xl border border-white/5 hover:border-cyan-500/30 hover:bg-[#0F172C] transition-all group/level"
                                >
                                    <span className="text-sm font-black tracking-widest uppercase text-slate-400 group-hover/level:text-white transition-colors">{level}</span>
                                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover/level:bg-cyan-500 group-hover/level:text-[#0F172C] transition-all">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Status Label (Cockpit Aesthetic) */}
                        <div className="mt-10 flex items-center gap-4 text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] border-t border-white/5 pt-8">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                <span>STATUS: READY</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                <span>SIMULATION: ACTIVE</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Why Hub? Footer Section */}
            <div className="relative z-10 max-w-6xl mx-auto w-full">
                <div className="bg-[#1E293B]/20 backdrop-blur-md rounded-[3rem] p-10 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="md:max-w-xl">
                        <h4 className="text-sm font-black elite-heading uppercase tracking-widest text-white mb-4">POR QUE O HUB DE IDIOMAS?</h4>
                        <p className="text-xs font-bold text-slate-500 italic leading-relaxed">
                            Diferente de aplicativos comuns, o Cabine 360° utiliza cenários que caem em provas de recrutamento da <span className="text-white">Emirates, Qatar Airways e Etihad</span>, focando em termos técnicos e etiqueta de luxo.
                        </p>
                    </div>

                    <div className="flex gap-12">
                        <div className="text-center">
                            <div className="text-4xl font-black elite-heading text-cyan-400 leading-none">94%</div>
                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-2">TAXA DE APROVAÇÃO</p>
                        </div>
                        <div className="w-px h-12 bg-white/5" />
                        <div className="text-center">
                            <div className="text-4xl font-black elite-heading text-slate-100 leading-none">15k+</div>
                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-2">QUESTÕES IA</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Glows */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />
        </div>
    );
};

export default LanguageHub;
