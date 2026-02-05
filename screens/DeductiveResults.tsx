import React, { useState } from 'react';
import { CheckCircle2, XCircle, Info, BookOpen } from 'lucide-react';
import { ExamCategory, Question, ExamResult } from '../types';
import { DeductiveOffice } from '../components/shl/DeductiveOffice';
import { DeductiveCalendar } from '../components/shl/DeductiveCalendar';
import { DeductiveSeating } from '../components/shl/DeductiveSeating';

// Standard Results Components
import { PerformanceHeader } from './results/PerformanceHeader';
import { ResultsPaginationStrip } from './results/ResultsPaginationStrip';
import { ResultsSidebar } from './results/ResultsSidebar';

interface DeductiveResultsProps {
    category: ExamCategory;
    questions: Question[];
    answers: Record<number, string>;
    timeTaken: number;
    onHome: () => void;
    onRetry: () => void;
}

const DeductiveResults: React.FC<DeductiveResultsProps> = ({ category, questions, answers, timeTaken, onHome, onRetry }) => {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

    const calculateScore = () => {
        let correct = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.options[q.correctIndex]) {
                correct++;
            }
        });
        return correct;
    };

    const score = calculateScore();
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);
    const isPassing = percentage >= 70;

    // Map string answers to numeric index and construct compatible ExamResult object
    const mappedAnswers: Record<number, number> = {};
    questions.forEach((q) => {
        if (answers[q.id] !== undefined) {
            mappedAnswers[q.id] = answers[q.id] === q.options[q.correctIndex] ? q.correctIndex : -1;
        }
    });

    const result: ExamResult = {
        categoryId: category.id,
        date: new Date().toISOString(),
        score: score,
        totalQuestions: total,
        answers: mappedAnswers as any, // Only for visual status
        timeTakenSeconds: timeTaken
    };

    const currentQuestion = questions[currentQuestionIdx];
    const isCorrect = answers[currentQuestion.id] === currentQuestion.options[currentQuestion.correctIndex];

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-fade-in font-sans">
            <PerformanceHeader
                category={category}
                percentage={percentage}
                isPassing={isPassing}
                timeTakenSeconds={timeTaken}
                correctCount={score}
                incorrectCount={total - score}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* --- LEFT COLUMN: Gabarito View --- */}
                <div className="lg:col-span-8">
                    <ResultsPaginationStrip
                        questions={questions}
                        result={result as any}
                        currentQuestionIdx={currentQuestionIdx}
                        onNavigate={setCurrentQuestionIdx}
                    />

                    {/* Deductive Review Card - Standard styling with custom logic view */}
                    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                        {/* Question Status Header */}
                        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                            <div className="flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center font-black text-sm">
                                    {currentQuestionIdx + 1}
                                </span>
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none uppercase tracking-tighter">
                                        {currentQuestion.deductive?.scenario}
                                    </h3>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Configuração do Desafio</span>
                                </div>
                            </div>

                            <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-sm
                  ${isCorrect ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}
                `}>
                                {isCorrect ? (
                                    <><CheckCircle2 className="w-4 h-4" strokeWidth={3} /> Lógica Correta</>
                                ) : (
                                    <><XCircle className="w-4 h-4" strokeWidth={3} /> Erro de Dedução</>
                                )}
                            </div>
                        </div>

                        {/* Rules Preview */}
                        <div className="p-8 bg-white space-y-3">
                            <div className="flex items-center gap-2 mb-2">
                                <Info className="w-4 h-4 text-primary-400" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Regras Aplicadas</span>
                            </div>
                            {currentQuestion.deductive?.rules.map((rule, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 italic transition-all hover:bg-white hover:border-slate-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                                    <p className="text-sm font-bold text-slate-500 leading-relaxed">{rule}</p>
                                </div>
                            ))}
                        </div>

                        {/* Puzzle State Preview */}
                        <div className="px-8 pb-8">
                            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 relative group transition-all hover:shadow-inner">
                                <div className="absolute top-6 right-8 flex items-center gap-2 opacity-50">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Snapshot Operacional (Somente Leitura)</span>
                                </div>

                                <div className="pointer-events-none opacity-80 scale-[0.98] transition-transform group-hover:scale-100">
                                    {currentQuestion.deductive?.type === 'OFFICES' && (
                                        <DeductiveOffice challenge={currentQuestion.deductive} answer={answers[currentQuestion.id] || ''} onAnswerChange={() => { }} />
                                    )}
                                    {currentQuestion.deductive?.type === 'CALENDAR' && (
                                        <DeductiveCalendar challenge={currentQuestion.deductive} answer={answers[currentQuestion.id] || ''} onAnswerChange={() => { }} />
                                    )}
                                    {currentQuestion.deductive?.type === 'SEATING' && (
                                        <DeductiveSeating challenge={currentQuestion.deductive} answer={answers[currentQuestion.id] || ''} onAnswerChange={() => { }} />
                                    )}
                                </div>
                            </div>

                            {/* Technical Explanation */}
                            <div className="mt-8 p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                    <BookOpen className="w-24 h-24 text-emerald-500" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-4 text-emerald-700">
                                        <BookOpen className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Análise Técnica do Instrutor</span>
                                    </div>
                                    <p className="text-sm font-bold text-emerald-900/80 leading-relaxed italic">
                                        {currentQuestion.explanation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: Actions --- */}
                <div className="lg:col-span-4">
                    <ResultsSidebar
                        isFavorite={false} // Favorites not implemented for deductive yet
                        currentQuestionNum={currentQuestionIdx + 1}
                        onToggleFavorite={() => { }}
                        onReview={() => { }} // No separate review needed as it's built-in
                        onRetry={onRetry}
                        onNewExam={onRetry}
                        onHome={onHome}
                        onNext={() => setCurrentQuestionIdx(prev => prev + 1)}
                        onPrev={() => setCurrentQuestionIdx(prev => prev - 1)}
                        canNext={currentQuestionIdx < questions.length - 1}
                        canPrev={currentQuestionIdx > 0}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeductiveResults;
