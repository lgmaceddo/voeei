
import React from 'react';
import { Clock, HelpCircle, Play, Plane, BookOpen, BrainCircuit, ArrowRight } from 'lucide-react';
import { ExamCategory } from '../../types';

interface ExamCategoryCardProps {
    category: ExamCategory;
    onClick: () => void;
}

export const ExamCategoryCard: React.FC<ExamCategoryCardProps> = ({ category, onClick }) => {
    const getCategoryIcon = (categoryId: string) => {
        if (categoryId.startsWith('PORT')) return BookOpen;
        if (categoryId.startsWith('SHL')) return BrainCircuit;
        return Plane;
    };

    const Icon = getCategoryIcon(category.id);

    return (
        <div
            onClick={onClick}
            className={`
                group relative flex flex-col h-full overflow-hidden
                rounded-[3rem] p-8 cursor-pointer transition-all duration-700
                bg-[#1E293B]/40 backdrop-blur-md border border-white/5
                hover:border-cyan-500/30 hover:shadow-[0_20px_50px_rgba(6,182,212,0.1)] hover:scale-[1.02]
            `}
        >
            {/* Thematic Watermark - HUD Style */}
            <div className="absolute -top-12 -right-12 opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-[2000ms] transform group-hover:scale-150 group-hover:-rotate-12">
                <Icon className="w-64 h-64 text-cyan-500" />
            </div>

            <div className="flex flex-col h-full relative z-10">
                {/* Header with Elite Badges */}
                <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-cyan-500/20 text-cyan-400">
                        <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col items-end gap-2 text-right">
                        <span className="bg-[#0F172C]/80 backdrop-blur-md text-cyan-400 text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-[0.1em] border border-cyan-500/20 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                            {category.durationMinutes} MIN
                        </span>
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest px-1">REF: {category.id}</span>
                    </div>
                </div>

                {/* Content - Robust Typography */}
                <div className="flex-1">
                    <h3 className="text-xl font-black text-white mb-2 tracking-tighter uppercase leading-tight elite-heading group-hover:text-cyan-400 transition-colors">
                        {category.title}
                    </h3>
                    <p className="text-slate-400 font-bold text-xs leading-relaxed tracking-wide italic mb-8">
                        {category.description}
                    </p>
                </div>

                {/* Footer - Tech Info & CTA */}
                <div className="mt-auto pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-[9px] text-slate-500 font-black uppercase tracking-widest">
                            <BrainCircuit className="w-3.5 h-3.5 text-cyan-600" />
                            <span>{category.questionCount} UNIDADES TÉCNICAS</span>
                        </div>
                    </div>

                    <button
                        className="w-full py-4 rounded-[1.25rem] font-black text-white text-[9px] uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 bg-[#0F172C] border border-white/10 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:border-transparent group-hover:shadow-[0_15px_40px_rgba(6,182,212,0.3)] group-hover:scale-[1.02]"
                    >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        INICIAR PROTOCOLO
                    </button>
                </div>
            </div>

            {/* Elite Corner Accent */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    );
};
