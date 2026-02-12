
import React from 'react';
import { ShieldCheck, ArrowRight, Medal, Users, Plane, FileText, Trophy } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';

interface HeroProps {
    onLoginClick: (mode?: 'LOGIN' | 'SIGNUP') => void;
}

export const Hero: React.FC<HeroProps> = ({ onLoginClick }) => {
    return (
        <section className="pt-40 pb-32 px-6 bg-aviation-slate-50 relative overflow-hidden">
            {/* Aviation Grid Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-aviation-primary/5 rounded-full blur-[160px]" />
                <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-aviation-primary/5 rounded-full blur-[140px]" />
                <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
                <div className="flex-1 text-center lg:text-left animate-fade-in">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white text-aviation-primary text-[10px] font-black mb-8 border border-aviation-slate-200 uppercase tracking-widest shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-aviation-primary shadow-sm" />
                        Plataforma de Treinamento ANAC v2.4
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-aviation-slate-900 elite-heading leading-[1.1] mb-8 uppercase tracking-tighter">
                        Excelência em <br />
                        <span className="text-aviation-primary">Treinamento</span> <br />
                        Aeronáutico.
                    </h1>
                    <p className="text-lg text-aviation-slate-500 mb-10 max-w-2xl font-medium leading-relaxed">
                        Simulados técnicos de alta precisão, análise de performance detalhada e a infraestrutura completa para sua aprovação nas bancas da ANAC.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button
                            onClick={() => onLoginClick('SIGNUP')}
                            className="bg-aviation-primary text-white px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest hover:shadow-lg hover:shadow-aviation-primary/30 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-md"
                        >
                            Começar Agora <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onLoginClick('LOGIN')}
                            className="bg-white text-aviation-slate-600 border border-aviation-slate-200 px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-aviation-slate-50 transition-all text-center active:scale-95 shadow-sm"
                        >
                            Área do Aluno
                        </button>
                    </div>
                </div>

                <div className="flex-1 w-full lg:max-w-xl space-y-6 animate-fade-in">
                    {/* Hall of Fame Card */}
                    <div className="bg-white rounded-[2.5rem] border border-aviation-slate-200 p-8 shadow-sm overflow-hidden relative group">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-aviation-slate-900 font-black text-lg flex items-center gap-3 uppercase elite-heading">
                                    <Trophy className="w-5 h-5 text-amber-500" /> Top Performance
                                </h3>
                                <p className="text-[10px] font-black text-aviation-slate-400 uppercase tracking-widest mt-1">Ranking de Telemetria Mensal</p>
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

                    <div className="grid grid-cols-2 gap-4">
                        <StatItem icon={<Users className="w-5 h-5 text-aviation-primary" />} value="5k+" label="Aprovados" />
                        <StatItem icon={<Plane className="w-5 h-5 text-aviation-primary" />} value="100%" label="Realismo" />
                    </div>
                </div>
            </div>
        </section>
    );
};

const HeroHallItem = ({ rank, name, percentage, image, isChampion }: any) => (
    <div className={`flex items-center gap-4 p-3 rounded-2xl transition-all hover:bg-aviation-slate-50 border border-transparent ${isChampion ? 'bg-aviation-primary/5 border-aviation-primary/10' : ''}`}>
        <div className="relative">
            <img src={image} className={`w-12 h-12 rounded-full border-2 ${rank === 1 ? 'border-amber-400' : 'border-aviation-slate-100'}`} alt={name} />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shadow-sm ${rank === 1 ? 'bg-amber-400 text-white' : 'bg-aviation-slate-600 text-white'}`}>
                {rank}
            </div>
        </div>
        <div className="flex-1">
            <div className="text-aviation-slate-800 font-bold text-sm uppercase leading-none mb-1">{name}</div>
            <div className="text-aviation-slate-400 text-[9px] font-black uppercase tracking-widest">Performance Elite</div>
        </div>
        <div className="text-right">
            <div className={`font-black text-lg elite-heading ${rank === 1 ? 'text-aviation-primary' : 'text-aviation-slate-600'}`}>{percentage}%</div>
        </div>
    </div>
);

const StatItem = ({ icon, value, label }: any) => (
    <div className="bg-white p-6 rounded-3xl border border-aviation-slate-200 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-aviation-slate-50 rounded-xl border border-aviation-slate-100">
            {icon}
        </div>
        <div>
            <div className="text-lg font-black text-aviation-slate-900 elite-heading leading-none">{value}</div>
            <div className="text-[10px] font-black text-aviation-slate-400 uppercase tracking-widest mt-1">{label}</div>
        </div>
    </div>
);
