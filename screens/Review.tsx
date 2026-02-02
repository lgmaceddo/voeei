import React, { useState } from 'react';
import { Question } from '../types';
import { Button } from '../components/ui/Button';
import { ArrowLeft, ArrowRight, Check, X, Sparkles, Bookmark } from 'lucide-react';
import { getAIExplanation } from '../services/geminiService';

interface ReviewProps {
    questions: Question[];
    userAnswers: Record<number, number>;
    onClose: () => void;
}

const Review: React.FC<ReviewProps> = ({ questions, userAnswers, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentQuestion = questions[currentIndex];
    const selectedIndex = userAnswers[currentQuestion.id];
    const isCorrect = selectedIndex === currentQuestion.correctIndex;

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };


    return (
        <div className="max-w-3xl mx-auto space-y-6 pb-20">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={onClose} className="px-0">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Voltar ao Resultado
                </Button>
                <div className="text-sm font-medium text-slate-500">
                    Questão {currentIndex + 1} de {questions.length}
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-8">
                {/* Status Header */}
                <div className={`flex items-center gap-2 mb-6 font-bold ${isCorrect ? 'text-emerald-600' : 'text-red-500'}`}>
                    {isCorrect ? <CheckCircleIcon /> : <XCircleIcon />}
                    {isCorrect ? 'Você acertou!' : 'Você errou.'}
                </div>

                <h3 className="text-xl font-medium text-slate-800 mb-8">{currentQuestion.text}</h3>

                <div className="space-y-3 mb-8">
                    {currentQuestion.options.map((opt, idx) => {
                        const isSelected = selectedIndex === idx;
                        const isCorrectOption = idx === currentQuestion.correctIndex;

                        let styleClass = "border-slate-100 bg-white text-slate-600";
                        if (isCorrectOption) styleClass = "border-emerald-500 bg-emerald-50 text-emerald-800 font-medium";
                        else if (isSelected && !isCorrectOption) styleClass = "border-red-500 bg-red-50 text-red-800";

                        return (
                            <div key={idx} className={`p-4 rounded-xl border-2 flex items-center justify-between ${styleClass}`}>
                                <div className="flex items-center gap-4">
                                    <span className="font-bold">{String.fromCharCode(65 + idx)}.</span>
                                    <span>{opt}</span>
                                </div>
                                {isCorrectOption && <Check className="w-5 h-5 text-emerald-600" />}
                                {isSelected && !isCorrectOption && <X className="w-5 h-5 text-red-500" />}
                            </div>
                        );
                    })}
                </div>

                {/* Explanation Section */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                        Explicação
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-sm">
                        {currentQuestion.explanation}
                    </p>

                </div>
            </div>

            {/* Footer Nav */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <Button variant="ghost" onClick={handlePrev} disabled={currentIndex === 0}>
                    <ArrowLeft className="w-4 h-4" /> Anterior
                </Button>

                <button className="text-slate-400 hover:text-amber-500 transition-colors">
                    <Bookmark className="w-6 h-6" />
                </button>

                <Button variant="ghost" onClick={handleNext} disabled={currentIndex === questions.length - 1}>
                    Próxima <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

const CheckCircleIcon = () => (
    <div className="bg-emerald-100 p-1 rounded-full">
        <Check className="w-4 h-4 text-emerald-600" />
    </div>
);

const XCircleIcon = () => (
    <div className="bg-red-100 p-1 rounded-full">
        <X className="w-4 h-4 text-red-600" />
    </div>
);

export default Review;