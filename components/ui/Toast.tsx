import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: { bg: 'bg-emerald-600', icon: <CheckCircle className="w-5 h-5" /> },
    error: { bg: 'bg-rose-600', icon: <AlertCircle className="w-5 h-5" /> },
    warning: { bg: 'bg-amber-500', icon: <AlertCircle className="w-5 h-5" /> },
    info: { bg: 'bg-slate-700', icon: <Info className="w-5 h-5" /> }
  };

  const style = styles[type];

  return (
    <div className={`fixed top-6 right-6 z-[100] ${style.bg} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in-down transition-all transform`}>
      {style.icon}
      <p className="font-medium text-sm">{message}</p>
      <button onClick={onClose} className="ml-4 hover:bg-white/20 rounded-full p-1 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
