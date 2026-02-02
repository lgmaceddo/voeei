
import React, { useState } from 'react';
import { ExamCategory, Question, ExamHistoryItem } from '../types';
import { ExamDetailsHeader } from './details/ExamDetailsHeader';
import { ExamStatsGrid } from './details/ExamStatsGrid';
import { ExamCTA } from './details/ExamCTA';
import { ExamHistoryLog } from './details/ExamHistoryLog';
import { ExamFavoritesView } from './details/ExamFavoritesView';

interface ExamDetailsProps {
    category: ExamCategory;
    examHistory: ExamHistoryItem[];
    onBack: () => void;
    onStartExam: () => void;
    onStartFavorites: () => void;
    favorites: number[];
    onToggleFavorite: (id: number) => void;
    allQuestions: Question[];
    onResumeExam: (item: ExamHistoryItem) => void;
}

const ExamDetails: React.FC<ExamDetailsProps> = ({
    category,
    examHistory,
    onBack,
    onStartExam,
    onStartFavorites,
    favorites,
    onToggleFavorite,
    allQuestions,
    onResumeExam
}) => {
    const [viewMode, setViewMode] = useState<'OVERVIEW' | 'FAVORITES'>('OVERVIEW');

    // Filter data for this category
    const history = examHistory.filter(h => h.categoryId === category.id);
    const categoryFavorites = allQuestions.filter(q => q.category === category.id && favorites.includes(q.id));

    // Calculate stats
    const totalSims = history.length;
    const totalOpen = history.filter(h => h.status === 'Em aberto').length;
    const totalFinished = history.filter(h => h.status === 'Finalizado').length;
    const totalApproved = history.filter(h => h.result === 'Aprovado').length;
    const totalReproved = history.filter(h => h.result === 'Reprovado').length;
    const approvalRate = totalFinished > 0 ? Math.round((totalApproved / totalFinished) * 100) : 0;

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-fade-in relative font-sans">
            <ExamDetailsHeader
                category={category}
                viewMode={viewMode}
                onSetViewMode={setViewMode}
                onBack={onBack}
                favoritesCount={categoryFavorites.length}
            />

            {viewMode === 'OVERVIEW' ? (
                <div className="space-y-8">
                    <ExamStatsGrid
                        totalSims={totalSims}
                        totalOpen={totalOpen}
                        approvalRate={approvalRate}
                        totalApproved={totalApproved}
                        totalReproved={totalReproved}
                    />

                    <ExamCTA
                        categoryTitle={category.title}
                        onStartExam={onStartExam}
                    />

                    <ExamHistoryLog
                        history={history}
                        onResumeExam={onResumeExam}
                    />
                </div>
            ) : (
                <ExamFavoritesView
                    favorites={categoryFavorites}
                    onStartFavorites={onStartFavorites}
                    onRemoveFavorite={onToggleFavorite}
                    minRequired={20}
                />
            )}
        </div>
    );
};

export default ExamDetails;