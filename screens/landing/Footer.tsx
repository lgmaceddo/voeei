
import React from 'react';
import { Instagram, Linkedin, Youtube, ArrowRight, ArrowUp } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-aviation-slate-900 text-white py-20 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-12 lg:col-span-5">
                        <div className="mb-8 flex items-center group">
                            <img src="/logo.png" alt="VOOEI" className="h-24 w-auto brightness-200" />
                            <div className="ml-6 border-l border-white/10 pl-6 space-y-1">
                                <div className="text-[9px] font-black text-aviation-primary uppercase tracking-widest">Aero-Simulados</div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">PLATAFORMA OFICIAL</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-aviation-slate-400 max-w-sm leading-relaxed mb-8 text-sm font-medium">
                            A central definitiva de inteligência para decolar sua carreira na aviação civil. Conquiste sua aprovação com tecnologia de elite e simulados precisos.
                        </p>
                        <div className="flex gap-3">
                            <SocialIcon icon={<Instagram className="w-5 h-5" />} />
                            <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
                            <SocialIcon icon={<Youtube className="w-5 h-5" />} />
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="md:col-span-4 lg:col-span-2">
                        <h3 className="text-white font-black mb-6 uppercase tracking-widest text-[10px] flex items-center gap-2">
                            <div className="w-1 h-1 bg-aviation-primary" /> Sistema
                        </h3>
                        <ul className="space-y-3 text-aviation-slate-400 text-[11px] font-bold uppercase tracking-widest">
                            <li><a href="#recursos" className="hover:text-aviation-primary transition-all inline-block">Recursos</a></li>
                            <li><a href="#modulos" className="hover:text-aviation-primary transition-all inline-block">Módulos ANAC</a></li>
                            <li><a href="#precos" className="hover:text-aviation-primary transition-all inline-block">Planos</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-4 lg:col-span-2">
                        <h3 className="text-white font-black mb-6 uppercase tracking-widest text-[10px] flex items-center gap-2">
                            <div className="w-1 h-1 bg-aviation-primary" /> Suporte
                        </h3>
                        <ul className="space-y-3 text-aviation-slate-400 text-[11px] font-bold uppercase tracking-widest">
                            <li><a href="#" className="hover:text-aviation-primary transition-all inline-block">Central FAQ</a></li>
                            <li><a href="#" className="hover:text-aviation-primary transition-all inline-block">Contato</a></li>
                            <li><a href="#" className="hover:text-aviation-primary transition-all inline-block">Termos de Uso</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-4 lg:col-span-3">
                        <h3 className="text-white font-black mb-6 uppercase tracking-widest text-[10px] flex items-center gap-2">
                            <div className="w-1 h-1 bg-aviation-primary" /> Newsletter
                        </h3>
                        <p className="text-aviation-slate-400 text-[10px] mb-4 font-bold uppercase tracking-widest leading-relaxed">
                            Receba atualizações técnicas e conteúdos exclusivos.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Seu e-mail profissional"
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:border-aviation-primary/50 flex-1 transition-all placeholder:text-aviation-slate-600"
                            />
                            <button className="bg-aviation-primary p-3 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-aviation-primary/20 border border-transparent">
                                <ArrowRight className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-aviation-slate-500 text-[9px] font-black uppercase tracking-widest text-center">
                        © 2026 VOOEI AERO-SIMULADOS. TODOS OS DIREITOS RESERVADOS.
                    </p>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group flex items-center gap-4 text-aviation-slate-500 hover:text-white transition-all"
                    >
                        <span className="text-[9px] font-black uppercase tracking-widest group-hover:text-aviation-primary transition-colors">Voltar ao Topo</span>
                        <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center group-hover:border-aviation-primary group-hover:bg-aviation-primary/10 transition-all duration-300">
                            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon }: any) => (
    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-aviation-primary hover:text-white text-aviation-slate-400 transition-all duration-300 cursor-pointer border border-white/10 hover:border-transparent">
        {icon}
    </div>
);
