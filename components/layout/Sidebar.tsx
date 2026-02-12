
import React from 'react';
import { User } from '../../types';
import {
  Plane,
  BookOpen,
  BrainCircuit,
  LayoutDashboard,
  LogOut,
  User as UserIcon,
  ChevronRight,
  Menu,
  FileText,
  Shield,
  Trophy,
  Link as LinkIcon,
  Globe,
  Navigation
} from 'lucide-react';

interface SidebarProps {
  user: User;
  currentView: string;
  activeFilter: string;
  onNavigate: (view: any, filter?: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  currentView,
  activeFilter,
  onNavigate,
  onLogout,
  isOpen,
  setIsOpen
}) => {

  const handleNav = (view: string, filter: string) => {
    onNavigate(view, filter);
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  const NavItem = ({ icon: Icon, label, view, filter = 'ALL', activeCondition }: any) => {
    const isActive = activeCondition
      ? activeCondition
      : (currentView === view && (filter === 'ALL' || activeFilter === filter));

    return (
      <button
        onClick={() => handleNav(view, filter)}
        className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-500 group relative overflow-hidden
          ${isActive
            ? 'bg-gradient-to-r from-cyan-500/10 to-transparent text-white shadow-[0_0_20px_rgba(6,182,212,0.05)]'
            : 'text-slate-400 hover:bg-white/5 hover:text-white'
          }
        `}
      >
        {/* Active Indicator Pillar */}
        {isActive && (
          <div className="absolute left-0 w-1.5 h-8 bg-cyan-500 rounded-r-full shadow-[0_0_15px_rgba(6,182,212,0.6)]" />
        )}

        <Icon className={`w-5 h-5 transition-all duration-500 ${isActive ? 'text-cyan-400 scale-110' : 'text-slate-500 group-hover:text-cyan-400'}`} />
        <span className={`text-[13px] font-black uppercase tracking-widest transition-colors duration-500 ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
          {label}
        </span>

        {isActive && (
          <div className="ml-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
          </div>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#0F172C]/80 backdrop-blur-md z-40 lg:hidden transition-all duration-500"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-[#0F172C] border-r border-white/5 shadow-2xl lg:shadow-none transform transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col p-4
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

        {/* Logo Area with Elite Glow */}
        <div className="relative py-8 flex flex-col items-center">
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-cyan-500/10 to-transparent -z-10 blur-2xl" />
          <img src="/logo.png" alt="VOOEI" className="h-[120px] w-auto object-contain drop-shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:scale-105 transition-transform duration-700" />
        </div>

        {/* Navigation */}
        <div className="flex-1 px-2 space-y-8 overflow-y-auto py-6 custom-scrollbar">

          <div className="space-y-3">
            <div className="px-5">
              <span className="elite-label text-slate-500">Centro de Operações</span>
            </div>
            <div className="space-y-1.5">
              <NavItem
                icon={LayoutDashboard}
                label="Dashboard"
                view="DASHBOARD"
              />
              <NavItem
                icon={FileText}
                label="Meu Currículo"
                view="CV_BUILDER"
              />
              <NavItem
                icon={Trophy}
                label="Conquistas"
                view="ACHIEVEMENTS"
              />
              <NavItem
                icon={LinkIcon}
                label="Telemetria ANAC"
                view="USEFUL_LINKS"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="px-5">
              <span className="elite-label text-slate-500">Módulos de Preparo</span>
            </div>
            <div className="space-y-1.5">
              <NavItem
                icon={Plane}
                label="Técnico ANAC"
                view="EXAM_LIST"
                filter="ANAC"
                activeCondition={currentView === 'EXAM_LIST' && activeFilter === 'ANAC'}
              />
              <NavItem
                icon={BookOpen}
                label="Português"
                view="EXAM_LIST"
                filter="PORTUGUESE"
                activeCondition={currentView === 'EXAM_LIST' && activeFilter === 'PORTUGUESE'}
              />
              <NavItem
                icon={BrainCircuit}
                label="Simulados SHL"
                view="EXAM_LIST"
                filter="SHL"
                activeCondition={currentView === 'EXAM_LIST' && activeFilter === 'SHL'}
              />
              <NavItem
                icon={Globe}
                label="Idiomas Aéreos"
                view="LANGUAGE_HUB"
              />
              <NavItem
                icon={Navigation}
                label="Cabine Virtual"
                view="CABIN_SIMULATOR"
              />
            </div>
          </div>

          {user.role === 'admin' && (
            <div className="space-y-3">
              <div className="px-5 flex items-center gap-2">
                <Shield className="w-3 h-3 text-cyan-500" />
                <span className="elite-label text-cyan-500">Configuração Elite</span>
              </div>
              <div className="space-y-1.5">
                <NavItem
                  icon={Shield}
                  label="Painel Administrativo"
                  view="ADMIN"
                />
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="px-5">
              <span className="elite-label text-slate-500">Conta e Acesso</span>
            </div>
            <div className="space-y-1.5">
              <NavItem
                icon={UserIcon}
                label="Meu Perfil"
                view="PROFILE"
              />
            </div>
          </div>
        </div>

        {/* Premium User Card with Cockpit Aesthetics */}
        <div className="pt-6">
          <div className="bg-[#1E293B]/40 rounded-[2rem] p-5 border border-white/5 relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-[40px] -mr-8 -mt-8" />

            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <img src={user.avatarUrl} className="w-12 h-12 rounded-2xl border border-white/10 shadow-lg object-cover group-hover:scale-105 transition-transform duration-500" alt="User" />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-4 border-[#0F172C] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-black text-white truncate uppercase tracking-tighter">{user.name}</p>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest italic">
                      {user.planType || 'Piloto Elite'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="mt-5 w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-rose-400 py-3.5 rounded-2xl bg-white/5 hover:bg-rose-500/10 transition-all duration-500 border border-white/5 hover:border-rose-500/20"
            >
              <LogOut className="w-3.5 h-3.5" /> Ejetar Sessão
            </button>
          </div>
        </div>

      </aside>
    </>
  );
};
