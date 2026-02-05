
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
        <div className="space-y-12 animate-fade-in relative">
            {/* Header Area */}
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-[14px] font-black text-slate-700 uppercase tracking-widest px-2">HOJE</h4>
                <button
                    onClick={() => onAnswerChange('')}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                    title="Limpar Agendamento"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
            </div>

            {/* Main Schedule Container */}
            <div className="space-y-4">
                <div className="bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-3xl overflow-hidden pb-12">
                    {/* Grid Area */}
                    <div className="grid grid-cols-[repeat(18,1fr)] h-32">
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
                                    className={`border-r border-slate-100 last:border-r-0 relative transition-colors cursor-pointer
                                        ${busySlot ? 'bg-[#9ca3af]' : 'bg-white hover:bg-slate-50'}
                                    `}
                                >
                                    {isStartOfTask && taskAtSlot && (
                                        <div
                                            style={{
                                                width: `calc(${taskAtSlot.duration * 100}% - 4px)`,
                                                backgroundColor: taskAtSlot.color,
                                                left: '2px'
                                            }}
                                            className="absolute top-2 bottom-2 z-20 rounded-xl shadow-xl flex items-center px-4 group transition-all duration-300 hover:scale-[1.01]"
                                        >
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[10px] font-black text-white uppercase leading-none truncate mb-1">
                                                    {taskAtSlot.title}
                                                </span>
                                                <span className="text-[9px] font-bold text-white/80 uppercase">
                                                    {taskAtSlot.duration === 1 ? '30m' : '1h'}
                                                </span>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleRemove(taskIdAtSlot); }}
                                                className="absolute -right-3 -top-3 w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-4 border-white shadow-2xl z-30"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Timeline Labels - Unified Grid for Alignment */}
                    <div className="grid grid-cols-[repeat(18,1fr)] h-6 border-t border-slate-100 relative bg-white">
                        {hours.map((h: string, idx: number) => (
                            <div
                                key={h}
                                style={{ gridColumnStart: idx * 2 + 1 }}
                                className="relative h-full"
                            >
                                <span className="absolute left-0 -translate-x-1/2 top-4 text-[13px] font-black text-slate-500 whitespace-nowrap">
                                    {h}
                                </span>
                                <div className="absolute left-0 top-0 h-3 w-px bg-slate-200" />
                            </div>
                        ))}
                        {/* Last label 18 */}
                        <div style={{ gridColumnStart: 18 }} className="relative h-full">
                            <span className="absolute right-0 translate-x-1/2 top-4 text-[13px] font-black text-slate-500 whitespace-nowrap">
                                18
                            </span>
                            <div className="absolute right-0 top-0 h-3 w-px bg-slate-200" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Draggable Tasks Bank */}
            <div className="pt-8">
                <div className="flex items-center gap-6 mb-10">
                    <div className="h-px flex-1 bg-slate-200" />
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">TAREFAS DISPONÍVEIS</h4>
                    <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tasks.map((task: any) => {
                        const isAssigned = !!currentPositions[task.id];
                        return (
                            <div
                                key={task.id}
                                draggable={!isAssigned}
                                onDragStart={(e) => handleDragStart(e, task.id)}
                                className={`group relative p-6 bg-white border border-slate-100 rounded-[2.5rem] transition-all
                                    ${isAssigned
                                        ? 'opacity-40 grayscale cursor-not-allowed border-dashed shadow-none'
                                        : 'hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-slate-200 cursor-grab active:cursor-grabbing hover:scale-[1.02] shadow-sm'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-5">
                                    <div
                                        style={{ backgroundColor: task.color }}
                                        className="w-16 h-16 rounded-[1.5rem] shadow-lg flex items-center justify-center shrink-0 relative"
                                    >
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-[13px] font-black text-slate-800 truncate uppercase tracking-tight">
                                                {task.title}
                                            </span>
                                            <span className="text-[10px] font-black text-slate-500 uppercase bg-slate-100 px-3 py-1.5 rounded-xl whitespace-nowrap">
                                                {task.duration === 1 ? '30 MIN' : '1 H'}
                                            </span>
                                        </div>
                                        <p className="text-[11px] font-bold text-slate-400 italic">Arraste para agendar no grid</p>
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
