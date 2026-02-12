import React, { useState } from 'react';
import { Plane, ArrowRight, Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface LoginProps {
  onLogin: () => void;
  onBack: () => void;
  initialMode?: 'LOGIN' | 'SIGNUP';
}

const Login: React.FC<LoginProps> = ({ onLogin, onBack, initialMode = 'LOGIN' }) => {
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-[#080C18] flex flex-col lg:flex-row font-sans selection:bg-cyan-500/30 selection:text-white overflow-hidden">
      {/* Decorative Panel - Specialized Cockpit Background */}
      <div className={`hidden lg:flex lg:w-[45%] bg-[#0F172C] relative items-center justify-center p-16 overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${mode === 'SIGNUP' ? 'lg:order-first' : 'lg:order-last'}`}>
        {/* Abstract Cockpit Atmosphere */}
        <div className="absolute inset-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>

          {/* Tech Grid Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <pattern id="login-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#06B6D4" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#login-grid)" />
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-md animate-fade-in space-y-12">
          <div className="w-48 h-48 bg-white/5 backdrop-blur-xl rounded-[3rem] flex items-center justify-center mx-auto border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.3)] group">
            <div className="w-28 h-28 bg-cyan-500/10 rounded-[2.5rem] flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform duration-700">
              <Plane className="w-14 h-14 text-cyan-400 transform -rotate-12 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl font-black text-white elite-heading tracking-tighter leading-tight uppercase">
              {mode === 'LOGIN' ? 'Prepare-se para altitude' : 'Inicie seu Plano de Voo'}
            </h2>
            <p className="text-slate-400 text-lg font-bold italic tracking-wide leading-relaxed">
              {mode === 'LOGIN'
                ? 'Sincronize sua telemetria de estudos e otimize sua performance para os exames da ANAC.'
                : 'A cockpit definitiva para formação de comissários de elite. Junte-se à frota VOOEI.'}
            </p>
          </div>

          {/* Technical Watermark */}
          <div className="pt-10 flex justify-center gap-10 opacity-20 filter grayscale">
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-500">ICAO CERTIFIED</span>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-500">ANAC READY</span>
          </div>
        </div>
      </div>

      {/* Form Area - Immersive Dark Mode */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 relative">
        <div className="w-full max-w-md space-y-10 animate-fade-in-up">

          {/* Back Action */}
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-slate-500 hover:text-cyan-400 transition-all text-[10px] font-black uppercase tracking-[0.3em] w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
            Abortar Sequência
          </button>

          {/* Header */}
          <div className="space-y-8">
            <img src="/logo.png" alt="VOOEI" className="h-[120px] w-auto saturate-0 opacity-80 brightness-200" />
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-white elite-heading tracking-tighter uppercase">
                {mode === 'LOGIN' ? 'Acesso ao Console' : 'Registro de Piloto'}
              </h1>
              <p className="text-slate-500 font-bold uppercase tracking-[0.1em] text-[11px]">
                {mode === 'LOGIN' ? 'Credenciais de segurança requeridas' : 'Iniciando protocolo de nova conta'}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {mode === 'SIGNUP' && (
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Assinatura de Piloto</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-[#1E293B]/40 border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-cyan-500/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all placeholder:text-slate-700 font-bold"
                  placeholder="NOME COMPLETO"
                  required
                />
              </div>
            )}

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Terminal de Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-[#1E293B]/40 border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-cyan-500/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all placeholder:text-slate-700 font-bold"
                placeholder="SEU@EMAIL.COM"
                required
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Chave de Acesso</label>
                {mode === 'LOGIN' && (
                  <button type="button" className="text-[10px] font-black text-cyan-500 hover:text-cyan-400 transition-colors uppercase tracking-[0.1em]">
                    Recuperar Chave
                  </button>
                )}
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-[#1E293B]/40 border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-cyan-500/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all placeholder:text-slate-700 font-bold pr-16"
                  placeholder={mode === 'LOGIN' ? "••••••••" : "TERMINAL PASS"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 p-2 rounded-xl hover:bg-white/5 transition-all"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === 'SIGNUP' && (
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Verificar Chave</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-[#1E293B]/40 border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-cyan-500/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all placeholder:text-slate-700 font-bold"
                  placeholder="REPETIR CHAVE"
                  required
                />
              </div>
            )}

            {mode === 'SIGNUP' && (
              <label className="flex items-start gap-4 cursor-pointer group select-none">
                <div className="relative flex items-center mt-1">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleInputChange}
                    className="peer sr-only"
                    required
                  />
                  <div className="w-6 h-6 border-2 border-white/10 rounded-lg bg-white/5 transition-all peer-checked:bg-cyan-500 peer-checked:border-cyan-500 group-hover:border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0)] peer-checked:shadow-[0_0_15px_rgba(6,182,212,0.4)]"></div>
                  <CheckCircle2 className="w-4 h-4 text-white absolute left-1 top-1 opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-xs text-slate-500 font-bold leading-tight tracking-wide group-hover:text-slate-400 transition-colors">
                  Aceito os <button type="button" className="text-cyan-500 hover:underline">Protocolos de Uso</button> e a <button type="button" className="text-cyan-500 hover:underline">Segurança de Dados</button>
                </span>
              </label>
            )}

            <div className="pt-6">
              <Button type="submit" fullWidth className="py-6 text-xl">
                {mode === 'LOGIN' ? 'INICIAR SESSÃO' : 'EFETIVAR CADASTRO'}
              </Button>
            </div>

            <div className="text-center pt-8 border-t border-white/5">
              <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em]">
                {mode === 'LOGIN' ? (
                  <>
                    Ainda não possui credenciais?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('SIGNUP')}
                      className="text-cyan-500 font-black hover:text-cyan-400 transition-colors mx-2"
                    >
                      Solicitar Registro
                    </button>
                  </>
                ) : (
                  <>
                    Já possui registro ativo?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('LOGIN')}
                      className="text-cyan-500 font-black hover:text-cyan-400 transition-colors mx-2"
                    >
                      Acessar Console
                    </button>
                  </>
                )}
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;