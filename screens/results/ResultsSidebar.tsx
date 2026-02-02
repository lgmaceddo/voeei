
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
        <div className="space-y-4 sticky top-6">
            {/* Quick Navigation Card */}
            <div className="bg-white p-2 rounded-[2rem] border border-slate-200 shadow-sm flex gap-2">
                <Button
                    variant="outline"
                    onClick={onPrev}
                    disabled={!canPrev}
                    className="flex-1 rounded-2xl py-6"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <Button
                    variant="primary"
                    onClick={onNext}
                    disabled={!canNext}
                    className="flex-[2] rounded-2xl py-6"
                >
                    Próxima <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            </div>

            {/* Favorite Action Card */}
            <div className={`p-1 rounded-[2.5rem] transition-all duration-500 ${isFavorite ? 'bg-amber-400' : 'bg-slate-100'}`}>
                <button
                    onClick={onToggleFavorite}
                    className={`w-full font-black py-6 rounded-[2.3rem] transition-all flex items-center justify-center gap-3 active:scale-95 border-b-4 ${isFavorite
                            ? 'bg-amber-500 text-white border-amber-600 shadow-xl shadow-amber-200'
                            : 'bg-white text-slate-700 border-slate-200 shadow-sm hover:translate-y-[-2px]'
                        }`}
                >
                    <Star className={`w-5 h-5 ${isFavorite ? 'fill-white' : 'fill-slate-100 text-slate-300'}`} />
                    {isFavorite ? 'SALVA NOS FAVORITOS' : 'FAVORITAR QUESTÃO'}
                </button>
            </div>

            {/* Main Actions Panel */}
            <div className="bg-navy-900 p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700">
                    <ShieldCheck className="w-24 h-24" />
                </div>

                <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                    Ações de Aprovação
                </h3>

                <div className="space-y-3 relative z-10">
                    <Button
                        onClick={onReview}
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-2xl py-5 shadow-xl shadow-primary-900/40 text-sm font-black tracking-tight"
                    >
                        <BookOpen className="w-4 h-4 mr-2" /> REVISÃO COMPLETA
                    </Button>

                    <Button
                        onClick={onRetry}
                        variant="ghost"
                        className="w-full text-slate-300 hover:text-white hover:bg-white/10 rounded-2xl py-4 transition-all"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" /> REFAZER ESTE SIMULADO
                    </Button>

                    <Button
                        onClick={onNewExam}
                        variant="ghost"
                        className="w-full text-slate-300 hover:text-white hover:bg-white/10 rounded-2xl py-4 transition-all"
                    >
                        <List className="w-4 h-4 mr-2" /> ESCOLHER NOVO CURSO
                    </Button>

                    <div className="h-px bg-white/10 my-4" />

                    <Button
                        onClick={onHome}
                        variant="ghost"
                        className="w-full text-slate-400 hover:text-white rounded-2xl py-3 text-xs font-black tracking-widest uppercase"
                    >
                        <Home className="w-4 h-4 mr-2" /> VOLTAR AO PAINEL
                    </Button>
                </div>
            </div>

            <div className="text-center py-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    ID Transação: SIM-{Date.now().toString().slice(-6)}
                </p>
            </div>
        </div>
    );
};
