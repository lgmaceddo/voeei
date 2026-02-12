
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
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 mb-10 shadow-sm relative overflow-hidden group">
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto p-2 scrollbar-hide snap-x relative z-10"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {questions.map((q, idx) => {
                    const userAnswer = result.answers[q.id];
                    const isCorrect = userAnswer === q.correctIndex;
                    const isActive = idx === currentQuestionIdx;
                    return (
                        <button
                            key={idx}
                            className="flex-shrink-0 flex flex-col items-center gap-3 snap-center group/btn"
                            onClick={() => onNavigate(idx)}
                        >
                            <div className={`
                                w-14 h-14 rounded-2xl text-base font-black border transition-all duration-300 flex items-center justify-center active:scale-90 elite-heading relative
                                ${isActive
                                    ? 'bg-cyan-600 text-white border-cyan-700 shadow-md scale-110'
                                    : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-slate-300 hover:text-slate-800'}
                            `}
                            >
                                {idx + 1}
                            </div>
                            <div className="h-1.5 w-8 rounded-full overflow-hidden flex items-center justify-center bg-slate-100 border border-slate-200 shadow-inner">
                                {isCorrect ? (
                                    <div className="w-full h-full bg-emerald-500" />
                                ) : (
                                    <div className="w-full h-full bg-rose-500" />
                                )}
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};
