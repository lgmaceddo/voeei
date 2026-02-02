
import React from 'react';
import { Users as UsersIcon } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';

export const UsersManager = () => {
    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                <UsersIcon className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-navy-900">Gerenciamento de Usuários</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Visualize, edite e controle o acesso de todos os alunos cadastrados na plataforma.</p>
            <div className="pt-4 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <StatCard title="Total Alunos" value="5.240" variant="info" />
                <StatCard title="Ativos Hoje" value="842" variant="success" />
                <StatCard title="Novos (Mês)" value="+120" variant="primary" />
            </div>
        </div>
    );
};
