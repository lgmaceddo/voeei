import React from 'react';
import { User } from '../types';
import { Button } from '../components/ui/Button';
import { LogOut, User as UserIcon, Settings, Lock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const data = [
    { name: 'RPA', score: 85 },
    { name: 'CGA', score: 65 },
    { name: 'PSS', score: 90 },
    { name: 'ESS', score: 70 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-24 animate-fade-in relative z-10">
      {/* Header Profile - Elite Command Card */}
      <div className="bg-[#1E293B]/40 backdrop-blur-xl rounded-[3rem] p-10 flex flex-col items-center text-center border border-white/5 shadow-2xl relative overflow-hidden group">
        {/* HUD Background Decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/[0.01] rounded-bl-[120px] border-b border-l border-white/5" />

        <div className="relative mb-8 group-hover:scale-105 transition-transform duration-700">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <img
            src={user.avatarUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white/10 relative z-10 p-1 bg-[#0F172C]"
          />
          <button className="absolute bottom-2 right-2 bg-cyan-500 p-3 rounded-full text-[#080C18] shadow-2xl hover:bg-cyan-400 transition-all z-20 border-4 border-[#0F172C] active:scale-95 group/btn">
            <Settings className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
          </button>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-black text-white elite-heading tracking-tighter uppercase mb-2 group-hover:text-cyan-400 transition-colors">
            {user.name}
          </h2>
          <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] mb-10">{user.email}</p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 hover:border-cyan-500/30 transition-all flex items-center gap-3">
              <Lock className="w-4 h-4 text-cyan-600" /> ALTERAR CREDENCIAIS
            </button>
            <button className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 hover:border-cyan-500/30 transition-all flex items-center gap-3">
              <UserIcon className="w-4 h-4 text-cyan-600" /> EDITAR REGISTRO
            </button>
          </div>
        </div>

        {/* Elite Corner Accent */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Stats - Telemetry Analytics */}
      <div className="bg-[#1E293B]/40 backdrop-blur-xl rounded-[3rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="flex justify-between items-center mb-10 relative z-10">
          <div>
            <h3 className="text-xl font-black text-white elite-heading uppercase tracking-tight group-hover:text-cyan-400 transition-colors">Desempenho por Unidade</h3>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Status de Proficiência do Operador</p>
          </div>
        </div>

        <div className="h-72 w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                itemStyle={{ color: '#06b6d4', fontWeight: '900', fontSize: '12px' }}
              />
              <Bar dataKey="score" radius={[8, 8, 8, 8]} barSize={48}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.score >= 70 ? '#06b6d4' : '#1e3a8a'} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Elite Corner Accent */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <button
        className="w-full py-6 rounded-2xl font-black text-rose-500 hover:bg-rose-500/5 hover:text-rose-400 border border-rose-500/10 transition-all uppercase text-[10px] tracking-[0.4em] flex items-center justify-center gap-3 active:scale-95"
        onClick={onLogout}
      >
        <LogOut className="w-4 h-4" /> ENCERRAR SESSÃO OPERACIONAL
      </button>
    </div>
  );
};

export default Profile;