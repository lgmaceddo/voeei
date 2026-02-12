
import React from 'react';
import { ArrowLeft, ArrowRight, Star, BookOpen, RefreshCw, List, Home, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface ResultsSidebarProps {
    isFavorite: boolean;
    currentQuestionNum: number;
    onToggleFavorite: () => void;
    onReview: () => void;
    onRetry: () => void;
    onNewExam: () => void;
    onHome: () => void;
    onNext: () => void;
    onPrev: () => void;
    canNext: boolean;
    canPrev: boolean;
}

export const ResultsSidebar: React.FC<ResultsSidebarProps> = ({
    isFavorite,
    currentQuestionNum,
    onToggleFavorite,
    onReview,
    onRetry,
    onNewExam,
    onHome,
    onNext,
    onPrev,
    canNext,
    canPrev
}) => {
    return (
        <div className="space-y-6 sticky top-8">
            {/* Quick Navigation Panel */}
            <div className="bg-white p-4 rounded-[2.5rem] border border-slate-200 shadow-sm flex gap-3 group relative overflow-hidden">
                <button
                    onClick={onPrev}
                    disabled={!canPrev}
                    className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl py-6 flex items-center justify-center transition-all disabled:opacity-30 border border-slate-100 active:scale-95 group/prev"
                >
                    <ArrowLeft className="w-6 h-6 group-hover/prev:-translate-x-1 transition-transform" />
                </button>
                <button
                    onClick={onNext}
                    disabled={!canNext}
                    className="flex-[2] bg-cyan-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl py-6 flex items-center justify-center transition-all disabled:opacity-30 shadow-md active:scale-95 group/next"
                >
                    PRÓXIMA <ArrowRight className="w-5 h-5 ml-3 group-hover/next:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Favorite Action */}
            <div className={`p-1 rounded-[2.5rem] transition-all duration-700 ${isFavorite ? 'bg-amber-100 border border-amber-200 scale-[1.02]' : 'bg-white border border-slate-200'}`}>
                <button
                    onClick={onToggleFavorite}
                    className={`w-full font-black py-7 rounded-[2.35rem] transition-all duration-300 flex items-center justify-center gap-4 active:scale-95 ${isFavorite
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'bg-transparent text-slate-400 hover:text-slate-700'
                        }`}
                >
                    <Star className={`w-6 h-6 ${isFavorite ? 'fill-white' : 'text-slate-300'}`} />
                    <span className="text-[10px] uppercase tracking-widest">{isFavorite ? 'Favoritada' : 'Marcar para Revisão'}</span>
                </button>
            </div>

            {/* Main Operations Control */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-3 h-3 bg-cyan-600 rounded-full shadow-sm" />
                    <h3 className="text-slate-800 font-black text-[10px] uppercase tracking-widest elite-heading">Ações do Simulado</h3>
                </div>

                <div className="space-y-4 relative z-10">
                    <button
                        onClick={onReview}
                        className="w-full bg-slate-50 hover:bg-cyan-600 text-slate-600 hover:text-white rounded-2xl py-6 border border-slate-200 hover:border-cyan-700 font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-sm group/review flex items-center justify-center gap-3"
                    >
                        <BookOpen className="w-5 h-5 group-hover/review:scale-110 transition-transform" /> Revisão Completa
                    </button>

                    <button
                        onClick={onRetry}
                        className="w-full text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-50 rounded-2xl py-5 border border-slate-100 hover:border-slate-200 font-black text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 group/retry"
                    >
                        <RefreshCw className="w-4 h-4 group-hover/retry:rotate-180 transition-transform duration-700" /> Refazer Missão
                    </button>

                    <button
                        onClick={onNewExam}
                        className="w-full text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-50 rounded-2xl py-5 border border-slate-100 hover:border-slate-200 font-black text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3"
                    >
                        <List className="w-4 h-4" /> Novo Simulado
                    </button>

                    <div className="h-px bg-slate-100 my-8" />

                    <button
                        onClick={onHome}
                        className="w-full text-slate-400 hover:text-cyan-700 transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 group/home"
                    >
                        <Home className="w-4 h-4 group-hover/home:-translate-y-1 transition-transform" /> Início
                    </button>
                </div>
            </div>

            <div className="text-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                    ID: SIM-{Date.now().toString().slice(-6)}
                </p>
            </div>
        </div>
    );
};
