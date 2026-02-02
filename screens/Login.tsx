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
    <div className="min-h-screen bg-navy-950 flex flex-col lg:flex-row font-sans selection:bg-primary-500 selection:text-white">

      {/* Decorative Panel - Swaps side based on mode */}
      <div className={`hidden lg:flex lg:w-1/2 bg-navy-900 relative items-center justify-center p-12 overflow-hidden transition-all duration-700 ease-in-out ${mode === 'SIGNUP' ? 'lg:order-first' : 'lg:order-last'}`}>
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary-600/10 rounded-full blur-[100px]"></div>

        <div className="relative z-10 text-center max-w-md animate-fade-in">
          <div className="w-40 h-40 bg-navy-800/50 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-10 border border-white/5 shadow-2xl">
            <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center">
              <Plane className="w-12 h-12 text-primary-500 transform -rotate-12" />
            </div>
          </div>

          <h2 className="text-4xl font-black text-white mb-6 tracking-tight leading-tight">
            {mode === 'LOGIN' ? 'Prepare-se para voar alto' : 'Comece sua jornada hoje'}
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            {mode === 'LOGIN'
              ? 'Acesse simulados realistas, acompanhe seu progresso e conquiste sua aprovação na ANAC.'
              : 'Milhares de comissários já conquistaram a aprovação com a VOOEI. Faça parte dessa história de sucesso.'}
          </p>
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-20 bg-navy-950 min-h-screen">
        <div className="w-full max-w-md space-y-8 animate-fade-in">

          {/* Back Action */}
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-500 hover:text-primary-400 transition-colors text-sm font-bold w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar ao início
          </button>

          {/* Header */}
          <div className="space-y-6">
            <img src="/logo.png" alt="VOOEI" className="h-[154px] w-auto object-contain" />
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                {mode === 'LOGIN' ? 'Bem-vindo de volta' : 'Criar sua conta'}
              </h1>
              <p className="text-slate-500 font-medium">
                {mode === 'LOGIN' ? 'Entre para continuar seus estudos' : 'Comece a estudar agora mesmo'}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 pt-4">

            {mode === 'SIGNUP' && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 ml-1">Nome completo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-navy-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-600 shadow-sm"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 ml-1">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-navy-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-600 shadow-sm"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-400">Senha</label>
                {mode === 'LOGIN' && (
                  <button type="button" className="text-xs font-bold text-primary-500 hover:text-primary-400 transition-colors">
                    Esqueci minha senha
                  </button>
                )}
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-navy-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-600 shadow-sm pr-12"
                  placeholder={mode === 'LOGIN' ? "••••••••" : "Mínimo 8 caracteres"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary-400 p-1.5 rounded-full hover:bg-white/5 transition-all"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === 'SIGNUP' && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 ml-1">Confirmar senha</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-navy-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-600 shadow-sm"
                  placeholder="Repita sua senha"
                  required
                />
              </div>
            )}

            {mode === 'SIGNUP' && (
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center mt-0.5">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleInputChange}
                    className="peer sr-only"
                    required
                  />
                  <div className="w-5 h-5 border-2 border-slate-700 rounded-md bg-navy-900/50 transition-all peer-checked:bg-primary-500 peer-checked:border-primary-500 group-hover:border-primary-500/50"></div>
                  <CheckCircle2 className="w-3 h-3 text-white absolute left-1 top-1 opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm text-slate-400 leading-tight">
                  Li e aceito os <button type="button" className="text-primary-500 hover:underline">Termos de Uso</button> e a <button type="button" className="text-primary-500 hover:underline">Política de Privacidade</button>
                </span>
              </label>
            )}

            <div className="pt-4">
              <Button type="submit" fullWidth className="py-4 text-lg bg-primary-500 hover:bg-primary-600 shadow-xl shadow-primary-500/20">
                {mode === 'LOGIN' ? 'Entrar' : 'Criar Conta Grátis'}
              </Button>
            </div>

            <div className="text-center pt-8">
              <p className="text-slate-500 text-sm font-medium">
                {mode === 'LOGIN' ? (
                  <>
                    Ainda não tem conta?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('SIGNUP')}
                      className="text-primary-500 font-bold hover:text-primary-400 transition-colors"
                    >
                      Criar conta
                    </button>
                  </>
                ) : (
                  <>
                    Já tem uma conta?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('LOGIN')}
                      className="text-primary-500 font-bold hover:text-primary-400 transition-colors"
                    >
                      Fazer login
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