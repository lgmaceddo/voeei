
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ExamCategory } from '../../types';

interface ExamHeaderProps {
    category: ExamCategory;
    onCancel: () => void;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({ category, onCancel }) => {
    return (
        <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={onCancel}
                    className="p-2 -ml-2 rounded-full text-slate-400 hover:text-primary-500 hover:bg-slate-100 transition-all active:scale-95"
                    title="Sair sem salvar"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    <h1 className="text-xl font-black text-slate-800 tracking-tight leading-tight">
                        {category.title}
                    </h1>
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                        Bloco {category.id}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status da Sessão</span>
                    <span className="text-xs font-bold text-primary-500 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></span>
                        Modo Simulado
                    </span>
                </div>
            </div>
        </div>
    );
};
