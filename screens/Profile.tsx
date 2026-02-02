import React from 'react';
import { User } from '../types';
import { Button } from '../components/ui/Button';
import { LogOut, User as UserIcon, Settings, Lock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

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
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      {/* Header Profile */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <img
            src={user.avatarUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-slate-50"
          />
          <button className="absolute bottom-0 right-0 bg-primary-500 p-2 rounded-full text-white shadow-sm hover:bg-primary-600 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
        <p className="text-slate-500 mb-6">{user.email}</p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <Button variant="outline" className="text-xs py-2">
            <Lock className="w-3 h-3 mr-1" /> Senha
          </Button>
          <Button variant="secondary" className="text-xs py-2">
            <UserIcon className="w-3 h-3 mr-1" /> Editar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Desempenho por Matéria</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="score" radius={[8, 8, 8, 8]} barSize={40}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.score >= 70 ? '#0ea5e9' : '#38bdf8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Button variant="ghost" className="w-full text-red-500 hover:bg-red-50 hover:text-red-600" onClick={onLogout}>
        <LogOut className="w-4 h-4" /> Sair da conta
      </Button>
    </div>
  );
};

export default Profile;