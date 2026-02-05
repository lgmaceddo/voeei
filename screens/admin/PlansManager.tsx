
import React, { useState } from 'react';
import { Settings, Edit2, Plus, Trash2, CheckCircle, Clock } from 'lucide-react';
import { Plan } from '../../types';

interface PlansManagerProps {
    plans: Plan[];
    onUpdatePlans: (newPlans: Plan[]) => void;
}

export const PlansManager: React.FC<PlansManagerProps> = ({ plans, onUpdatePlans }) => {
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
    const [newFeature, setNewFeature] = useState('');

    const handleSavePlan = () => {
        if (!editingPlan) return;
        const newPlans = plans.map(p => p.id === editingPlan.id ? editingPlan : p);
        onUpdatePlans(newPlans);
        setEditingPlan(null);
        setNewFeature('');
    };

    const addFeature = () => {
        if (!editingPlan || !newFeature.trim()) return;
        setEditingPlan({
            ...editingPlan,
            features: [...editingPlan.features, newFeature.trim()]
        });
        setNewFeature('');
    };

    const removeFeature = (index: number) => {
        if (!editingPlan) return;
        const newFeatures = [...editingPlan.features];
        newFeatures.splice(index, 1);
        setEditingPlan({
            ...editingPlan,
            features: newFeatures
        });
    };

    return (
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map(plan => (
                <div key={plan.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="bg-primary-500/10 text-primary-500 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                            Ativo
                        </div>
                        <Settings className="w-5 h-5 text-slate-300 cursor-pointer hover:text-navy-900 transition-colors" />
                    </div>

                    <h4 className="text-2xl font-black text-navy-900 mb-1">{plan.name}</h4>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                        <Clock className="w-3 h-3" /> {plan.duration}
                    </div>

                    <div className="text-primary-500 font-black text-3xl mb-4">
                        <span className="text-sm font-bold align-top mt-1 mr-1">R$</span>
                        {plan.price}
                    </div>

                    <div className="text-slate-500 text-sm font-medium mb-6 line-clamp-2">{plan.description}</div>

                    <div className="space-y-3 mb-8 flex-1">
                        {plan.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs font-bold text-slate-600">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                {feature}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setEditingPlan(JSON.parse(JSON.stringify(plan)))}
                        className="w-full py-4 bg-navy-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-navy-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-navy-900/10"
                    >
                        <Edit2 className="w-4 h-4" /> Gerenciar Plano
                    </button>
                </div>
            ))}

            {editingPlan && (
                <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-md z-[110] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[40px] w-full max-w-2xl shadow-2xl p-8 md:p-10 animate-scale-in max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-3xl font-black text-navy-900 tracking-tight">Configurar Plano</h3>
                                <p className="text-slate-500 font-medium">{editingPlan.name}</p>
                            </div>
                            <button
                                onClick={() => setEditingPlan(null)}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                            >
                                <Plus className="w-6 h-6 rotate-45" />
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            {/* Left Side: Basic Info */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Preço do Plano (R$)</label>
                                    <input
                                        type="text"
                                        value={editingPlan.price}
                                        onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-navy-900 focus:border-primary-500 outline-none font-black text-2xl transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Duração do Acesso</label>
                                    <input
                                        type="text"
                                        value={editingPlan.duration}
                                        onChange={(e) => setEditingPlan({ ...editingPlan, duration: e.target.value })}
                                        placeholder="Ex: 30 Dias"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-navy-900 focus:border-primary-500 outline-none font-bold text-sm transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição Curta</label>
                                    <textarea
                                        value={editingPlan.description}
                                        onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-navy-900 focus:border-primary-500 outline-none font-medium text-sm h-24 resize-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Right Side: Features/Benefits */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Benefícios Inclusos</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newFeature}
                                            onChange={(e) => setNewFeature(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                                            placeholder="Novo benefício..."
                                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-primary-500"
                                        />
                                        <button
                                            onClick={addFeature}
                                            className="bg-primary-500 text-white p-3 rounded-xl hover:bg-primary-600 transition-all font-black"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="mt-4 space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                        {editingPlan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 group">
                                                <span className="text-xs font-bold text-slate-600">{feature}</span>
                                                <button
                                                    onClick={() => removeFeature(idx)}
                                                    className="text-slate-300 hover:text-rose-500 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setEditingPlan(null)}
                                className="flex-1 py-5 bg-slate-100 text-slate-500 font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-slate-200 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSavePlan}
                                className="flex-1 py-5 bg-primary-500 text-white font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-primary-600 shadow-xl shadow-primary-500/20 transition-all"
                            >
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
