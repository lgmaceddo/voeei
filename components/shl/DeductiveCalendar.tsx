
import React from 'react';
import { DeductiveChallenge } from '../../types';
import { RotateCcw, Check, X } from 'lucide-react';

interface DeductiveCalendarProps {
    challenge: DeductiveChallenge;
    answer: string;
    onAnswerChange: (answer: string) => void;
}

export const DeductiveCalendar: React.FC<DeductiveCalendarProps> = ({ challenge, answer, onAnswerChange }) => {
    const { items, rules, photos, status, startDay, daysInMonth, isRange, multiSelect } = challenge.data;

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
        if (multiSelect) return false; // Not applicable for multi
        return answer === day.toString();
    };

    const isEnd = (day: number) => {
        if (multiSelect) return false; // Not applicable for multi
        if (!isRange || !answer) return answer === day.toString();
        return day === parseInt(answer) + isRange - 1;
    };

    // Generate calendar days
    const weekdays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const calendarGrid = [];

    // Add empty slots before the first day of the month
    for (let i = 0; i < startDay; i++) {
        calendarGrid.push(null);
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        calendarGrid.push(day);
    }

    return (
        <div className="space-y-4 animate-fade-in">
            {/* Header: Scenario Title */}
            <div className="bg-[#1a1a2e] text-white p-2 rounded-t shadow-sm text-center">
                <h3 className="text-[12px] font-bold uppercase tracking-tight">{challenge.scenario}</h3>
            </div>

            {/* Rules Table - High Fidelity with Icons */}
            <div className="border border-black overflow-hidden shadow-sm">
                <table className="w-full border-collapse">
                    <tbody>
                        {items.map((name: string, i: number) => (
                            <tr key={name} className="border-b border-black last:border-0 h-11">
                                <td className="w-12 border-r border-black p-0">
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={photos?.[i] || `https://ui-avatars.com/api/?name=${name}&background=random`}
                                            alt={name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="w-24 border-r border-black px-3 py-1 font-bold text-[13px] text-slate-700 bg-white">
                                    {name}
                                </td>
                                <td className="px-4 py-1 flex items-center gap-3 h-11 text-[13px] font-medium text-slate-800 bg-white leading-tight">
                                    {status?.[i] === 'tick' && <Check className="w-5 h-5 text-emerald-600 shrink-0" />}
                                    {status?.[i] === 'cross' && <X className="w-5 h-5 text-rose-600 shrink-0" />}
                                    <span>{rules?.[i] || "Sem regra definida."}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Question Text */}
            <div className="space-y-2 py-2">
                <div className="flex items-center justify-between">
                    <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-wide">Pergunta</h4>
                    <button
                        onClick={() => onAnswerChange('')}
                        className="bg-[#10605B] p-1.5 rounded shadow-sm hover:bg-emerald-700 transition-colors"
                        title="Limpar Seleção"
                    >
                        <RotateCcw className="w-4 h-4 text-white" />
                    </button>
                </div>
                <p className="text-[14px] font-medium text-slate-800 leading-snug">
                    {challenge.rules[0]}
                </p>
            </div>

            {/* Calendar UI */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-inner">
                <h4 className="text-slate-400 text-[12px] font-bold uppercase tracking-widest mb-4">Calendário</h4>

                {/* Weekday Labels */}
                <div className="grid grid-cols-7 gap-0 mb-2">
                    {weekdays.map(day => (
                        <div key={day} className="text-center text-[10px] font-black text-slate-400">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-y-1 gap-x-0">
                    {calendarGrid.map((day, idx) => {
                        const active = day !== null && isInRange(day);
                        const start = day !== null && isStart(day);
                        const end = day !== null && isEnd(day);

                        return (
                            <div
                                key={idx}
                                onClick={() => day !== null && handleDateSelect(day)}
                                className={`
                                    h-10 sm:h-12 flex items-center justify-center text-[13px] font-bold transition-all relative
                                    ${day === null ? 'bg-transparent' : 'cursor-pointer'}
                                    ${active ? 'bg-[#10605B] text-white z-10' : 'text-slate-600 border border-slate-50'}
                                    ${multiSelect && active ? 'rounded-md border border-[#10605B] scale-95' : ''}
                                    ${!multiSelect && start ? 'rounded-l-md border-l border-y border-[#10605B]' : ''}
                                    ${!multiSelect && end ? 'rounded-r-md border-r border-y border-[#10605B]' : ''}
                                    ${!multiSelect && active && !start && !end ? 'border-y border-[#10605B]' : ''}
                                    ${day !== null && !active ? 'hover:bg-slate-50' : ''}
                                `}
                            >
                                {day}
                                {active && (day.toString() === answer.split(',')[0]) && (
                                    <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            {isRange && (
                <div className="text-[11px] text-[#10605B] font-bold italic text-center">
                    * Período de {isRange} dias selecionado a partir da data clicada.
                </div>
            )}
        </div>
    );
};
