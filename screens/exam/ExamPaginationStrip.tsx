
import React, { useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import { Question } from '../../types';

interface ExamPaginationStripProps {
    questions: Question[];
    currentQuestionIndex: number;
    answers: Record<number, number>;
    onNavigate: (index: number) => void;
}

export const ExamPaginationStrip: React.FC<ExamPaginationStripProps> = ({
    questions,
    currentQuestionIndex,
    answers,
    onNavigate
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            const button = scrollRef.current.children[currentQuestionIndex] as HTMLElement;
            if (button) {
                const container = scrollRef.current;
                const scrollLeft = button.offsetLeft - container.offsetWidth / 2 + button.offsetWidth / 2;
                container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        }
    }, [currentQuestionIndex]);

    const getStatus = (index: number) => {
        const qId = questions[index].id;
        const ansIdx = answers[qId];
        if (ansIdx === undefined) return 'unanswered';
        return ansIdx === questions[index].correctIndex ? 'correct' : 'incorrect';
    };

    return (
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200 mb-10 overflow-hidden relative group">
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto p-1 scrollbar-hide snap-x relative z-10"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {questions.map((_, idx) => {
                    const active = idx === currentQuestionIndex;
                    const status = getStatus(idx);

                    return (
                        <button
                            key={idx}
                            onClick={() => onNavigate(idx)}
                            className={`
                                relative flex-shrink-0 w-12 h-14 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center snap-center active:scale-95 group/btn
                                ${active
                                    ? 'bg-cyan-600 text-white shadow-md'
                                    : status !== 'unanswered'
                                        ? 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-cyan-400'
                                        : 'bg-white text-slate-400 border border-slate-100 hover:border-cyan-300'}
                            `}
                        >
                            <span className="text-xs font-black elite-heading tracking-tighter">{String(idx + 1).padStart(2, '0')}</span>

                            {/* Technical Status Overlay */}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1 items-center">
                                {status === 'correct' && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
                                )}
                                {status === 'incorrect' && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white shadow-sm" />
                                )}
                            </div>
                        </button>
                    )
                })}
            </div>

            {/* Tactical Control Overlay */}
            <div className="mt-4 flex justify-between items-center border-t border-slate-100 pt-4 opacity-50">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Acerto</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-500" />
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Erro</span>
                    </div>
                </div>
                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Sequenciador de Questões</div>
            </div>
        </div>
    );
};
