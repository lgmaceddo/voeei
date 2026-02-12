
import React, { useState } from 'react';
import { ChevronDown, Plane, ArrowRight } from 'lucide-react';

interface FAQProps {
    onLoginClick: (mode?: 'LOGIN' | 'SIGNUP') => void;
}

export const FAQ: React.FC<FAQProps> = ({ onLoginClick }) => {
    return (
        <>
            <section id="faq" className="py-24 px-6 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <div className="text-aviation-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 flex items-center justify-center gap-3">
                            <div className="w-8 h-px bg-aviation-slate-200" />
                            Dúvidas Comuns
                            <div className="w-8 h-px bg-aviation-slate-200" />
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-aviation-slate-900 elite-heading mb-6 uppercase tracking-tighter">
                            Perguntas <span className="text-aviation-primary">Frequentes</span>
                        </h2>
                        <p className="text-aviation-slate-500 text-lg font-medium">Esclarecendo os fundamentos da sua jornada técnica.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto">
                        <FAQItem
                            question="Como funciona a prova da ANAC?"
                            answer="A prova é composta por 4 blocos técnicos de 20 questões cada (Emergências, Sobrevivência, Regulamentação e CGA). Para ser aprovado, você precisa de pelo menos 14 acertos (70%) em cada bloco."
                        />
                        <FAQItem
                            question="O que é a 2ª Época?"
                            answer="Se falhar em até dois blocos, você pode realizar a 2ª época apenas destas matérias. Falha em 3 ou 4 blocos exige nova realização do exame completo."
                        />
                        <FAQItem
                            question="Os simulados são atualizados?"
                            answer="Sim. Nossa equipe monitora semanalmente as atualizações da banca ANAC para garantir que o banco de questões esteja sempre alinhado com o conteúdo oficial."
                        />
                        <FAQItem
                            question="Como funciona o acesso?"
                            answer="A liberação é automática e imediata após a confirmação do pagamento via PIX ou Cartão. Você receberá os dados de acesso por e-mail."
                        />
                        <FAQItem
                            question="Posso acessar pelo celular?"
                            answer="Sim. A plataforma VOOEI é totalmente responsiva e otimizada para smartphones, tablets e desktops."
                        />
                        <FAQItem
                            question="O currículo está incluso?"
                            answer="Sim. Oferecemos um gerador de currículos com templates otimizados para seleção em companhias aéreas."
                        />
                    </div>
                </div>
            </section>

            <section className="py-32 px-6 bg-aviation-slate-50 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10">
                    <div className="w-20 h-20 bg-white rounded-3xl border border-aviation-slate-200 flex items-center justify-center mx-auto shadow-sm">
                        <Plane className="w-10 h-10 text-aviation-primary transform -rotate-45" />
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-5xl lg:text-7xl font-black text-aviation-slate-900 elite-heading leading-tight uppercase tracking-tighter">
                            Pronto para conquistar <br />
                            <span className="text-aviation-primary">suas asas?</span>
                        </h2>
                        <p className="text-xl text-aviation-slate-500 font-medium max-w-2xl mx-auto">
                            Junte-se a milhares de alunos aprovados e inicie seu treinamento com a melhor tecnologia do mercado.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                        <button
                            onClick={() => onLoginClick('SIGNUP')}
                            className="bg-aviation-primary text-white px-10 py-5 rounded-2xl font-black text-[12px] uppercase tracking-widest hover:shadow-lg hover:shadow-aviation-primary/30 transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
                        >
                            Começar Treinamento <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => onLoginClick('LOGIN')}
                            className="bg-white text-aviation-slate-600 border border-aviation-slate-200 px-10 py-5 rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-aviation-slate-50 transition-all text-center active:scale-95 shadow-sm"
                        >
                            Área do Aluno
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`rounded-2xl transition-all duration-300 overflow-hidden border ${isOpen ? 'border-aviation-primary/30 bg-white shadow-md' : 'border-aviation-slate-200 bg-white hover:border-aviation-primary/20'}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 flex items-center justify-between gap-4 text-left"
            >
                <span className={`font-black text-sm uppercase tracking-tight transition-colors duration-300 ${isOpen ? 'text-aviation-primary' : 'text-aviation-slate-800'}`}>
                    {question}
                </span>
                <div className={`p-2 rounded-lg transition-all duration-300 ${isOpen ? 'bg-aviation-primary/10 text-aviation-primary rotate-180' : 'bg-aviation-slate-50 text-aviation-slate-400'}`}>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-60' : 'max-h-0'}`}>
                <div className="p-6 pt-0 text-aviation-slate-500 text-sm font-medium border-t border-aviation-slate-50">
                    {answer}
                </div>
            </div>
        </div>
    );
};
