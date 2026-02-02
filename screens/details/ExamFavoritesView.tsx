
import React, { useState } from 'react';
import { Star, Play, Lock, AlertTriangle, BookOpen, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Question } from '../../types';

interface ExamFavoritesViewProps {
    favorites: Question[];
    onStartFavorites: () => void;
    onRemoveFavorite: (id: number) => void;
    minRequired: number;
}

export const ExamFavoritesView: React.FC<ExamFavoritesViewProps> = ({
    favorites,
    onStartFavorites,
    onRemoveFavorite,
    minRequired
}) => {
    const [questionToRemove, setQuestionToRemove] = useState<number | null>(null);

    const canGenerate = favorites.length >= minRequired;
    const missing = minRequired - favorites.length;

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header / CTA Area */}
            <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
                {/* Decorative BG */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 opacity-10 rounded-full blur-[80px]" />

                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center text-primary-400 backdrop-blur-md border border-white/10 shadow-inner">
                        <Star className="w-8 h-8 fill-current" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight leading-tight">Review de Elite</h3>
                        <p className="text-slate-400 font-bold text-sm mt-1">
                            Você possui <span className="text-white">{favorites.length}</span> questões preferenciais salvos.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 w-full md:w-auto">
                    {canGenerate ? (
                        <Button
                            onClick={onStartFavorites}
                            className="w-full md:w-auto bg-primary-500 hover:bg-primary-600 font-black py-6 px-10 rounded-2xl shadow-xl shadow-primary-500/20 transform active:scale-95 flex items-center gap-3 transition-all"
                        >
                            <Play className="w-5 h-5 fill-current" /> GERAR SIMULADO VIP
                        </Button>
                    ) : (
                        <div className="flex flex-col items-center md:items-end gap-3">
                            <Button
                                disabled
                                className="w-full md:w-auto bg-slate-800 text-slate-500 font-black py-6 px-10 rounded-2xl cursor-not-allowed flex items-center gap-3 grayscale"
                            >
                                <Lock className="w-5 h-5" /> BLOQUEADO
                            </Button>
                            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20 backdrop-blur-sm">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                Faltam {missing} questões para o nível elite
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Questions List */}
            <div className="grid gap-4">
                {favorites.length > 0 ? (
                    favorites.map((q, idx) => (
                        <div key={q.id} className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-100 hover:border-primary-100 transition-all group flex gap-6 items-start">
                            <div className="flex-shrink-0 w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-black text-xs group-hover:bg-primary-500 group-hover:text-white transition-all shadow-inner">
                                {idx + 1}
                            </div>
                            <div className="flex-1 pt-1">
                                <p className="text-slate-700 font-bold leading-relaxed">
                                    {q.text}
                                </p>
                            </div>
                            <button
                                onClick={() => setQuestionToRemove(q.id)}
                                className="flex-shrink-0 p-3 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all active:scale-90"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 p-20 text-center flex flex-col items-center gap-6">
                        <div className="w-20 h-20 bg-white rounded-[2rem] shadow-sm flex items-center justify-center text-slate-200 group">
                            <Star className="w-10 h-10 group-hover:text-primary-200 transition-colors" />
                        </div>
                        <div>
                            <p className="text-slate-400 font-black uppercase tracking-widest text-sm mb-1">Hangar Vazio</p>
                            <p className="text-slate-400 font-bold text-xs">Sua lista de favoritas ainda não possui questões salvas.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Removal Confirmation Modal */}
            {questionToRemove !== null && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-md" onClick={() => setQuestionToRemove(null)} />
                    <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 w-full max-w-sm relative z-10 animate-in zoom-in-95 duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-rose-50 p-6 rounded-[2rem] mb-6 shadow-inner">
                                <Trash2 className="w-10 h-10 text-rose-500" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tighter uppercase">Remover da Lista?</h3>
                            <p className="text-slate-500 mb-8 font-bold text-sm leading-relaxed px-4">
                                Esta questão deixará de fazer parte do seu banco de revisão personalizada.
                            </p>

                            <div className="flex flex-col w-full gap-3">
                                <Button
                                    onClick={() => {
                                        onRemoveFavorite(questionToRemove!);
                                        setQuestionToRemove(null);
                                    }}
                                    className="w-full bg-rose-600 hover:bg-rose-700 font-black py-5 rounded-2xl shadow-xl shadow-rose-100"
                                >
                                    SIM, REMOVER
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => setQuestionToRemove(null)}
                                    className="w-full text-slate-400 font-black uppercase tracking-widest text-[10px]"
                                >
                                    CANCELAR
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
