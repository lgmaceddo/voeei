
import React, { useState } from 'react';
import { ExternalLink, Plus, Trash2, Edit2, Globe, ShieldCheck } from 'lucide-react';
import { UsefulLink } from '../../types';

interface LinksManagerProps {
    links: UsefulLink[];
    onUpdateLinks: (newLinks: UsefulLink[]) => void;
}

export const LinksManager: React.FC<LinksManagerProps> = ({ links, onUpdateLinks }) => {
    const [editingLink, setEditingLink] = useState<UsefulLink | null>(null);
    const [isAddingMode, setIsAddingMode] = useState(false);

    const emptyLink: UsefulLink = {
        id: '',
        title: '',
        url: '',
        description: '',
        category: 'ANAC'
    };

    const handleSave = (linkToSave: UsefulLink) => {
        if (!linkToSave.title || !linkToSave.url) {
            alert("Título e URL são obrigatórios.");
            return;
        }

        let newLinks;
        if (isAddingMode) {
            const newLink = { ...linkToSave, id: Date.now().toString() };
            newLinks = [...links, newLink];
        } else {
            newLinks = links.map(l => l.id === linkToSave.id ? linkToSave : l);
        }

        onUpdateLinks(newLinks);
        setEditingLink(null);
        setIsAddingMode(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Tem certeza que deseja excluir este link?")) {
            onUpdateLinks(links.filter(l => l.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-black text-navy-900">Gerenciador de Links</h2>
                    <p className="text-sm text-slate-500 font-medium">Controle os recursos externos disponíveis para os alunos.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingLink(emptyLink);
                        setIsAddingMode(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20"
                >
                    <Plus className="w-4 h-4" /> Adicionar Novo Link
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {links.map((link) => (
                    <div key={link.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-primary-50 text-primary-500 p-2.5 rounded-xl">
                                <Globe className="w-5 h-5" />
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => {
                                        setEditingLink(link);
                                        setIsAddingMode(false);
                                    }}
                                    className="p-2 hover:bg-slate-50 text-slate-400 hover:text-navy-900 rounded-lg transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(link.id)}
                                    className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-black text-navy-900 mb-1">{link.title}</h3>
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary-500">{link.category}</span>
                        </div>

                        <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-2">
                            {link.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between text-xs font-bold pt-4 border-t border-slate-50">
                            <span className="text-slate-300 truncate max-w-[150px]">{link.url}</span>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 flex items-center gap-1">
                                Testar <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {editingLink && (
                <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[40px] w-full max-w-md shadow-2xl p-10 animate-scale-in">
                        <h3 className="text-2xl font-black text-navy-900 mb-2">
                            {isAddingMode ? 'Novo Link Útil' : 'Editar Link'}
                        </h3>
                        <p className="text-slate-500 mb-8 font-medium">Preencha os dados do recurso.</p>

                        <div className="space-y-4 mb-8">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título do Link</label>
                                <input
                                    type="text"
                                    value={editingLink.title}
                                    onChange={(e) => setEditingLink({ ...editingLink, title: e.target.value })}
                                    placeholder="Ex: Consulta de Licenças"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-navy-900 focus:border-primary-500 outline-none font-bold text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">URL Completa (https://)</label>
                                <input
                                    type="text"
                                    value={editingLink.url}
                                    onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                                    placeholder="https://..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-navy-900 focus:border-primary-500 outline-none font-bold text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Categoria</label>
                                <select
                                    value={editingLink.category}
                                    onChange={(e) => setEditingLink({ ...editingLink, category: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-navy-900 focus:border-primary-500 outline-none font-bold text-sm appearance-none"
                                >
                                    <option value="ANAC">ANAC</option>
                                    <option value="SOCIOS">SÓCIOS</option>
                                    <option value="EDITAIS">EDITAIS</option>
                                    <option value="OUTROS">OUTROS</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição Curta</label>
                                <textarea
                                    value={editingLink.description}
                                    onChange={(e) => setEditingLink({ ...editingLink, description: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-navy-900 focus:border-primary-500 outline-none font-medium text-sm h-24 resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setEditingLink(null);
                                    setIsAddingMode(false);
                                }}
                                className="flex-1 py-4 bg-slate-100 text-slate-500 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-200"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleSave(editingLink)}
                                className="flex-1 py-4 bg-primary-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-primary-600 shadow-lg shadow-primary-500/20"
                            >
                                Salvar Link
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
