
import React from 'react';
import { CheckCircle, Clock, CreditCard, ChevronRight } from 'lucide-react';
import { Plan } from '../../types';

interface PricingProps {
    plans: Plan[];
    onLoginClick: (mode?: 'LOGIN' | 'SIGNUP') => void;
}

export const Pricing: React.FC<PricingProps> = ({ plans, onLoginClick }) => {
    return (
        <section id="precos" className="py-32 px-6 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <div className="text-aviation-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 flex items-center justify-center gap-3">
                        <div className="w-8 h-px bg-aviation-slate-200" />
                        Planos de Treinamento
                        <div className="w-8 h-px bg-aviation-slate-200" />
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-aviation-slate-900 elite-heading mb-6 uppercase tracking-tighter">
                        Escolha seu <span className="text-aviation-primary">Plano de Voo</span>
                    </h2>
                    <p className="text-aviation-slate-500 max-w-xl mx-auto font-medium text-lg leading-relaxed">
                        Acesso ilimitado à plataforma para garantir sua aprovação de forma estratégica.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-center">
                    {plans.map((plan, idx) => {
                        const isRecommended = plan.name.includes('Trimestral');
                        return (
                            <div
                                key={plan.id}
                                className={`relative bg-white rounded-[2rem] p-8 lg:p-10 border transition-all duration-500 hover:-translate-y-2 flex flex-col group
                                     ${isRecommended
                                        ? 'border-aviation-primary shadow-xl shadow-aviation-primary/10 z-10'
                                        : 'border-aviation-slate-200 hover:border-aviation-primary/30 shadow-sm'
                                    }`}
                            >
                                {isRecommended && (
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-aviation-primary text-white px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-aviation-primary/20 whitespace-nowrap border border-white/20">
                                        RECOMENDADO
                                    </div>
                                )}

                                <div className="mb-8 text-center sm:text-left">
                                    <h3 className="text-aviation-slate-900 font-black text-2xl mb-2 elite-heading tracking-tighter uppercase group-hover:text-aviation-primary transition-colors">{plan.name}</h3>
                                    <div className="text-aviation-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center justify-center sm:justify-start gap-2">
                                        <Clock className="w-3.5 h-3.5" /> Duração: {plan.duration}
                                    </div>
                                </div>

                                <div className="mb-10 flex items-baseline justify-center sm:justify-start gap-2">
                                    <span className="text-aviation-slate-400 text-lg font-black tracking-widest italic opacity-50">R$</span>
                                    <span className="text-6xl font-black text-aviation-slate-900 elite-heading tracking-tighter">{plan.price}</span>
                                </div>

                                <div className="space-y-4 mb-10 flex-1">
                                    {plan.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-aviation-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle className="w-3 h-3 text-aviation-primary" />
                                            </div>
                                            <span className="text-aviation-slate-500 text-sm font-medium leading-tight">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => onLoginClick('SIGNUP')}
                                    className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md
                                        ${isRecommended
                                            ? 'bg-aviation-primary text-white hover:shadow-lg hover:shadow-aviation-primary/30'
                                            : 'bg-aviation-slate-50 text-aviation-slate-600 hover:bg-aviation-slate-100 hover:text-aviation-primary border border-aviation-slate-200'
                                        }`}
                                >
                                    Adquirir Licença <ChevronRight className="w-4 h-4" />
                                </button>

                                <div className="mt-6 flex items-center justify-center gap-3 text-aviation-slate-400">
                                    <CreditCard className="w-4 h-4" />
                                    <span className="text-[8px] font-black uppercase tracking-widest">PIX OU CARTÃO EM ATÉ 12X</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
