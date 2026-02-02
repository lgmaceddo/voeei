
import React, { useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import { Question, ExamResult } from '../../types';

interface ResultsPaginationStripProps {
    questions: Question[];
    result: ExamResult;
    currentQuestionIdx: number;
    onNavigate: (index: number) => void;
}

export const ResultsPaginationStrip: React.FC<ResultsPaginationStripProps> = ({
    questions,
    result,
    currentQuestionIdx,
    onNavigate
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            const button = scrollRef.current.children[currentQuestionIdx] as HTMLElement;
            if (button) {
                const container = scrollRef.current;
                const scrollLeft = button.offsetLeft - container.offsetWidth / 2 + button.offsetWidth / 2;
                container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        }
    }, [currentQuestionIdx]);

    return (
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 mb-6">
            <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto p-1 scrollbar-hide snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {questions.map((q, idx) => {
                    const isCorrect = result.answers[q.id] === q.correctIndex;
                    const isActive = idx === currentQuestionIdx;
                    return (
                        <button
                            key={idx}
                            className="flex-shrink-0 flex flex-col items-center gap-1.5 snap-center group"
                            onClick={() => onNavigate(idx)}
                        >
                            <div className={`
                                w-11 h-11 rounded-xl text-sm font-black border-2 transition-all flex items-center justify-center active:scale-90
                                ${isActive
                                    ? 'bg-navy-900 text-white border-navy-900 shadow-xl shadow-navy-100 scale-110'
                                    : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300 hover:text-slate-600'}
                            `}
                            >
                                {idx + 1}
                            </div>
                            <div className="h-1 w-5 rounded-full overflow-hidden flex items-center justify-center">
                                {isCorrect ? (
                                    <div className="w-full h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                                ) : (
                                    <div className="w-full h-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                                )}
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};
