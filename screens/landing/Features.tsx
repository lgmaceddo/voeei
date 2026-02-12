
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
    BookOpen: { bg: 'bg-cyan-50', icon: 'text-cyan-600' },
    Target: { bg: 'bg-blue-50', icon: 'text-blue-600' },
    TrendingUp: { bg: 'bg-emerald-50', icon: 'text-emerald-600' },
    Star: { bg: 'bg-amber-50', icon: 'text-amber-600' },
    Brain: { bg: 'bg-cyan-50', icon: 'text-cyan-600' },
    FileText: { bg: 'bg-aviation-slate-50', icon: 'text-aviation-slate-600' },
};

interface FeaturesProps {
    features: Feature[];
}

export const Features: React.FC<FeaturesProps> = ({ features }) => {
    return (
        <section id="recursos" className="py-24 px-6 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="text-aviation-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 flex items-center justify-center gap-3">
                        <div className="w-8 h-px bg-aviation-slate-200" />
                        Capacidades Técnicas
                        <div className="w-8 h-px bg-aviation-slate-200" />
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-aviation-slate-900 elite-heading mb-6 tracking-tighter uppercase leading-none">
                        Foco na sua <span className="text-aviation-primary">Aprovação</span>
                    </h2>
                    <p className="text-aviation-slate-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                        Ferramentas projetadas com precisão para maximizar seu desempenho nas avaliações.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => {
                        const IconComponent = (ICON_MAP as any)[feature.icon] || FileText;
                        const colors = (COLOR_MAP as any)[feature.icon] || COLOR_MAP.FileText;
                        return (
                            <FeatureCard
                                key={feature.id}
                                icon={<IconComponent className={`w-7 h-7 ${colors.icon}`} />}
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
    <div className="bg-white p-8 rounded-[2rem] border border-aviation-slate-200 shadow-sm hover:shadow-md hover:border-aviation-primary/30 transition-all duration-300 relative overflow-hidden group h-full flex flex-col">
        <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center mb-8 border border-aviation-slate-50`}>
            {icon}
        </div>

        {badge && (
            <div className="absolute top-0 right-8 bg-aviation-primary/10 text-aviation-primary text-[8px] font-black px-4 py-2 rounded-b-xl border-x border-b border-aviation-primary/10 uppercase tracking-widest">
                {badge}
            </div>
        )}

        <div className="flex-1">
            <h3 className="text-xl font-black text-aviation-slate-900 mb-4 elite-heading tracking-tighter uppercase group-hover:text-aviation-primary transition-colors">{title}</h3>
            <p className="text-aviation-slate-500 font-medium leading-relaxed text-sm">{description}</p>
        </div>
    </div>
);
