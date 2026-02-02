
import React from 'react';
import { CheckCircle } from 'lucide-react';

export const ANACBlocks = () => {
    return (
        <section id="blocos" className="py-24 px-4 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="text-primary-500 font-black uppercase tracking-widest text-xs mb-4">Conteúdo Atualizado</div>
                    <h2 className="text-4xl lg:text-5xl font-black text-navy-900 mb-6 tracking-tight leading-tight">
                        Blocos Oficiais da <span className="text-blue-400">Prova ANAC</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                        Estude cada bloco separadamente ou faça simulados completos com as mesmas regras da banca oficial.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    <BlockCard
                        tag="ESS"
                        title="Emergência, Segurança e Sobrevivência"
                        questions={20}
                        requirement="Mínimo 14 acertos (70%) para aprovação"
                        color="orange"
                    />
                    <BlockCard
                        tag="RPA/SAC"
                        title="Regulamentos e Procedimentos Aeronáuticos"
                        questions={20}
                        requirement="Mínimo 14 acertos (70%) para aprovação"
                        color="blue"
                    />
                    <BlockCard
                        tag="PSS/FH"
                        title="Primeiros Socorros e Fatores Humanos"
                        questions={20}
                        requirement="Mínimo 14 acertos (70%) para aprovação"
                        color="red"
                    />
                    <BlockCard
                        tag="CGA"
                        title="Conhecimentos Gerais de Aeronaves"
                        questions={20}
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
        orange: { bg: 'bg-orange-50', text: 'text-orange-500', border: 'hover:border-orange-200' },
        blue: { bg: 'bg-blue-50', text: 'text-blue-500', border: 'hover:border-blue-200' },
        red: { bg: 'bg-rose-50', text: 'text-rose-500', border: 'hover:border-rose-200' },
        emerald: { bg: 'bg-emerald-50', text: 'text-emerald-500', border: 'hover:border-emerald-200' }
    };

    const theme = colors[color];

    return (
        <div className={`bg-white p-8 lg:p-10 rounded-[40px] border border-slate-100 shadow-sm transition-all duration-500 ${theme.border} hover:shadow-2xl hover:-translate-y-1 group relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -z-0 transition-all group-hover:bg-white group-hover:scale-110"></div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <span className={`px-4 py-1.5 rounded-full ${theme.bg} ${theme.text} text-xs font-black tracking-widest uppercase`}>
                    Bloco {tag}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg">20 Questões</span>
            </div>

            <h3 className="text-2xl font-black text-navy-900 mb-8 tracking-tight h-16 line-clamp-2 leading-[1.2] relative z-10 group-hover:text-primary-600 transition-colors">
                {title}
            </h3>

            <div className="flex items-center gap-3 text-sm font-bold text-slate-500 border-t border-slate-50 pt-6 relative z-10">
                <div className={`w-8 h-8 rounded-xl ${theme.bg} flex items-center justify-center shadow-inner`}>
                    <CheckCircle className={`w-4 h-4 ${theme.text}`} />
                </div>
                <span className="flex-1">{requirement}</span>
            </div>
        </div>
    );
};
