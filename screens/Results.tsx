
import React, { useState } from 'react';
import { ExamResult, Question, ExamCategory } from '../types';
import { PerformanceHeader } from './results/PerformanceHeader';
import { ResultsPaginationStrip } from './results/ResultsPaginationStrip';
import { GabaritoCard } from './results/GabaritoCard';
import { ResultsSidebar } from './results/ResultsSidebar';

interface ResultsProps {
  result: ExamResult;
  questions: Question[];
  category: ExamCategory;
  onReview: () => void;
  onRetry: () => void;
  onHome: () => void;
  onNewExam: () => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
}

const Results: React.FC<ResultsProps> = ({
  result,
  questions,
  category,
  onReview,
  onRetry,
  onHome,
  onNewExam,
  favorites,
  onToggleFavorite
}) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  const isPassing = percentage >= 70;
  const currentQuestion = questions[currentQuestionIdx];
  const isFavorite = favorites.includes(currentQuestion.id);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-fade-in font-sans">
      <PerformanceHeader
        category={category}
        percentage={percentage}
        isPassing={isPassing}
        timeTakenSeconds={result.timeTakenSeconds}
        correctCount={result.score}
        incorrectCount={result.totalQuestions - result.score}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* --- LEFT COLUMN: Gabarito View --- */}
        <div className="lg:col-span-8">
          <ResultsPaginationStrip
            questions={questions}
            result={result}
            currentQuestionIdx={currentQuestionIdx}
            onNavigate={setCurrentQuestionIdx}
          />

          <GabaritoCard
            question={currentQuestion}
            userAnswerIndex={result.answers[currentQuestion.id]}
          />
        </div>

        {/* --- RIGHT COLUMN: Actions --- */}
        <div className="lg:col-span-4">
          <ResultsSidebar
            isFavorite={isFavorite}
            currentQuestionNum={currentQuestionIdx + 1}
            onToggleFavorite={() => onToggleFavorite(currentQuestion.id)}
            onReview={onReview}
            onRetry={onRetry}
            onNewExam={onNewExam}
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

export default Results;