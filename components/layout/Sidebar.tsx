
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
  Link as LinkIcon
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
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative
          ${isActive
            ? 'bg-white/10 text-white shadow-sm'
            : 'text-slate-400 hover:bg-white/5 hover:text-white'
          }
        `}
      >
        {/* Active Indicator Line */}
        {isActive && (
          <div className="absolute left-0 w-1 h-6 bg-primary-500 rounded-r-full" />
        )}

        <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-primary-400' : 'text-slate-500 group-hover:text-primary-400'}`} />
        <span className={`font-bold text-sm tracking-tight transition-colors duration-300 ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
          {label}
        </span>

        {isActive && (
          <div className="ml-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
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
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0F172A] border-r border-white/5 shadow-2xl lg:shadow-none transform transition-transform duration-500 ease-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

        {/* Logo Area with Gradient background */}
        <div className="relative pt-2 pb-6 px-8 flex flex-col items-center">
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary-500/10 to-transparent -z-10" />
          <img src="/logo.png" alt="VOOEI" className="h-[140px] w-auto object-contain drop-shadow-2xl" />
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 space-y-6 overflow-y-auto py-4 custom-scrollbar">

          <div>
            <div className="px-4 mb-3">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Principal</span>
            </div>
            <div className="space-y-1">
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
                label="Links Úteis ANAC"
                view="USEFUL_LINKS"
              />
            </div>
          </div>

          <div>
            <div className="px-4 mb-3">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Estudos</span>
            </div>
            <div className="space-y-1">
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
                label="Testes SHL"
                view="EXAM_LIST"
                filter="SHL"
                activeCondition={currentView === 'EXAM_LIST' && activeFilter === 'SHL'}
              />
            </div>
          </div>

          {user.role === 'admin' && (
            <div>
              <div className="px-4 mb-3 flex items-center gap-2">
                <Shield className="w-3 h-3 text-primary-500" />
                <span className="text-[10px] font-black text-primary-500 uppercase tracking-[0.2em]">Sistema</span>
              </div>
              <div className="space-y-1">
                <NavItem
                  icon={Shield}
                  label="Painel Administrativo"
                  view="ADMIN"
                />
              </div>
            </div>
          )}

          <div>
            <div className="px-4 mb-3">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Conta</span>
            </div>
            <div className="space-y-1">
              <NavItem
                icon={UserIcon}
                label="Meu Perfil"
                view="PROFILE"
              />
            </div>
          </div>
        </div>

        {/* Premium User Card */}
        <div className="p-6 mt-auto">
          <div className="bg-gradient-to-br from-slate-800/50 to-navy-950/50 rounded-3xl p-4 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary-500/10 rounded-full blur-xl -mr-4 -mt-4" />

            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <img src={user.avatarUrl} className="w-10 h-10 rounded-2xl border border-white/10 shadow-lg object-cover" alt="User" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#0F172A] rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-white truncate tracking-tight">{user.name}</p>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                    <p className="text-[10px] font-black text-primary-500 uppercase tracking-tighter">
                      {user.planType || 'Plano Premium'}
                    </p>
                  </div>
                  {user.planExpiration && (
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                      Expira em: {user.planExpiration}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="mt-4 w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 py-3 rounded-xl hover:bg-rose-500/10 transition-all duration-300 border border-transparent hover:border-rose-500/20"
            >
              <LogOut className="w-3 h-3" /> Fazer Logout
            </button>
          </div>
        </div>

      </aside>
    </>
  );
};
