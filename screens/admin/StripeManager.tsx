
import React from 'react';
import { BarChart3, Globe, CheckCircle, CreditCard } from 'lucide-react';

export const StripeManager = () => {
    return (
        <div className="space-y-6">
            <div className="bg-navy-900 p-10 rounded-[40px] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px]"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                <BarChart3 className="w-6 h-6 text-primary-400" />
                            </div>
                            <h3 className="text-xl font-bold">Resumo Financeiro</h3>
                        </div>
                        <div className="text-5xl font-black tracking-tight mb-2 text-primary-400">R$ 12.450,00</div>
                        <p className="text-slate-400 font-medium italic">Receita bruta nos últimos 30 dias.</p>
                    </div>
                    <div className="flex flex-col justify-end gap-3">
                        <button className="px-8 py-4 bg-primary-500 text-white font-black rounded-2xl hover:bg-primary-600 transition-all flex items-center justify-center gap-3">
                            <Globe className="w-5 h-5" /> Abrir Dashboard Stripe
                        </button>
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase justify-center">
                            <CheckCircle className="w-4 h-4 text-green-500" /> Webhook Conectado
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                <h4 className="font-black text-navy-900 uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary-500" /> Transações Recentes
                </h4>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-navy-900">U</div>
                                <div>
                                    <div className="font-bold text-navy-900">Usuário Exemplo {i}</div>
                                    <div className="text-xs text-slate-500">Plano Trimestral • Via Pix</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-black text-navy-900">R$ 99,90</div>
                                <div className="text-[10px] text-green-500 font-black uppercase tracking-widest">Sucesso</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
