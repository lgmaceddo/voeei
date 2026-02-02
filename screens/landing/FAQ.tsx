
import React, { useState } from 'react';
import { ChevronDown, Plane, ArrowRight } from 'lucide-react';

interface FAQProps {
    onLoginClick: (mode?: 'LOGIN' | 'SIGNUP') => void;
}

export const FAQ: React.FC<FAQProps> = ({ onLoginClick }) => {
    return (
        <>
            {/* FAQ Section */}
            <section id="faq" className="py-24 px-4 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="text-primary-500 font-black uppercase tracking-widest text-xs mb-4">Dúvidas</div>
                        <h2 className="text-4xl lg:text-5xl font-black text-navy-900 mb-4 tracking-tight leading-tight">
                            Perguntas <span className="text-primary-500">Frequentes</span>
                        </h2>
                        <p className="text-slate-500 text-lg font-medium">Tire suas dúvidas sobre a plataforma e a prova da ANAC.</p>
                        <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full mt-8"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                        <FAQItem
                            question="Como funciona a prova da ANAC para Comissário de Voo?"
                            answer="A prova é composta por 4 blocos de 20 questões cada (Emergências, Sobrevivência, Regulamentação e Conhecimentos Técnicos). Para ser aprovado, você precisa acertar pelo menos 14 questões (70%) em cada bloco individualmente."
                        />
                        <FAQItem
                            question="O que é a 2ª Época e como funciona?"
                            answer="Se você for reprovado em apenas um ou dois blocos, você pode fazer a 2ª época apenas dessas matérias. Se reprovar em três ou quatro, deverá realizar o exame completo novamente."
                        />
                        <FAQItem
                            question="Os simulados são atualizados conforme a banca ANAC?"
                            answer="Sim! Nosso banco de dados é monitorado e atualizado semanalmente com base nos relatos de alunos que realizaram a prova recentemente, garantindo que você estude o conteúdo que realmente cai."
                        />
                        <FAQItem
                            question="Como funciona o pagamento e a liberação do acesso?"
                            answer="O pagamento pode ser feito via Pix ou Cartão de Crédito. No Pix e Cartão, a liberação é imediata. Você receberá os dados de acesso no seu e-mail logo após a confirmação."
                        />
                        <FAQItem
                            question="Posso acessar de qualquer dispositivo?"
                            answer="Sim! A VOOEI é totalmente responsiva. Você pode estudar pelo computador, tablet ou celular, em qualquer lugar, precisando apenas de uma conexão com a internet."
                        />
                        <FAQItem
                            question="O que está incluso no criador de currículos?"
                            answer="Você terá acesso a templates profissionais otimizados para RH de companhias aéreas. Basta preencher seus dados e o sistema gera o PDF pronto para envio, com dicas específicas para a área."
                        />
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24 px-4 bg-navy-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] -z-0"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] -z-0"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <Plane className="w-16 h-16 text-primary-500 mx-auto mb-8 animate-bounce" />
                    <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">
                        Pronto para <span className="text-primary-500">Conquistar suas Asas</span>?
                    </h2>
                    <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                        Junte-se a milhares de comissários aprovados e comece sua jornada na aviação civil hoje mesmo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={() => onLoginClick('SIGNUP')}
                            className="px-10 py-5 bg-primary-500 text-white rounded-full font-black text-xl hover:bg-primary-600 transition-all shadow-2xl shadow-primary-500/40 hover:scale-105 active:scale-95"
                        >
                            Começar Agora
                        </button>
                        <button
                            onClick={() => onLoginClick('LOGIN')}
                            className="px-10 py-5 bg-white/5 text-white border-2 border-white/10 rounded-full font-black text-xl hover:bg-white/10 transition-all"
                        >
                            Já Tenho Conta
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
        <div className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'border-primary-500 bg-primary-50/20 shadow-lg' : 'border-slate-200 bg-white hover:border-primary-200 shadow-sm'}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-5 lg:p-6 flex items-center justify-between gap-4 text-left"
            >
                <span className={`font-bold text-lg lg:text-xl tracking-tight ${isOpen ? 'text-primary-600' : 'text-navy-900'}`}>
                    {question}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-primary-500' : 'text-slate-400'}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-5 lg:p-6 pt-0 text-slate-600 leading-relaxed text-base lg:text-lg border-t border-primary-100/50">
                    {answer}
                </div>
            </div>
        </div>
    );
};
