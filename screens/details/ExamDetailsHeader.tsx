
import React from 'react';
import { ArrowLeft, LayoutGrid, Star } from 'lucide-react';
import { ExamCategory } from '../../types';

interface ExamDetailsHeaderProps {
    category: ExamCategory;
    viewMode: 'OVERVIEW' | 'FAVORITES';
    onSetViewMode: (mode: 'OVERVIEW' | 'FAVORITES') => void;
    onBack: () => void;
    favoritesCount: number;
}

export const ExamDetailsHeader: React.FC<ExamDetailsHeaderProps> = ({
    category,
    viewMode,
    onSetViewMode,
    onBack,
    favoritesCount
}) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex-1">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-400 hover:text-primary-600 transition-all text-xs font-black uppercase tracking-widest mb-4 group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Voltar para o Painel
                </button>
                <div className="flex items-center gap-4">
                    <div className={`w-3 h-10 rounded-full ${category.color} shadow-lg shadow-current/20`} />
                    <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase leading-none">
                        {category.title}
                    </h1>
                </div>
                <p className="text-slate-500 font-bold mt-3 max-w-xl leading-relaxed">
                    {category.description}
                </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex bg-white p-1.5 rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 h-fit">
                <button
                    onClick={() => onSetViewMode('OVERVIEW')}
                    className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2
                        ${viewMode === 'OVERVIEW' ? 'bg-navy-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}
                    `}
                >
                    <LayoutGrid className="w-4 h-4" /> Geral
                </button>
                <button
                    onClick={() => onSetViewMode('FAVORITES')}
                    className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2
                        ${viewMode === 'FAVORITES' ? 'bg-primary-500 text-white shadow-lg shadow-primary-200' : 'text-slate-400 hover:bg-slate-50'}
                    `}
                >
                    <Star className={`w-4 h-4 ${viewMode === 'FAVORITES' ? 'fill-white' : ''}`} />
                    Favoritas
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] ml-1 ${viewMode === 'FAVORITES' ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
                        {favoritesCount}
                    </span>
                </button>
            </div>
        </div>
    );
};
