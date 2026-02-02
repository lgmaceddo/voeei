
import React from 'react';
import { CheckCircle, Clock, CreditCard, ChevronRight } from 'lucide-react';
import { Plan } from '../../types';

interface PricingProps {
    plans: Plan[];
    onLoginClick: (mode?: 'LOGIN' | 'SIGNUP') => void;
}

export const Pricing: React.FC<PricingProps> = ({ plans, onLoginClick }) => {
    return (
        <section id="planos" className="py-32 px-4 bg-navy-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-600/5 rounded-full blur-[100px]"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <div className="text-primary-400 font-black uppercase tracking-widest text-xs mb-4">Investimento</div>
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Escolha Seu <span className="text-blue-400">Plano de Voo</span></h2>
                    <p className="text-slate-400 max-w-xl mx-auto font-medium">Preços acessíveis para você focar no que importa: sua carreira.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, idx) => (
                        <div
                            key={plan.id}
                            className={`relative bg-navy-900/50 backdrop-blur-md rounded-[40px] p-10 border transition-all duration-500 hover:-translate-y-2 flex flex-col
                                ${plan.name.includes('Trimestral')
                                    ? 'border-primary-500 ring-4 ring-primary-500/10 scale-105 z-10 shadow-2xl shadow-primary-500/10'
                                    : 'border-white/10 hover:border-white/20'
                                }`}
                        >
                            {plan.name.includes('Trimestral') && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-400 to-primary-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                                    Mais Recomendado
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-white font-black text-2xl mb-2 tracking-tight">{plan.name}</h3>
                                <div className="text-slate-500 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> {plan.duration} de Acesso
                                </div>
                            </div>

                            <div className="mb-10 flex items-baseline gap-1">
                                <span className="text-slate-400 text-xl font-bold">R$</span>
                                <span className="text-5xl font-black text-white tracking-tight">{plan.price}</span>
                                {idx > 0 && <span className="text-slate-500 text-sm font-bold">/total</span>}
                            </div>

                            <div className="space-y-5 mb-12 flex-1">
                                {plan.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-start gap-3 group">
                                        <div className="w-5 h-5 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary-500 transition-colors">
                                            <CheckCircle className="w-3.5 h-3.5 text-primary-500 group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-slate-300 text-sm font-medium leading-tight">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => onLoginClick('SIGNUP')}
                                className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all
                                    ${plan.name.includes('Trimestral')
                                        ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-xl shadow-primary-500/20'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                Selecionar Plano <ChevronRight className="w-4 h-4" />
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-4 text-slate-500">
                                <CreditCard className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Cartão ou PIX</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
