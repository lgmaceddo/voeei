
import React from 'react';
import { Play, GraduationCap, Clock, CheckCircle2, ChevronLeft, Calendar, Users, MapPin } from 'lucide-react';
import { ExamCategory } from '../types';

interface DeductiveLandingProps {
    category: ExamCategory;
    onStart: (mode: 'TRAINING' | 'SIMULATION', subcategory?: string) => void;
    onBack: () => void;
}

const DeductiveLanding: React.FC<DeductiveLandingProps> = ({ category, onStart, onBack }) => {
    const [view, setView] = React.useState<'MODES' | 'CATEGORIES'>('MODES');

    const subcategories = [
        { id: 'CALENDAR', title: 'Calendários', icon: 'Calendar', desc: 'Dedução de datas, disponibilidades e cronogramas mensais.', color: 'emerald', hover: 'hover:border-emerald-500/30' },
        { id: 'SCHEDULING', title: 'Agendamento', icon: 'Clock', desc: 'Organização de tarefas em timelines com bloqueios e restrições.', color: 'cyan', hover: 'hover:border-cyan-500/30' },
        { id: 'TEAM_CALENDAR', title: 'Interseção de Equipe', icon: 'Users', desc: 'Análise de múltiplas agendas para encontrar janelas comuns.', color: 'blue', hover: 'hover:border-blue-500/30' },
        { id: 'SPATIAL', title: 'Localização Espacial', icon: 'MapPin', desc: 'Atribuição de escritórios e assentos usando regras de posição.', color: 'amber', hover: 'hover:border-amber-500/30' }
    ];

    if (view === 'CATEGORIES') {
        return (
            <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-24 relative z-10">
                <div className="flex items-center gap-8 mb-12 border-l-4 border-cyan-600 pl-8">
                    <button
                        onClick={() => setView('MODES')}
                        className="p-5 bg-white rounded-[2rem] border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all shadow-sm active:scale-95 group"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Protocolo de Treinamento</span>
                        <h1 className="text-5xl font-black text-slate-800 elite-heading tracking-tighter uppercase leading-none">Categorias <span className="text-cyan-600">Técnicas</span></h1>
                        <p className="text-slate-500 font-bold italic tracking-wide mt-2">Personalize sua carga de treinamento baseada em vetores específicos.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {subcategories.map((sub) => (
                        <button
                            key={sub.id}
                            onClick={() => onStart('TRAINING', sub.id)}
                            className={`group relative bg-white p-10 rounded-[3rem] border border-slate-200 transition-all duration-700 text-left flex items-start gap-8 shadow-sm ${sub.hover} hover:scale-[1.02] overflow-hidden`}
                        >
                            <div className={`w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-110 transition-transform duration-700 shadow-sm`}>
                                {sub.icon === 'Calendar' && <Calendar className={`w-8 h-8 text-${sub.color}-500`} />}
                                {sub.icon === 'Clock' && <Clock className={`w-8 h-8 text-${sub.color}-500`} />}
                                {sub.icon === 'Users' && <Users className={`w-8 h-8 text-${sub.color}-500`} />}
                                {sub.icon === 'MapPin' && <MapPin className={`w-8 h-8 text-${sub.color}-500`} />}
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black text-slate-800 mb-3 elite-heading uppercase tracking-tight group-hover:text-cyan-600 transition-colors">{sub.title}</h3>
                                <p className="text-slate-500 text-sm font-bold leading-relaxed italic tracking-wide">{sub.desc}</p>
                            </div>
                            {/* Accent */}
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-fade-in pb-24 relative z-10">
            {/* Header - Tactical Selection */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-l-4 border-cyan-600 pl-8">
                <div className="flex items-center gap-8">
                    <button
                        onClick={onBack}
                        className="p-5 bg-white rounded-[2rem] border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all shadow-sm active:scale-95 group"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Avaliação Cognitiva Dedutiva</span>
                        <h1 className="text-5xl font-black text-slate-800 elite-heading tracking-tighter uppercase leading-none">{category.title}</h1>
                        <p className="text-slate-500 font-bold italic tracking-wide mt-2">Configure o simulador para o nível de estudo desejado.</p>
                    </div>
                </div>
            </div>

            {/* Modes Grid - Tactical Mission Cards */}
            <div className="grid md:grid-cols-2 gap-10">
                {/* Training Mode - Elite Style */}
                <div className="bg-white rounded-[3.5rem] p-12 border border-slate-200 shadow-sm hover:border-emerald-300 transition-all duration-700 group relative overflow-hidden flex flex-col">
                    <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-10 text-emerald-600 border border-emerald-100 group-hover:scale-110 transition-transform duration-700 shadow-sm">
                        <GraduationCap className="w-10 h-10" />
                    </div>

                    <h3 className="text-4xl font-black text-slate-800 mb-6 tracking-tighter elite-heading uppercase">Modo Preparatório</h3>
                    <p className="text-slate-500 font-bold italic tracking-wide mb-10 leading-relaxed text-lg">
                        Pratique sem restrições temporais. Foco absoluto na fundamentação lógica e entendimento da resolução.
                    </p>

                    <div className="space-y-5 mb-12 flex-1">
                        <FeatureItem color="emerald" text="Vetores específicos de treino" />
                        <FeatureItem color="emerald" text="Análise técnica imediata" />
                        <FeatureItem color="emerald" text="Mapeamento de lógica de erro" />
                    </div>

                    <button
                        onClick={() => setView('CATEGORIES')}
                        className="w-full py-7 bg-slate-50 hover:bg-emerald-600 text-slate-500 hover:text-white font-black text-[10px] uppercase tracking-widest rounded-[2rem] border border-slate-200 hover:border-emerald-500 shadow-sm transition-all duration-500 flex items-center justify-center gap-4 group/btn"
                    >
                        Configurar Temas <Play className="w-4 h-4 fill-current group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Simulation Mode - Elite Style */}
                <div className="bg-white rounded-[3.5rem] p-12 border border-slate-200 shadow-sm hover:border-cyan-300 transition-all duration-700 group relative overflow-hidden flex flex-col">
                    <div className="w-20 h-20 bg-cyan-50 rounded-[2rem] flex items-center justify-center mb-10 text-cyan-600 border border-cyan-100 group-hover:scale-110 transition-transform duration-700 shadow-sm">
                        <Clock className="w-10 h-10 animate-pulse" />
                    </div>

                    <h3 className="text-4xl font-black text-slate-800 mb-6 tracking-tighter elite-heading uppercase">Simulação Real</h3>
                    <p className="text-slate-500 font-bold italic tracking-wide mb-10 leading-relaxed text-lg">
                        Ambiente SHL de alta fidelidade. 12 questões dinâmicas sob cronometragem real para aferição de prontidão.
                    </p>

                    <div className="space-y-5 mb-12 flex-1">
                        <FeatureItem color="cyan" text="Protocolo 18 min SHL" />
                        <FeatureItem color="cyan" text="Carga horária técnica real" />
                        <FeatureItem color="cyan" text="Relatório de performance" />
                    </div>

                    <button
                        onClick={() => onStart('SIMULATION')}
                        className="w-full py-7 bg-cyan-600 text-white font-black text-[10px] uppercase tracking-widest rounded-[2rem] shadow-md hover:bg-cyan-700 transition-all duration-500 flex items-center justify-center gap-4 group/btn hover:scale-[1.02]"
                    >
                        Iniciar Simulação <Play className="w-4 h-4 fill-current group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const FeatureItem = ({ color, text }: { color: string, text: string }) => (
    <div className="flex items-center gap-4 text-sm font-bold text-slate-500 italic tracking-wide">
        <div className={`w-6 h-6 rounded-full bg-${color}-50 flex items-center justify-center text-${color}-600 border border-${color}-100 shadow-sm`}>
            <CheckCircle2 className="w-3.5 h-3.5" />
        </div>
        {text}
    </div>
);

export default DeductiveLanding;
