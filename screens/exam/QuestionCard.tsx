
import React from 'react';
import { Check, X, BookOpen } from 'lucide-react';
import { Question } from '../../types';

interface QuestionCardProps {
    question: Question;
    answer?: number;
    showAnswerKey: boolean;
    showExplanation: boolean;
    onSelectOption: (index: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    answer,
    showAnswerKey,
    showExplanation,
    onSelectOption
}) => {
    const isAnswered = answer !== undefined;

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            {/* Question Text */}
            <div className="p-8 border-b border-slate-100 bg-slate-50/30">
                <h2 className="text-xl font-black text-slate-800 tracking-tight leading-relaxed">
                    {question.text}
                </h2>
            </div>

            {/* Options List */}
            <div className="p-8 space-y-4">
                {question.options.map((option, idx) => {
                    const isSelected = answer === idx;
                    const isCorrect = idx === question.correctIndex;
                    const showResult = isAnswered && showAnswerKey;

                    let bgClass = "bg-white border-slate-200 hover:border-primary-200 hover:bg-slate-50/50";
                    let letterClass = "bg-slate-100 text-slate-500";
                    let icon = null;

                    if (showResult) {
                        if (isCorrect) {
                            bgClass = "bg-emerald-50 border-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
                            letterClass = "bg-emerald-500 text-white";
                            icon = <Check className="w-5 h-5 text-emerald-500" />;
                        } else if (isSelected) {
                            bgClass = "bg-rose-50 border-rose-200";
                            letterClass = "bg-rose-500 text-white";
                            icon = <X className="w-5 h-5 text-rose-500" />;
                        }
                    } else if (isSelected) {
                        bgClass = "bg-primary-50 border-primary-500 shadow-[0_0_15px_rgba(14,165,233,0.1)]";
                        letterClass = "bg-primary-500 text-white";
                        icon = <Check className="w-4 h-4 text-primary-500" />;
                    }

                    return (
                        <button
                            key={idx}
                            disabled={isAnswered}
                            onClick={() => onSelectOption(idx)}
                            className={`
                                w-full text-left group flex items-center p-4 rounded-2xl border-2 transition-all duration-300 active:scale-[0.99]
                                ${bgClass}
                            `}
                        >
                            <div className={`
                                w-11 h-11 rounded-xl flex items-center justify-center text-lg font-black flex-shrink-0 transition-all duration-300
                                ${letterClass}
                                ${!isAnswered && 'group-hover:scale-110'}
                            `}>
                                {String.fromCharCode(65 + idx)}
                            </div>

                            <span className={`ml-5 text-base font-bold flex-1 leading-snug ${showResult && isCorrect ? 'text-emerald-900' : 'text-slate-700'}`}>
                                {option}
                            </span>

                            <div className="flex-shrink-0 ml-4">
                                {icon}
                                {!icon && <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-primary-400" />}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Explanation Section */}
            {isAnswered && showExplanation && (
                <div className="px-8 pb-8 animate-fade-in-down">
                    <div className="bg-primary-50/50 border border-primary-100 rounded-3xl p-6">
                        <div className="flex items-center gap-2 mb-3 text-primary-700 font-black text-xs uppercase tracking-[0.2em]">
                            <BookOpen className="w-4 h-4" />
                            Gabarito Comentado
                        </div>
                        <p className="text-slate-700 leading-relaxed font-medium">
                            {question.explanation}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
