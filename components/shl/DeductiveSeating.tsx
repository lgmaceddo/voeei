
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

    return (
        <div className="space-y-8 animate-fade-in relative z-10">
            {/* Mission Intel: Seating Protocols */}
            <div className="overflow-hidden border border-slate-200 rounded-[2.5rem] bg-white shadow-sm">
                <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocolo de Disposição</span>
                    <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-50" />
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-20" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {items.map((name: string, i: number) => (
                        <div key={name} className="flex border-b border-slate-100 last:border-b-0 md:odd:border-r border-slate-100 hover:bg-slate-50 transition-all group p-4 gap-4">
                            <div className="w-14 h-14 border border-slate-200 rounded-xl overflow-hidden group-hover:border-cyan-500/50 transition-all shadow-sm shrink-0">
                                <img src={photos[i]} alt={name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <span className="text-[10px] font-black text-slate-800 elite-heading uppercase group-hover:text-cyan-600 transition-colors mb-1">{name}</span>
                                <p className="text-xs font-bold text-slate-500 italic tracking-wide leading-relaxed">
                                    {rules[i]}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tactical Control Tray */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-l-2 border-cyan-600 pl-4 py-1">
                    <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Atribuição de Posição</h4>
                        <p className="text-sm font-bold text-slate-600 italic tracking-wide">Arraste os marcadores táticos para classificar os agentes de 1 (Esquerda) a 6 (Direita).</p>
                    </div>
                    <button
                        onClick={() => onAnswerChange('')}
                        className="bg-slate-100 p-3 rounded-2xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-95 group"
                    >
                        <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {items.map((name: string, i: number) => {
                        const assignedPos = currentPositions[name];
                        return (
                            <div
                                key={name}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, name)}
                                className={`bg-white border transition-all duration-500 flex items-center justify-between p-4 rounded-3xl shadow-sm group/slot
                                    ${assignedPos ? 'border-cyan-200 bg-cyan-50 shadow-inner' : 'border-slate-100 hover:border-slate-300'}
                                `}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 border border-slate-200 rounded-xl overflow-hidden">
                                        <img src={photos[i]} alt={name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black text-slate-800 elite-heading uppercase block">{name}</span>
                                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5">AGENTE_VETOR</span>
                                    </div>
                                </div>

                                <div className={`
                                    w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 elite-heading text-xl shadow-sm
                                    ${assignedPos
                                        ? 'bg-cyan-600 border-cyan-700 text-white scale-110'
                                        : 'bg-slate-50 border-slate-200 border-dashed text-slate-300 font-black'
                                    }
                                `}>
                                    {assignedPos ? (
                                        <div className="relative group w-full h-full flex items-center justify-center">
                                            {assignedPos}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleRemove(name); }}
                                                className="absolute -right-2 -top-2 w-5 h-5 bg-rose-500 text-white rounded-lg text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md active:scale-90"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tactical Tokens Bank */}
            <div className="pt-10 border-t border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 block text-center">Tokens Táticos de Disponibilidade</span>
                <div className="flex flex-wrap justify-between items-center gap-4 max-w-2xl mx-auto px-6">
                    {[1, 2, 3, 4, 5, 6].map(num => {
                        const isUsed = Object.values(currentPositions).includes(num);
                        return (
                            <div
                                key={num}
                                draggable={!isUsed}
                                onDragStart={(e) => handleDragStart(e, num)}
                                className={`
                                    w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl transition-all duration-500 elite-heading shadow-sm
                                    ${isUsed
                                        ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed grayscale'
                                        : 'bg-white border-cyan-200 text-cyan-600 font-bold cursor-grab hover:scale-110 hover:bg-cyan-50 hover:border-cyan-400 active:cursor-grabbing hover:shadow-md'
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
