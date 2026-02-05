
import React from 'react';
import { DeductiveChallenge } from '../../types';
import { RotateCcw } from 'lucide-react';

interface DeductiveSeatingProps {
    challenge: DeductiveChallenge;
    answer: string;
    onAnswerChange: (answer: string) => void;
}

export const DeductiveSeating: React.FC<DeductiveSeatingProps> = ({ challenge, answer, onAnswerChange }) => {
    const { items, rules, photos } = challenge.data;

    // Initialize mapping: Name -> Position (1-6)
    const currentPositions: Record<string, number> = {};
    if (answer) {
        answer.split(',').forEach(part => {
            const [name, pos] = part.split(':');
            currentPositions[name] = parseInt(pos);
        });
    }

    const handleDragStart = (e: React.DragEvent, position: number) => {
        e.dataTransfer.setData('markerPos', position.toString());
    };

    const handleDrop = (e: React.DragEvent, personName: string) => {
        e.preventDefault();
        const position = parseInt(e.dataTransfer.getData('markerPos'));

        const newMap = { ...currentPositions };

        // If this position was assigned elsewhere, remove it
        Object.keys(newMap).forEach(name => {
            if (newMap[name] === position) delete newMap[name];
        });

        // Assign to new person
        newMap[personName] = position;

        const answerStr = Object.entries(newMap)
            .map(([name, pos]) => `${name}:${pos}`)
            .join(',');

        onAnswerChange(answerStr);
    };

    const handleDragOver = (e: React.DragEvent) => e.preventDefault();

    const handleRemove = (personName: string) => {
        const newMap = { ...currentPositions };
        delete newMap[personName];
        const answerStr = Object.entries(newMap)
            .map(([name, pos]) => `${name}:${pos}`)
            .join(',');
        onAnswerChange(answerStr);
    };

    // Split items and rules into pairs for the 2-column layout
    const rulePairs = [];
    for (let i = 0; i < items.length; i += 2) {
        rulePairs.push([
            { name: items[i], rule: rules[i], photo: photos[i], idx: i },
            { name: items[i + 1], rule: rules[i + 1], photo: photos[i + 1], idx: i + 1 }
        ]);
    }

    return (
        <div className="space-y-4 animate-fade-in">
            {/* Header */}
            <div className="bg-[#1a1a2e] text-white p-2 rounded-t shadow-sm">
                <h3 className="text-[12px] font-bold uppercase tracking-tight">Disposição de assentos</h3>
            </div>

            {/* Rules Grid - Exactly like the photo */}
            <div className="border border-black overflow-hidden bg-white shadow-sm">
                <div className="grid grid-cols-2 divide-x divide-black">
                    {items.map((name: string, i: number) => (
                        <div key={name} className="flex border-b border-black h-12 last:border-b-0 even:border-b-0 odd:last:border-b-0">
                            <div className="w-12 border-r border-black p-0 shrink-0">
                                <img src={photos[i]} alt={name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 px-3 py-1 text-[12px] leading-tight flex items-center">
                                <p className="text-slate-800">
                                    <span className="font-bold">{name}</span> {rules[i]}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Question Text */}
            <div className="space-y-2 py-2">
                <div className="flex items-center justify-between">
                    <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-wide">Pergunta</h4>
                    <button
                        onClick={() => onAnswerChange('')}
                        className="bg-[#10605B] p-1.5 rounded shadow-sm hover:bg-emerald-700 transition-colors"
                        title="Limpar Agendamento"
                    >
                        <RotateCcw className="w-4 h-4 text-white" />
                    </button>
                </div>
                <p className="text-[14px] font-medium text-slate-800 leading-snug">
                    Arraste os marcadores para cada pessoa, classificando-as de 1 (mais à esquerda) a 6 (mais à direita).
                </p>
            </div>

            {/* Interactive List - Two Columns */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {items.map((name: string, i: number) => {
                    const assignedPos = currentPositions[name];
                    return (
                        <div
                            key={name}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, name)}
                            className="bg-white border border-slate-100 flex items-center justify-between h-12 px-2 hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <img src={photos[i]} alt={name} className="w-8 h-8 rounded-sm object-cover" />
                                <span className="text-[13px] font-bold text-slate-700">{name}</span>
                            </div>

                            <div className={`
                                w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all
                                ${assignedPos
                                    ? 'bg-[#10605B] border-[#10605B] text-white font-bold'
                                    : 'bg-slate-100 border-slate-200 border-dashed text-slate-400 font-black'
                                }
                            `}>
                                {assignedPos ? (
                                    <div className="relative group w-full h-full flex items-center justify-center">
                                        {assignedPos}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleRemove(name); }}
                                            className="absolute -right-1 -top-1 w-3 h-3 bg-red-500 rounded-full text-[8px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ) : '#'}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Markers Bank */}
            <div className="pt-6">
                <h4 className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-3">Marcadores</h4>
                <div className="flex justify-between px-4">
                    {[1, 2, 3, 4, 5, 6].map(num => {
                        const isUsed = Object.values(currentPositions).includes(num);
                        return (
                            <div
                                key={num}
                                draggable={!isUsed}
                                onDragStart={(e) => handleDragStart(e, num)}
                                className={`
                                    w-10 h-10 rounded-full border-2 flex items-center justify-center text-[18px] transition-all
                                    ${isUsed
                                        ? 'bg-slate-100 border-slate-100 text-slate-300 cursor-not-allowed'
                                        : 'bg-white border-slate-200 text-slate-600 font-bold cursor-grab hover:border-[#10605B] hover:text-[#10605B] hover:shadow-lg active:cursor-grabbing'
                                    }
                                `}
                            >
                                {num}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
