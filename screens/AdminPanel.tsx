
import React, { useState } from 'react';
import {
    BookOpen,
    Trophy,
    Link as LinkIcon,
    CreditCard,
    Shield,
    Layers,
    Users as UsersIcon,
    Star
} from 'lucide-react';
import { User, Plan, UsefulLink, Feature } from '../types';
import { QuestionsManager } from './admin/QuestionsManager';
import { UsersManager } from './admin/UsersManager';
import { PlansManager } from './admin/PlansManager';
import { RankingManager } from './admin/RankingManager';
import { LinksManager } from './admin/LinksManager';
import { FeaturesManager } from './admin/FeaturesManager';
import { StripeManager } from './admin/StripeManager';

interface AdminPanelProps {
    user: User;
    plans: Plan[];
    onUpdatePlans: (newPlans: Plan[]) => void;
    links: UsefulLink[];
    onUpdateLinks: (newLinks: UsefulLink[]) => void;
    features: Feature[];
    onUpdateFeatures: (newFeatures: Feature[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
    user,
    plans,
    onUpdatePlans,
    links,
    onUpdateLinks,
    features,
    onUpdateFeatures
}) => {
    const [activeTab, setActiveTab] = useState<'QUESTIONS' | 'USERS' | 'PLANS' | 'FEATURES' | 'RANKING' | 'LINKS' | 'STRIPE'>('QUESTIONS');

    const tabs = [
        { id: 'QUESTIONS', label: 'Questões', icon: BookOpen },
        { id: 'USERS', label: 'Usuários', icon: UsersIcon },
        { id: 'PLANS', label: 'Assinaturas', icon: Layers },
        { id: 'FEATURES', label: 'Recursos', icon: Star },
        { id: 'RANKING', label: 'Ranking', icon: Trophy },
        { id: 'LINKS', label: 'Links Úteis', icon: LinkIcon },
        { id: 'STRIPE', label: 'Pagamentos', icon: CreditCard },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-navy-900 tracking-tight flex items-center gap-3">
                        <Shield className="w-8 h-8 text-primary-500" />
                        Painel Administrativo
                    </h1>
                    <p className="text-slate-500 font-medium">Gerencie todo o ecossistema do Portal VOOEI.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                        <img src={user.avatarUrl} className="w-8 h-8 rounded-full border border-slate-100" alt={user.name} />
                        <div className="text-xs">
                            <div className="font-bold text-navy-900">{user.name}</div>
                            <div className="text-primary-500 font-black uppercase tracking-tighter">Super Admin</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all
              ${activeTab === tab.id
                                ? 'bg-navy-900 text-white shadow-lg shadow-navy-900/20 scale-105'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-navy-900'
                            }
            `}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Dynamic Content */}
            <div className="pt-4">
                {activeTab === 'QUESTIONS' && <QuestionsManager />}
                {activeTab === 'USERS' && <UsersManager />}
                {activeTab === 'PLANS' && <PlansManager plans={plans} onUpdatePlans={onUpdatePlans} />}
                {activeTab === 'FEATURES' && <FeaturesManager features={features} onUpdateFeatures={onUpdateFeatures} />}
                {activeTab === 'RANKING' && <RankingManager />}
                {activeTab === 'LINKS' && <LinksManager links={links} onUpdateLinks={onUpdateLinks} />}
                {activeTab === 'STRIPE' && <StripeManager />}
            </div>
        </div>
    );
};

export default AdminPanel;
