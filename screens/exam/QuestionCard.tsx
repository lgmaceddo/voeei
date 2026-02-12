
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
        <div className="bg-white rounded-[3rem] shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-200 overflow-hidden mb-10 transition-all duration-700 relative group/card">
            {/* Elite Question Header - Briefing Unit */}
            <div className="p-8 lg:p-12 border-b border-slate-100 bg-slate-50 relative">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Unidade de Conhecimento</span>
                    </div>
                </div>
                <h2 className="text-2xl font-black text-slate-800 elite-heading tracking-tighter leading-tight uppercase">
                    {question.text}
                </h2>
            </div>

            {/* Tactical Options List - Telemetry Input */}
            <div className="p-8 lg:p-12 space-y-4">
                {question.options.map((option, idx) => {
                    const isSelected = answer === idx;
                    const isCorrect = idx === question.correctIndex;
                    const showResult = isAnswered && showAnswerKey;

                    let bgClass = "bg-white border-slate-200 hover:border-cyan-500/40 hover:bg-slate-50 shadow-sm";
                    let letterClass = "bg-slate-100 text-slate-400 border border-slate-200 group-hover:text-cyan-600 group-hover:border-cyan-200";
                    let icon = null;

                    if (showResult) {
                        if (isCorrect) {
                            bgClass = "bg-emerald-50 border-emerald-200 text-emerald-900";
                            letterClass = "bg-emerald-500 text-white border-emerald-400";
                            icon = <Check className="w-5 h-5 text-emerald-600" strokeWidth={3} />;
                        } else if (isSelected) {
                            bgClass = "bg-rose-50 border-rose-200 text-rose-900";
                            letterClass = "bg-rose-500 text-white border-rose-400";
                            icon = <X className="w-5 h-5 text-rose-600" strokeWidth={3} />;
                        }
                    } else if (isSelected) {
                        bgClass = "bg-cyan-50 border-cyan-300 text-cyan-900";
                        letterClass = "bg-cyan-500 text-white border-cyan-400";
                    }

                    return (
                        <button
                            key={idx}
                            disabled={isAnswered}
                            onClick={() => onSelectOption(idx)}
                            className={`
                                w-full text-left group flex items-center p-6 rounded-[2rem] border transition-all duration-300 active:scale-[0.99]
                                ${bgClass}
                            `}
                        >
                            <div className={`
                                w-11 h-11 rounded-2xl flex items-center justify-center text-lg font-black flex-shrink-0 transition-all
                                ${letterClass}
                            `}>
                                {String.fromCharCode(65 + idx)}
                            </div>

                            <span className={`ml-6 text-base font-bold flex-1 leading-snug transition-colors duration-300 ${showResult && isCorrect ? 'text-emerald-700' : isSelected && !showResult ? 'text-cyan-700' : 'text-slate-700'}`}>
                                {option}
                            </span>

                            <div className="flex-shrink-0 ml-4">
                                {icon}
                                {!icon && (
                                    <div className="w-6 h-6 rounded-full border border-slate-200 group-hover:border-cyan-500/50 transition-all flex items-center justify-center">
                                        <div className={`w-2 h-2 rounded-full transition-all ${isSelected ? 'bg-cyan-500 scale-100' : 'bg-transparent scale-0'}`} />
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Tactical Intelligence Module - Explanation HUD */}
            {isAnswered && showExplanation && (
                <div className="px-8 lg:px-12 pb-12 animate-fade-in-up">
                    <div className="bg-cyan-50 border border-cyan-100 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden group/intel">
                        <div className="flex items-center gap-3 mb-4 text-cyan-700 font-black text-[10px] uppercase tracking-widest">
                            <BookOpen className="w-4 h-4" />
                            Explicação Técnica
                        </div>
                        <p className="text-slate-600 leading-relaxed font-bold italic text-base relative z-10">
                            {question.explanation}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
