
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
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 mb-6">
            <div
                ref={scrollRef}
                className="flex gap-2 overflow-x-auto p-1 scrollbar-hide snap-x"
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
                                relative flex-shrink-0 w-10 h-11 rounded-xl transition-all flex flex-col items-center justify-center snap-center active:scale-95
                                ${active
                                    ? 'bg-navy-900 text-white shadow-lg ring-4 ring-primary-500/10'
                                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'}
                            `}
                        >
                            <span className="text-xs font-black">{idx + 1}</span>
                            <div className="absolute -bottom-1">
                                {status === 'correct' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />}
                                {status === 'incorrect' && <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.5)]" />}
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};
