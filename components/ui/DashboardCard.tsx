
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DashboardCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    bgIcon?: React.ReactNode;
    buttonText: string;
    onClick: () => void;
    className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    description,
    icon,
    bgIcon,
    buttonText,
    onClick,
    className = ''
}) => {
    return (
        <div
            onClick={onClick}
            className={`group relative overflow-hidden bg-[#1E293B]/40 backdrop-blur-md p-8 rounded-[3rem] border border-white/5 hover:border-cyan-500/30 transition-all duration-700 cursor-pointer h-72 flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(6,182,212,0.1)] hover:scale-[1.02] ${className}`}
        >
            {bgIcon && (
                <div className="absolute -top-6 -right-6 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-all group-hover:scale-125 duration-1000 text-cyan-500">
                    {React.isValidElement(bgIcon)
                        ? React.cloneElement(bgIcon as React.ReactElement<any>, { className: "w-40 h-40" })
                        : bgIcon}
                </div>
            )}

            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-cyan-500/20">
                {React.isValidElement(icon)
                    ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-7 h-7" })
                    : icon}
            </div>

            <div className="relative z-10">
                <h3 className="text-xl font-black text-white elite-heading mb-2 group-hover:text-cyan-400 transition-colors uppercase tracking-tight leading-tight">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4 font-medium italic">
                    {description}
                </p>
                <div className="inline-flex items-center gap-2 text-cyan-400 font-black text-[9px] uppercase tracking-[0.2em] group-hover:translate-x-2 transition-all p-1">
                    {buttonText} <ArrowRight className="w-3.5 h-3.5" />
                </div>
            </div>

            {/* Elite Corner Accent */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    );
};
