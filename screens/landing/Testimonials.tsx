
import React from 'react';
import { Medal, Star } from 'lucide-react';

export const Testimonials = () => {
    return (
        <section id="depoimentos" className="py-24 px-6 bg-aviation-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="text-aviation-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 flex items-center gap-3">
                            <div className="w-8 h-px bg-aviation-slate-200" />
                            Relatos de Sucesso
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-aviation-slate-900 elite-heading mb-8 tracking-tighter uppercase leading-none">
                            O que dizem nossos <span className="text-aviation-primary">Alunos</span>
                        </h2>
                        <p className="text-aviation-slate-500 text-lg font-medium mb-12 leading-relaxed">
                            A plataforma definitiva para quem busca excelência e aprovação garantida nas bancas da ANAC.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white p-8 rounded-[2rem] border border-aviation-slate-200 shadow-sm group">
                                <div className="text-3xl font-black text-aviation-slate-900 elite-heading mb-1 tracking-tighter group-hover:text-aviation-primary transition-colors">5k+</div>
                                <div className="text-[9px] font-black text-aviation-slate-400 uppercase tracking-widest">Alunos Ativos</div>
                            </div>
                            <div className="bg-white p-8 rounded-[2rem] border border-aviation-slate-200 shadow-sm group">
                                <div className="text-3xl font-black text-aviation-slate-900 elite-heading mb-1 tracking-tighter group-hover:text-aviation-primary transition-colors">98%</div>
                                <div className="text-[9px] font-black text-aviation-slate-400 uppercase tracking-widest">Taxa de Aprovação</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <TestimonialCard
                            name="Juliana M."
                            company="Azul Linhas Aéreas"
                            comment="A plataforma é idêntica à prova da ANAC. O layout, o cronômetro e a análise de erros são fundamentais para a aprovação."
                            image="https://i.pravatar.cc/150?u=juliana_a"
                        />
                        <TestimonialCard
                            name="Ricardo Santos"
                            company="LATAM Brasil"
                            comment="O histórico de desempenho por bloco técnico foi o diferencial estratégico. Foquei nos pontos cegos e venci o exame."
                            image="https://i.pravatar.cc/150?u=ricardo"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const TestimonialCard = ({ name, company, comment, image }: any) => (
    <div className="bg-white p-8 rounded-[2rem] border border-aviation-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
        <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-aviation-primary fill-aviation-primary" />)}
        </div>
        <p className="text-aviation-slate-600 mb-8 leading-relaxed font-medium italic text-base">"{comment}"</p>
        <div className="flex items-center gap-4 pt-6 border-t border-aviation-slate-100">
            <img src={image} className="w-12 h-12 rounded-full border-2 border-aviation-slate-100" alt={name} />
            <div>
                <div className="font-black text-aviation-slate-900 text-base elite-heading tracking-tighter uppercase leading-none mb-1">{name}</div>
                <div className="text-[9px] font-black text-aviation-primary uppercase tracking-widest">{company}</div>
            </div>
            <div className="ml-auto opacity-10">
                <Medal className="w-6 h-6 text-aviation-slate-900" />
            </div>
        </div>
    </div>
);
