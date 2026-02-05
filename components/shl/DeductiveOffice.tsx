
import React from 'react';
import { DeductiveChallenge } from '../../types';
import { RotateCcw } from 'lucide-react';

interface DeductiveOfficeProps {
    challenge: DeductiveChallenge;
    answer: string;
    onAnswerChange: (answer: string) => void;
}

export const DeductiveOffice: React.FC<DeductiveOfficeProps> = ({ challenge, answer, onAnswerChange }) => {
    const { items, rules, photos } = challenge.data;

    // Initialize assignments: record of officeIndex (1-5) -> person name
    const currentAssignments: Record<number, string> = {};
    if (answer) {
        answer.split(',').forEach(part => {
            const [name, officeIdx] = part.split(':');
            currentAssignments[parseInt(officeIdx)] = name;
        });
    }

    const handleDragStart = (e: React.DragEvent, name: string) => {
        e.dataTransfer.setData('personName', name);
    };

    const handleDrop = (e: React.DragEvent, officeIdx: number) => {
        e.preventDefault();
        const name = e.dataTransfer.getData('personName');

        // Create new mapping
        const newMap: Record<number, string> = { ...currentAssignments };

        // Remove this person from any other office
        Object.keys(newMap).forEach(key => {
            if (newMap[parseInt(key)] === name) delete newMap[parseInt(key)];
        });

        // Assign to new office
        newMap[officeIdx] = name;

        // Convert back to string: "Name:Office,Name:Office"
        const answerStr = Object.entries(newMap)
            .map(([idx, n]) => `${n}:${idx}`)
            .join(',');

        onAnswerChange(answerStr);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleRemove = (officeIdx: number) => {
        const newMap: Record<number, string> = { ...currentAssignments };
        delete newMap[officeIdx];
        const answerStr = Object.entries(newMap)
            .map(([idx, n]) => `${n}:${idx}`)
            .join(',');
        onAnswerChange(answerStr);
    };

    const renderOfficeContent = (idx: number) => {
        const isAssigned = !!currentAssignments[idx];
        if (!isAssigned) {
            return (
                <span className="text-[#a0a0b0] font-semibold text-[14px]">
                    Escritório {idx}
                </span>
            );
        }

        const personName = currentAssignments[idx];
        const personIdx = items.indexOf(personName);

        return (
            <div className="flex flex-col items-center gap-1 animate-scale-in">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#10605B] shadow-sm relative group">
                    <img
                        src={photos?.[personIdx]}
                        alt={personName}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={() => handleRemove(idx)}
                        className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold text-lg"
                    >
                        ×
                    </button>
                </div>
                <span className="text-[12px] font-black text-[#10605B] uppercase leading-none">{personName}</span>
            </div>
        );
    };

    return (
        <div className="space-y-4 animate-fade-in">
            {/* Header: Atribuições de Escritório */}
            <div className="bg-[#1a1a2e] text-white p-2 rounded-t shadow-sm">
                <h3 className="text-[12px] font-bold uppercase tracking-tight">Atribuições de escritório</h3>
            </div>

            {/* Rules Table */}
            <div className="border border-black overflow-hidden shadow-sm">
                <table className="w-full border-collapse">
                    <tbody>
                        {items.map((name: string, i: number) => (
                            <tr key={name} className="border-b border-black last:border-0 h-11">
                                <td className="w-12 border-r border-black p-0">
                                    <img
                                        src={photos?.[i] || `https://ui-avatars.com/api/?name=${name}&background=random`}
                                        alt={name}
                                        className="w-full h-full object-cover"
                                    />
                                </td>
                                <td className="w-24 border-r border-black px-3 py-1 font-bold text-[13px] text-slate-700 bg-white">
                                    {name}
                                </td>
                                <td className="px-4 py-1 text-[13px] font-medium text-slate-800 bg-white leading-tight">
                                    {rules?.[i] || "Sem regra definida."}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Question Text - More Compact */}
            <div className="space-y-2 py-2">
                <div className="flex items-center justify-between">
                    <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-wide">Pergunta</h4>
                    <button
                        onClick={() => onAnswerChange('')}
                        className="bg-[#10605B] p-1.5 rounded shadow-sm hover:bg-emerald-700 transition-colors"
                        title="Resetar Agendamento"
                    >
                        <RotateCcw className="w-4 h-4 text-white" />
                    </button>
                </div>
                <p className="text-[14px] font-medium text-slate-800 leading-snug">
                    As pessoas são designadas para os escritórios 1 a 5 com base no tempo de serviço (maior tempo → Escritório 5, menor tempo → Escritório 1). Coloque cada pessoa no escritório correto.
                </p>
            </div>

            {/* Offices Layout (The Map) - Exact Match to Photo */}
            <div className="flex border border-slate-300 rounded-xl overflow-hidden w-full max-w-2xl mx-auto bg-white min-h-[220px] shadow-sm">
                {/* Left Column: Offices 1, 2, 3 */}
                <div className="flex flex-col w-[45%]">
                    {[1, 2, 3].map((idx) => (
                        <div
                            key={idx}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, idx)}
                            className={`flex-1 border-r border-slate-200 flex items-center justify-center relative p-2 transition-colors
                                ${idx !== 3 ? 'border-b' : ''}
                                ${!!currentAssignments[idx] ? 'bg-white' : 'bg-slate-50/30 hover:bg-slate-100/50'}
                            `}
                        >
                            {renderOfficeContent(idx)}
                        </div>
                    ))}
                </div>

                {/* Middle Column: Spacer/Corridor */}
                <div className="w-[10%] border-r border-slate-200 bg-slate-50/50" />

                {/* Right Column: Offices 4, 5 */}
                <div className="flex flex-col w-[45%]">
                    {[4, 5].map((idx) => (
                        <div
                            key={idx}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, idx)}
                            className={`flex-1 flex items-center justify-center relative p-2 transition-colors
                                ${idx !== 5 ? 'border-b border-slate-200' : ''}
                                ${!!currentAssignments[idx] ? 'bg-white' : 'bg-slate-50/30 hover:bg-slate-100/50'}
                            `}
                        >
                            {renderOfficeContent(idx)}
                        </div>
                    ))}
                </div>
            </div>

            {/* Draggable Person Strip - Smaller items */}
            <div className="flex flex-wrap gap-2 justify-center pt-4 border-t border-slate-100">
                {items.map((name: string, i: number) => {
                    if (Object.values(currentAssignments).includes(name)) return null;

                    return (
                        <div
                            key={name}
                            draggable
                            onDragStart={(e) => handleDragStart(e, name)}
                            className="bg-white border border-slate-200 rounded-xl p-2 flex items-center gap-2 cursor-grab active:cursor-grabbing hover:border-[#10605B] hover:shadow-md transition-all h-12"
                        >
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-100 shrink-0">
                                <img
                                    src={photos?.[i]}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-[11px] font-bold text-slate-700 uppercase leading-none whitespace-nowrap pr-2">{name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
