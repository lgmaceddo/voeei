
import React from 'react';
import { DeductiveChallenge } from '../../types';

interface DeductiveCalendarProps {
    challenge: DeductiveChallenge;
    answer: string;
    onAnswerChange: (answer: string) => void;
    showCorrect?: boolean;
}

export const DeductiveCalendar: React.FC<DeductiveCalendarProps> = ({ challenge, answer, onAnswerChange, showCorrect }) => {
    const { people, hours, userBusy } = challenge.data;

    const isSlotBusy = (busyArray: number[], slotIdx: number) => busyArray.includes(slotIdx);

    // Generate 18 slots (9 hours * 2 blocks each)
    const allSlots: string[] = [];
    for (let i = 0; i < hours.length - 1; i++) { // hours goes from 08 to 16, so 9 hours. We need 8 hours * 2 + 2 (for 16:00)
        allSlots.push(`${hours[i]}:00`);
        allSlots.push(`${hours[i]}:30`);
    }
    // Add the last hour's start for the final slot range calculation
    allSlots.push(`${hours[hours.length - 1]}:00`); // '16:00'

    const handleToggleSlot = (slotIdx: number) => {
        // The last slot will be from 15:30 to 16:00.
        // If slotIdx is the very last one (16:00), it shouldn't be selectable as a start.
        if (slotIdx >= allSlots.length - 1) return;

        const slotRange = `${allSlots[slotIdx]}-${allSlots[slotIdx + 1]}`;
        const selected = answer ? answer.split(',') : [];
        if (selected.includes(slotRange)) {
            onAnswerChange(selected.filter(s => s !== slotRange).join(','));
        } else {
            onAnswerChange([...selected, slotRange].join(','));
        }
    };

    return (
        <div className="space-y-12">
            {/* Team Calendar Section (Dark) */}
            <div className="bg-[#1e2227] rounded-xl overflow-hidden shadow-2xl p-6">
                <h4 className="text-white/80 text-lg font-medium mb-6">Calendário da equipe</h4>

                <div className="space-y-4">
                    {people.map((person: any, pIdx: number) => (
                        <div key={pIdx} className="flex group">
                            <div className="bg-[#2d3239] px-4 py-3 min-w-[120px] flex items-center border-r border-white/5">
                                <span className="text-white text-[11px] font-black uppercase tracking-widest">{person.name}</span>
                            </div>
                            <div className="flex-1 bg-white h-12 grid grid-cols-[repeat(18,1fr)]">
                                {allSlots.slice(0, -1).map((_time: string, sIdx: number) => {
                                    const busy = isSlotBusy(person.busy, sIdx);
                                    return (
                                        <div
                                            key={sIdx}
                                            className={`border-r border-slate-200 last:border-r-0 ${busy ? 'bg-[#b1b5b9]' : 'bg-white'}`}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* Synchronized Scale for Team */}
                    <div className="flex">
                        <div className="min-w-[120px]" /> {/* Spacer for labels */}
                        <div className="flex-1 relative h-6">
                            <div className="absolute inset-0 grid grid-cols-[repeat(9,1fr)]">
                                {hours.slice(0, -1).map((h: string) => (
                                    <div key={h} className="text-[12px] font-black text-white/40 pt-2 border-l border-white/5 pl-2 leading-none">
                                        {h}
                                    </div>
                                ))}
                            </div>
                            <div className="absolute top-0 right-0 text-[12px] font-black text-white/40 pt-2 pr-2 leading-none border-r border-white/5 h-full">
                                16
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Question Section */}
            <div className="space-y-6">
                <div>
                    <h4 className="text-[#6c757d] text-xs font-black uppercase tracking-widest mb-2">Pergunta</h4>
                    <p className="text-[#212529] text-xl font-black leading-tight">
                        {challenge.rules[0]}
                    </p>
                </div>

                {/* User Calendar Section */}
                <div className="space-y-4">
                    <h4 className="text-[#6c757d] text-xs font-black uppercase tracking-widest">Seu calendário (Seleção)</h4>
                    <div className="bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden">
                        <div className="flex">
                            <div className="bg-slate-100/50 px-4 py-3 min-w-[120px] flex items-center border-r border-slate-200">
                                <span className="text-slate-500 text-[11px] font-black uppercase tracking-widest">Você</span>
                            </div>
                            <div className="flex-1 h-14 grid grid-cols-[repeat(18,1fr)]">
                                {allSlots.slice(0, -1).map((_time: string, sIdx: number) => {
                                    const busy = isSlotBusy(userBusy, sIdx);
                                    const slotRange = `${allSlots[sIdx]}-${allSlots[sIdx + 1]}`;
                                    const isSelected = (answer || '').split(',').includes(slotRange);

                                    return (
                                        <div
                                            key={sIdx}
                                            onClick={() => !busy && handleToggleSlot(sIdx)}
                                            className={`border-r border-slate-200 last:border-r-0 transition-all cursor-pointer relative
                                                ${busy ? 'bg-[#b1b5b9]' : 'bg-white hover:bg-primary-50'}
                                                ${isSelected ? 'bg-primary-500/20 ring-2 ring-primary-500 ring-inset z-10' : ''}
                                            `}
                                        >
                                            {isSelected && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* Synchronized Scale for User */}
                        <div className="flex border-t border-slate-200 bg-slate-50/50">
                            <div className="min-w-[120px]" /> {/* Spacer for labels */}
                            <div className="flex-1 relative h-8">
                                <div className="absolute inset-0 grid grid-cols-[repeat(9,1fr)]">
                                    {hours.slice(0, -1).map((h: string) => (
                                        <div key={h} className="text-[12px] font-black text-slate-400 pt-2 border-l border-slate-200 pl-2 leading-none">
                                            {h}
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute top-0 right-0 text-[12px] font-black text-slate-400 pt-2 pr-2 leading-none border-r border-slate-200 h-full">
                                    16
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
