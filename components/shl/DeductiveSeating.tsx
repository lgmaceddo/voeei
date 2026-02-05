
import React from 'react';
import { DeductiveChallenge } from '../../types';

interface DeductiveSeatingProps {
    challenge: DeductiveChallenge;
    answer: string;
    onAnswerChange: (answer: string) => void;
}

export const DeductiveSeating: React.FC<DeductiveSeatingProps> = ({ challenge, answer, onAnswerChange }) => {
    const { people, positions } = challenge.data;
    const currentSeats = answer ? answer.split(',') : new Array(positions.length).fill('');

    const handleDragStart = (e: React.DragEvent, name: string) => {
        e.dataTransfer.setData('name', name);
    };

    const handleDrop = (e: React.DragEvent, posIdx: number) => {
        e.preventDefault();
        const name = e.dataTransfer.getData('name');

        const newSeats = [...currentSeats];
        const prevIdx = newSeats.indexOf(name);
        if (prevIdx !== -1) newSeats[prevIdx] = '';

        newSeats[posIdx] = name;
        onAnswerChange(newSeats.join(','));
    };

    return (
        <div className="space-y-12 py-8">
            {/* Table Visualization */}
            <div className="relative max-w-2xl mx-auto">
                {/* The Table */}
                <div className="h-32 bg-slate-100 rounded-[50px] border border-slate-200 flex items-center justify-around px-8 relative shadow-inner">
                    {positions.map((pos: number, idx: number) => (
                        <div
                            key={idx}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, idx)}
                            className={`w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center transition-all
                ${currentSeats[idx] ? 'border-primary-500 bg-white shadow-lg scale-110' : 'border-slate-300 bg-slate-50/50 hover:border-primary-300'}
              `}
                        >
                            {currentSeats[idx] ? (
                                <div className="text-[10px] font-black text-navy-900 text-center leading-tight">
                                    {currentSeats[idx]}
                                </div>
                            ) : (
                                <span className="text-[10px] text-slate-300 font-bold">{pos}</span>
                            )}
                        </div>
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-xs font-black text-slate-300 uppercase tracking-[0.3em]">Mesa de Operações</span>
                    </div>
                </div>
            </div>

            {/* People Bank */}
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Arraste as pessoas para seus assentos</h4>
                <div className="flex flex-wrap justify-center gap-4">
                    {people.map((name: string) => {
                        const isSeated = currentSeats.includes(name);
                        return (
                            <div
                                key={name}
                                draggable={!isSeated}
                                onDragStart={(e) => handleDragStart(e, name)}
                                className={`w-20 h-20 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all border shadow-sm
                  ${isSeated
                                        ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed opacity-50'
                                        : 'bg-white text-navy-900 border-slate-200 cursor-grab hover:border-primary-500 hover:-translate-y-1'
                                    }
                `}
                            >
                                <div className={`w-8 h-8 rounded-full ${isSeated ? 'bg-slate-200' : 'bg-primary-50'} flex items-center justify-center`}>
                                    <div className="w-4 h-4 rounded-full bg-primary-400 opacity-50" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-tighter">{name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
