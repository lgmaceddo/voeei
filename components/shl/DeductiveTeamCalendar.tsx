
import React from 'react';
import { RotateCcw } from 'lucide-react';
import { DeductiveChallenge } from '../../types';

interface DeductiveTeamCalendarProps {
    challenge: DeductiveChallenge;
    answer: string; // "7:00"
    onAnswerChange: (answer: string) => void;
}

export const DeductiveTeamCalendar: React.FC<DeductiveTeamCalendarProps> = ({ challenge, answer, onAnswerChange }) => {
    const { team, myBusy, hours, duration } = challenge.data;

    // slot index 0-17 (30 min each)
    const allSlots: string[] = [];
    for (let i = 0; i < hours.length - 1; i++) {
        allSlots.push(`${hours[i]}:00`);
        allSlots.push(`${hours[i]}:30`);
    }

    const handleSlotClick = (idx: number) => {
        const time = allSlots[idx];
        const currentSelected = answer ? answer.split(',') : [];
        let newSelected;

        if (currentSelected.includes(time)) {
            newSelected = currentSelected.filter(t => t !== time);
        } else {
            newSelected = [...currentSelected, time].sort((a, b) => {
                const [hA, mA] = a.split(':').map(Number);
                const [hB, mB] = b.split(':').map(Number);
                return (hA * 60 + mA) - (hB * 60 + mB);
            });
        }

        onAnswerChange(newSelected.join(','));
    };

    const isSelected = (idx: number) => {
        if (!answer) return false;
        return answer.split(',').includes(allSlots[idx]);
    };

    return (
        <div className="space-y-8 animate-fade-in relative z-10">
            {/* Header: Tactical Scenario */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-[2rem] shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-600 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cenário Operacional</span>
                </div>
                <h3 className="text-sm font-bold text-slate-700 italic tracking-wide leading-relaxed">{challenge.scenario}</h3>
            </div>

            {/* Team Availability Logs */}
            <div className="space-y-6 bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Log de Disponibilidade da Equipe</span>
                <div className="space-y-6">
                    {team.map((member: any) => (
                        <div key={member.name} className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <span className="text-[11px] font-black text-slate-800 elite-heading uppercase group-hover:text-cyan-600 transition-colors">{member.name}</span>
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Disponível</span>
                            </div>
                            <div className="flex border border-slate-100 h-10 w-full bg-slate-50 rounded-xl overflow-hidden shadow-inner">
                                {allSlots.map((_, sIdx) => {
                                    const busy = member.busy.includes(sIdx);
                                    return (
                                        <div
                                            key={sIdx}
                                            className={`flex-1 border-r border-white/50 relative last:border-0 transition-colors duration-500 
                                                ${busy ? 'bg-rose-500/10' : 'bg-transparent'}
                                            `}
                                        >
                                            {busy && <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 to-transparent" />}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigational Time Labels */}
            <div className="relative w-full h-8 border-b border-slate-100">
                {hours.map((h: string, idx: number) => (
                    <div
                        key={h}
                        style={{
                            left: `${(idx * (100 / (hours.length - 1)))}%`,
                            transform: idx === hours.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)'
                        }}
                        className={`absolute top-2 text-[10px] font-black text-slate-400 elite-heading ${idx === 0 ? 'translate-x-0' : ''}`}
                    >
                        {h}
                    </div>
                ))}
            </div>

            {/* Question Intel Controller */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-l-2 border-cyan-600 pl-4 py-1">
                    <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Programador de Missão</h4>
                        <p className="text-sm font-bold text-slate-600 italic tracking-wide leading-relaxed">
                            {challenge.rules[0]}
                        </p>
                    </div>
                    <button
                        onClick={() => onAnswerChange('')}
                        className="bg-slate-100 p-3 rounded-2xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-95 group"
                    >
                        <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                    </button>
                </div>

                {/* Interactive Tactical Scheduler */}
                <div className="space-y-4 pt-4">
                    <span className="text-[10px] font-black text-cyan-700 elite-heading uppercase tracking-widest ml-2 block">Seu Agendamento</span>
                    <div className="flex border border-slate-200 h-16 w-full bg-white shadow-sm rounded-2xl overflow-hidden group/scheduler relative">
                        {allSlots.map((_, sIdx) => {
                            const busy = myBusy.includes(sIdx);
                            const selected = isSelected(sIdx);
                            return (
                                <div
                                    key={sIdx}
                                    onClick={() => handleSlotClick(sIdx)}
                                    className={`flex-1 border-r border-slate-100 relative cursor-pointer transition-all duration-300 last:border-0
                                        ${busy ? 'bg-slate-50 cursor-not-allowed' : 'hover:bg-cyan-50'}
                                        ${selected ? 'bg-cyan-600 z-10 shadow-md !border-none scale-y-110 sm:scale-y-125' : ''}
                                    `}
                                >
                                    {busy && (
                                        <div className="absolute inset-0 opacity-10 bg-slate-400" />
                                    )}
                                    {selected && (
                                        <div className="absolute inset-x-0 -bottom-8 text-center text-[10px] font-black text-cyan-600 elite-heading whitespace-nowrap animate-pulse">
                                            {allSlots[sIdx]}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="pt-8 text-center">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Operação de Cronograma</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
