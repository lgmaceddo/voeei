
import React from 'react';
import { Instagram, Linkedin, Youtube, ArrowRight, ArrowUp } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-[#020617] text-white py-16 px-4 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="md:col-span-5">
                        <div className="mb-6 -ml-4">
                            <img src="/logo.png" alt="VOOEI" className="h-[110px] w-auto object-contain" />
                        </div>
                        <p className="text-slate-400 max-w-sm leading-relaxed mb-8 text-sm font-medium">
                            A plataforma definitiva para sua preparação na aviação civil. Estude com inteligência, conquiste suas asas com quem é referência em aprovação ANAC.
                        </p>
                        <div className="flex gap-3">
                            <SocialIcon icon={<Instagram className="w-4 h-4" />} />
                            <SocialIcon icon={<Linkedin className="w-4 h-4" />} />
                            <SocialIcon icon={<Youtube className="w-4 h-4" />} />
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="md:col-span-2">
                        <h3 className="text-white font-black mb-6 uppercase tracking-[0.2em] text-[10px]">Portal</h3>
                        <ul className="space-y-3 text-slate-400 text-sm font-bold">
                            <li><a href="#recursos" className="hover:text-primary-400 transition-all hover:translate-x-1 inline-block">Recursos</a></li>
                            <li><a href="#blocos" className="hover:text-primary-400 transition-all hover:translate-x-1 inline-block">Blocos ANAC</a></li>
                            <li><a href="#planos" className="hover:text-primary-400 transition-all hover:translate-x-1 inline-block">Planos</a></li>
                            <li><a href="#depoimentos" className="hover:text-primary-400 transition-all hover:translate-x-1 inline-block">Alunos</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="text-white font-black mb-6 uppercase tracking-[0.2em] text-[10px]">Suporte</h3>
                        <ul className="space-y-3 text-slate-400 text-sm font-bold">
                            <li><a href="#" className="hover:text-primary-400 transition-all hover:translate-x-1 inline-block">FAQ</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-all hover:translate-x-1 inline-block">Contato</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-all hover:translate-x-1 inline-block">Trabalhe Conosco</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h3 className="text-white font-black mb-6 uppercase tracking-[0.2em] text-[10px]">Newsletter</h3>
                        <p className="text-slate-500 text-xs mb-4 font-bold uppercase tracking-wider">Receba dicas de estudo</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Seu e-mail"
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary-500 flex-1 transition-all"
                            />
                            <button className="bg-primary-500 p-2 rounded-xl hover:bg-primary-600 transition-all">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            © 2026 VOOEI Portal de Simulados.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-600 hover:text-slate-400 text-[10px] font-black uppercase tracking-widest transition-colors">Privacidade</a>
                            <a href="#" className="text-slate-600 hover:text-slate-400 text-[10px] font-black uppercase tracking-widest transition-colors">Termos</a>
                        </div>
                    </div>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
                    >
                        <span className="text-[10px] font-black uppercase tracking-widest">Voltar ao topo</span>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary-500 group-hover:bg-primary-500 transition-all">
                            <ArrowUp className="w-4 h-4" />
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon }: any) => (
    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary-500 hover:text-white text-slate-400 transition-all duration-300 cursor-pointer border border-white/5 hover:border-primary-400 shadow-lg">
        {icon}
    </div>
);
