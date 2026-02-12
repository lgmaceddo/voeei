
import React from 'react';
import { User } from '../types';
import { BookOpen, BrainCircuit, Plane, ArrowRight, Cloud, Star, Clock, TrendingUp, Activity, Trophy, Link as LinkIcon, Globe, Navigation } from 'lucide-react';
import { DashboardCard } from '../components/ui/DashboardCard';
import { StatCard } from '../components/ui/StatCard';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    Cell
} from 'recharts';

interface DashboardProps {
    user: User;
    onNavigate: (view: any, filter?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {

    // Mock Data for "Altitude de Conhecimento" (Subject Performance)
    const performanceData = [
        { subject: 'RPA', score: 85, color: '#0ea5e9' }, // Primary 500
        { subject: 'CGA', score: 65, color: '#38bdf8' }, // Primary 400
        { subject: 'PSS', score: 92, color: '#0284c7' }, // Primary 600
        { subject: 'ESS', score: 74, color: '#0369a1' }, // Primary 700
        { subject: 'PORT', score: 80, color: '#075985' }, // Primary 800
        { subject: 'SHL', score: 55, color: '#0c4a6e' }, // Primary 900
    ];

    // Mock Data for "Rota de Evolução" (Timeline)
    const evolutionData = [
        { session: 'Sim 1', avg: 45 },
        { session: 'Sim 2', avg: 52 },
        { session: 'Sim 3', avg: 58 },
        { session: 'Sim 4', avg: 70 },
        { session: 'Sim 5', avg: 68 },
        { session: 'Sim 6', avg: 75 },
        { session: 'Atual', avg: 82 },
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1E293B] p-4 border border-white/10 shadow-2xl rounded-2xl backdrop-blur-md">
                    <p className="elite-label text-slate-400 mb-2">{label}</p>
                    <p className="text-cyan-400 font-black text-lg elite-heading">
                        {payload[0].value}% <span className="text-[10px] text-slate-500 ml-1">EFICIÊNCIA</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            {/* --- Thematic Background Layer (Elite Flight Deck) --- */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[#0F172C]" />

                {/* Tactical Tactical Grid */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="tactical-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#06B6D4" strokeWidth="1" />
                        <circle cx="0" cy="0" r="1.5" fill="#06B6D4" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#tactical-grid)" />
                </svg>

                {/* Cockpit HUD Glows */}
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]"></div>
            </div>

            {/* --- Main Content --- */}
            <div className="relative z-10 space-y-10 max-w-7xl mx-auto pb-24 px-6 pt-6">

                {/* Header - Commander's HUD */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                    <div className="border-l-4 border-cyan-500 pl-6 py-1">
                        <h2 className="text-3xl md:text-4xl font-black text-white elite-heading tracking-tighter uppercase leading-none">
                            CENTRAL DE COMANDO
                        </h2>
                        <p className="text-slate-400 mt-2 font-bold uppercase tracking-[0.2em] text-[10px]">
                            Interface de Telemetria de Voo e Desempenho
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl px-5 py-2.5 rounded-2xl shadow-xl border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                        <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest leading-none">Status: Cabine Ativa</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    <DashboardCard
                        title="Técnico ANAC"
                        description="Blocos 1, 2, 3 e 4. Regulamentação, CGA, PSS e ESS."
                        icon={<Plane />}
                        bgIcon={<Plane />}
                        buttonText="Iniciar Simulados"
                        onClick={() => onNavigate('EXAM_LIST', 'ANAC')}
                    />
                    <DashboardCard
                        title="Idiomas Aéreos"
                        description="Treinamento ICAO English e Espanhol Aéreo com IA."
                        icon={<Globe />}
                        bgIcon={<Globe />}
                        buttonText="Acessar Hub"
                        onClick={() => onNavigate('LANGUAGE_HUB')}
                    />
                    <DashboardCard
                        title="Cabine Virtual"
                        description="Simulação de emergências, CRM e atendimento médico."
                        icon={<Navigation />}
                        bgIcon={<Navigation />}
                        buttonText="Simular Agora"
                        onClick={() => onNavigate('CABIN_SIMULATOR')}
                    />
                    <DashboardCard
                        title="Simulados SHL"
                        description="Raciocínio lógico e numérico para testes psicotécnicos."
                        icon={<BrainCircuit />}
                        bgIcon={<BrainCircuit />}
                        buttonText="Resolver Lógica"
                        onClick={() => onNavigate('EXAM_LIST', 'SHL')}
                    />
                    <DashboardCard
                        title="Telemetria ANAC"
                        description="Consulta de licenças, extratos de exames e CMA oficial."
                        icon={<LinkIcon />}
                        bgIcon={<LinkIcon />}
                        buttonText="Acessar Rede"
                        onClick={() => onNavigate('USEFUL_LINKS')}
                    />
                </div>

                {/* --- ANALYTICS SECTION --- */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h3 className="text-2xl font-black text-white elite-heading tracking-tight">
                            TELEMETRIA DE CARREIRA
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Chart 1: Proficiency Breakdown */}
                        <div className="bg-[#1E293B]/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-700 hover:scale-[1.01]">
                            <div className="flex justify-between items-center mb-10 relative z-10">
                                <div>
                                    <h4 className="text-xl font-black text-white elite-heading uppercase tracking-tight group-hover:text-cyan-400 transition-colors">Altitude de Conhecimento</h4>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Eficiência por Categoria Técnica</p>
                                </div>
                                <div className="bg-cyan-500/10 p-3 rounded-2xl border border-cyan-500/20 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500">
                                    <TrendingUp className="w-5 h-5 text-cyan-400 group-hover:text-white" />
                                </div>
                            </div>

                            <div className="h-72 w-full relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={performanceData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                                        <XAxis type="number" hide domain={[0, 100]} />
                                        <YAxis
                                            dataKey="subject"
                                            type="category"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 900, textAnchor: 'middle' }}
                                            width={60}
                                        />
                                        <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} content={<CustomTooltip />} />
                                        <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={28} background={{ fill: 'rgba(255,255,255,0.03)', radius: 8 }}>
                                            {performanceData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={index === 2 ? '#06b6d4' : '#1e3a8a'}
                                                    fillOpacity={0.8}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Elite Corner Accent */}
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Chart 2: Evolution History */}
                        <div className="bg-[#1E293B]/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-700 hover:scale-[1.01]">
                            <div className="flex justify-between items-center mb-10 relative z-10">
                                <div>
                                    <h4 className="text-xl font-black text-white elite-heading uppercase tracking-tight group-hover:text-cyan-400 transition-colors">Vetor de Evolução</h4>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Histórico de Progressão em Simulados</p>
                                </div>
                                <div className="bg-emerald-500/10 text-emerald-400 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                                    +12% TREND
                                </div>
                            </div>

                            <div className="h-72 w-full relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={evolutionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                        <XAxis
                                            dataKey="session"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }}
                                        />
                                        <YAxis hide domain={[0, 100]} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="avg"
                                            stroke="#06B6D4"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorAvg)"
                                            activeDot={{ r: 8, strokeWidth: 2, fill: '#fff', stroke: '#06B6D4' }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Elite Corner Accent */}
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <StatCard
                        title="BANCO DE QUESTÕES"
                        value="12"
                        suffix="FAVORITOS TÉCNICOS SALVOS"
                        icon={<Star />}
                        variant="info"
                    />
                    <StatCard
                        title="DEDICAÇÃO TOTAL"
                        value="3h 40m"
                        suffix="DURAÇÃO DE VOO ESTA SEMANA"
                        icon={<Clock />}
                        variant="primary"
                    />
                    <StatCard
                        title="MISSÕES CONCLUÍDAS"
                        value={`${user.achievements?.length || 0} / 6`}
                        suffix="CONQUISTAS DE CARREIRA"
                        icon={<Trophy />}
                        variant="success"
                    />
                </div>

            </div>
        </>
    );
};

export default Dashboard;
