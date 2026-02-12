
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
                <div className="flex flex-col items-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Setor {idx}</span>
                    <div className="w-8 h-8 rounded-lg border-2 border-dashed border-slate-300" />
                </div>
            );
        }

        const personName = currentAssignments[idx];
        const personIdx = items.indexOf(personName);

        return (
            <div className="flex flex-col items-center gap-2 animate-[scaleIn_0.3s_ease-out] relative group/assigned">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-cyan-500 shadow-sm relative z-10 transition-transform group-hover/assigned:scale-110">
                    <img
                        src={photos?.[personIdx]}
                        alt={personName}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={() => handleRemove(idx)}
                        className="absolute inset-0 bg-rose-600/90 text-white opacity-0 group-hover/assigned:opacity-100 transition-opacity flex items-center justify-center font-black text-2xl"
                    >
                        ×
                    </button>
                </div>
                <span className="text-[10px] font-black text-cyan-700 uppercase tracking-tighter elite-heading leading-none bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">{personName}</span>
            </div>
        );
    };

    return (
        <div className="space-y-8 animate-fade-in relative z-10">
            {/* Mission Intel: Tactical Assignment Rules */}
            <div className="overflow-hidden border border-slate-200 rounded-[2rem] bg-white shadow-sm">
                <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocolo de Alocação</span>
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-50" />
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-20" />
                    </div>
                </div>
                <table className="w-full">
                    <tbody>
                        {items.map((name: string, i: number) => (
                            <tr key={name} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors group">
                                <td className="w-16 p-4">
                                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 group-hover:border-cyan-500/50 transition-all shadow-sm">
                                        <img
                                            src={photos?.[i] || `https://ui-avatars.com/api/?name=${name}&background=random`}
                                            alt={name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="w-32 px-4 py-1 font-black text-xs text-slate-800 elite-heading uppercase group-hover:text-cyan-600 transition-colors">
                                    {name}
                                </td>
                                <td className="px-6 py-1 text-sm font-bold text-slate-500 italic tracking-wide leading-relaxed">
                                    {rules?.[i] || "Protocolo de carga indefinido."}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Tactical Grid Map - Office Floor Plan */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-l-2 border-cyan-600 pl-4 py-1">
                    <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mapa Tático de Disposição</h4>
                        <p className="text-sm font-bold text-slate-600 italic tracking-wide">Arraste os agentes para seus respectivos setores baseado no tempo de serviço operacional.</p>
                    </div>
                    <button
                        onClick={() => onAnswerChange('')}
                        className="bg-slate-100 p-3 rounded-2xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-95 group"
                        title="Resetar Agendamento"
                    >
                        <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                    </button>
                </div>

                <div className="flex border border-slate-200 rounded-[3rem] overflow-hidden w-full max-w-4xl mx-auto bg-slate-50 min-h-[300px] shadow-inner relative">
                    {/* Left Wing: Sectors 1, 2, 3 */}
                    <div className="flex flex-col w-[45%]">
                        {[1, 2, 3].map((idx) => (
                            <div
                                key={idx}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, idx)}
                                className={`flex-1 border-r border-slate-200 flex items-center justify-center relative p-6 transition-all group/sector
                                    ${idx !== 3 ? 'border-b' : ''}
                                    ${!!currentAssignments[idx] ? 'bg-white shadow-inner' : 'hover:bg-slate-100/50'}
                                `}
                            >
                                {renderOfficeContent(idx)}
                                <div className="absolute top-4 left-4 text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">WING_L_0{idx}</div>
                            </div>
                        ))}
                    </div>

                    {/* Tactical Corridor */}
                    <div className="w-[10%] border-r border-slate-200 bg-slate-100/50 flex items-center justify-center">
                        <div className="h-[80%] w-px bg-slate-200" />
                    </div>

                    {/* Right Wing: Sectors 4, 5 */}
                    <div className="flex flex-col w-[45%]">
                        {[4, 5].map((idx) => (
                            <div
                                key={idx}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, idx)}
                                className={`flex-1 flex items-center justify-center relative p-6 transition-all group/sector
                                    ${idx !== 5 ? 'border-b border-slate-200' : ''}
                                    ${!!currentAssignments[idx] ? 'bg-white shadow-inner' : 'hover:bg-slate-100/50'}
                                `}
                            >
                                {renderOfficeContent(idx)}
                                <div className="absolute top-4 right-4 text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">WING_R_0{idx}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tactical Deployment Tray: Agents per Segment */}
            <div className="pt-10 border-t border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 block text-center">Agentes Disponíveis para Emprego</span>
                <div className="flex flex-wrap gap-4 justify-center">
                    {items.map((name: string, i: number) => {
                        if (Object.values(currentAssignments).includes(name)) return null;

                        return (
                            <div
                                key={name}
                                draggable
                                onDragStart={(e) => handleDragStart(e, name)}
                                className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center gap-4 cursor-grab active:cursor-grabbing hover:border-cyan-500 hover:shadow-md transition-all group/card"
                            >
                                <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-100 shrink-0 group-hover/card:scale-110 transition-transform">
                                    <img
                                        src={photos?.[i]}
                                        alt={name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="pr-4">
                                    <span className="text-[10px] font-black text-slate-800 elite-heading uppercase leading-none block group-hover:text-cyan-600 transition-colors">{name}</span>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">QUALIFIED_AGENT</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
