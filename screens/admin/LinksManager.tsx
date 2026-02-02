
import React from 'react';
import { Link as LinkIcon } from 'lucide-react';

export const LinksManager = () => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center">
        <LinkIcon className="w-16 h-16 text-blue-500 mx-auto mb-6" />
        <h3 className="text-xl font-black text-navy-900 mb-2">Links Úteis</h3>
        <p className="text-slate-500 mb-8">Gerencie os acessos rápidos (ANAC, SAC, Editais) que aparecem no dashboard do aluno.</p>
        <button className="px-8 py-4 bg-primary-500 text-white font-bold rounded-2xl hover:bg-primary-600 transition-all">Editar Biblioteca de Links</button>
    </div>
);
