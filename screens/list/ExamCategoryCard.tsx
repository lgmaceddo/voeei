
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
                rounded-[2.5rem] p-8 cursor-pointer transition-all duration-500
                bg-white border-2 border-slate-100
                hover:border-primary-500 hover:shadow-2xl hover:shadow-primary-100 hover:-translate-y-2
            `}
        >
            {/* Thematic Watermark */}
            <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 transform group-hover:scale-125 group-hover:rotate-12">
                <Icon className="w-56 h-56 text-navy-900" />
            </div>

            <div className="flex flex-col h-full relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all duration-500 shadow-inner">
                        <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className="bg-white/80 backdrop-blur-sm text-slate-400 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-[0.2em] border border-slate-100 shadow-sm flex items-center gap-2">
                            <Clock className="w-3 h-3 text-primary-500" />
                            {category.durationMinutes} min
                        </span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">ID: {category.id}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tighter uppercase leading-none group-hover:text-primary-600 transition-colors">
                        {category.title}
                    </h3>
                    <p className="text-slate-500 font-bold text-sm leading-relaxed">
                        {category.description}
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-slate-50">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3 text-xs text-slate-400 font-black uppercase tracking-widest">
                            <HelpCircle className="w-4 h-4 text-primary-400" />
                            <span>{category.questionCount} Questões</span>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-primary-200 group-hover:text-primary-500 transition-all">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>

                    <button
                        className="w-full py-5 rounded-[1.5rem] font-black text-white text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 bg-navy-900 group-hover:bg-primary-500 group-hover:shadow-xl group-hover:shadow-primary-200"
                    >
                        <Play className="w-4 h-4 fill-current" />
                        Acessar Simulados
                    </button>
                </div>
            </div>
        </div>
    );
};
