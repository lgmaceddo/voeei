
import React from 'react';
import { ShieldCheck, ArrowRight, Medal, Users, Plane, FileText, Trophy } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';

interface HeroProps {
    onLoginClick: (mode?: 'LOGIN' | 'SIGNUP') => void;
}

export const Hero: React.FC<HeroProps> = ({ onLoginClick }) => {
    return (
        <section className="pt-32 pb-32 px-4 bg-navy-900 relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] -z-0"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-600/10 rounded-full blur-[100px] -z-0"></div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
                <div className="flex-1 text-center lg:text-left animate-fade-in-down">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 text-xs font-bold mb-8 border border-primary-500/20 uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4" />
                        Plataforma Oficial de Preparação ANAC
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-8">
                        Sua <br />
                        aprovação <br />
                        <span className="text-blue-400">ANAC</span> <br />
                        começa agora.
                    </h1>
                    <p className="text-lg text-slate-400 mb-10 max-w-2xl leading-relaxed">
                        Simulados realistas, histórico completo de desempenho e a experiência mais próxima da prova oficial. Prepare-se para ser Comissário de Voo com quem entende do assunto.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                        <button
                            onClick={() => onLoginClick('SIGNUP')}
                            className="group px-8 py-4 bg-primary-500 text-white rounded-full font-bold text-lg hover:bg-primary-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary-500/30"
                        >
                            Comece a Estudar Agora <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => onLoginClick('LOGIN')}
                            className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all text-center"
                        >
                            Já Tenho Conta
                        </button>
                    </div>
                </div>

                <div className="flex-1 space-y-4 animate-fade-in relative">
                    {/* 1. Hall of Fame (Now at Top) */}
                    <div className="bg-white/5 backdrop-blur-md rounded-[32px] border border-white/10 p-6 shadow-2xl overflow-hidden relative group">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="text-white font-black text-lg flex items-center gap-2 tracking-tight">
                                    <Medal className="w-5 h-5 text-amber-500" /> Hall da Fama
                                </h3>
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Top Performance do Mês</p>
                            </div>
                            <div className="text-[10px] font-black text-primary-500 uppercase tracking-widest bg-primary-500/10 px-3 py-1.5 rounded-full flex items-center gap-2 border border-primary-500/20">
                                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></span>
                                Ao Vivo
                            </div>
                        </div>

                        <div className="space-y-3">
                            <HeroHallItem
                                rank={1}
                                name="Ana Beatriz S."
                                percentage="98.5"
                                image="https://i.pravatar.cc/150?u=ana"
                                isChampion
                            />
                            <HeroHallItem
                                rank={2}
                                name="Lucas Mendonça"
                                percentage="97.2"
                                image="https://i.pravatar.cc/150?u=lucas"
                            />
                            <HeroHallItem
                                rank={3}
                                name="Mariana Costa"
                                percentage="96.8"
                                image="https://i.pravatar.cc/150?u=mariana_f"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <StatCard
                            variant="glass"
                            icon={<Users />}
                            value="5.000+"
                            title="APROVADOS"
                            suffix="Resultados por todo o país."
                        />
                        <StatCard
                            variant="glass"
                            icon={<Plane />}
                            value="Simulados"
                            title="100% REAIS"
                            suffix="Design idêntico ANAC."
                        />
                        <StatCard
                            variant="glass"
                            icon={<FileText />}
                            value="2.500+"
                            title="QUESTÕES"
                            suffix="Banco atualizado semanal."
                        />
                        <StatCard
                            variant="glass"
                            icon={<Trophy />}
                            value="98%"
                            title="APROVAÇÃO"
                            suffix="Aprovado por comissários."
                        />
                    </div>
                </div>
            </div>

            {/* Airlines Bar */}
            <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 relative z-10">
                <p className="text-center text-slate-500 text-sm font-bold uppercase tracking-[0.2em] mb-10">Nossos alunos voam em todas as companhias</p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                    <span className="text-3xl font-black text-white tracking-tighter">LATAM</span>
                    <span className="text-3xl font-black text-white tracking-tighter">GOL</span>
                    <span className="text-3xl font-black text-white tracking-tighter">AZUL</span>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-[#F8FAFC]">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>
        </section>
    );
};

const HeroHallItem = ({ rank, name, percentage, image, isChampion }: any) => (
    <div className={`flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-white/5 border border-transparent hover:border-white/5 ${isChampion ? 'bg-primary-500/5' : ''}`}>
        <div className="relative">
            <img src={image} className="w-12 h-12 rounded-full border-2 border-white/10" alt={name} />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${rank === 1 ? 'bg-amber-500 text-white' :
                rank === 2 ? 'bg-blue-400 text-white' :
                    'bg-orange-500 text-white'
                }`}>
                {rank}
            </div>
        </div>
        <div className="flex-1">
            <div className="text-white font-bold text-sm tracking-tight">{name}</div>
            <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{rank === 1 ? '🏆 Campeão' : 'Aluno VOOEI'}</div>
        </div>
        <div className="text-right">
            <div className="text-primary-400 font-black text-lg">{percentage}%</div>
            <div className="text-slate-600 text-[8px] font-black uppercase tracking-tighter leading-none">Aproveitamento</div>
        </div>
    </div>
);
