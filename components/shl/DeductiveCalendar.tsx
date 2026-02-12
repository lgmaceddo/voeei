
import React from 'react';
import { DeductiveChallenge } from '../../types';
import { RotateCcw, Check, X } from 'lucide-react';

interface DeductiveCalendarProps {
    challenge: DeductiveChallenge;
    answer: string;
    onAnswerChange: (answer: string) => void;
}

export const DeductiveCalendar: React.FC<DeductiveCalendarProps> = ({ challenge, answer, onAnswerChange }) => {
    // Normalize data structure handling both legacy and new formats
    const rawData = challenge.data || {};

    let startDay = rawData.startDay;
    let daysInMonth = rawData.daysInMonth;
    const items = rawData.items || [];
    const rules = rawData.rules || [];
    const photos = rawData.photos || [];
    const status = rawData.status || [];
    const isRange = rawData.isRange;
    const multiSelect = rawData.multiSelect;

    // Calculate calendar derived data if initialDate is provided
    if (rawData.initialDate) {
        const date = new Date(rawData.initialDate);
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(date.getTime() + userTimezoneOffset);

        startDay = adjustedDate.getDay(); // 0 (Sun) to 6 (Sat)
        daysInMonth = new Date(adjustedDate.getFullYear(), adjustedDate.getMonth() + 1, 0).getDate();
    }

    // Fallback defaults if still missing
    startDay = startDay ?? 0;
    daysInMonth = daysInMonth ?? 31;

    const handleDateSelect = (day: number) => {
        if (multiSelect) {
            const currentDays = answer ? answer.split(',') : [];
            const dayStr = day.toString();
            let newDays;

            if (currentDays.includes(dayStr)) {
                newDays = currentDays.filter(d => d !== dayStr);
            } else {
                newDays = [...currentDays, dayStr].sort((a, b) => parseInt(a) - parseInt(b));
            }

            onAnswerChange(newDays.join(','));
        } else {
            onAnswerChange(day.toString());
        }
    };

    const isInRange = (day: number) => {
        if (!answer) return false;

        if (multiSelect) {
            return answer.split(',').includes(day.toString());
        }

        const startDayValue = parseInt(answer);
        if (isRange) {
            return day >= startDayValue && day < startDayValue + isRange;
        }
        return day === startDayValue;
    };

    const isStart = (day: number) => {
        if (multiSelect) return false;
        return answer === day.toString();
    };

    const isEnd = (day: number) => {
        if (multiSelect) return false;
        if (!isRange || !answer) return answer === day.toString();
        return day === parseInt(answer) + isRange - 1;
    };

    // Generate calendar days
    const weekdays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const calendarGrid = [];

    for (let i = 0; i < startDay; i++) {
        calendarGrid.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        calendarGrid.push(day);
    }

    return (
        <div className="space-y-8 animate-fade-in relative z-10">
            {/* Mission Intel Table */}
            {items.length > 0 && (
                <div className="overflow-hidden border border-slate-200 rounded-[2.5rem] bg-white shadow-sm">
                    <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Log de Disponibilidade</span>
                        <div className="flex gap-1.5">
                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-50" />
                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-20" />
                        </div>
                    </div>
                    <table className="w-full">
                        <tbody>
                            {items.map((item: any, i: number) => {
                                const isObject = typeof item === 'object' && item !== null;
                                const name = isObject ? item.name : item;
                                const photoUrl = isObject ? (item.avatar || photos?.[i]) : (photos?.[i]);
                                const ruleText = isObject ? (item.status || rules?.[i]) : (rules?.[i]);
                                const itemStatus = isObject ? item.checkStatus : status?.[i];

                                return (
                                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-all group">
                                        <td className="w-20 p-4 text-center">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 group-hover:border-cyan-500/50 transition-all mx-auto shadow-sm">
                                                <img
                                                    src={photoUrl || `https://ui-avatars.com/api/?name=${name}&background=random`}
                                                    alt={name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="w-40 px-4 py-1 font-black text-xs text-slate-800 elite-heading uppercase group-hover:text-cyan-600 transition-colors">
                                            {name}
                                        </td>
                                        <td className="px-6 py-1 flex items-center gap-4 text-sm font-bold text-slate-500 italic tracking-wide leading-relaxed">
                                            {itemStatus === 'tick' && <Check className="w-5 h-5 text-emerald-500 shrink-0" />}
                                            {itemStatus === 'cross' && <X className="w-5 h-5 text-rose-500 shrink-0" />}
                                            <span>{ruleText || "Protocolo de carga indefinido."}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Question Controller */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-l-2 border-cyan-600 pl-4 py-1">
                    <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Protocolo de Seleção</h4>
                        <p className="text-sm font-bold text-slate-600 italic tracking-wide">
                            {rawData.question || challenge.rules[0] || "Selecione a data correta no calendário abaixo."}
                        </p>
                    </div>
                    <button
                        onClick={() => onAnswerChange('')}
                        className="bg-slate-100 p-3 rounded-2xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-95 group"
                        title="Limpar Seleção"
                    >
                        <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                    </button>
                </div>

                {/* Navigational Scheduler UI */}
                <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 shadow-inner relative">
                    {/* Weekday Labels */}
                    <div className="grid grid-cols-7 gap-4 mb-4">
                        {weekdays.map(day => (
                            <div key={day} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-3 relative">
                        {calendarGrid.map((day, idx) => {
                            const active = day !== null && isInRange(day);
                            const start = day !== null && isStart(day);
                            const end = day !== null && isEnd(day);

                            return (
                                <div
                                    key={idx}
                                    onClick={() => day !== null && handleDateSelect(day)}
                                    className={`
                                        h-14 sm:h-16 flex items-center justify-center text-sm font-black transition-all duration-300 relative rounded-xl border elite-heading
                                        ${day === null ? 'bg-transparent border-transparent' : 'cursor-pointer'}
                                        ${active
                                            ? 'bg-cyan-600 text-white border-cyan-700 shadow-md z-10'
                                            : 'bg-white text-slate-400 border-slate-100 hover:border-cyan-300 hover:bg-slate-50'}
                                        ${multiSelect && active ? 'scale-95' : ''}
                                        ${!multiSelect && start ? 'rounded-l-2xl' : ''}
                                        ${!multiSelect && end ? 'rounded-r-2xl' : ''}
                                    `}
                                >
                                    {day}
                                    {active && (day.toString() === answer.split(',')[0]) && (
                                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full border-2 border-cyan-600 animate-pulse" />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {isRange && (
                        <div className="mt-8 pt-6 border-t border-slate-200 text-[10px] text-cyan-700 font-black uppercase tracking-widest text-center italic">
                            * VETOR DE DISPONIBILIDADE: JANELA DE {isRange} DIAS OPERACIONAIS
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
