
import React from 'react';
import { Play, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface ExamCTAProps {
    categoryTitle: string;
    onStartExam: () => void;
}

export const ExamCTA: React.FC<ExamCTAProps> = ({ categoryTitle, onStartExam }) => {
    return (
        <div className="bg-navy-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl mb-8 group">
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {/* Decorative BG Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500 opacity-20 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500 opacity-10 rounded-full blur-[60px] transform -translate-x-1/4 translate-y-1/4"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full border border-white/10 mb-6 backdrop-blur-sm">
                        <ShieldCheck className="w-4 h-4 text-primary-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-200">Simulado Padrão ANAC</span>
                    </div>
                    <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase leading-none">
                        Pronto para decolar?
                    </h2>
                    <p className="text-slate-400 font-bold max-w-lg leading-relaxed">
                        Inicie o simulado de <span className="text-white">{categoryTitle}</span> seguindo rigorosamente as normas de tempo e quantidade de questões oficiais.
                    </p>
                </div>

                <Button
                    onClick={onStartExam}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-black py-8 px-12 rounded-3xl shadow-[0_20px_40px_rgba(14,165,233,0.3)] transform transition-all active:scale-95 flex items-center gap-4 text-xl tracking-tight group/btn w-full lg:w-auto overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                    <Play className="w-8 h-8 fill-current relative z-10" />
                    <span className="relative z-10">INICIAR AGORA</span>
                </Button>
            </div>
        </div>
    );
};
