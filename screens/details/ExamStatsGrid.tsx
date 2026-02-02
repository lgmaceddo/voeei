
import React from 'react';
import { FileText, Trophy, AlertCircle, TrendingUp } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';

interface ExamStatsGridProps {
    totalSims: number;
    totalOpen: number;
    approvalRate: number;
    totalApproved: number;
    totalReproved: number;
}

export const ExamStatsGrid: React.FC<ExamStatsGridProps> = ({
    totalSims,
    totalOpen,
    approvalRate,
    totalApproved,
    totalReproved
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                title="Total Realizado"
                value={totalSims.toString()}
                unit="simulados"
                suffix={`${totalOpen} em aberto`}
                icon={<FileText />}
                variant="primary"
            />

            <StatCard
                title="Taxa de Aprovação"
                value={`${approvalRate}%`}
                progress={approvalRate}
                icon={<TrendingUp />}
                variant="info"
            />

            <StatCard
                title="Aprovados"
                value={totalApproved.toString()}
                suffix="Excelente desempenho"
                icon={<Trophy />}
                variant="success"
            />

            <StatCard
                title="Reprovados"
                value={totalReproved.toString()}
                suffix="Atenção aos erros"
                icon={<AlertCircle />}
                variant="error"
            />
        </div>
    );
};
