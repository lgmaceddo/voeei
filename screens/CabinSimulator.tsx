
import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Activity,
    ShieldAlert,
    Stethoscope,
    Navigation,
    Wind,
    Heart,
    Zap,
    CheckCircle2,
    Award,
    AlertTriangle,
    Radio,
    Clock
} from 'lucide-react';

interface CabinSimulatorProps {
    onBack: () => void;
}

type SimulationMode = 'OPERATIONAL' | 'MEDICAL' | 'SECURITY';

interface Scenario {
    id: string;
    category: SimulationMode;
    title: string;
    description: string;
    vitals?: {
        consciousness: string;
        respiration: string;
        pulse: string;
    };
    options: {
        text: string;
        crmImpact: string;
        isCorrect: boolean;
        xp: number;
    }[];
}

const MOCK_SCENARIOS: Scenario[] = [
    {
        id: '1',
        category: 'MEDICAL',
        title: 'Desmaio em Altitude de Cruzeiro',
        description: 'Um passageiro na poltrona 12C apresenta perda súbita de consciência. Você é o primeiro comissário a chegar ao local.',
        vitals: {
            consciousness: 'Inconsciente',
            respiration: 'Superficial',
            pulse: '110 BPM (Rápido/Fraco)'
        },
        options: [
            {
                text: 'Administrar oxigênio imediatamente sem checar a respiração.',
                crmImpact: 'Comunicação falha. O protocolo exige verificação da segurança da cena e responsividade antes de intervir.',
                isCorrect: false,
                xp: 0
            },
            {
                text: 'Avaliar responsividade, chamar ajuda (CAB) e solicitar o AED/Kit Médico.',
                crmImpact: 'Excelente CRM. O acionamento da equipe garante suporte compartilhado e prontidão para desfibrilação se necessário.',
                isCorrect: true,
                xp: 150
            },
            {
                text: 'Remover o passageiro da poltrona para o corredor imediatamente.',
                crmImpact: 'Risco de trauma desnecessário. A avaliação primária deve ser feita no local se a cena for segura.',
                isCorrect: false,
                xp: 0
            }
        ]
    },
    {
        id: '2',
        category: 'SECURITY',
        title: 'Fumaça no Lavatório Traseiro',
        description: 'O detector de fumaça disparou no Lavatório L3. Há calor intenso na porta.',
        options: [
            {
                text: 'Abrir a porta totalmente para localizar o foco do incêndio.',
                crmImpact: 'Falha Grave. Abrir a porta pode causar um "backdraft". O protocolo exige abertura mínima para introdução do extintor.',
                isCorrect: false,
                xp: 0
            },
            {
                text: 'Pegar Halon, PBE e notificar a cabine de comando via interfone.',
                crmImpact: 'Coordenação Tática perfeita. O aviso à cabine de comando é o primeiro passo do CRM em emergências de fogo.',
                isCorrect: true,
                xp: 200
            }
        ]
    },
    {
        id: '3',
        category: 'OPERATIONAL',
        title: 'Passageiro Disruptivo - Nível 1',
        description: 'Um passageiro insiste em não desligar o celular durante o taxi para decolagem, usando tom de voz agressivo.',
        options: [
            {
                text: 'Ameaçar o passageiro com desembarque imediato perante os outros.',
                crmImpact: 'Escalação de conflito. O CRM sugere técnicas de descalonamento e autoridade assertiva, não agressiva.',
                isCorrect: false,
                xp: 0
            },
            {
                text: 'Usar técnica de comunicação assertiva, explicar os riscos de segurança e informar ao Chefe de Cabine.',
                crmImpact: 'Liderança Situacional. Manter a calma e reportar ao escalão superior mantém a consciência situacional da equipe.',
                isCorrect: true,
                xp: 120
            }
        ]
    }
];

const CabinSimulator: React.FC<CabinSimulatorProps> = ({ onBack }) => {
    const [activeMode, setActiveMode] = useState<SimulationMode>('OPERATIONAL');
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const filteredScenarios = MOCK_SCENARIOS.filter(s => s.category === activeMode);
    const scenario = filteredScenarios[currentScenarioIndex] || filteredScenarios[0];

    const handleNext = () => {
        setSelectedOption(null);
        setShowFeedback(false);
        if (currentScenarioIndex < filteredScenarios.length - 1) {
            setCurrentScenarioIndex(currentScenarioIndex + 1);
        } else {
            setCurrentScenarioIndex(0);
        }
    };

    return (
        <div className="min-h-screen theme-study text-slate-700 font-sans p-4 md:p-8 flex flex-col gap-8 relative overflow-hidden">

            {/* Header Layout */}
            <header className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-200 pb-8">
                <div className="flex items-center gap-6">
                    <button
                        onClick={onBack}
                        className="p-4 bg-slate-100 border border-slate-200 rounded-2xl hover:bg-slate-200 transition-all group"
                    >
                        <ArrowLeft className="w-6 h-6 text-slate-400 group-hover:text-cyan-600" />
                    </button>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-800 elite-heading tracking-tighter uppercase leading-none">
                            CABINE <span className="text-cyan-600">VIRTUAL</span>
                        </h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 italic">
                            Aviation Crew Training & Simulation System
                        </p>
                    </div>
                </div>

                <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                    <button
                        onClick={() => { setActiveMode('OPERATIONAL'); setCurrentScenarioIndex(0); setSelectedOption(null); setShowFeedback(false); }}
                        className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all font-black text-[10px] tracking-widest uppercase
              ${activeMode === 'OPERATIONAL' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}
            `}
                    >
                        <Navigation className="w-4 h-4" /> Operacional
                    </button>
                    <button
                        onClick={() => { setActiveMode('MEDICAL'); setCurrentScenarioIndex(0); setSelectedOption(null); setShowFeedback(false); }}
                        className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all font-black text-[10px] tracking-widest uppercase
              ${activeMode === 'MEDICAL' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}
            `}
                    >
                        <Stethoscope className="w-4 h-4" /> Médico
                    </button>
                    <button
                        onClick={() => { setActiveMode('SECURITY'); setCurrentScenarioIndex(0); setSelectedOption(null); setShowFeedback(false); }}
                        className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all font-black text-[10px] tracking-widest uppercase
              ${activeMode === 'SECURITY' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}
            `}
                    >
                        <ShieldAlert className="w-4 h-4" /> Segurança
                    </button>
                </div>
            </header>

            {/* Simulation Area */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-start gap-8 max-w-6xl mx-auto w-full pt-4">

                {/* Main Scenario Card */}
                <div className="w-full bg-white rounded-[3.5rem] p-10 md:p-14 border border-slate-200 shadow-sm relative overflow-hidden group">

                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Left Column: Problem context */}
                        <div className="flex-1 space-y-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${activeMode === 'MEDICAL' ? 'bg-rose-500' : activeMode === 'SECURITY' ? 'bg-amber-500' : 'bg-cyan-500'}`} />
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Cenário em Simulação</span>
                                </div>
                                <h2 className="text-3xl font-black text-slate-800 elite-heading leading-tight uppercase tracking-tighter">
                                    {scenario.title}
                                </h2>
                                <p className="text-base font-bold text-slate-500 leading-relaxed italic border-l-2 border-slate-100 pl-6">
                                    {scenario.description}
                                </p>
                            </div>

                            {/* Medical Telemetry Panel */}
                            {scenario.category === 'MEDICAL' && scenario.vitals && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-10">
                                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center gap-3 group/stat">
                                        <Zap className="w-5 h-5 text-amber-500" />
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Consciência</span>
                                        <span className="text-xs font-black text-slate-800 uppercase">{scenario.vitals.consciousness}</span>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center gap-3">
                                        <Wind className="w-5 h-5 text-cyan-600 animate-pulse" />
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Respiração</span>
                                        <span className="text-xs font-black text-slate-800 uppercase">{scenario.vitals.respiration}</span>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center gap-3">
                                        <Heart className="w-5 h-5 text-rose-600 animate-pulse" />
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Pulso</span>
                                        <span className="text-xs font-black text-slate-800 uppercase">{scenario.vitals.pulse}</span>
                                    </div>
                                </div>
                            )}

                            {/* CRM Options List */}
                            <div className="space-y-4">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Ações Corretivas (CRM)</span>
                                {scenario.options.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        disabled={showFeedback}
                                        onClick={() => { setSelectedOption(idx); setShowFeedback(true); }}
                                        className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 flex items-center justify-between group/opt
                      ${selectedOption === idx
                                                ? (opt.isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900')
                                                : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-cyan-500/30 text-slate-600'}
                    `}
                                    >
                                        <span className="font-bold text-sm leading-tight">{opt.text}</span>
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all
                      ${selectedOption === idx
                                                ? (opt.isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white')
                                                : 'bg-slate-100 text-slate-400 group-hover/opt:text-cyan-600'}
                    `}>
                                            {selectedOption === idx ? (opt.isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />) : <ArrowLeft className="w-4 h-4 rotate-180" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Feedback & Instructor AI */}
                        {showFeedback && selectedOption !== null && (
                            <div className="lg:w-80 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4">
                                        <Award className={`w-8 h-8 ${scenario.options[selectedOption].isCorrect ? 'text-cyan-600' : 'text-slate-300'}`} />
                                    </div>

                                    <div className="flex items-center gap-3 mb-6">
                                        <Radio className="w-4 h-4 text-cyan-600 animate-pulse" />
                                        <span className="text-[9px] font-black text-cyan-700 uppercase tracking-widest">Análise do Instrutor</span>
                                    </div>

                                    <p className="text-xs font-bold leading-relaxed text-slate-500 mb-8 italic">
                                        "{scenario.options[selectedOption].crmImpact}"
                                    </p>

                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-100">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">XP Ganho</span>
                                            <span className={`text-sm font-black ${scenario.options[selectedOption].isCorrect ? 'text-cyan-600' : 'text-slate-400'}`}>
                                                +{scenario.options[selectedOption].xp} XP
                                            </span>
                                        </div>
                                        <div className="bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-100">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Proficiência</span>
                                            <span className={`text-sm font-black ${scenario.options[selectedOption].isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                {scenario.options[selectedOption].isCorrect ? '+1.5%' : '-0.5%'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleNext}
                                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-black uppercase text-[10px] tracking-widest py-5 rounded-[2rem] shadow-sm transition-all active:scale-95 flex items-center justify-center gap-3"
                                >
                                    Próximo Cenário <Navigation className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tactical Footer Overlay */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-6 group hover:border-cyan-500/50 transition-all font-sans">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 border border-cyan-100 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                            <Award className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sua Proficiência</p>
                            <p className="text-xl font-black text-slate-800 elite-heading tracking-tight">CMA 1ª CLASSE</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-6 group hover:border-blue-500/50 transition-all font-sans">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tempo em Treino</p>
                            <p className="text-xl font-black text-slate-800 elite-heading tracking-tight">42 H 15 M</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-6 group hover:border-emerald-500/50 transition-all font-sans">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Rank Global</p>
                            <p className="text-xl font-black text-slate-800 elite-heading tracking-tight">COMMANDER #12</p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default CabinSimulator;
