
import React, { useState } from 'react';
import {
    Edit2,
    Trash2,
    Plus,
    BookOpen,
    Target,
    TrendingUp,
    Star,
    Brain,
    FileText,
    CheckCircle2,
    X
} from 'lucide-react';
import { Feature } from '../../types';

interface FeaturesManagerProps {
    features: Feature[];
    onUpdateFeatures: (newFeatures: Feature[]) => void;
}

const ICON_OPTIONS = [
    { id: 'BookOpen', icon: BookOpen, label: 'Livro/Estudo' },
    { id: 'Target', icon: Target, label: 'Alvo/Meta' },
    { id: 'TrendingUp', icon: TrendingUp, label: 'Gráfico/Evolução' },
    { id: 'Star', icon: Star, label: 'Estrela/Favorito' },
    { id: 'Brain', icon: Brain, label: 'Cérebro/Lógica' },
    { id: 'FileText', icon: FileText, label: 'Documento/CV' },
] as const;

const ICON_MAP = {
    BookOpen: BookOpen,
    Target: Target,
    TrendingUp: TrendingUp,
    Star: Star,
    Brain: Brain,
    FileText: FileText
};

export const FeaturesManager: React.FC<FeaturesManagerProps> = ({ features, onUpdateFeatures }) => {
    const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
    const [isAddingMode, setIsAddingMode] = useState(false);

    const emptyFeature: Feature = {
        id: '',
        title: '',
        description: '',
        icon: 'BookOpen',
        badge: ''
    };

    const handleSave = (updatedFeature: Feature) => {
        if (!updatedFeature.title || !updatedFeature.description) {
            alert("Título e Descrição são obrigatórios.");
            return;
        }

        let newFeatures;
        if (isAddingMode) {
            const newFeature = { ...updatedFeature, id: Date.now().toString() };
            newFeatures = [...features, newFeature];
        }
        // Actually let's do it properly
    };

    // Refined handleSave
    const handleSaveRefined = (f: Feature) => {
        if (!f.title || !f.description) {
            alert("Título e Descrição são obrigatórios.");
            return;
        }

        let newFeatures;
        if (isAddingMode) {
            const newFeature = { ...f, id: Date.now().toString() };
            newFeatures = [...features, newFeature];
        } else {
            newFeatures = features.map(item => item.id === f.id ? f : item);
        }

        onUpdateFeatures(newFeatures);
        setEditingFeature(null);
        setIsAddingMode(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Deseja realmente excluir este recurso?")) {
            onUpdateFeatures(features.filter(f => f.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-black text-navy-900">Gerenciador de Recursos</h2>
                    <p className="text-sm text-slate-500 font-medium">Controle total sobre os cards de benefícios da landing page.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingFeature(emptyFeature);
                        setIsAddingMode(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-navy-900 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-navy-800 transition-all shadow-lg"
                >
                    <Plus className="w-4 h-4" /> Novo Recurso
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => {
                    const Icon = ICON_MAP[feature.icon] || BookOpen;
                    return (
                        <div key={feature.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col group relative overflow-hidden">
                            {feature.badge && (
                                <div className="absolute top-0 right-8 bg-navy-900 text-white text-[9px] font-black px-3 py-2 rounded-b-xl shadow-lg border-x border-b border-white/5 uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                        {feature.badge}
                                    </div>
                                </div>
                            )}

                            <div className="w-12 h-12 bg-slate-50 text-primary-500 rounded-2xl flex items-center justify-center mb-6">
                                <Icon className="w-6 h-6" />
                            </div>

                            <h3 className="font-black text-navy-900 mb-2 truncate pr-16">{feature.title}</h3>
                            <p className="text-xs text-slate-500 font-medium mb-6 line-clamp-2 leading-relaxed">
                                {feature.description}
                            </p>

                            <div className="mt-auto flex gap-2">
                                <button
                                    onClick={() => {
                                        setEditingFeature({ ...feature });
                                        setIsAddingMode(false);
                                    }}
                                    className="flex-1 py-3 bg-slate-50 text-navy-900 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                                >
                                    <Edit2 className="w-3 h-3" /> Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(feature.id)}
                                    className="px-4 py-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-all"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {editingFeature && (
                <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-md z-[110] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[40px] w-full max-w-2xl shadow-2xl p-8 md:p-10 animate-scale-in max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-3xl font-black text-navy-900 tracking-tight">Configurar Recurso</h3>
                                <p className="text-slate-500 font-medium">Personalize o card de destaque do portal.</p>
                            </div>
                            <button
                                onClick={() => setEditingFeature(null)}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            {/* Left Side: General Info */}
                            <div className="space-y-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título do Recurso</label>
                                    <input
                                        type="text"
                                        value={editingFeature.title}
                                        onChange={(e) => setEditingFeature({ ...editingFeature, title: e.target.value })}
                                        placeholder="Ex: Simulados Oficiais"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-navy-900 focus:border-primary-500 outline-none font-bold text-sm"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição</label>
                                    <textarea
                                        value={editingFeature.description}
                                        onChange={(e) => setEditingFeature({ ...editingFeature, description: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-navy-900 focus:border-primary-500 outline-none font-medium text-xs h-32 resize-none"
                                        placeholder="Destaque as principais vantagens aqui..."
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Etiqueta de Plano (Opcional)</label>
                                    <input
                                        type="text"
                                        value={editingFeature.badge || ''}
                                        onChange={(e) => setEditingFeature({ ...editingFeature, badge: e.target.value })}
                                        placeholder="Ex: Disponível no Plano Gold"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-navy-900 focus:border-primary-500 outline-none font-bold text-sm"
                                    />
                                </div>
                            </div>

                            {/* Right Side: Icon & Preview */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Escolha um Ícone</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {ICON_OPTIONS.map((opt) => {
                                            const Icon = opt.icon;
                                            const isSelected = editingFeature.icon === opt.id;
                                            return (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setEditingFeature({ ...editingFeature, icon: opt.id as any })}
                                                    className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all border-2
                                                        ${isSelected
                                                            ? 'border-primary-500 bg-primary-50 text-primary-600'
                                                            : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-100'
                                                        }`}
                                                >
                                                    <Icon className="w-5 h-5" />
                                                    <span className="text-[8px] font-black uppercase text-center leading-tight">{opt.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-primary-500 uppercase tracking-widest ml-1 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Visualização do Card
                                    </label>
                                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-[24px] relative group overflow-hidden pointer-events-none">
                                        {editingFeature.badge && (
                                            <div className="absolute top-0 right-6 bg-navy-900 text-white text-[8px] font-black px-3 py-1.5 rounded-b-xl shadow-lg border-x border-b border-white/5 uppercase tracking-widest">
                                                <div className="flex items-center gap-1">
                                                    <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                                                    {editingFeature.badge}
                                                </div>
                                            </div>
                                        )}
                                        <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center mb-4 text-primary-500">
                                            {React.createElement(ICON_MAP[editingFeature.icon] || BookOpen, { className: "w-5 h-5" })}
                                        </div>
                                        <div className="text-sm font-black text-navy-900 truncate pr-12">{editingFeature.title || 'Título do Card'}</div>
                                        <div className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{editingFeature.description || 'Descrição completa aparecerá aqui...'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setEditingFeature(null)}
                                className="flex-1 py-5 bg-slate-100 text-slate-500 font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-slate-200 transition-all font-sans"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleSaveRefined(editingFeature)}
                                className="flex-1 py-5 bg-primary-500 text-white font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-primary-600 shadow-xl shadow-primary-500/20 transition-all font-sans text-center"
                            >
                                Salvar Recurso
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
