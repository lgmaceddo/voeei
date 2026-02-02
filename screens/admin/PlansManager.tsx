
import React, { useState } from 'react';
import { Settings, Edit2 } from 'lucide-react';
import { Plan } from '../../types';

interface PlansManagerProps {
    plans: Plan[];
    onUpdatePlans: (newPlans: Plan[]) => void;
}

export const PlansManager: React.FC<PlansManagerProps> = ({ plans, onUpdatePlans }) => {
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

    const handleSavePlan = (price: string) => {
        if (!editingPlan) return;
        const newPlans = plans.map(p => p.id === editingPlan.id ? { ...p, price } : p);
        onUpdatePlans(newPlans);
        setEditingPlan(null);
    };

    return (
        <div className="grid md:grid-cols-3 gap-6">
            {plans.map(plan => (
                <div key={plan.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-6">
                        <div className="bg-primary-500/10 text-primary-500 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                            Ativo
                        </div>
                        <Settings className="w-5 h-5 text-slate-300 cursor-pointer hover:text-navy-900 transition-colors" />
                    </div>
                    <h4 className="text-2xl font-black text-navy-900 mb-2">{plan.name}</h4>
                    <div className="text-primary-500 font-black text-xl mb-4">R$ {plan.price}</div>
                    <div className="text-slate-400 text-sm font-medium mb-6">{plan.description}</div>
                    <button
                        onClick={() => setEditingPlan(plan)}
                        className="w-full py-4 bg-slate-50 text-navy-900 font-bold rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                    >
                        <Edit2 className="w-4 h-4" /> Alterar Preço
                    </button>
                </div>
            ))}

            {editingPlan && (
                <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] w-full max-w-md shadow-2xl p-8 animate-scale-in">
                        <h3 className="text-2xl font-black text-navy-900 mb-2">Editar Preço</h3>
                        <p className="text-slate-500 mb-8 font-medium">{editingPlan.name}</p>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Valor (R$)</label>
                                <input
                                    type="text"
                                    defaultValue={editingPlan.price}
                                    id="planPriceInput"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-navy-900 focus:border-primary-500 outline-none font-black text-xl"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setEditingPlan(null)}
                                    className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                        const input = document.getElementById('planPriceInput') as HTMLInputElement;
                                        handleSavePlan(input.value);
                                    }}
                                    className="flex-1 py-4 bg-primary-500 text-white font-black rounded-2xl hover:bg-primary-600 shadow-lg shadow-primary-500/20"
                                >
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
