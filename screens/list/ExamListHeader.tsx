
import React from 'react';
import { ChevronRight, Filter, Shield } from 'lucide-react';

interface ExamListHeaderProps {
    activeFilter: string;
    title: string;
}

export const ExamListHeader: React.FC<ExamListHeaderProps> = ({ activeFilter, title }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="flex-1">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                    <Shield className="w-3.5 h-3.5 text-primary-500" />
                    Catálogo de Treinamento
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-primary-600">{activeFilter === 'ALL' ? 'Geral' : activeFilter}</span>
                </div>
                <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase leading-none">
                    {title}
                </h2>
                <p className="text-slate-500 font-bold mt-2 text-sm italic">
                    Selecione um bloco para iniciar sua jornada de simulação.
                </p>
            </div>

            {/* Filter Indicator Badge */}
            <div className="bg-white px-6 py-3 rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-500">
                    <Filter className="w-4 h-4" />
                </div>
                <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Filtro Ativo</span>
                    <span className="block text-xs font-black text-slate-700 uppercase">{activeFilter === 'ALL' ? 'Todos os Blocos' : activeFilter}</span>
                </div>
            </div>
        </div>
    );
};
