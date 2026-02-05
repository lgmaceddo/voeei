
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
        <div className="space-y-6 animate-fade-in relative">
            {/* Header Area */}
            <div className="flex justify-between items-center mb-1">
                <h4 className="text-[14px] font-bold text-[#7d7d8a] capitalize">Hoje</h4>
                <button
                    onClick={() => onAnswerChange('')}
                    className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                    title="Limpar Agendamento"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>

            {/* Main Schedule Container */}
            <div className="space-y-1">
                <div className="relative">
                    {/* The Bar - High Contrast Tabular Style */}
                    <div className="flex border-t border-b border-l border-black h-12 w-full bg-white">
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
                                    className={`flex-1 border-r border-black relative transition-colors cursor-pointer
                                        ${busySlot ? 'bg-[#8b8b9a]' : 'bg-white hover:bg-slate-50'}
                                    `}
                                >
                                    {isStartOfTask && taskAtSlot && (
                                        <div
                                            style={{
                                                width: `calc(${taskAtSlot.duration * 100}% - 4px)`,
                                                backgroundColor: taskAtSlot.color,
                                                left: '2px'
                                            }}
                                            className="absolute top-1 bottom-1 z-20 rounded shadow-sm flex items-center justify-center px-1 group transition-all duration-200"
                                        >
                                            <div className="flex flex-col items-center min-w-0 text-center">
                                                <span className="text-[8px] font-black text-white uppercase leading-tight truncate">
                                                    {taskAtSlot.title.split(' ')[0]}
                                                </span>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleRemove(taskIdAtSlot); }}
                                                className="absolute -right-2 -top-2 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white z-30 text-[10px]"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Timeline Labels - Precisely Aligned to Box Borders */}
                    <div className="relative w-full h-6 mt-1">
                        {hours.map((h: string, idx: number) => (
                            <div
                                key={h}
                                style={{
                                    left: `${(idx * (100 / (hours.length - 1)))}%`,
                                    transform: idx === hours.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)'
                                }}
                                className={`absolute top-0 text-[12px] font-bold text-[#7d7d8a] ${idx === 0 ? 'translate-x-0' : ''}`}
                            >
                                {h}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Draggable Tasks Bank - List Style like Reference Photo */}
            <div className="pt-4">
                <div className="flex flex-col gap-3">
                    {tasks.map((task: any) => {
                        const isAssigned = !!currentPositions[task.id];
                        return (
                            <div
                                key={task.id}
                                draggable={!isAssigned}
                                onDragStart={(e) => handleDragStart(e, task.id)}
                                className={`group relative bg-white border border-slate-100 rounded shadow-sm transition-all overflow-hidden
                                    ${isAssigned
                                        ? 'opacity-40 grayscale cursor-not-allowed'
                                        : 'hover:border-slate-300 cursor-grab active:cursor-grabbing hover:shadow-md'
                                    }
                                `}
                            >
                                <div className="flex items-center h-14">
                                    {/* Color Indicator Strip */}
                                    <div
                                        style={{ backgroundColor: task.color }}
                                        className="w-4 h-full shrink-0"
                                    />

                                    <div className="flex-1 flex justify-between items-center px-6">
                                        <span className="text-[15px] font-bold text-slate-700">
                                            {task.title}
                                        </span>
                                        <span className="text-[13px] font-medium text-slate-400 italic">
                                            {task.duration === 1
                                                ? '30 min'
                                                : `${(task.duration / 2).toString().replace('.', ',')} h`
                                            }
                                        </span>
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
