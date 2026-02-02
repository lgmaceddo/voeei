
import React from 'react';
import { Trophy } from 'lucide-react';
import { MOCK_RANKING } from '../../constants';

export const RankingManager = () => (
    <div className="space-y-6">
        <div className="bg-navy-900 px-10 py-12 rounded-[40px] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <Trophy className="w-8 h-8 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                        <h3 className="text-2xl font-black">Hall da Fama (Automatizado)</h3>
                    </div>
                    <p className="text-slate-400 font-medium max-w-lg">
                        O ranking é atualizado em tempo real com base no aproveitamento médio, volume de simulados e tempo de resposta de cada aluno.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 text-center">
                        <div className="text-2xl font-black text-white">Top 1%</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Status Global</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Posição / Aluno</th>
                        <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Simulados</th>
                        <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Aproveitamento</th>
                        <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Tempo Médio</th>
                        <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50/50">
                    {MOCK_RANKING.map((student, index) => (
                        <tr key={index} className="group hover:bg-slate-50/50 transition-all duration-300">
                            <td className="px-8 py-5">
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs
                                        ${index === 0 ? 'bg-amber-100 text-amber-600 shadow-sm' :
                                            index === 1 ? 'bg-slate-100 text-slate-500' :
                                                index === 2 ? 'bg-orange-100 text-orange-600' :
                                                    'text-slate-400'}
                                    `}>
                                        #{index + 1}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img src={student.avatar} className="w-10 h-10 rounded-xl object-cover border border-slate-100 shadow-sm" alt={student.name} />
                                        <div>
                                            <div className="font-bold text-navy-900 group-hover:text-primary-500 transition-colors">{student.name}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aluno Premium</div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5 text-center">
                                <span className="font-bold text-navy-900">{student.exams}</span>
                            </td>
                            <td className="px-6 py-5">
                                <div className="flex flex-col items-center gap-1.5">
                                    <div className="w-full max-w-[100px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${student.score >= 90 ? 'bg-green-500' : 'bg-primary-500'}`}
                                            style={{ width: `${student.score}%` }}
                                        />
                                    </div>
                                    <span className="text-sm font-black text-navy-900">{student.score}%</span>
                                </div>
                            </td>
                            <td className="px-6 py-5 text-center">
                                <span className="text-sm font-bold text-slate-600">{student.averageTime}</span>
                            </td>
                            <td className="px-6 py-5 text-right">
                                <div className="flex justify-end gap-2">
                                    <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                                        Validado
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center">
                <button className="text-sm font-bold text-primary-500 hover:text-primary-600 transition-colors">Ver Ranking Completo via Banco de Dados</button>
            </div>
        </div>
    </div>
);
