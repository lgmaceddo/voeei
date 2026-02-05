
import React from 'react';
import { DeductiveChallenge } from '../../types';

interface DeductiveOfficeProps {
    challenge: DeductiveChallenge;
    answer: string; // List of names in slots
    onAnswerChange: (answer: string) => void;
}

export const DeductiveOffice: React.FC<DeductiveOfficeProps> = ({ challenge, answer, onAnswerChange }) => {
    const { items, slots } = challenge.data;

    // Initialize current assignments from answer string (comma separated)
    const currentAssignments = answer ? answer.split(',') : new Array(slots.length).fill('');

    const handleDragStart = (e: React.DragEvent, name: string) => {
        e.dataTransfer.setData('name', name);
    };

    const handleDrop = (e: React.DragEvent, slotIdx: number) => {
        e.preventDefault();
        const name = e.dataTransfer.getData('name');

        const newAssignments = [...currentAssignments];
        // Remove name from any previous slot
        const prevIdx = newAssignments.indexOf(name);
        if (prevIdx !== -1) newAssignments[prevIdx] = '';

        // Assign to new slot
        newAssignments[slotIdx] = name;
        onAnswerChange(newAssignments.join(','));
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            {/* Names Bank */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Funcionários Disponíveis</h4>
                <div className="flex flex-wrap gap-2">
                    {items.map((name: string) => {
                        const isAssigned = currentAssignments.includes(name);
                        return (
                            <div
                                key={name}
                                draggable={!isAssigned}
                                onDragStart={(e) => handleDragStart(e, name)}
                                className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all border shadow-sm
                  ${isAssigned
                                        ? 'bg-slate-100 text-slate-300 border-slate-100 cursor-not-allowed'
                                        : 'bg-white text-navy-900 border-slate-200 cursor-grab hover:border-primary-500 hover:shadow-md active:cursor-grabbing'
                                    }
                `}
                            >
                                {name}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Offices Slots */}
            <div className="space-y-3">
                {slots.map((slot: string, idx: number) => (
                    <div
                        key={idx}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, idx)}
                        className="flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-dashed border-slate-100 min-h-[72px] hover:border-primary-300 transition-colors"
                    >
                        <div className="w-24 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                            {slot}
                        </div>
                        <div className="flex-1">
                            {currentAssignments[idx] ? (
                                <div className="bg-navy-900 text-white px-4 py-2 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-lg animate-scale-in">
                                    {currentAssignments[idx]}
                                    <button
                                        onClick={() => {
                                            const next = [...currentAssignments];
                                            next[idx] = '';
                                            onAnswerChange(next.join(','));
                                        }}
                                        className="hover:text-rose-400 transition-colors"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <span className="text-xs text-slate-300 italic">Arraste um funcionário aqui</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
