
import React from 'react';
import { Menu } from 'lucide-react';

interface MobileHeaderProps {
    onOpenSidebar: () => void;
    logoSrc?: string;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
    onOpenSidebar,
    logoSrc = "/logo.png"
}) => {
    return (
        <div className="lg:hidden bg-[#0F172A] border-b border-white/5 p-4 flex items-center justify-between z-30">
            <div
                className="flex items-center group cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <img
                    src={logoSrc}
                    alt="VOOEI"
                    className="h-[102px] w-auto object-contain"
                />
            </div>
            <button
                onClick={onOpenSidebar}
                className="p-2 text-slate-300 hover:bg-white/5 rounded-lg transition-colors"
            >
                <Menu className="w-6 h-6" />
            </button>
        </div>
    );
};
