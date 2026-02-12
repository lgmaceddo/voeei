import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 active:scale-[0.95] flex items-center justify-center gap-2 group border border-transparent select-none";

  const variants = {
    primary: "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_10px_30px_rgba(6,182,212,0.3)] hover:shadow-[0_15px_40px_rgba(6,182,212,0.5)] hover:scale-[1.02]",
    secondary: "bg-[#1E293B] text-white hover:bg-[#2A3B52] border-white/5 shadow-xl",
    outline: "border-white/10 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5",
    ghost: "text-slate-500 hover:text-cyan-400 hover:bg-white/5"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};