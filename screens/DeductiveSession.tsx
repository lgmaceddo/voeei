import React, { useState, useEffect } from 'react';
import { Info, CheckCircle2, BookOpen } from 'lucide-react';
import { ExamCategory, Question } from '../types';
import { DeductiveOffice } from '../components/shl/DeductiveOffice';
import { DeductiveCalendar } from '../components/shl/DeductiveCalendar';
import { DeductiveSeating } from '../components/shl/DeductiveSeating';
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
    onComplete: (answers: Record<number, string>, timeTakenSeconds: number) => void;
    onCancel: () => void;
}

const DeductiveSession: React.FC<DeductiveSessionProps> = ({ category, questions, mode, onComplete, onCancel }) => {
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

    // Scoring Logic for Stats Bar
    const getScoring = () => {
        let correct = 0;
        let incorrect = 0;
        Object.entries(answers).forEach(([id, val]) => {
            const q = questions.find(q => q.id === Number(id));
            if (q) {
                const type = q.deductive?.type;
                const correctVal = q.options[q.correctIndex];

                if (type === 'CALENDAR') {
                    const selectedBlocks = val.split(',').sort();
                    if (selectedBlocks.length === 2) {
                        const start = selectedBlocks[0].split('-')[0];
                        const end = selectedBlocks[1].split('-')[1];
                        const combined = `${start}-${end}`;
                        if (combined === correctVal) correct++;
                        else incorrect++;
                    } else if (val) {
                        incorrect++;
                    }
                } else if (type === 'SCHEDULING') {
                    // Logic: Validate positions for Q 304 specifically
                    // Q 304: t3:3 (10:30), t4:5 (11:30), t2:10 (13:30), t1:14 (16:00)
                    const pairs = val.split(',').sort().join(',');
                    const solution = "t1:14,t2:10,t3:3,t4:5";
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

    // Map string answers to numeric index for standard component visual indicators
    const mappedAnswers: Record<number, number> = {};
    questions.forEach((q) => {
        if (answers[q.id] !== undefined) {
            const val = answers[q.id];
            const correctVal = q.options[q.correctIndex];
            const type = q.deductive?.type;

            if (type === 'CALENDAR') {
                const selectedBlocks = val.split(',').sort();
                let combined = "";
                if (selectedBlocks.length === 2) {
                    combined = `${selectedBlocks[0].split('-')[0]}-${selectedBlocks[1].split('-')[1]}`;
                }
                mappedAnswers[q.id] = combined === correctVal ? q.correctIndex : -1;
            } else if (type === 'SCHEDULING') {
                const pairs = val.split(',').sort().join(',');
                const solution = "t1:14,t2:10,t3:3,t4:5";
                mappedAnswers[q.id] = pairs === solution ? q.correctIndex : -1;
            } else {
                mappedAnswers[q.id] = val === correctVal ? q.correctIndex : -1;
            }
        }
    });

    const handleAnswerChange = (val: string) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));

        // In simulation mode, we might auto-advance
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
        <div className="min-h-screen bg-slate-50/50 pb-20 relative font-sans">
            <ExamHeader category={category} onCancel={onCancel} />

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* --- LEFT COLUMN: Content --- */}
                <div className="lg:col-span-8 space-y-6">
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

                    {/* Deductive Question Card */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden mb-6">
                        {/* Application/Interactive Area */}
                        <div className="p-8 md:p-12 relative">
                            <div className="absolute top-8 right-12 flex items-center gap-2 z-20">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Interface Operacional</span>
                            </div>

                            <div className="space-y-10">
                                {currentQuestion.deductive?.type === 'OFFICES' && (
                                    <div className="space-y-6">
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase mb-2">{currentQuestion.deductive.scenario}</h3>
                                            <p className="text-sm font-bold text-slate-500">{currentQuestion.deductive.rules[0]}</p>
                                        </div>
                                        <DeductiveOffice challenge={currentQuestion.deductive} answer={answers[currentQuestion.id] || ''} onAnswerChange={handleAnswerChange} />
                                    </div>
                                )}
                                {currentQuestion.deductive?.type === 'CALENDAR' && (
                                    <DeductiveCalendar challenge={currentQuestion.deductive} answer={answers[currentQuestion.id] || ''} onAnswerChange={handleAnswerChange} />
                                )}
                                {currentQuestion.deductive?.type === 'SCHEDULING' && (
                                    <div className="space-y-6">
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase mb-2">{currentQuestion.deductive.scenario}</h3>
                                            <div className="space-y-2">
                                                {currentQuestion.deductive.rules.map((rule: string, rIdx: number) => (
                                                    <p key={rIdx} className="text-sm font-bold text-slate-500 leading-relaxed">
                                                        {rule}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                        <DeductiveScheduling challenge={currentQuestion.deductive} answer={answers[currentQuestion.id] || ''} onAnswerChange={handleAnswerChange} />
                                    </div>
                                )}
                                {currentQuestion.deductive?.type === 'SEATING' && (
                                    <div className="space-y-6">
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase mb-2">{currentQuestion.deductive.scenario}</h3>
                                            <p className="text-sm font-bold text-slate-500">{currentQuestion.deductive.rules[0]}</p>
                                        </div>
                                        <DeductiveSeating challenge={currentQuestion.deductive} answer={answers[currentQuestion.id] || ''} onAnswerChange={handleAnswerChange} />
                                    </div>
                                )}
                            </div>

                            {/* Verification Button (Training Mode) */}
                            {mode === 'TRAINING' && isAnswered && !showFeedback && (
                                <div className="mt-12 flex flex-col items-center animate-scale-in">
                                    <div className="w-full h-px bg-slate-100 mb-8" />
                                    <button
                                        onClick={() => setShowFeedback(true)}
                                        className="py-5 px-12 bg-navy-900 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-navy-900/20 hover:bg-primary-500 hover:shadow-primary-500/30 transition-all active:scale-95 flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5" />
                                        Finalizar Questão
                                    </button>
                                    <p className="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-widest">Valide sua lógica para ver a explicação</p>
                                </div>
                            )}

                            {/* Feedback (Training Mode) */}
                            {mode === 'TRAINING' && showFeedback && (
                                <div className="mt-12 space-y-6 animate-slide-up">
                                    <div className={`p-8 rounded-[2rem] border relative group overflow-hidden transition-all
                                        ${isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}
                                    `}>
                                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                            <BookOpen className={`w-24 h-24 ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`} />
                                        </div>
                                        <div className="relative z-10">
                                            <div className={`flex items-center gap-3 mb-4 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow-lg
                                                    ${isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}
                                                `}>
                                                    {isCorrect ? '✓' : '×'}
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] block leading-none mb-1">
                                                        {isCorrect ? 'Lógica Correta' : 'Lógica Incorreta'}
                                                    </span>
                                                    <span className="text-[9px] font-bold opacity-60 uppercase tracking-widest">Análise Técnica do Instrutor</span>
                                                </div>
                                            </div>
                                            <p className={`text-sm font-bold leading-relaxed italic
                                                ${isCorrect ? 'text-emerald-900/80' : 'text-rose-900/80'}
                                            `}>
                                                {currentQuestion.explanation}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
                                        <button
                                            onClick={handleResetQuestion}
                                            className="text-slate-400 hover:text-rose-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all p-2 rounded-lg hover:bg-rose-50"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                            Limpar e Tentar Novamente
                                        </button>

                                        {currentQuestionIndex < questions.length - 1 && (
                                            <button
                                                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                                className="bg-primary-50 text-primary-600 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-primary-500 hover:text-white transition-all shadow-sm"
                                            >
                                                Próximo Desafio →
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: Controls --- */}
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
