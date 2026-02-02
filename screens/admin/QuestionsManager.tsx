
import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, XCircle } from 'lucide-react';
import { Question } from '../../types';
import { EXAM_CATEGORIES, MOCK_QUESTIONS } from '../../constants';
import { Button } from '../../components/ui/Button';

export const QuestionsManager = () => {
    const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    const [filterCategory, setFilterCategory] = useState<string>('ALL');

    const handleSave = (q: any) => {
        if (editingQuestion) {
            setQuestions(prev => prev.map(item => item.id === editingQuestion.id ? { ...q, id: item.id } : item));
        } else {
            setQuestions(prev => [{ ...q, id: Date.now() }, ...prev]);
        }
        setIsModalOpen(false);
        setEditingQuestion(null);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta questão?')) {
            setQuestions(prev => prev.filter(q => q.id !== id));
        }
    };

    const filteredQuestions = filterCategory === 'ALL'
        ? questions
        : questions.filter(q => q.category === filterCategory);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="flex flex-wrap gap-3 flex-1">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar questão..."
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 transition-all text-sm font-medium"
                        />
                    </div>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-5 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:border-primary-500 transition-all outline-none"
                    >
                        <option value="ALL">Todos os Blocos</option>
                        {EXAM_CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                        ))}
                    </select>
                </div>
                <Button
                    onClick={() => { setEditingQuestion(null); setIsModalOpen(true); }}
                >
                    <Plus className="w-4 h-4" /> Nova Questão
                </Button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Questão</th>
                            <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Bloco</th>
                            <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredQuestions.map((q) => (
                            <tr key={q.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="max-w-xl">
                                        <div className="font-bold text-navy-900 text-sm line-clamp-2">{q.text}</div>
                                        <div className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">ID: {q.id}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-black uppercase tracking-tighter">
                                        {EXAM_CATEGORIES.find(c => c.id === q.category)?.title || q.category}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="flex items-center justify-end gap-2 px-2">
                                        <button
                                            onClick={() => { setEditingQuestion(q); setIsModalOpen(true); }}
                                            className="p-2 text-slate-400 hover:text-primary-500 transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(q.id)}
                                            className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-6 bg-slate-50/50 border-t border-slate-100">
                    <span className="text-sm text-slate-500 font-medium">Total: {filteredQuestions.length} questões</span>
                </div>
            </div>

            {isModalOpen && (
                <QuestionForm
                    initialData={editingQuestion}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

const QuestionForm = ({ initialData, onSave, onClose }: any) => {
    const [formData, setFormData] = useState({
        text: initialData?.text || '',
        category: initialData?.category || EXAM_CATEGORIES[0].id,
        options: initialData?.options || ['', '', '', ''],
        correctIndex: initialData?.correctIndex ?? 0,
        explanation: initialData?.explanation || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-2xl font-black text-navy-900 tracking-tight">
                            {initialData ? 'Editar Questão' : 'Nova Questão'}
                        </h2>
                        <p className="text-slate-500 text-sm font-medium">Preencha os dados seguindo o padrão oficial.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <XCircle className="w-6 h-6 text-slate-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Bloco Selection */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Bloco / Categoria</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-navy-900 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 transition-all outline-none font-bold"
                        >
                            {EXAM_CATEGORIES.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.title}</option>
                            ))}
                        </select>
                    </div>

                    {/* Question Text */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Enunciado da Questão</label>
                        <textarea
                            required
                            value={formData.text}
                            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-navy-900 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 transition-all outline-none font-medium min-h-[120px]"
                            placeholder="Digite o texto da questão..."
                        />
                    </div>

                    {/* Options */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {['A', 'B', 'C', 'D'].map((label, idx) => (
                            <div key={label} className="space-y-3">
                                <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Opção {label}</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.options[idx]}
                                    onChange={(e) => {
                                        const newOptions = [...formData.options];
                                        newOptions[idx] = e.target.value;
                                        setFormData({ ...formData, options: newOptions });
                                    }}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-navy-900 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 transition-all outline-none font-bold"
                                    placeholder={`Texto da alternativa ${label}...`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Correct Option & Explanation */}
                    <div className="grid md:grid-cols-3 gap-8 pt-4">
                        <div className="space-y-3">
                            <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Gabarito (Resposta)</label>
                            <select
                                value={formData.correctIndex}
                                onChange={(e) => setFormData({ ...formData, correctIndex: parseInt(e.target.value) })}
                                className="w-full bg-navy-900 text-white border-0 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary-500/20 transition-all outline-none font-black"
                            >
                                <option value={0}>Alternativa A</option>
                                <option value={1}>Alternativa B</option>
                                <option value={2}>Alternativa C</option>
                                <option value={3}>Alternativa D</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 space-y-3">
                            <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Explicação Técnica</label>
                            <textarea
                                value={formData.explanation}
                                onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                                className="w-full bg-blue-50/50 border border-blue-100 rounded-2xl px-6 py-4 text-navy-900 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 transition-all outline-none font-medium text-sm min-h-[100px]"
                                placeholder="Descreva por que esta é a alternativa correta..."
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex gap-4">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            className="flex-1 rounded-2xl"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="flex-[2] rounded-2xl"
                        >
                            Salvar Questão
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

