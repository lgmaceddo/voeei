
import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    unit?: string;
    suffix?: string;
    progress?: number;
    icon?: React.ReactNode;
    variant?: 'primary' | 'success' | 'error' | 'info' | 'glass';
    className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    unit,
    suffix,
    progress,
    icon,
    variant = 'primary',
    className = ''
}) => {
    const variants = {
        primary: {
            container: "bg-[#1E293B]/40 border-white/5",
            icon: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]",
            value: "text-white",
            progress: "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
        },
        success: {
            container: "bg-[#1E293B]/40 border-white/5",
            icon: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
            value: "text-white",
            progress: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        },
        error: {
            container: "bg-[#1E293B]/40 border-white/5",
            icon: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
            value: "text-white",
            progress: "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"
        },
        info: {
            container: "bg-[#1E293B]/40 border-white/5",
            icon: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
            value: "text-white",
            progress: "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
        },
        glass: {
            container: "bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl",
            icon: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
            value: "text-white",
            progress: "bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]"
        }
    };

    const style = variants[variant] || variants.primary;

    return (
        <div className={`
            p-8 rounded-[3rem] border backdrop-blur-md shadow-xl transition-all duration-700 group hover:shadow-[0_20px_60px_rgba(6,182,212,0.1)] hover:-translate-y-2 hover:border-cyan-500/30
            ${style.container}
            ${className}
        `}>
            <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                    <p className={`text-[10px] font-bold uppercase tracking-widest opacity-50 mb-3 truncate ${variant === 'glass' ? 'text-cyan-200' : 'text-slate-400'}`}>
                        {title}
                    </p>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-3xl lg:text-4xl font-black tracking-tighter elite-heading ${style.value}`}>{value}</span>
                        {unit && <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{unit}</span>}
                    </div>
                </div>
                {icon && (
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] ${style.icon}`}>
                        {React.isValidElement(icon)
                            ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-7 h-7" })
                            : icon}
                    </div>
                )}
            </div>

            {progress !== undefined && (
                <div className="mt-6">
                    <div className="h-[6px] w-full bg-slate-800/50 rounded-full overflow-hidden border border-white/5 shadow-inner">
                        <div
                            className={`h-full transition-all duration-[2000ms] ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full ${style.progress}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {suffix && (
                <div className={`mt-6 pt-5 border-t border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest leading-relaxed flex items-center gap-2`}>
                    <div className="w-1 h-3 bg-cyan-500/30 rounded-full" />
                    {suffix}
                </div>
            )}
        </div>
    );
};
