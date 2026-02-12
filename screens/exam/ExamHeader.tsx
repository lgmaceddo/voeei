
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ExamCategory } from '../../types';

interface ExamHeaderProps {
    category: ExamCategory;
    onCancel: () => void;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({ category, onCancel }) => {
    return (
        <div className="bg-white/90 backdrop-blur-xl border-b border-slate-200 px-8 py-5 shadow-sm mb-8 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-6">
                {/* Tactical Exit Action */}
                <button
                    onClick={onCancel}
                    className="p-3.5 rounded-2xl bg-slate-100 text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-95 border border-slate-200 hover:border-rose-200 group relative"
                    title="Abortar Missão"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform relative z-10" />
                </button>

                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                            <span className="text-cyan-600 text-[9px] font-black uppercase tracking-wider leading-none">Ambiente de Estudo Ativo</span>
                        </div>
                        <div className="h-px w-8 bg-slate-200" />
                        <span className="text-slate-400 text-[9px] font-black uppercase tracking-wider leading-none">Ref: {category.id}</span>
                    </div>

                    <div className="flex items-center gap-5">
                        <h1 className="text-2xl font-black text-slate-800 elite-heading tracking-tighter leading-tight uppercase">
                            {category.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Technical Command Telemetry */}
            <div className="hidden lg:flex items-center gap-8">
                <div className="flex flex-col items-end border-r border-slate-100 pr-8">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Status do Candidato</p>
                    <p className="text-xs font-black text-slate-700 uppercase tracking-tight">Em Treinamento ICAO</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                        <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest">PRO</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
