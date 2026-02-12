
import React from 'react';
import { ExternalLink, ShieldCheck, FileText, Fingerprint, ArrowLeft } from 'lucide-react';
import { UsefulLink } from '../types';

interface UsefulLinksProps {
    links: UsefulLink[];
    onBack?: () => void;
}

const UsefulLinks: React.FC<UsefulLinksProps> = ({ links, onBack }) => {
    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-24 animate-fade-in relative z-10 font-sans">
            {/* Header - Tactical Nav */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-l-4 border-cyan-500 pl-8">
                <div className="flex items-center gap-6">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="bg-white/5 p-4 rounded-full shadow-xl hover:bg-white/10 border border-white/10 transition-all active:scale-95 group"
                        >
                            <ArrowLeft className="w-5 h-5 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
                        </button>
                    )}
                    <div>
                        <h1 className="text-5xl font-black text-white elite-heading tracking-tighter uppercase mb-2">Portal de <span className="text-cyan-400">Integração</span></h1>
                        <p className="text-slate-400 font-bold italic tracking-wide">Acesso de alta prioridade aos sistemas oficiais da Aeronáutica Civil.</p>
                    </div>
                </div>
                <div className="bg-cyan-500/10 text-cyan-400 px-6 py-3 rounded-2xl border border-cyan-500/20 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 animate-pulse shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                    <ShieldCheck className="w-4 h-4" /> PROTOCOLOS OFICIAIS
                </div>
            </div>

            {/* Links Grid - Standardized Elite Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {links.map((link) => (
                    <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-[#1E293B]/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 shadow-2xl hover:border-cyan-500/30 hover:scale-[1.02] transition-all duration-700 flex flex-col h-full overflow-hidden relative"
                    >
                        {/* Decorative HUD Background Icon */}
                        <div className="absolute -right-8 -bottom-8 text-cyan-500 opacity-[0.02] group-hover:opacity-[0.1] transition-all duration-[2000ms] transform group-hover:scale-125 group-hover:-rotate-12">
                            <ExternalLink size={200} />
                        </div>

                        <div className="mb-10 relative z-10">
                            <div className="w-16 h-16 bg-white/5 text-cyan-400 border border-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-cyan-500/20">
                                {link.title.includes('Licenças') && <Fingerprint className="w-8 h-8" />}
                                {link.title.includes('Exames') && <FileText className="w-8 h-8" />}
                                {link.title.includes('CMA') && <ShieldCheck className="w-8 h-8" />}
                                {!link.title.includes('Licenças') && !link.title.includes('Exames') && !link.title.includes('CMA') && <ExternalLink className="w-8 h-8" />}
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4 elite-heading tracking-tighter uppercase group-hover:text-cyan-400 transition-colors">
                                {link.title}
                            </h3>
                            <p className="text-slate-400 text-sm font-bold leading-relaxed italic tracking-wide">
                                {link.description}
                            </p>
                        </div>

                        <div className="mt-auto flex items-center gap-3 text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em] relative z-10 group-hover:text-cyan-400 transition-colors">
                            ACESSAR PORTAL SEGURO <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>

                        {/* Elite Corner Accent */}
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                ))}

                {/* Future Expansion Card - Tactical Placeholder */}
                <div className="bg-[#1E293B]/20 border-2 border-dashed border-white/5 p-10 rounded-[3rem] flex flex-col items-center justify-center text-center opacity-40 hover:opacity-60 transition-all duration-700">
                    <div className="w-16 h-16 bg-white/5 text-slate-500 rounded-2xl flex items-center justify-center mb-6">
                        <PlusIcon className="w-8 h-8" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">AGUARDANDO CONEXÃO</span>
                </div>
            </div>

            {/* Info Box - Technical Alert */}
            <div className="bg-[#1E293B]/80 backdrop-blur-2xl text-white p-10 lg:p-14 rounded-[3rem] flex flex-col md:flex-row items-center gap-10 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[80px]" />

                <div className="w-20 h-20 bg-cyan-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-700">
                    <ShieldCheck className="w-10 h-10 text-cyan-400 animate-pulse" />
                </div>
                <div>
                    <h4 className="text-xl font-black mb-3 elite-heading tracking-tight uppercase group-hover:text-cyan-400 transition-colors">Protocolo de Segurança Crítica</h4>
                    <p className="text-slate-400 text-base font-bold leading-relaxed italic max-w-3xl">
                        Sempre verifique se a conexão é criptografada (SSL/HTTPS) antes de inserir credenciais nos portais SACI ou ANAC. Esta interface atua apenas como gateway de redirecionamento para os ambientes homologados.
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
