
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
        <div className="bg-[#1E293B]/40 backdrop-blur-xl rounded-[3rem] border border-white/5 overflow-hidden mb-10 shadow-2xl group relative">
            {/* Header Content */}
            <div className="p-10 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-4 mb-6">
                    <span className="px-5 py-2 bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-xl border border-cyan-500/20 shadow-lg">
                        ESPECIFICAÇÃO TÉCNICA
                    </span>
                    {userAnswerIndex === correctIndex ? (
                        <span className="px-5 py-2 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                            STATUS: CORRETO
                        </span>
                    ) : (
                        <span className="px-5 py-2 bg-rose-500/10 text-rose-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-xl border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                            STATUS: DIVERGENTE
                        </span>
                    )}
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight leading-relaxed elite-heading">
                    {question.text}
                </h2>
            </div>

            <div className="p-10 space-y-5">
                {question.options.map((option, idx) => {
                    const isOptCorrect = idx === correctIndex;
                    const isOptSelected = idx === userAnswerIndex;

                    let bgClass = "border-white/5 bg-white/[0.02] opacity-40 grayscale-[0.8]";
                    let letterClass = "bg-white/5 text-slate-500 border-white/5";
                    let textClass = "text-slate-500";
                    let icon = null;

                    if (isOptCorrect) {
                        bgClass = "border-emerald-500/30 bg-emerald-500/5 opacity-100 shadow-[0_0_20px_rgba(16,185,129,0.05)]";
                        letterClass = "bg-emerald-500 text-white border-emerald-400/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
                        textClass = "text-emerald-50";
                        icon = <Check className="w-5 h-5 text-emerald-400" strokeWidth={3} />;
                    } else if (isOptSelected && !isOptCorrect) {
                        bgClass = "border-rose-500/30 bg-rose-500/5 opacity-100 shadow-[0_0_20px_rgba(244,63,94,0.05)]";
                        letterClass = "bg-rose-500 text-white border-rose-400/20 shadow-[0_0_15px_rgba(244,63,94,0.3)]";
                        textClass = "text-rose-50";
                        icon = <X className="w-5 h-5 text-rose-400" strokeWidth={3} />;
                    }

                    return (
                        <div
                            key={idx}
                            className={`relative flex items-center p-6 rounded-[2rem] border transition-all duration-700 ${bgClass}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0 border transition-all duration-700 elite-heading ${letterClass}`}>
                                {String.fromCharCode(65 + idx)}
                            </div>

                            <span className={`flex-1 font-bold ml-6 text-lg leading-snug transition-colors duration-700 ${textClass}`}>
                                {option}
                            </span>

                            {icon && <div className="ml-4 animate-[zoomIn_0.3s_ease-out]">{icon}</div>}
                        </div>
                    )
                })}
            </div>

            {/* Smart Explanation Toggle */}
            <div className="px-10 pb-10 pt-2">
                {!showExplanation ? (
                    <button
                        onClick={() => setShowExplanation(true)}
                        className="w-full flex items-center justify-center gap-3 text-cyan-400 font-black uppercase tracking-[0.3em] text-[10px] bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/10 p-5 rounded-2xl transition-all duration-500 group/btn"
                    >
                        <Eye className="w-5 h-5 group-hover/btn:scale-110 transition-transform" /> ANALISAR FUNDAMENTAÇÃO TÉCNICA
                    </button>
                ) : (
                    <div className="animate-[slideDown_0.5s_ease-out]">
                        <div className="flex justify-between items-center mb-6 px-2">
                            <div className="flex items-center gap-3 text-cyan-500 font-black text-[10px] uppercase tracking-[0.4em]">
                                <BookOpen className="w-4 h-4" />
                                DEBRIEFING TÉCNICO
                            </div>
                            <button
                                onClick={() => setShowExplanation(false)}
                                className="text-slate-500 hover:text-cyan-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors group/hide"
                            >
                                <EyeOff className="w-4 h-4 group-hover/hide:scale-90 transition-transform" /> OCULTAR ANALISE
                            </button>
                        </div>
                        <div className="bg-[#0F172C]/80 border border-cyan-500/20 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group/exp">
                            {/* HUD Decor */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/5 to-transparent" />
                            <p className="text-slate-400 leading-relaxed font-bold italic tracking-wide relative z-10">
                                {question.explanation}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Elite Corner Accent */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    );
};
