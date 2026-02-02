
import React from 'react';
import { User } from '../types';
import { BookOpen, BrainCircuit, Plane, ArrowRight, Cloud, Star, Clock, TrendingUp, Activity, Trophy } from 'lucide-react';
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
        <div className="bg-white p-3 border border-slate-100 shadow-xl rounded-xl">
          <p className="font-bold text-slate-700 text-sm mb-1">{label}</p>
          <p className="text-primary-600 font-bold text-sm">
            {payload[0].value}% Aproveitamento
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* --- Thematic Background Layer --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Sky Atmosphere Gradient - Aviation Theme */}
        <div className="absolute inset-0 bg-[#F8FAFC]" />

        {/* Decorative Grid/Chart Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0ea5e9" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Subtle Blur Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary-600/5 rounded-full blur-[100px]"></div>
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 space-y-8 max-w-6xl mx-auto pb-20">

        {/* Header - Minimalist */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
              Dashboard
            </h2>
            <p className="text-slate-600 mt-1 font-medium">
              Visão geral do seu treinamento para comissário.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/50">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-bold text-slate-600 uppercase">Sistema Operacional</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Técnico ANAC"
            description="Blocos 1, 2, 3 e 4. Regulamentação, CGA, PSS e ESS."
            icon={<Plane />}
            bgIcon={<Plane />}
            buttonText="Acessar simulados"
            onClick={() => onNavigate('EXAM_LIST', 'ANAC')}
          />
          <DashboardCard
            title="Português"
            description="Gramática e interpretação de texto focada em seleções."
            icon={<BookOpen />}
            bgIcon={<BookOpen />}
            buttonText="Treinar agora"
            onClick={() => onNavigate('EXAM_LIST', 'PORTUGUESE')}
          />
          <DashboardCard
            title="Testes SHL"
            description="Raciocínio lógico e numérico para testes psicotécnicos."
            icon={<BrainCircuit />}
            bgIcon={<BrainCircuit />}
            buttonText="Resolver testes"
            onClick={() => onNavigate('EXAM_LIST', 'SHL')}
          />
        </div>

        {/* --- ANALYTICS SECTION --- */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 drop-shadow-sm">
            <Activity className="w-5 h-5 text-primary-600" />
            Performance de Voo
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Chart 1: Proficiency Breakdown */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-white/60 shadow-lg relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-slate-700">Altitude de Conhecimento</h4>
                  <p className="text-xs text-slate-500 font-medium">Média de acertos por matéria</p>
                </div>
                <div className="bg-slate-100 p-2 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-slate-500" />
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis
                      dataKey="subject"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#475569', fontSize: 12, fontWeight: 700 }}
                      width={50}
                    />
                    <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                    <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={24} background={{ fill: '#f1f5f9', radius: [0, 6, 6, 0] }}>
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Evolution History */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-white/60 shadow-lg relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-slate-700">Rota de Evolução</h4>
                  <p className="text-xs text-slate-500 font-medium">Progresso nos últimos simulados</p>
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                  +12% este mês
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={evolutionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="session"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                    />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="avg"
                      stroke="#0ea5e9"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorAvg)"
                      activeDot={{ r: 6, strokeWidth: 0, fill: '#0369a1', stroke: '#fff' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Questões Favoritas"
            value="12"
            suffix="Salvas para revisão técnica."
            icon={<Star />}
            variant="info"
          />
          <StatCard
            title="Tempo de Estudo"
            value="3h 40min"
            suffix="Dedicados esta semana."
            icon={<Clock />}
            variant="primary"
          />
          <StatCard
            title="Conquistas"
            value={`${user.achievements?.length || 0} / 6`}
            suffix="Marcos de carreira atingidos."
            icon={<Trophy />}
            variant="success"
            className="cursor-pointer"
          />
        </div>

      </div>
    </>
  );
};

export default Dashboard;
