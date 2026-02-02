
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
            container: "bg-white border-slate-100",
            icon: "bg-primary-50 text-primary-500",
            value: "text-slate-800",
            progress: "bg-primary-500"
        },
        success: {
            container: "bg-emerald-50/30 border-emerald-100",
            icon: "bg-emerald-100 text-emerald-600",
            value: "text-emerald-700",
            progress: "bg-emerald-500"
        },
        error: {
            container: "bg-rose-50/30 border-rose-100",
            icon: "bg-rose-100 text-rose-500",
            value: "text-rose-700",
            progress: "bg-rose-500"
        },
        info: {
            container: "bg-blue-50/30 border-blue-100",
            icon: "bg-blue-100 text-blue-600",
            value: "text-blue-700",
            progress: "bg-blue-500"
        },
        glass: {
            container: "bg-white/10 backdrop-blur-md border-white/10",
            icon: "bg-white/20 text-white",
            value: "text-white",
            progress: "bg-primary-500"
        }
    };

    const style = variants[variant] || variants.primary;

    return (
        <div className={`
            p-6 rounded-[2rem] border shadow-sm transition-all duration-300 group hover:shadow-xl hover:-translate-y-1
            ${style.container}
            ${className}
        `}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1 ${variant === 'glass' ? 'text-white/60' : 'text-slate-400'}`}>
                        {title}
                    </p>
                    <div className="flex items-baseline gap-1">
                        <span className={`text-3xl font-black tracking-tighter ${style.value}`}>{value}</span>
                        {unit && <span className="text-xs font-bold text-slate-400 tracking-tight">{unit}</span>}
                    </div>
                </div>
                {icon && (
                    <div className={`w-12 h-12 rounded-2x-large rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-sm ${style.icon}`}>
                        {React.isValidElement(icon)
                            ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-6 h-6" })
                            : icon}
                    </div>
                )}
            </div>

            {progress !== undefined && (
                <div className="mt-4">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner ring-1 ring-slate-100/50">
                        <div
                            className={`h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)] ${style.progress}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {suffix && (
                <div className={`mt-3 text-[10px] font-black uppercase tracking-widest opacity-60 ${variant === 'glass' ? 'text-white/60' : 'text-slate-400'}`}>
                    {suffix}
                </div>
            )}
        </div>
    );
};
