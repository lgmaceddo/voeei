
import React from 'react';
import { Play, GraduationCap, Clock, CheckCircle2, ChevronLeft } from 'lucide-react';
import { ExamCategory } from '../types';

interface DeductiveLandingProps {
    category: ExamCategory;
    onStart: (mode: 'TRAINING' | 'SIMULATION') => void;
    onBack: () => void;
}

const DeductiveLanding: React.FC<DeductiveLandingProps> = ({ category, onStart, onBack }) => {
    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-3 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-navy-900 transition-all shadow-sm"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black text-navy-900 tracking-tight">{category.title}</h1>
                        <p className="text-slate-500 font-medium">Escolha como deseja praticar suas habilidades dedutivas.</p>
                    </div>
                </div>
            </div>

            {/* Modes Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Training Mode */}
                <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16" />

                    <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center mb-8 text-emerald-500 group-hover:scale-110 transition-transform duration-500">
                        <GraduationCap className="w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-black text-navy-900 mb-4 tracking-tight">Modo Treino</h3>
                    <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                        Pratique sem a pressão do relógio. Veja as explicações detalhadas logo após responder e domine a lógica por trás de cada desafio.
                    </p>

                    <ul className="space-y-4 mb-10">
                        <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <CheckCircle2 className="w-3 h-3" />
                            </div>
                            Sem limite de tempo
                        </li>
                        <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <CheckCircle2 className="w-3 h-3" />
                            </div>
                            Feedback imediato por questão
                        </li>
                        <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <CheckCircle2 className="w-3 h-3" />
                            </div>
                            Explicações lógicas completas
                        </li>
                    </ul>

                    <button
                        onClick={() => onStart('TRAINING')}
                        className="w-full py-5 bg-emerald-500 text-white font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3"
                    >
                        Iniciar Treinamento <Play className="w-4 h-4 fill-white" />
                    </button>
                </div>

                {/* Simulation Mode */}
                <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -mr-16 -mt-16" />

                    <div className="w-16 h-16 bg-primary-50 rounded-3xl flex items-center justify-center mb-8 text-primary-500 group-hover:scale-110 transition-transform duration-500">
                        <Clock className="w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-black text-navy-900 mb-4 tracking-tight">Modo Simulação</h3>
                    <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                        Simule a experiência real da plataforma SHL. 12 questões dinâmicas sob um cronômetro rigoroso para medir sua velocidade e precisão.
                    </p>

                    <ul className="space-y-4 mb-10">
                        <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                            <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                                <CheckCircle2 className="w-3 h-3" />
                            </div>
                            Cronômetro de 18 minutos
                        </li>
                        <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                            <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                                <CheckCircle2 className="w-3 h-3" />
                            </div>
                            12 testes aleatórios
                        </li>
                        <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                            <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                                <CheckCircle2 className="w-3 h-3" />
                            </div>
                            Relatório de performance final
                        </li>
                    </ul>

                    <button
                        onClick={() => onStart('SIMULATION')}
                        className="w-full py-5 bg-navy-900 text-white font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-navy-800 shadow-xl shadow-navy-900/20 transition-all flex items-center justify-center gap-3"
                    >
                        Iniciar Simulação <Play className="w-4 h-4 fill-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeductiveLanding;
