
import React from 'react';
import { RotateCcw } from 'lucide-react';
import { DeductiveChallenge } from '../../types';

interface DeductiveSchedulingProps {
    challenge: DeductiveChallenge;
    answer: string;
    onAnswerChange: (answer: string) => void;
}

export const DeductiveScheduling: React.FC<DeductiveSchedulingProps> = ({ challenge, answer, onAnswerChange }) => {
    const { busy, tasks, hours } = challenge.data;

    // hours=[9, 10, ... 18] -> 18 slots (9 hours * 2)
    const allSlots: string[] = [];
    for (let i = 0; i < hours.length - 1; i++) {
        allSlots.push(`${hours[i]}:00`);
        allSlots.push(`${hours[i]}:30`);
    }

    // Parse answer: "t1:5,t2:10"
    const currentPositions: Record<string, number> = {};
    if (answer) {
        answer.split(',').forEach(part => {
            const [id, pos] = part.split(':');
            currentPositions[id] = parseInt(pos);
        });
    }

    const isSlotOccupied = (slotIdx: number, excludeTaskId?: string) => {
        if (busy.includes(slotIdx)) return true;

        return Object.entries(currentPositions).some(([id, pos]) => {
            if (id === excludeTaskId) return false;
            const task = tasks.find((t: any) => t.id === id);
            if (!task) return false;
            // Task occupies [pos, pos + duration - 1]
            return slotIdx >= pos && slotIdx < pos + task.duration;
        });
    };

    const handleDragStart = (e: React.DragEvent, taskId: string) => {
        e.dataTransfer.setData('taskId', taskId);
    };

    const handleDrop = (e: React.DragEvent, slotIdx: number) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        const task = tasks.find((t: any) => t.id === taskId);

        if (!task) return;

        // Check if task fits (don't go out of bounds)
        if (slotIdx + task.duration > allSlots.length) return;

        // Check if collision with busy or other tasks
        for (let i = 0; i < task.duration; i++) {
            if (isSlotOccupied(slotIdx + i, taskId)) return;
        }

        const newPositions = { ...currentPositions, [taskId]: slotIdx };
        const answerStr = Object.entries(newPositions)
            .map(([id, pos]) => `${id}:${pos}`)
            .join(',');

        onAnswerChange(answerStr);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleRemove = (taskId: string) => {
        const newPositions = { ...currentPositions };
        delete newPositions[taskId];
        const answerStr = Object.entries(newPositions)
            .map(([id, pos]) => `${id}:${pos}`)
            .join(',');
        onAnswerChange(answerStr);
    };

    return (
        <div className="space-y-8 animate-fade-in relative z-10">
            {/* Mission Controller Header */}
            <div className="flex items-center justify-between border-l-2 border-cyan-600 pl-4 py-1">
                <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Protocolo de Agendamento</h4>
                    <p className="text-sm font-bold text-slate-600 italic tracking-wide">Planeje a sequência operacional baseada nas restrições de tempo.</p>
                </div>
                <button
                    onClick={() => onAnswerChange('')}
                    className="bg-slate-100 p-3 rounded-2xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-95 group"
                    title="Resetar Cronograma"
                >
                    <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                </button>
            </div>

            {/* Tactical Schedule Grid */}
            <div className="relative">
                <div className="rounded-[3rem] p-1.5 bg-slate-50 border border-slate-200 shadow-inner overflow-hidden">
                    <div className="flex bg-white h-24 relative overflow-hidden group/grid">
                        {allSlots.map((_time, sIdx) => {
                            const busySlot = busy.includes(sIdx);
                            const taskIdAtSlot = Object.entries(currentPositions).find(([id, pos]) => {
                                const task = tasks.find((t: any) => t.id === id);
                                return sIdx >= pos && sIdx < pos + (task?.duration || 0);
                            })?.[0];
                            const taskAtSlot = taskIdAtSlot ? tasks.find((t: any) => t.id === taskIdAtSlot) : null;
                            const isStartOfTask = taskIdAtSlot && currentPositions[taskIdAtSlot] === sIdx;

                            return (
                                <div
                                    key={sIdx}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, sIdx)}
                                    className={`flex-1 border-r border-slate-100 last:border-r-0 relative transition-all duration-300
                                        ${busySlot ? 'bg-slate-100 opacity-60' : 'bg-transparent hover:bg-slate-50 cursor-pointer'}
                                    `}
                                >
                                    {isStartOfTask && taskAtSlot && (
                                        <div
                                            style={{
                                                width: `calc(${taskAtSlot.duration * 100}% + ${taskAtSlot.duration - 1}px)`,
                                                backgroundColor: taskAtSlot.color
                                            }}
                                            className="absolute inset-0 z-20 flex items-center px-6 group/task shadow-md border-x border-white/20 animate-[scaleIn_0.3s_ease-out]"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-white mr-3 animate-pulse" />
                                            <span className="text-[10px] font-black text-white elite-heading uppercase tracking-widest truncate pointer-events-none">
                                                {taskAtSlot.title}
                                            </span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleRemove(taskIdAtSlot); }}
                                                className="absolute -right-3 -top-3 w-8 h-8 rounded-xl bg-white text-rose-600 flex items-center justify-center opacity-0 group-hover/task:opacity-100 transition-all border border-slate-200 shadow-lg z-40 hover:bg-rose-500 hover:text-white active:scale-90"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Tactical Telemetry Labels */}
                <div className="flex relative mt-6 h-8 px-6">
                    {hours.slice(0, -1).map((h: string, idx: number) => (
                        <div key={h} className="flex-1 relative">
                            <span className="absolute left-0 -translate-x-1/2 text-[10px] font-black text-slate-400 elite-heading uppercase tracking-widest">
                                {h}<span className="text-[8px] opacity-40 ml-0.5">H</span>
                            </span>
                        </div>
                    ))}
                    <div className="w-0 relative">
                        <span className="absolute left-0 -translate-x-1/2 text-[10px] font-black text-slate-400 elite-heading uppercase tracking-widest">
                            {hours[hours.length - 1]}<span className="text-[8px] opacity-40 ml-0.5">H</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Tactical Deployment Tray */}
            <div className="pt-10 border-t border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 block text-center">Unidades Operacionais para Emprego</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tasks.map((task: any) => {
                        const isAssigned = !!currentPositions[task.id];
                        return (
                            <div
                                key={task.id}
                                draggable={!isAssigned}
                                onDragStart={(e) => handleDragStart(e, task.id)}
                                className={`group relative flex items-center h-24 bg-white border border-slate-200 rounded-[2rem] transition-all duration-500 overflow-hidden shadow-sm
                                    ${isAssigned
                                        ? 'opacity-20 grayscale cursor-not-allowed shadow-none'
                                        : 'hover:border-cyan-400 hover:bg-slate-50 cursor-grab active:cursor-grabbing hover:scale-[1.02] hover:shadow-md'
                                    }
                                `}
                            >
                                {/* Tactical Side Pillar */}
                                <div style={{ backgroundColor: task.color }} className="w-3 h-full shrink-0 shadow-sm transition-all duration-500 group-hover:w-4" />

                                <div className="flex-1 flex items-center justify-between px-8">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-slate-800 elite-heading uppercase tracking-widest mb-1 group-hover:text-cyan-700 transition-colors">
                                            {task.title}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-600/30 group-hover:bg-cyan-600 animate-pulse" />
                                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Agente Disponível</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-black text-cyan-700 elite-heading tracking-widest">
                                            {task.duration === 1 ? '30M' : '60M'}
                                        </span>
                                        <span className="text-[8px] font-bold text-slate-300 uppercase mt-0.5 tracking-tighter">Duração</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
