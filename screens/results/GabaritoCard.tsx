
import React, { useState, useEffect } from 'react';
import { Check, X, BookOpen, Eye, EyeOff } from 'lucide-react';
import { Question } from '../../types';

interface GabaritoCardProps {
    question: Question;
    userAnswerIndex?: number;
}

export const GabaritoCard: React.FC<GabaritoCardProps> = ({
    question,
    userAnswerIndex
}) => {
    const [showExplanation, setShowExplanation] = useState(false);

    useEffect(() => {
        setShowExplanation(false);
    }, [question.id]);

    const correctIndex = question.correctIndex;

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="p-8 border-b border-slate-100 bg-slate-50/30">
                <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-navy-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                        Questão Oficial
                    </span>
                    {userAnswerIndex === correctIndex ? (
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-lg">Você Acertou</span>
                    ) : (
                        <span className="px-3 py-1 bg-rose-100 text-rose-700 text-[10px] font-black uppercase tracking-widest rounded-lg">Você Errou</span>
                    )}
                </div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight leading-relaxed">
                    {question.text}
                </h2>
            </div>

            <div className="p-8 space-y-4">
                {question.options.map((option, idx) => {
                    const isOptCorrect = idx === correctIndex;
                    const isOptSelected = idx === userAnswerIndex;

                    let bgClass = "border-slate-100 bg-slate-50/20 opacity-40 grayscale-[0.5]";
                    let letterClass = "bg-slate-200 text-slate-400";
                    let icon = null;

                    if (isOptCorrect) {
                        bgClass = "border-emerald-500 bg-emerald-50/50 shadow-lg shadow-emerald-50 opacity-100";
                        letterClass = "bg-emerald-500 text-white";
                        icon = <Check className="w-5 h-5 text-emerald-600" strokeWidth={3} />;
                    } else if (isOptSelected && !isOptCorrect) {
                        bgClass = "border-rose-500 bg-rose-50 opacity-100";
                        letterClass = "bg-rose-500 text-white";
                        icon = <X className="w-5 h-5 text-rose-600" strokeWidth={3} />;
                    }

                    return (
                        <div
                            key={idx}
                            className={`relative flex items-center p-5 rounded-2xl border-2 transition-all duration-500 ${bgClass}`}
                        >
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0 shadow-sm transition-all duration-500 ${letterClass}`}>
                                {String.fromCharCode(65 + idx)}
                            </div>

                            <span className={`flex-1 font-bold ml-5 text-base leading-snug ${isOptCorrect ? 'text-emerald-900' : 'text-slate-600'}`}>
                                {option}
                            </span>

                            {icon && <div className="ml-3 animate-in zoom-in fade-in duration-300">{icon}</div>}
                        </div>
                    )
                })}
            </div>

            {/* Smart Explanation Toggle */}
            <div className="px-8 pb-8 pt-2">
                {!showExplanation ? (
                    <button
                        onClick={() => setShowExplanation(true)}
                        className="w-full flex items-center justify-center gap-2 text-primary-600 font-black uppercase tracking-widest text-[10px] bg-primary-50 hover:bg-primary-100 p-4 rounded-xl transition-all duration-300"
                    >
                        <Eye className="w-4 h-4" /> Ver Análise Técnica do Gabarito
                    </button>
                ) : (
                    <div className="animate-fade-in-down">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2 text-primary-700 font-black text-[10px] uppercase tracking-[0.2em]">
                                <BookOpen className="w-4 h-4" />
                                Gabarito Comentado
                            </div>
                            <button
                                onClick={() => setShowExplanation(false)}
                                className="text-slate-400 hover:text-slate-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                            >
                                <EyeOff className="w-3 h-3" /> Ocultar
                            </button>
                        </div>
                        <div className="bg-primary-50/50 border border-primary-100 rounded-[2rem] p-6 shadow-sm ring-4 ring-primary-50/20">
                            <p className="text-slate-700 leading-relaxed font-medium">
                                {question.explanation}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
