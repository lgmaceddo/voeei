
import React, { useState, useEffect } from 'react';
import { Question, ExamCategory } from '../types';
import { ExamHeader } from './exam/ExamHeader';
import { ExamStatsBar } from './exam/ExamStatsBar';
import { ExamPaginationStrip } from './exam/ExamPaginationStrip';
import { QuestionCard } from './exam/QuestionCard';
import { ExamSidebar } from './exam/ExamSidebar';
import { ExamFinishModal } from './exam/ExamFinishModal';

interface ExamSessionProps {
    category: ExamCategory;
    questions: Question[];
    onComplete: (answers: Record<number, number>, timeTakenSeconds: number) => void;
    onSave: (answers: Record<number, number>, timeLeft: number, currentQuestionIndex: number) => void;
    onCancel: () => void;
    initialAnswers?: Record<number, number>;
    initialTimeLeft?: number;
    initialQuestionIndex?: number;
}

const ExamSession: React.FC<ExamSessionProps> = ({
    category,
    questions,
    onComplete,
    onSave,
    onCancel,
    initialAnswers,
    initialTimeLeft,
    initialQuestionIndex
}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialQuestionIndex || 0);
    const [answers, setAnswers] = useState<Record<number, number>>(initialAnswers || {});
    const [timeLeft, setTimeLeft] = useState(initialTimeLeft !== undefined ? initialTimeLeft : category.durationMinutes * 60);

    // Settings State
    const [autoAdvance, setAutoAdvance] = useState(false);
    const [showTimer, setShowTimer] = useState(true);
    const [showAnswerKey, setShowAnswerKey] = useState(true);
    const [showExplanation, setShowExplanation] = useState(false);

    // Confirmation Modal State
    const [showFinishConfirmation, setShowFinishConfirmation] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    // Stats Calculation
    const correctCount = Object.entries(answers).filter(([qId, ansIdx]) => {
        const q = questions.find(q => q.id === Number(qId));
        return q && q.correctIndex === ansIdx;
    }).length;
    const incorrectCount = Object.keys(answers).length - correctCount;

    // Timer Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    finishExam(answers);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const finishExam = (currentAnswers: Record<number, number>) => {
        const totalTime = category.durationMinutes * 60;
        const timeTaken = totalTime - timeLeft;
        onComplete(currentAnswers, timeTaken);
    };

    const handleSelectOption = (optionIndex: number) => {
        if (answers[currentQuestion.id] !== undefined) return;
        setAnswers({ ...answers, [currentQuestion.id]: optionIndex });

        if (autoAdvance && currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev + 1);
            }, 800);
        }
    };

    return (
        <div className="min-h-screen theme-study font-sans selection:bg-cyan-500/20 pb-32 relative">
            <ExamHeader category={category} onCancel={onCancel} />

            <div className="max-w-[1600px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
                {/* --- LEFT COLUMN: Mission Content --- */}
                <div className="lg:col-span-8 space-y-12 animate-fade-in-up">
                    <ExamStatsBar
                        correctCount={correctCount}
                        incorrectCount={incorrectCount}
                        totalQuestions={questions.length}
                    />

                    <ExamPaginationStrip
                        questions={questions}
                        currentQuestionIndex={currentQuestionIndex}
                        answers={answers}
                        onNavigate={setCurrentQuestionIndex}
                    />

                    <QuestionCard
                        question={currentQuestion}
                        answer={answers[currentQuestion.id]}
                        showAnswerKey={showAnswerKey}
                        showExplanation={showExplanation}
                        onSelectOption={handleSelectOption}
                    />
                </div>

                {/* --- RIGHT COLUMN: Control HUD --- */}
                <div className="lg:col-span-4 sticky top-12 animate-fade-in-up delay-200">
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
                        onNext={() => setCurrentQuestionIndex(prev => prev + 1)}
                        onPrev={() => setCurrentQuestionIndex(prev => prev - 1)}
                        onSaveAndExit={() => onSave(answers, timeLeft, currentQuestionIndex)}
                        onFinish={() => setShowFinishConfirmation(true)}
                    />
                </div>
            </div>

            {/* Tactical Telemetry Label */}
            <div className="fixed bottom-6 right-8 text-[9px] font-black text-slate-700 uppercase tracking-[0.6em] z-50 pointer-events-none flex items-center gap-4">
                <div className="w-12 h-px bg-slate-800" />
                <span>VOOEI_SIMULATION_SYSTEM_ACTIVE</span>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/20" />
            </div>

            {showFinishConfirmation && (
                <ExamFinishModal
                    answeredCount={Object.keys(answers).length}
                    totalQuestions={questions.length}
                    onConfirm={() => {
                        setShowFinishConfirmation(false);
                        finishExam(answers);
                    }}
                    onCancel={() => setShowFinishConfirmation(false)}
                />
            )}
        </div>
    );
};

export default ExamSession;