
import React from 'react';
import { BookOpen, Target, TrendingUp, Star, Brain, FileText } from 'lucide-react';
import { Feature } from '../../types';

const ICON_MAP = {
    BookOpen: BookOpen,
    Target: Target,
    TrendingUp: TrendingUp,
    Star: Star,
    Brain: Brain,
    FileText: FileText
};

const COLOR_MAP = {
    BookOpen: { bg: 'bg-blue-50', icon: 'text-blue-500' },
    Target: { bg: 'bg-orange-50', icon: 'text-orange-500' },
    TrendingUp: { bg: 'bg-blue-50/50', icon: 'text-blue-400' },
    Star: { bg: 'bg-orange-50/50', icon: 'text-orange-400' },
    Brain: { bg: 'bg-blue-50', icon: 'text-blue-500' },
    FileText: { bg: 'bg-orange-50', icon: 'text-orange-500' },
};

interface FeaturesProps {
    features: Feature[];
}

export const Features: React.FC<FeaturesProps> = ({ features }) => {
    return (
        <section id="recursos" className="py-24 px-4 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="text-primary-500 font-black uppercase tracking-widest text-xs mb-4">Recursos Completos</div>
                    <h2 className="text-4xl lg:text-5xl font-black text-navy-900 mb-6 tracking-tight leading-tight">
                        Tudo que Você Precisa para <span className="text-blue-400">Ser Aprovado</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                        Ferramentas exclusivas desenvolvidas por especialistas em aviação civil para maximizar suas chances de aprovação.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => {
                        const IconComponent = ICON_MAP[feature.icon];
                        const colors = COLOR_MAP[feature.icon];
                        return (
                            <FeatureCard
                                key={feature.id}
                                icon={<IconComponent className={`w-6 h-6 ${colors.icon}`} />}
                                iconBg={colors.bg}
                                title={feature.title}
                                description={feature.description}
                                badge={feature.badge}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const FeatureCard = ({ icon, title, description, iconBg, badge }: any) => (
    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden group">
        <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
            {icon}
        </div>
        {badge && (
            <div className="absolute top-0 right-10 bg-navy-900 text-white text-[10px] font-black px-4 py-2.5 rounded-b-2xl shadow-xl shadow-navy-900/20 border-x border-b border-white/5 uppercase tracking-widest animate-fade-in">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                    {badge}
                </div>
            </div>
        )}
        <h3 className="text-xl font-black text-navy-900 mb-4 tracking-tight">{title}</h3>
        <p className="text-slate-500 font-medium leading-relaxed">{description}</p>
    </div>
);
