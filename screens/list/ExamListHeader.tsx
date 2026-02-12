
import React from 'react';
import { ChevronRight, Filter, Shield } from 'lucide-react';

interface ExamListHeaderProps {
    activeFilter: string;
    title: string;
}

export const ExamListHeader: React.FC<ExamListHeaderProps> = ({ activeFilter, title }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-l-4 border-cyan-500 pl-8">
            <div className="flex-1">
                <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                    <Shield className="w-4 h-4 text-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]" />
                    Telemetria Operacional
                    <ChevronRight className="w-3 h-3 opacity-50" />
                    <span className="text-cyan-400 italic">/{activeFilter === 'ALL' ? 'Geral' : activeFilter}</span>
                </div>
                <h2 className="text-5xl font-black text-white elite-heading tracking-tighter uppercase leading-none">
                    {title}
                </h2>
                <p className="text-slate-400 font-bold mt-3 text-sm italic tracking-wide max-w-2xl">
                    Selecione o módulo de preparação técnica para iniciar o protocolo de simulação.
                </p>
            </div>

            {/* Filter Indicator Badge - Elite Status Display */}
            <div className="bg-[#1E293B]/40 backdrop-blur-xl px-8 py-4 rounded-[2rem] border border-white/5 flex items-center gap-5 shadow-2xl group hover:border-cyan-500/20 transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-cyan-500/30">
                    <Filter className="w-5 h-5" />
                </div>
                <div>
                    <span className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none mb-2">Filtro Ativo</span>
                    <span className="block text-sm font-black text-white uppercase tracking-wider">{activeFilter === 'ALL' ? 'Frequência Livre' : activeFilter}</span>
                </div>
            </div>
        </div>
    );
};
