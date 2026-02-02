
import React, { useState } from 'react';
import { History, ChevronDown, ChevronUp, Check, X, Play, Clock, Calendar } from 'lucide-react';
import { ExamHistoryItem } from '../../types';

interface ExamHistoryLogProps {
    history: ExamHistoryItem[];
    onResumeExam: (item: ExamHistoryItem) => void;
}

export const ExamHistoryLog: React.FC<ExamHistoryLogProps> = ({
    history,
    onResumeExam
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-4 mb-8">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-white px-8 py-6 rounded-[2rem] border border-slate-200 shadow-sm hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/20 transition-all group"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-slate-50 p-3 rounded-2xl group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                        <History className="w-6 h-6 text-slate-400 group-hover:text-primary-500" />
                    </div>
                    <div className="text-left">
                        <span className="block font-black text-slate-800 uppercase tracking-widest text-xs mb-1">Diário de Bordo</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Histórico de Performance</span>
                    </div>
                </div>
                <div className={`p-2 rounded-full transition-transform duration-300 ${isOpen ? 'bg-primary-50 text-primary-600' : 'bg-slate-50 text-slate-300'}`}>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
            </button>

            {isOpen && (
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden animate-fade-in-down">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                <tr>
                                    <th className="px-8 py-5">Data da Missão</th>
                                    <th className="px-8 py-5 text-center">Status</th>
                                    <th className="px-8 py-5 text-center">Score</th>
                                    <th className="px-8 py-5 text-center hidden md:table-cell">Tempo de Voo</th>
                                    <th className="px-8 py-5 text-center">Resultado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {history.length > 0 ? (
                                    history.map((item) => (
                                        <tr
                                            key={item.id}
                                            className={`
                                                transition-all hover:bg-slate-50/80
                                                ${item.status === 'Em aberto' ? 'cursor-pointer border-l-4 border-amber-500' : 'border-l-4 border-transparent'}
                                            `}
                                            onClick={() => item.status === 'Em aberto' && onResumeExam(item)}
                                        >
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-500">
                                                        <Calendar className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <span className="block font-black text-navy-900 text-sm">{item.date.split(' ')[0]}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{item.date.split(' ')[1]}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${item.status === 'Finalizado' ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-600'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                {item.correct !== null ? (
                                                    <div className="flex items-center justify-center gap-1.5 font-black text-sm">
                                                        <span className="text-emerald-600">{item.correct}</span>
                                                        <span className="text-slate-300">/</span>
                                                        <span className="text-rose-500">{item.incorrect}</span>
                                                    </div>
                                                ) : <span className="text-slate-200">--</span>}
                                            </td>
                                            <td className="px-8 py-5 text-center hidden md:table-cell">
                                                <div className="flex items-center justify-center gap-2 text-slate-500 text-sm font-bold">
                                                    <Clock className="w-3.5 h-3.5 text-slate-300" />
                                                    {item.time}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                {item.result === 'Aprovado' && (
                                                    <span className="inline-flex items-center gap-2 text-emerald-600 font-black text-[10px] bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                                                        <Check className="w-3.5 h-3.5" strokeWidth={3} /> APROVADO
                                                    </span>
                                                )}
                                                {item.result === 'Reprovado' && (
                                                    <span className="inline-flex items-center gap-2 text-rose-600 font-black text-[10px] bg-rose-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                                                        <X className="w-3.5 h-3.5" strokeWidth={3} /> REPROVADO
                                                    </span>
                                                )}
                                                {item.status === 'Em aberto' && (
                                                    <button className="inline-flex items-center gap-2 text-amber-600 font-black text-[10px] bg-amber-50 px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg shadow-amber-100 border border-amber-200 hover:bg-amber-500 hover:text-white transition-all transform active:scale-95">
                                                        <Play className="w-3.5 h-3.5 fill-current" /> RETOMAR VOO
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-12 text-center">
                                            <div className="flex flex-col items-center gap-2 opacity-30">
                                                <History className="w-12 h-12 mb-2" />
                                                <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Nenhum registro encontrado</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};
