
import React from 'react';

interface NavbarProps {
    onLoginClick: (mode?: 'LOGIN' | 'SIGNUP') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
    return (
        <nav className="fixed top-0 w-full bg-navy-900/95 backdrop-blur-md border-b border-white/10 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img src="/logo.png" alt="VOOEI" className="h-[154px] w-auto object-contain" />
                    </div>
                    <div className="hidden md:flex items-center gap-10">
                        <a href="#recursos" className="text-slate-300 hover:text-primary-400 font-medium transition-colors text-sm uppercase tracking-wider">Recursos</a>
                        <a href="#blocos" className="text-slate-300 hover:text-primary-400 font-medium transition-colors text-sm uppercase tracking-wider">Blocos ANAC</a>
                        <a href="#planos" className="text-slate-300 hover:text-primary-400 font-medium transition-colors text-sm uppercase tracking-wider">Planos</a>
                        <a href="#depoimentos" className="text-slate-300 hover:text-primary-400 font-medium transition-colors text-sm uppercase tracking-wider">Depoimentos</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => onLoginClick('LOGIN')}
                            className="text-white font-semibold hover:text-primary-400 transition-colors text-sm"
                        >
                            Entrar
                        </button>
                        <button
                            onClick={() => onLoginClick('SIGNUP')}
                            className="bg-primary-500 text-white px-6 py-2.5 rounded-full font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20 hover:scale-105 active:scale-95 text-sm"
                        >
                            Começar Agora
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
