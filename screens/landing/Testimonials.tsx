
import React from 'react';
import { Medal, Calculator, Star } from 'lucide-react';

export const Testimonials = () => {
    return (
        <section id="depoimentos" className="py-32 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="text-primary-500 font-black uppercase tracking-widest text-xs mb-4">Hall da Fama VOOEI</div>
                        <h2 className="text-4xl lg:text-5xl font-black text-navy-900 mb-8 tracking-tight leading-tight">
                            Resultados <span className="text-blue-400">Reais</span> de<br /> Futuros Comissários
                        </h2>
                        <p className="text-slate-500 text-lg font-medium mb-12 leading-relaxed">
                            Mais do que uma plataforma, somos o parceiro de estudos de milhares de alunos. Confira quem já está com a aprovação garantida.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <div className="text-3xl font-black text-navy-900 mb-1">5k+</div>
                                <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Alunos Ativos</div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <div className="text-3xl font-black text-navy-900 mb-1">98%</div>
                                <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Taxa de Sucesso</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <TestimonialCard
                            name="Juliana M."
                            company="Azul Linhas Aéreas"
                            comment="A plataforma é idêntica à prova da ANAC. O layout, o cronômetro, tudo ajuda a diminuir o nervosismo no dia oficial!"
                            image="https://i.pravatar.cc/150?u=juliana_a"
                        />
                        <TestimonialCard
                            name="Ricardo Santos"
                            company="LATAM Brasil"
                            comment="O histórico de desempenho por bloco foi o que me fez passar. Foquei onde estava errando e consegui os 70% em tudo."
                            image="https://i.pravatar.cc/150?u=ricardo"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const TestimonialCard = ({ name, company, comment, image }: any) => (
    <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-xl transition-all">
        <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />)}
        </div>
        <p className="text-slate-600 mb-10 leading-relaxed font-medium italic">"{comment}"</p>
        <div className="flex items-center gap-4">
            <img src={image} className="w-14 h-14 rounded-full ring-4 ring-blue-50" alt={name} />
            <div>
                <div className="font-black text-navy-900 text-lg tracking-tight">{name}</div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">{company}</div>
            </div>
        </div>
    </div>
);
