
import React from 'react';

interface NavbarProps {
    onLoginClick: (mode?: 'LOGIN' | 'SIGNUP') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
    return (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-aviation-slate-200 z-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex justify-between h-20 items-center">
                    {/* Brand Logo */}
                    <div
                        className="flex items-center group cursor-pointer relative"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <img src="/logo.png" alt="VOOEI" className="h-24 w-auto relative z-10" />
                        <div className="ml-4 hidden lg:flex flex-col border-l border-aviation-slate-200 pl-4 h-10 justify-center">
                            <span className="text-[9px] font-black text-aviation-primary uppercase tracking-widest leading-none mb-1">Operacional</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-aviation-slate-800 uppercase tracking-widest">AERO-SIMULADOS</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden xl:flex items-center gap-10">
                        {['Recursos', 'Módulos', 'Preços', 'Sobre'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                                className="text-aviation-slate-500 hover:text-aviation-primary font-black transition-all text-[10px] uppercase tracking-widest relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aviation-primary transition-all group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => onLoginClick('LOGIN')}
                            className="text-aviation-slate-600 font-bold hover:text-aviation-primary transition-colors text-[10px] uppercase tracking-widest px-4 py-2"
                        >
                            Logar
                        </button>
                        <button
                            onClick={() => onLoginClick('SIGNUP')}
                            className="bg-aviation-primary text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:shadow-lg hover:shadow-aviation-primary/30 transition-all active:scale-95 border border-transparent shadow-sm"
                        >
                            Cadastrar-se
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
