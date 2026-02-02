
import React from 'react';
import { BookOpen, Target, TrendingUp, Star, Brain, FileText } from 'lucide-react';

export const Features = () => {
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
                    <FeatureCard
                        icon={<BookOpen className="w-6 h-6 text-blue-500" />}
                        iconBg="bg-blue-50"
                        title="Simulados Oficiais ANAC"
                        description="Questões atualizadas dos blocos ESS, RPA/SAC, PSS/Fatores Humanos e CGA."
                    />
                    <FeatureCard
                        icon={<Target className="w-6 h-6 text-orange-500" />}
                        iconBg="bg-orange-50"
                        title="Pré-Banca Realista"
                        description="80 questões em 4 blocos com regras oficiais de aprovação e 2ª época."
                        badge="Disponível no Plano Trimestral"
                    />
                    <FeatureCard
                        icon={<TrendingUp className="w-6 h-6 text-blue-400" />}
                        iconBg="bg-blue-50/50"
                        title="Histórico de Desempenho"
                        description="Acompanhe sua evolução com gráficos e métricas detalhadas por matéria."
                    />
                    <FeatureCard
                        icon={<Star className="w-6 h-6 text-orange-400" />}
                        iconBg="bg-orange-50/50"
                        title="Questões Favoritas"
                        description="Marque questões importantes e crie seu banco de estudos personalizado."
                    />
                    <FeatureCard
                        icon={<Brain className="w-6 h-6 text-blue-500" />}
                        iconBg="bg-blue-50"
                        title="Raciocínio Lógico"
                        description="Treine com questões específicas em nosso simulador focado em lógica."
                    />
                    <FeatureCard
                        icon={<FileText className="w-6 h-6 text-orange-500" />}
                        iconBg="bg-orange-50"
                        title="Criador de Currículos"
                        description="Monte seu currículo profissional para processos seletivos em companhias aéreas."
                    />
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
            <div className="absolute top-4 right-4 bg-orange-100 text-orange-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                {badge}
            </div>
        )}
        <h3 className="text-xl font-black text-navy-900 mb-4 tracking-tight">{title}</h3>
        <p className="text-slate-500 font-medium leading-relaxed">{description}</p>
    </div>
);
