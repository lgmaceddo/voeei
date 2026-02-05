
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
        { id: 'CALENDAR', title: 'Calendários', icon: 'Calendar', desc: 'Dedução de datas, disponibilidades e cronogramas mensais.', color: 'bg-blue-50 text-blue-500', hover: 'hover:border-blue-200' },
        { id: 'SCHEDULING', title: 'Agendamento', icon: 'Clock', desc: 'Organização de tarefas em timelines com bloqueios e restrições.', color: 'bg-purple-50 text-purple-500', hover: 'hover:border-purple-200' },
        { id: 'TEAM_CALENDAR', title: 'Interseção de Equipe', icon: 'Users', desc: 'Análise de múltiplas agendas para encontrar janelas comuns.', color: 'bg-emerald-50 text-emerald-500', hover: 'hover:border-emerald-200' },
        { id: 'SPATIAL', title: 'Localização Espacial', icon: 'MapPin', desc: 'Atribuição de escritórios e assentos usando regras de posição.', color: 'bg-amber-50 text-amber-500', hover: 'hover:border-amber-200' }
    ];

    if (view === 'CATEGORIES') {
        return (
            <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-20">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => setView('MODES')}
                        className="p-3 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-navy-900 transition-all shadow-sm"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-navy-900 tracking-tight">Categorias de Treino</h1>
                        <p className="text-slate-500 font-medium">Selecione o tipo de desafio que deseja praticar hoje.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {subcategories.map((sub) => (
                        <button
                            key={sub.id}
                            onClick={() => onStart('TRAINING', sub.id)}
                            className={`bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm transition-all text-left flex items-start gap-6 group ${sub.hover} hover:shadow-xl hover:-translate-y-1`}
                        >
                            <div className={`w-14 h-14 ${sub.color} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                                {sub.icon === 'Calendar' && <Calendar className="w-7 h-7" />}
                                {sub.icon === 'Clock' && <Clock className="w-7 h-7" />}
                                {sub.icon === 'Users' && <Users className="w-7 h-7" />}
                                {sub.icon === 'MapPin' && <MapPin className="w-7 h-7" />}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-navy-900 mb-2">{sub.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">{sub.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

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
                        Escolha uma categoria específica e pratique sem a pressão do relógio. Feedback imediato e explicações para cada questão.
                    </p>

                    <ul className="space-y-4 mb-10">
                        <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <CheckCircle2 className="w-3 h-3" />
                            </div>
                            Foco por categoria específica
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
                            Explicações lógicas detalhadas
                        </li>
                    </ul>

                    <button
                        onClick={() => setView('CATEGORIES')}
                        className="w-full py-5 bg-emerald-500 text-white font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3"
                    >
                        Escolher Categoria <Play className="w-4 h-4 fill-white" />
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
                        Simule a experiência real da SHL. 12 questões mistas sob um cronômetro rigoroso para medir sua velocidade e precisão.
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
                            12 questões mistas (SHL)
                        </li>
                        <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                            <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                                <CheckCircle2 className="w-3 h-3" />
                            </div>
                            Ambiente real de prova
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
