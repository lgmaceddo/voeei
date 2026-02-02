
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
            className={`group relative overflow-hidden bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-white/60 hover:shadow-2xl hover:border-primary-300 transition-all cursor-pointer h-64 flex flex-col justify-between ${className}`}
        >
            {bgIcon && (
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity group-hover:scale-110 duration-500 text-primary-600">
                    {React.isValidElement(bgIcon)
                        ? React.cloneElement(bgIcon as React.ReactElement<any>, { className: "w-32 h-32" })
                        : bgIcon}
                </div>
            )}

            <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-500 mb-4 group-hover:bg-primary-500 group-hover:text-white transition-colors shadow-sm">
                {React.isValidElement(icon)
                    ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-6 h-6" })
                    : icon}
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 font-medium">
                    {description}
                </p>
                <span className="inline-flex items-center text-primary-600 font-bold text-sm group-hover:translate-x-1 transition-transform bg-primary-50 px-3 py-1.5 rounded-lg group-hover:bg-primary-500 group-hover:text-white">
                    {buttonText} <ArrowRight className="w-4 h-4 ml-1" />
                </span>
            </div>
        </div>
    );
};
