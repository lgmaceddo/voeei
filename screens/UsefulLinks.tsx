
import React from 'react';
import { ExternalLink, ShieldCheck, FileText, Fingerprint, ArrowLeft } from 'lucide-react';
import { UsefulLink } from '../types';

interface UsefulLinksProps {
    links: UsefulLink[];
    onBack?: () => void;
}

const UsefulLinks: React.FC<UsefulLinksProps> = ({ links, onBack }) => {
    // Group links by category if needed, currently just mapping
    const categories = Array.from(new Set(links.map(l => l.category)));

    return (
        <div className="max-w-5xl mx-auto space-y-10 animate-fade-in pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="bg-white p-2 rounded-full shadow-sm hover:bg-slate-50 border border-slate-100 transition-all active:scale-95"
                        >
                            <ArrowLeft className="w-5 h-5 text-slate-500" />
                        </button>
                    )}
                    <div>
                        <h1 className="text-3xl font-black text-navy-900 tracking-tight">Links Úteis ANAC</h1>
                        <p className="text-slate-500 font-medium">Acesso rápido aos sistemas oficiais da Aeronáutica Civil.</p>
                    </div>
                </div>
                <div className="bg-primary-500/10 text-primary-600 px-4 py-2 rounded-2xl border border-primary-500/20 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Sistemas Oficiais
                </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {links.map((link) => (
                    <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden relative"
                    >
                        {/* Decorative Background Icon */}
                        <div className="absolute -right-4 -bottom-4 text-slate-50 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                            <ExternalLink size={140} />
                        </div>

                        <div className="mb-6">
                            <div className="w-12 h-12 bg-primary-50 text-primary-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-500">
                                {link.title.includes('Licenças') && <Fingerprint className="w-6 h-6" />}
                                {link.title.includes('Exames') && <FileText className="w-6 h-6" />}
                                {link.title.includes('CMA') && <ShieldCheck className="w-6 h-6" />}
                                {!link.title.includes('Licenças') && !link.title.includes('Exames') && !link.title.includes('CMA') && <ExternalLink className="w-6 h-6" />}
                            </div>
                            <h3 className="text-xl font-black text-navy-900 mb-3 group-hover:text-primary-600 transition-colors">
                                {link.title}
                            </h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                {link.description}
                            </p>
                        </div>

                        <div className="mt-auto flex items-center gap-2 text-primary-500 text-xs font-black uppercase tracking-widest">
                            Acessar Portal <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                    </a>
                ))}

                {/* Future Expansion Card */}
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-8 rounded-[32px] flex flex-col items-center justify-center text-center opacity-60">
                    <div className="w-12 h-12 bg-slate-100 text-slate-300 rounded-2xl flex items-center justify-center mb-4">
                        <PlusIcon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Em breve novos links</span>
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-navy-900 text-white p-8 rounded-[32px] flex flex-col md:flex-row items-center gap-6 shadow-2xl shadow-navy-900/20">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-8 h-8 text-primary-400" />
                </div>
                <div>
                    <h4 className="text-lg font-black mb-1">Dica de Segurança</h4>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                        Sempre verifique se você está em um ambiente seguro (https) ao inserir seus dados no portal do SACI ou ANAC. Este portal apenas facilita o seu acesso aos endereços oficiais.
                    </p>
                </div>
            </div>
        </div>
    );
};

const PlusIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
    </svg>
);

export default UsefulLinks;
