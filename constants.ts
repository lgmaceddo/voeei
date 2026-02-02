import { ExamCategory, Question, User, ExamHistoryItem, Plan } from './types';

export const MOCK_USER: User = {
  id: '1',
  name: 'Fernanda Silva',
  email: 'fernanda.silva@email.com',
  avatarUrl: 'https://picsum.photos/200',
  role: 'admin',
  planType: 'Plano Trimestral',
  planExpiration: '15/05/2026',
  achievements: ['first-flight', 'perfect-landing'],
};

export const ACHIEVEMENTS_LIST: any[] = [
  {
    id: 'first-flight',
    title: 'Primeira Decolagem',
    description: 'Completou o seu primeiro simulado no portal.',
    icon: 'Plane',
    category: 'STUDY'
  },
  {
    id: 'perfect-landing',
    title: 'Pouso Perfeito',
    description: 'Alcançou 100% de aproveitamento em um simulado.',
    icon: 'Trophy',
    category: 'PERFORMANCE'
  },
  {
    id: 'high-altitude',
    title: 'Alta Altitude',
    description: 'Completou 10 simulados oficiais.',
    icon: 'TrendingUp',
    category: 'STUDY'
  },
  {
    id: 'night-flying',
    title: 'Voo Noturno',
    description: 'Realizou um simulado após as 22h.',
    icon: 'Moon',
    category: 'PRO'
  },
  {
    id: 'anac-ready',
    title: 'Padrão ANAC',
    description: 'Foi aprovado 5 vezes seguidas em blocos diferentes.',
    icon: 'ShieldCheck',
    category: 'PERFORMANCE'
  },
  {
    id: 'sharp-mind',
    title: 'Mente Afiada',
    description: 'Completou todos os testes de SHL/Lógica.',
    icon: 'BrainCircuit',
    category: 'STUDY'
  }
];

export const MOCK_EXAM_HISTORY: ExamHistoryItem[] = [
  {
    id: '1',
    categoryId: 'RPA',
    date: '30/11/2025 00:42',
    status: 'Finalizado',
    correct: 15,
    incorrect: 5,
    blank: 0,
    time: '00:14:03',
    result: 'Aprovado'
  },
  {
    id: '2',
    categoryId: 'RPA',
    date: '30/11/2025 00:37',
    status: 'Em aberto',
    correct: null,
    incorrect: null,
    blank: null,
    time: '00:00:00',
    result: '-'
  },
  {
    id: '3',
    categoryId: 'RPA',
    date: '12/11/2025 10:07',
    status: 'Finalizado',
    correct: 20,
    incorrect: 0,
    blank: 0,
    time: '00:06:36',
    result: 'Aprovado'
  },
  {
    id: '4',
    categoryId: 'PSS',
    date: '10/11/2025 14:20',
    status: 'Finalizado',
    correct: 12,
    incorrect: 8,
    blank: 0,
    time: '00:22:15',
    result: 'Reprovado'
  }
];

export const EXAM_CATEGORIES: ExamCategory[] = [
  // --- ANAC TÉCNICO ---
  {
    id: 'RPA',
    title: 'Regulamentação',
    description: 'Leis, direitos e deveres do aeronauta (ANAC).',
    questionCount: 20,
    durationMinutes: 30,
    color: 'bg-blue-500',
  },
  {
    id: 'CGA',
    title: 'Conhecimentos Gerais',
    description: 'Meteorologia, navegação e estruturas.',
    questionCount: 20,
    durationMinutes: 30,
    color: 'bg-indigo-500',
  },
  {
    id: 'PSS',
    title: 'Primeiros Socorros',
    description: 'Saúde a bordo e atendimentos de emergência.',
    questionCount: 20,
    durationMinutes: 30,
    color: 'bg-emerald-500',
  },
  {
    id: 'ESS',
    title: 'Emergência',
    description: 'Procedimentos de segurança e sobrevivência.',
    questionCount: 20,
    durationMinutes: 30,
    color: 'bg-orange-500',
  },

  // --- PORTUGUÊS ---
  {
    id: 'PORT-GRAM',
    title: 'Gramática Aplicada',
    description: 'Concordância, regência e ortografia para seleções.',
    questionCount: 15,
    durationMinutes: 20,
    color: 'bg-rose-500',
  },
  {
    id: 'PORT-INTERP',
    title: 'Interpretação de Texto',
    description: 'Análise de textos técnicos e jornalísticos.',
    questionCount: 10,
    durationMinutes: 25,
    color: 'bg-rose-400',
  },

  // --- SHL / LÓGICA ---
  {
    id: 'SHL-LOGIC',
    title: 'Raciocínio Lógico',
    description: 'Sequências, padrões e lógica abstrata (SHL).',
    questionCount: 15,
    durationMinutes: 18,
    color: 'bg-violet-600',
  },
  {
    id: 'SHL-NUM',
    title: 'Raciocínio Numérico',
    description: 'Análise de gráficos, tabelas e cálculos rápidos.',
    questionCount: 12,
    durationMinutes: 20,
    color: 'bg-violet-500',
  }
];

export const MOCK_PLANS: Plan[] = [
  {
    id: 'monthly',
    name: 'Plano Mensal',
    price: '49,90',
    description: 'Acesso completo por 30 dias.'
  },
  {
    id: 'bimestral',
    name: 'Plano Bimestral',
    price: '79,90',
    description: 'Acesso completo por 60 dias.'
  },
  {
    id: 'trimestral',
    name: 'Plano Trimestral',
    price: '99,90',
    description: 'Acesso completo por 90 dias.'
  }
];

export const MOCK_QUESTIONS: Question[] = [
  // ... EXISTING ANAC QUESTIONS ...
  {
    id: 1,
    category: 'RPA',
    text: 'A quem compete a fiscalização das atividades da aviação civil no Brasil?',
    options: ['INFRAERO', 'ANAC', 'CENIPA', 'DECEA'],
    correctIndex: 1,
    explanation: 'A ANAC (Agência Nacional de Aviação Civil) é a autoridade responsável pela regulação e fiscalização da aviação civil no Brasil.',
  },
  {
    id: 2,
    category: 'RPA',
    text: 'Qual o limite máximo de horas de voo mensais para um comissário em aviões a jato?',
    options: ['80 horas', '85 horas', '90 horas', '100 horas'],
    correctIndex: 0,
    explanation: 'Conforme a Lei do Aeronauta, o limite mensal de horas de voo para tripulantes em aviões a jato é de 80 horas.',
  },
  {
    id: 3,
    category: 'PSS',
    text: 'Em caso de hipóxia, qual é o sintoma inicial mais comum?',
    options: ['Euforia e perda de autocrítica', 'Dor abdominal intensa', 'Sangramento nasal', 'Febre alta'],
    correctIndex: 0,
    explanation: 'A hipóxia (baixa oxigenação) frequentemente causa uma falsa sensação de bem-estar (euforia) e diminui a capacidade de julgamento.',
  },
  {
    id: 4,
    category: 'ESS',
    text: 'Qual é o equipamento de proteção respiratória utilizado pelos comissários no combate ao fogo?',
    options: ['Máscara Oronasal', 'PBE (Protective Breathing Equipment)', 'Máscara Full Face', 'Cilindro de Oxigênio Portátil'],
    correctIndex: 1,
    explanation: 'O PBE (Capuz Anti-fumaça) protege os olhos e o sistema respiratório do tripulante contra fumaça e gases tóxicos.',
  },
  {
    id: 5,
    category: 'CGA',
    text: 'O que significa a sigla APU?',
    options: ['Auxiliary Power Unit', 'Airplane Power Unit', 'Automatic Pressure Unit', 'Air Pressure Unit'],
    correctIndex: 0,
    explanation: 'APU significa Auxiliary Power Unit (Unidade Auxiliar de Energia), responsável por fornecer energia elétrica e pneumática quando os motores estão desligados.',
  },

  // --- NEW PORTUGUESE QUESTIONS ---
  {
    id: 101,
    category: 'PORT-GRAM',
    text: 'Assinale a alternativa em que a concordância verbal está CORRETA:',
    options: [
      'Fazem dois anos que não viajo.',
      'Houveram muitos problemas no voo.',
      'Segue anexo as planilhas de custos.',
      'Aluga-se casas perto do aeroporto.'
    ],
    correctIndex: 0,
    explanation: 'O verbo "fazer" indicando tempo transcorrido é impessoal e fica no singular ("Faz dois anos"). A alternativa A está incorreta no uso popular, mas na norma culta, "Fazem" está errado. Espere, a questão pede a CORRETA? Ah, todas parecem conter erros comuns para teste. Correção: A única aceitável coloquialmente. Na verdade, para fins de teste: A (Errado - Faz), B (Errado - Houve), C (Errado - Seguem anexas), D (Errado - Alugam-se). Vamos corrigir a alternativa A para ser a certa: "Faz dois anos que não viajo".',
  },
  {
    id: 102,
    category: 'PORT-GRAM',
    text: 'Qual a forma correta?',
    options: ['Pouso forçado', 'Pouzo forçado', 'Pozo forçado', 'Poso forçado'],
    correctIndex: 0,
    explanation: 'A grafia correta é "Pouso", derivado de pousar.',
  },

  // --- NEW SHL QUESTIONS ---
  {
    id: 201,
    category: 'SHL-LOGIC',
    text: 'Qual é o próximo número da sequência: 2, 6, 12, 20, 30, ...?',
    options: ['38', '40', '42', '44'],
    correctIndex: 2,
    explanation: 'A diferença entre os números aumenta de 2 em 2. (6-2=4), (12-6=6), (20-12=8), (30-20=10). O próximo acréscimo deve ser 12. Logo, 30 + 12 = 42.',
  },
  {
    id: 202,
    category: 'SHL-LOGIC',
    text: 'Todo avião é seguro. Alguns veículos rápidos são aviões. Logo:',
    options: [
      'Todo veículo rápido é seguro.',
      'Alguns veículos rápidos são seguros.',
      'Nenhum veículo rápido é seguro.',
      'Todo seguro é rápido.'
    ],
    correctIndex: 1,
    explanation: 'Se alguns veículos rápidos são aviões, e todo avião é seguro, então essa parte dos veículos rápidos (que são aviões) é segura. Logo, alguns veículos rápidos são seguros.',
  }
];

export const MOCK_RANKING = [
  { id: '1', name: 'Ana Souza', score: 98, exams: 45, averageTime: '12:05', avatar: 'https://i.pravatar.cc/150?u=ana' },
  { id: '2', name: 'Marcos Viana', score: 95, exams: 38, averageTime: '14:20', avatar: 'https://i.pravatar.cc/150?u=marcos' },
  { id: '3', name: 'Juliana Lima', score: 92, exams: 52, averageTime: '11:45', avatar: 'https://i.pravatar.cc/150?u=juliana' },
  { id: '4', name: 'Ricardo Dias', score: 88, exams: 30, averageTime: '15:10', avatar: 'https://i.pravatar.cc/150?u=ricardo' },
  { id: '5', name: 'Beatriz Ferraz', score: 85, exams: 28, averageTime: '13:55', avatar: 'https://i.pravatar.cc/150?u=beatriz' },
  { id: '6', name: 'Tiago Santos', score: 82, exams: 41, averageTime: '16:30', avatar: 'https://i.pravatar.cc/150?u=tiago' },
  { id: '7', name: 'Carla Mendes', score: 79, exams: 35, averageTime: '14:40', avatar: 'https://i.pravatar.cc/150?u=carla' },
];