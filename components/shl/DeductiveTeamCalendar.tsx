
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
        <div className="space-y-6 animate-fade-in">
            {/* Header: Scenario */}
            <div className="bg-[#1a1a2e] text-white p-2 rounded shadow-sm text-center">
                <h3 className="text-[12px] font-bold uppercase tracking-widest">{challenge.scenario}</h3>
            </div>

            {/* Team Calendars (Read-only) */}
            <div className="space-y-4">
                {team.map((member: any) => (
                    <div key={member.name} className="space-y-1">
                        <span className="text-[13px] font-bold text-slate-700 ml-1">{member.name}</span>
                        <div className="flex border-t border-b border-l border-black h-10 w-full bg-white opacity-90">
                            {allSlots.map((_, sIdx) => (
                                <div
                                    key={sIdx}
                                    className={`flex-1 border-r border-black relative ${member.busy.includes(sIdx) ? 'bg-[#8b8b9a]' : 'bg-white'}`}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Ruler / Time Labels */}
            <div className="relative w-full h-6 border-b border-slate-200">
                {hours.map((h: string, idx: number) => (
                    <div
                        key={h}
                        style={{
                            left: `${(idx * (100 / (hours.length - 1)))}%`,
                            transform: idx === hours.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)'
                        }}
                        className={`absolute top-1 text-[11px] font-black text-slate-400 ${idx === 0 ? 'translate-x-0' : ''}`}
                    >
                        {h}
                    </div>
                ))}
            </div>

            {/* Question Text */}
            <div className="space-y-3 py-2 bg-slate-50/50 rounded-lg p-3 border border-slate-100">
                <div className="flex justify-between items-center">
                    <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-widest">Pergunta</h4>
                    <button onClick={() => onAnswerChange('')} className="p-1 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-[15px] font-bold text-slate-800 leading-snug">
                    {challenge.rules[0]}
                </p>
            </div>

            {/* Your Calendar (Interactive) */}
            <div className="space-y-2">
                <span className="text-[13px] font-black text-[#10605B] ml-1 uppercase tracking-tight">Seu calendário</span>
                <div className="flex border border-[#10605B] h-12 w-full bg-white shadow-lg rounded-sm overflow-hidden ring-4 ring-emerald-50/50">
                    {allSlots.map((_, sIdx) => {
                        const busy = myBusy.includes(sIdx);
                        const selected = isSelected(sIdx);
                        return (
                            <div
                                key={sIdx}
                                onClick={() => handleSlotClick(sIdx)}
                                className={`flex-1 border-r border-[#10605B]/20 relative cursor-pointer transition-all duration-200
                                    ${busy ? 'bg-slate-100 pattern-diagonal-lines' : 'bg-white hover:bg-emerald-50'}
                                    ${selected ? 'bg-[#10605B] z-10 scale-y-110 !border-none' : ''}
                                `}
                            >
                                {busy && !selected && (
                                    <div
                                        className="absolute inset-0 opacity-30"
                                        style={{
                                            backgroundImage: 'repeating-linear-gradient(45deg, #e2e8f0 25%, transparent 25%, transparent 50%, #e2e8f0 50%, #e2e8f0 75%, transparent 75%, transparent)',
                                            backgroundSize: '8px 8px'
                                        }}
                                    />
                                )}
                                {selected && sIdx === allSlots.indexOf(answer) && (
                                    <div className="absolute inset-x-0 -bottom-6 text-center text-[10px] font-black text-[#10605B] whitespace-nowrap">
                                        REUNIÃO INICIA ÀS {answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
