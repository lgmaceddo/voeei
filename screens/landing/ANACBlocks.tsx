
import React from 'react';
import { CheckCircle } from 'lucide-react';

export const ANACBlocks = () => {
    return (
        <section id="modulos" className="py-24 px-6 bg-aviation-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="text-aviation-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 flex items-center justify-center gap-3">
                        <div className="w-8 h-px bg-aviation-slate-200" />
                        Matriz de Competências
                        <div className="w-8 h-px bg-aviation-slate-200" />
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-aviation-slate-900 elite-heading mb-6 tracking-tighter uppercase leading-none">
                        Módulos <span className="text-aviation-primary">ANAC</span>
                    </h2>
                    <p className="text-aviation-slate-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                        Unidades técnicas de avaliação seguindo rigorosamente o programa oficial da ANAC.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    <BlockCard
                        tag="ESS"
                        title="Emergência, Segurança e Sobrevivência"
                        requirement="Mínimo 14 acertos (70%) para aprovação"
                        color="orange"
                    />
                    <BlockCard
                        tag="RPA"
                        title="Regulamentos de Tráfego Aéreo"
                        requirement="Mínimo 14 acertos (70%) para aprovação"
                        color="blue"
                    />
                    <BlockCard
                        tag="PSS"
                        title="Primeiros Socorros e Fatores Humanos"
                        requirement="Mínimo 14 acertos (70%) para aprovação"
                        color="red"
                    />
                    <BlockCard
                        tag="CGA"
                        title="Conhecimentos Gerais de Aeronaves"
                        requirement="Mínimo 14 acertos (70%) para aprovação"
                        color="emerald"
                    />
                </div>
            </div>
        </section>
    );
};

const BlockCard = ({ tag, title, requirement, color }: any) => {
    const colors: any = {
        orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' },
        blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
        red: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
        emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' }
    };

    const theme = colors[color];

    return (
        <div className="bg-white p-8 rounded-[2rem] border border-aviation-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-aviation-primary/30 group">
            <div className="flex items-center justify-between mb-8">
                <span className={`px-4 py-1.5 rounded-lg ${theme.bg} ${theme.text} text-[10px] font-black tracking-widest uppercase border ${theme.border}`}>
                    BLOCO {tag}
                </span>
                <span className="text-[9px] font-black text-aviation-slate-400 uppercase tracking-widest">
                    20 Questões
                </span>
            </div>

            <h3 className="text-2xl font-black text-aviation-slate-800 mb-8 elite-heading tracking-tighter leading-tight group-hover:text-aviation-primary transition-colors uppercase">
                {title}
            </h3>

            <div className="flex items-center gap-4 text-sm font-bold text-aviation-slate-500 border-t border-aviation-slate-100 pt-8 mt-auto">
                <div className={`w-12 h-12 rounded-xl ${theme.bg} flex items-center justify-center border ${theme.border}`}>
                    <CheckCircle className={`w-6 h-6 ${theme.text}`} />
                </div>
                <div className="flex flex-col">
                    <span className="text-aviation-slate-400 text-[9px] font-black uppercase tracking-widest leading-none mb-1">Status Oficial</span>
                    <span className="text-aviation-slate-600 text-xs font-bold">{requirement}</span>
                </div>
            </div>
        </div>
    );
};
