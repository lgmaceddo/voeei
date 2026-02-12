
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Radio, ShieldCheck, Trophy, ChevronRight, ArrowLeft, Mic, Play, Pause, RefreshCcw, Send, CheckCircle2, AlertCircle, Globe } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface LanguageExamProps {
    language: 'ENGLISH' | 'SPANISH';
    level: string;
    onBack: () => void;
    onComplete: (result: any) => void;
}

interface Message {
    role: 'instructor' | 'student';
    text: string;
    type?: 'audio' | 'text';
    icaoFeedback?: string;
}

const LanguageExam: React.FC<LanguageExamProps> = ({ language, level, onBack, onComplete }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isListening, setIsListening] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [icaoEstimate, setIcaoEstimate] = useState<number | null>(null);

    const scrollRef = useRef<HTMLDivElement>(null);

    const scenarios = {
        ENGLISH: [
            {
                prompt: "London Tower, G-ABCD, Requesting pushback and start-up.",
                correctResponse: "G-ABCD, London Tower, Pushback and start-up approved, report when ready for taxi.",
                feedback: "In ICAO standard phraseology, brevity and clarity are paramount. 'Approved' and 'Report when ready' are the required terminal commands for this phase."
            },
            {
                prompt: "G-ABCD, after departure, turn left on heading 280, climb to Flight Level 100.",
                correctResponse: "Left on 280, climbing to FL 100, G-ABCD.",
                feedback: "Read-back must be exact. In ICAO Annex 10, headings and flight levels are critical data that must be repeated verbatim by the crew."
            }
        ],
        SPANISH: [
            {
                prompt: "Madrid Torre, EC-XYZ, solicitando retroceso y puesta en marcha.",
                correctResponse: "EC-XYZ, Madrid Torre, retrocesso y puesta en marcha aprobado, notifique listo para rodar.",
                feedback: "El estándar de la OACI exige la confirmación clara de la maniobra. 'Aprobado' y 'Notifique' son mandatorios para la seguridad operacional."
            }
        ]
    };

    const currentScenarioPool = scenarios[language] || scenarios.ENGLISH;

    useEffect(() => {
        // Initial setup - Instructor greeting
        const intro = language === 'ENGLISH'
            ? `Welcome to the ICAO ${level} Proficiency Session. I am your ICAO Instructor. Listen carefully to the tower communication and provide the standard response.`
            : `Bienvenido a la sesión de competencia ICAO ${level}. Soy su instructor. Escuche atentamente y proporcione la fraseología estándar.`;

        setMessages([{ role: 'instructor', text: intro }]);
        playTTS(intro);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const playTTS = (text: string) => {
        setIsPlaying(true);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'ENGLISH' ? 'en-US' : 'es-ES';
        utterance.rate = 0.9;
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
    };

    const handleListening = () => {
        if (!isPlaying && !isProcessing) {
            const scenario = currentScenarioPool[currentStep % currentScenarioPool.length];
            setMessages(prev => [...prev, { role: 'instructor', text: scenario.prompt, type: 'audio' }]);
            playTTS(scenario.prompt);
        }
    };

    const handleSubmit = () => {
        if (!userInput.trim() || isProcessing) return;

        const response = userInput;
        setUserInput('');
        setMessages(prev => [...prev, { role: 'student', text: response }]);
        setIsProcessing(true);

        // Simulate Gemini / ICAO Instructor analysis
        setTimeout(() => {
            const scenario = currentScenarioPool[currentStep % currentScenarioPool.length];

            // Logic for "Correctness" - Simplified for simulation
            const isCorrect = response.toLowerCase().includes('approved') || response.toLowerCase().includes('ready') || response.toLowerCase().includes('aprobado');

            setMessages(prev => [...prev, {
                role: 'instructor',
                text: isCorrect ? "Phraseology correct." : "Phraseology correction needed.",
                icaoFeedback: scenario.feedback
            }]);

            if (isCorrect) {
                const nextStep = currentStep + 1;
                setCurrentStep(nextStep);
                // If we finished some steps, estimate ICAO
                if (nextStep >= 2) {
                    setIcaoEstimate(Math.floor(Math.random() * 2) + 4); // Random 4-5
                }
            }

            setIsProcessing(false);
        }, 1500);
    };

    return (
        <div className="relative min-h-screen bg-[#0F172C] text-slate-100 flex flex-col font-sans overflow-hidden">

            {/* HUD Overlay Decor */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-20" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent z-20" />

            {/* Main Header */}
            <header className="relative z-10 p-6 border-b border-white/5 bg-[#0F172C]/80 backdrop-blur-xl flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                        <ArrowLeft className="w-5 h-5 text-slate-400" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <Globe className="w-4 h-4 text-cyan-400" />
                            <h2 className="text-xl font-black elite-heading uppercase tracking-tighter">
                                {language} SESSION <span className="text-cyan-400">{level}</span>
                            </h2>
                        </div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Operational Proficiency Evaluation</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Signal Quality</span>
                        <div className="flex gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-1 h-3 rounded-full ${i <= 4 ? 'bg-cyan-500' : 'bg-slate-700'}`} />)}
                        </div>
                    </div>
                    {icaoEstimate && (
                        <div className="bg-cyan-500/10 px-6 py-2 rounded-2xl border border-cyan-500/20 flex flex-col items-center">
                            <span className="text-[8px] font-black text-cyan-400 uppercase tracking-[0.2em]">ICAO ESTIMATE</span>
                            <span className="text-xl font-black text-white elite-heading leading-none mt-1">LEVEL {icaoEstimate}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Session Body */}
            <main className="relative z-10 flex-1 flex flex-col max-w-5xl mx-auto w-full p-6 md:p-10 overflow-hidden">

                {/* Transcript Area */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto space-y-6 mb-8 pr-4 custom-scrollbar"
                >
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'instructor' ? 'justify-start' : 'justify-end animate-in fade-in slide-in-from-right-4'}`}>
                            <div className={`max-w-[80%] space-y-3 ${msg.role === 'instructor' ? 'items-start' : 'items-end'}`}>
                                <div className={`flex items-center gap-2 mb-1`}>
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${msg.role === 'instructor' ? 'text-cyan-500' : 'text-slate-500 text-right w-full'}`}>
                                        {msg.role === 'instructor' ? 'ICAO INSTRUCTOR UNIT-01' : 'CREW MEMBER'}
                                    </span>
                                </div>
                                <div className={`p-6 rounded-[2rem] border transition-all duration-500 shadow-2xl
                                    ${msg.role === 'instructor'
                                        ? 'bg-[#1E293B]/60 border-white/5 text-slate-200'
                                        : 'bg-cyan-500/10 border-cyan-500/20 text-white'
                                    }
                                `}>
                                    {msg.type === 'audio' && (
                                        <div className="flex items-center gap-3 mb-4 text-cyan-400 bg-cyan-400/10 p-3 rounded-xl border border-cyan-400/20">
                                            <Radio className="w-4 h-4 animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">In-Flight Radio Transmission</span>
                                        </div>
                                    )}
                                    <p className="text-sm font-medium leading-relaxed font-mono tracking-tight">{msg.text}</p>

                                    {msg.icaoFeedback && (
                                        <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                                            <div className="flex items-center gap-2 text-emerald-400">
                                                <ShieldCheck className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">PHRASEOLOGY ANALYSIS</span>
                                            </div>
                                            <p className="text-[11px] font-bold text-slate-500 italic leading-relaxed">{msg.icaoFeedback}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isProcessing && (
                        <div className="flex justify-start">
                            <div className="bg-[#1E293B]/20 p-4 rounded-2xl flex items-center gap-3 border border-white/5">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                </div>
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Analyzing phraseology...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tactical Footer / Cockpit Controls */}
                <div className="bg-[#1E293B]/40 backdrop-blur-2xl rounded-[3rem] p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
                    {/* Pulsing Radio Control */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Radio "Listening" Button */}
                        <div className="flex flex-col items-center gap-3">
                            <button
                                onClick={handleListening}
                                disabled={isPlaying || isProcessing}
                                className={`w-24 h-24 rounded-full flex flex-col items-center justify-center gap-2 border-4 transition-all duration-500
                                    ${isPlaying
                                        ? 'bg-rose-500/10 border-rose-500/50 text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.3)]'
                                        : 'bg-cyan-500 group-hover:bg-cyan-400 border-[#0F172C] text-[#0F172C] shadow-[0_10px_30px_rgba(6,182,212,0.3)] active:scale-95'
                                    }
                                    ${!isPlaying && !isProcessing ? 'animate-pulse hover:animate-none' : ''}
                                `}
                            >
                                {isPlaying ? <Volume2 className="w-8 h-8" /> : <Radio className="w-8 h-8" />}
                                <span className="text-[8px] font-black uppercase tracking-widest">{isPlaying ? 'RECEIVING' : 'LISTEN'}</span>
                            </button>
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] italic">VHF COM 1</span>
                        </div>

                        {/* Input Area */}
                        <div className="flex-1 w-full bg-[#0F172C]/40 rounded-3xl border border-white/5 p-2 flex items-center group/input focus-within:border-cyan-500/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-focus-within/input:text-cyan-400 transition-colors">
                                <Mic className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                placeholder="Transmit standard phraseology..."
                                className="bg-transparent border-none outline-none flex-1 px-4 text-sm font-bold text-white placeholder:text-slate-600 tracking-wide"
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={!userInput.trim() || isProcessing}
                                className="p-4 bg-cyan-500 rounded-2xl text-[#0F172C] hover:scale-105 transition-all disabled:opacity-20 disabled:scale-100"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

            </main>

            {/* Background Aesthetics */}
            <div className="fixed top-1/2 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
        </div>
    );
};

export default LanguageExam;
