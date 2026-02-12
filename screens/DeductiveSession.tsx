import React, { useState, useEffect } from 'react';
import { Info, CheckCircle2, BookOpen, ArrowRight } from 'lucide-react';
import { ExamCategory, Question } from '../types';
import { DeductiveOffice } from '../components/shl/DeductiveOffice';
import { DeductiveCalendar } from '../components/shl/DeductiveCalendar';
import { DeductiveSeating } from '../components/shl/DeductiveSeating';
import { DeductiveTeamCalendar } from '../components/shl/DeductiveTeamCalendar';
import { DeductiveScheduling } from '../components/shl/DeductiveScheduling';

// Standard Exam Components
import { ExamHeader } from './exam/ExamHeader';
import { ExamStatsBar } from './exam/ExamStatsBar';
import { ExamPaginationStrip } from './exam/ExamPaginationStrip';
import { ExamSidebar } from './exam/ExamSidebar';
import { ExamFinishModal } from './exam/ExamFinishModal';

interface DeductiveSessionProps {
    category: ExamCategory;
    questions: Question[];
    mode: 'TRAINING' | 'SIMULATION';
    subcategory?: string;
    onComplete: (answers: Record<number, string>, timeTakenSeconds: number) => void;
    onCancel: () => void;
}

const DeductiveSession: React.FC<DeductiveSessionProps> = ({ category, questions, mode, subcategory, onComplete, onCancel }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [timeLeft, setTimeLeft] = useState(mode === 'SIMULATION' ? 18 * 60 : 20 * 60);

    // Settings State
    const [autoAdvance, setAutoAdvance] = useState(false);
    const [showTimer, setShowTimer] = useState(true);
    const [showAnswerKey, setShowAnswerKey] = useState(mode === 'TRAINING');
    const [showExplanation, setShowExplanation] = useState(false);

    // Training Mode Feedback Flow
    const [showFeedback, setShowFeedback] = useState(false);

    // Modal State
    const [showFinishConfirmation, setShowFinishConfirmation] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
        // Reset feedback when question changes
        setShowFeedback(false);
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (showTimer && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1 && mode === 'SIMULATION') {
                        handleFinish();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft, mode, showTimer]);

    // Scoring Logic (Internal Telemetry)
    const getScoring = () => {
        let correct = 0;
        let incorrect = 0;
        Object.entries(answers).forEach(([id, val]) => {
            const q = questions.find(q => q.id === Number(id));
            if (q) {
                const type = q.deductive?.type;
                const correctVal = q.options[q.correctIndex];

                if (type === 'CALENDAR') {
                    if (q.deductive?.data?.multiSelect) {
                        if (val === correctVal) correct++;
                        else incorrect++;
                    } else {
                        const formattedVal = `Dia ${val}`;
                        if (formattedVal === correctVal) correct++;
                        else incorrect++;
                    }
                } else if (type === 'TEAM_CALENDAR') {
                    if (val === correctVal) correct++;
                    else incorrect++;
                } else if (type === 'OFFICES') {
                    const sortedVal = val.split(',').sort().join(',');
                    let solution = "";
                    if (q.id === 302) solution = "Daniela:3,Edward:1,Fei:4,George:5,Helen:2";
                    else if (q.id === 310) solution = "Andrew:5,Beatrice:3,Corrine:2,David:4,Erica:1";
                    else if (q.id === 313) solution = "Alpha:5,Beta:4,Delta:1,Epsilon:3,Gamma:2";

                    if (sortedVal === solution) correct++;
                    else incorrect++;
                } else if (type === 'SEATING') {
                    const sortedVal = val.split(',').sort().join(',');
                    let solution = "";
                    if (q.id === 303) solution = "Ken:6,Linda:1,Mike:5,Naomi:2,Oscar:3,Petra:4";
                    else if (q.id === 312) solution = "Alice:1,Bob:5,Charlie:2,Diana:3,Eve:4,Frank:6";

                    if (sortedVal === solution) correct++;
                    else incorrect++;
                } else if (type === 'SCHEDULING') {
                    const pairs = val.split(',').sort().join(',');
                    let solution = "";
                    if (q.id === 304) solution = "t1:14,t2:10,t3:3,t4:5";
                    else if (q.id === 308) solution = "t1:12,t2:3,t3:1,t4:7";
                    else if (q.id === 309) solution = "t1:0,t2:7,t3:9,t4:14";
                    else if (q.id === 314) solution = "t1:0,t2:3,t3:9,t4:15";

                    if (pairs === solution) correct++;
                    else incorrect++;
                } else {
                    if (val === correctVal) correct++;
                    else incorrect++;
                }
            }
        });
        return { correct, incorrect };
    };

    const { correct, incorrect } = getScoring();

    const mappedAnswers: Record<number, number> = {};
    questions.forEach((q) => {
        if (answers[q.id] !== undefined) {
            const val = answers[q.id];
            const correctVal = q.options[q.correctIndex];
            const type = q.deductive?.type;

            if (type === 'CALENDAR') {
                if (q.deductive?.data?.multiSelect) {
                    mappedAnswers[q.id] = val === correctVal ? q.correctIndex : -1;
                } else {
                    const formattedVal = `Dia ${val}`;
                    mappedAnswers[q.id] = formattedVal === correctVal ? q.correctIndex : -1;
                }
            } else if (type === 'TEAM_CALENDAR') {
                mappedAnswers[q.id] = val === correctVal ? q.correctIndex : -1;
            } else if (type === 'OFFICES') {
                const sortedVal = val.split(',').sort().join(',');
                let solution = "";
                if (q.id === 302) solution = "Daniela:3,Edward:1,Fei:4,George:5,Helen:2";
                else if (q.id === 310) solution = "Andrew:5,Beatrice:3,Corrine:2,David:4,Erica:1";
                else if (q.id === 313) solution = "Alpha:5,Beta:4,Delta:1,Epsilon:3,Gamma:2";

                mappedAnswers[q.id] = sortedVal === solution ? q.correctIndex : -1;
            } else if (type === 'SEATING') {
                const sortedVal = val.split(',').sort().join(',');
                let solution = "";
                if (q.id === 303) solution = "Ken:6,Linda:1,Mike:5,Naomi:2,Oscar:3,Petra:4";
                else if (q.id === 312) solution = "Alice:1,Bob:5,Charlie:2,Diana:3,Eve:4,Frank:6";

                mappedAnswers[q.id] = sortedVal === solution ? q.correctIndex : -1;
            } else if (type === 'SCHEDULING') {
                const pairs = val.split(',').sort().join(',');
                let solution = "";
                if (q.id === 304) solution = "t1:14,t2:10,t3:3,t4:5";
                else if (q.id === 308) solution = "t1:12,t2:3,t3:1,t4:7";
                else if (q.id === 309) solution = "t1:0,t2:7,t3:9,t4:14";
                else if (q.id === 314) solution = "t1:0,t2:3,t3:9,t4:15";

                mappedAnswers[q.id] = pairs === solution ? q.correctIndex : -1;
            } else {
                mappedAnswers[q.id] = val === correctVal ? q.correctIndex : -1;
            }
        }
    });

    const handleAnswerChange = (val: string) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));
        if (mode === 'SIMULATION' && autoAdvance && currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev + 1);
            }, 800);
        }
    };

    const handleFinish = () => {
        const totalTime = mode === 'SIMULATION' ? 18 * 60 : 20 * 60;
        onComplete(answers, totalTime - timeLeft);
    };

    const handleResetQuestion = () => {
        setAnswers(prev => {
            const next = { ...prev };
            delete next[currentQuestion.id];
            return next;
        });
        setShowFeedback(false);
    };

    const isAnswered = !!answers[currentQuestion.id];
    const isCorrect = mappedAnswers[currentQuestion.id] !== -1;

    return (
        <div className="min-h-screen theme-study text-slate-700 pb-24 relative font-sans overflow-x-hidden">
            <ExamHeader category={category} onCancel={onCancel} />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
                {/* --- LEFT COLUMN: Mission Content --- */}
                <div className="lg:col-span-8 space-y-8">
                    <ExamStatsBar
                        correctCount={correct}
                        incorrectCount={incorrect}
                        totalQuestions={questions.length}
                    />

                    <ExamPaginationStrip
                        questions={questions}
                        currentQuestionIndex={currentQuestionIndex}
                        answers={mappedAnswers}
                        onNavigate={setCurrentQuestionIndex}
                    />

                    {/* Technical Analysis Card */}
                    <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden mb-10 group relative">
                        <div className="p-10 md:p-12 relative z-10">
                            <div className="space-y-10">
                                {currentQuestion.deductive?.type === 'OFFICES' && (
                                    <div className="space-y-10">
                                        <div className="border-l-4 border-cyan-600 pl-8 mb-10">
                                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Escenário Operacional</h3>
                                            <p className="text-2xl font-black text-slate-800 elite-heading tracking-tight leading-relaxed">{currentQuestion.deductive.scenario}</p>
                                        </div>
                                        <DeductiveOffice challenge={currentQuestion.deductive} answer={answers[currentQuestion.id] || ''} onAnswerChange={handleAnswerChange} />
                                    </div>
                                )}
                                {currentQuestion.deductive?.type === 'CALENDAR' && (
                                    <DeductiveCalendar challenge={currentQuestion.deductive} answer={answers[currentQuestion.id] || ''} onAnswerChange={handleAnswerChange} />
                                )}
                                {currentQuestion.deductive?.type === 'SEATING' && (
                                    <div className="space-y-10">
                                        <div className="border-l-4 border-cyan-600 pl-8 mb-10">
                                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Mapa de Posicionamento</h3>
                                            <p className="text-2xl font-black text-slate-800 elite-heading tracking-tight leading-relaxed uppercase">{currentQuestion.deductive.scenario}</p>
                                        </div>
                                        <DeductiveSeating challenge={currentQuestion.deductive} answer={answers[currentQuestion.id] || ''} onAnswerChange={handleAnswerChange} />
                                    </div>
                                )}
                                {currentQuestion.deductive?.type === 'TEAM_CALENDAR' && (
                                    <DeductiveTeamCalendar challenge={currentQuestion.deductive} answer={answers[currentQuestion.id] || ''} onAnswerChange={handleAnswerChange} />
                                )}
                                {currentQuestion.deductive?.type === 'SCHEDULING' && (
                                    <div className="space-y-10">
                                        <div className="border-l-4 border-cyan-600 pl-8 mb-10">
                                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Cronograma de Carga</h3>
                                            <p className="text-2xl font-black text-slate-800 elite-heading tracking-tight leading-relaxed uppercase mb-6">{currentQuestion.deductive.scenario}</p>
                                            <div className="space-y-3">
                                                {currentQuestion.deductive.rules.map((rule: string, rIdx: number) => (
                                                    <div key={rIdx} className="flex items-start gap-4 text-slate-500 font-bold italic tracking-wide text-sm bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                        <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full mt-1.5 shrink-0" />
                                                        {rule}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <DeductiveScheduling challenge={currentQuestion.deductive} answer={answers[currentQuestion.id] || ''} onAnswerChange={handleAnswerChange} />
                                    </div>
                                )}
                            </div>

                            {/* Verification Controller (Training Mode) */}
                            {mode === 'TRAINING' && isAnswered && !showFeedback && (
                                <div className="mt-16 flex flex-col items-center animate-[scaleIn_0.5s_ease-out]">
                                    <div className="w-full h-px bg-slate-100 mb-10" />
                                    <button
                                        onClick={() => setShowFeedback(true)}
                                        className="py-6 px-16 bg-cyan-600 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-md hover:bg-cyan-700 transition-all active:scale-95 flex items-center gap-4 group/btn"
                                    >
                                        <CheckCircle2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                        Finalizar Análise
                                    </button>
                                    <p className="text-[9px] font-black text-slate-400 mt-6 uppercase tracking-widest italic">Validação de Lógica Requerida</p>
                                </div>
                            )}

                            {/* Tactical Debriefing Feedback */}
                            {mode === 'TRAINING' && showFeedback && (
                                <div className="mt-16 space-y-8 animate-[slideUp_0.7s_ease-out]">
                                    <div className={`p-10 rounded-[3rem] border relative group overflow-hidden transition-all duration-1000 backdrop-blur-3xl shadow-sm
                                        ${isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'}
                                    `}>
                                        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-125 transition-all duration-1000 transform -rotate-12">
                                            <BookOpen className={`w-32 h-32 ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`} />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-6 mb-8">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl border transition-all duration-700 shadow-sm elite-heading
                                                    ${isCorrect ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-rose-500 text-white border-rose-400'}
                                                `}>
                                                    {isCorrect ? '✓' : '×'}
                                                </div>
                                                <div>
                                                    <span className="text-[9px] font-black uppercase tracking-widest block leading-none mb-2 text-slate-400">
                                                        {isCorrect ? 'Conexão Lógica Estabelecida' : 'Falha na Dedução Técnica'}
                                                    </span>
                                                    <span className="text-xl font-black text-slate-800 elite-heading tracking-tight uppercase">Debriefing do Instrutor</span>
                                                </div>
                                            </div>
                                            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                                                <p className={`text-base font-bold leading-relaxed italic tracking-wide
                                                    ${isCorrect ? 'text-emerald-900/80' : 'text-rose-900/80'}
                                                `}>
                                                    {currentQuestion.explanation}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Operational Footer Actions */}
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6 px-4">
                                        <button
                                            onClick={handleResetQuestion}
                                            className="text-slate-400 hover:text-rose-600 font-black text-[9px] uppercase tracking-widest flex items-center gap-3 transition-all p-4 rounded-2xl hover:bg-rose-50 group/reset"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-current group-hover:animate-ping" />
                                            Reiniciar Sequência
                                        </button>

                                        {currentQuestionIndex < questions.length - 1 && (
                                            <button
                                                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                                className="bg-slate-100 text-cyan-700 px-10 py-5 rounded-[2rem] font-black text-[9px] uppercase tracking-widest flex items-center gap-4 hover:bg-cyan-600 hover:text-white transition-all duration-500 shadow-sm border border-slate-200 group/next"
                                            >
                                                Próxima Missão <ArrowRight className="w-4 h-4 group-hover/next:translate-x-1 transition-transform" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: Tactical Control --- */}
                <div className="lg:col-span-4">
                    <ExamSidebar
                        timeLeft={timeLeft}
                        showTimer={showTimer}
                        autoAdvance={autoAdvance}
                        showAnswerKey={showAnswerKey}
                        showExplanation={showExplanation}
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={questions.length}
                        onToggleTimer={setShowTimer}
                        onToggleAutoAdvance={setAutoAdvance}
                        onToggleAnswerKey={setShowAnswerKey}
                        onToggleExplanation={setShowExplanation}
                        onNext={() => currentQuestionIndex < questions.length - 1 && setCurrentQuestionIndex(prev => prev + 1)}
                        onPrev={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(prev => prev - 1)}
                        onSaveAndExit={onCancel}
                        onFinish={() => setShowFinishConfirmation(true)}
                    />
                </div>
            </div>

            {showFinishConfirmation && (
                <ExamFinishModal
                    answeredCount={Object.keys(answers).length}
                    totalQuestions={questions.length}
                    onConfirm={() => {
                        setShowFinishConfirmation(false);
                        handleFinish();
                    }}
                    onCancel={() => setShowFinishConfirmation(false)}
                />
            )}
        </div>
    );
};
export default DeductiveSession;
