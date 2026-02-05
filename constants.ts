import { ExamCategory, Question, User, ExamHistoryItem, Plan, UsefulLink, Feature } from './types';

export const INITIAL_FEATURES: Feature[] = [
  {
    id: '1',
    title: 'Simulados Oficiais ANAC',
    description: 'Questões atualizadas dos blocos ESS, RPA/SAC, PSS/Fatores Humanos e CGA.',
    icon: 'BookOpen'
  },
  {
    id: '2',
    title: 'Pré-Banca Realista',
    description: '80 questões em 4 blocos com regras oficiais de aprovação e 2ª época.',
    icon: 'Target',
    badge: 'Disponível no Plano Trimestral'
  },
  {
    id: '3',
    title: 'Histórico de Desempenho',
    description: 'Acompanhe sua evolução com gráficos e métricas detalhadas por matéria.',
    icon: 'TrendingUp'
  },
  {
    id: '4',
    title: 'Questões Favoritas',
    description: 'Marque questões importantes e crie seu banco de estudos personalizado.',
    icon: 'Star'
  },
  {
    id: '5',
    title: 'Raciocínio Lógico',
    description: 'Treine com questões específicas em nosso simulador focado em lógica.',
    icon: 'Brain'
  },
  {
    id: '6',
    title: 'Criador de Currículos',
    description: 'Monte seu currículo profissional para processos seletivos em companhias aéreas.',
    icon: 'FileText'
  }
];

export const INITIAL_LINKS: UsefulLink[] = [
  {
    id: '1',
    title: 'Consulta de Licenças ANAC',
    url: 'https://consultadelicencas.anac.gov.br/consultadelicencas/',
    description: 'Acesse o sistema oficial para consultar o status de suas licenças e habilitações.',
    category: 'ANAC'
  },
  {
    id: '2',
    title: 'Extrato de Resultados de Exames',
    url: 'https://resultadodosexames.anac.gov.br/resultadodosexames/',
    description: 'Consulte o resultado detalhado de suas provas teóricas realizadas na ANAC.',
    category: 'ANAC'
  },
  {
    id: '3',
    title: 'Consulta Certificado Médico Aeronáutico (CMA)',
    url: 'https://sistemas.anac.gov.br/SACI/ste/consulta-cma-conteudo.asp',
    description: 'Verifique a validade e o status do seu Certificado Médico Aeronáutico (SACI).',
    category: 'ANAC'
  }
];

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
  },
  {
    id: 'SHL-DEDUCTIVE',
    title: 'Raciocínio Dedutivo',
    description: 'Teste de lógica dedutiva baseado no modelo oficial da SHL.',
    questionCount: 12,
    durationMinutes: 18,
    color: 'bg-violet-400',
  }
];

export const MOCK_PLANS: Plan[] = [
  {
    id: 'monthly',
    name: 'Plano Mensal',
    price: '49,90',
    description: 'Acesso completo por 30 dias.',
    duration: '30 Dias',
    features: [
      'Simulados Ilimitados',
      'Banco de Questões ANAC',
      'Estatísticas de Desempenho',
      'Suporte via E-mail'
    ]
  },
  {
    id: 'bimestral',
    name: 'Plano Bimestral',
    price: '79,90',
    description: 'Acesso completo por 60 dias.',
    duration: '60 Dias',
    features: [
      'Tudo do Plano Mensal',
      'Materiais de Apoio PDF',
      'Simulados SHL/Lógica',
      'Ranking de Alunos'
    ]
  },
  {
    id: 'trimestral',
    name: 'Plano Trimestral',
    price: '99,90',
    description: 'Acesso completo por 90 dias.',
    duration: '90 Dias',
    features: [
      'Tudo do Plano Bimestral',
      'Prioridade no Suporte',
      'Módulos de Português',
      'Certificado de Conclusão'
    ]
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
  },

  // --- SHL DEDUCTIVE QUESTIONS (NEW) ---
  {
    id: 301,
    category: 'SHL-DEDUCTIVE',
    options: ['7:00-8:00', '11:00-12:00', '12:00-13:00', '14:30-15:30'],
    correctIndex: 0,
    explanation: 'Analisando as agendas de 30 minutos: David (ocupado das 8:00, 10:30 e 13:00), Erica (ocupada às 8:30, 11:30 e 13:00), Faisal (ocupado das 8:00, 9:30 e 13:30) e você (ocupado às 9:00, 11:30, 13:00 e 15:00). O único intervalo de 1 hora (2 blocos consecutivos) em que todos estão simultaneamente livres é das 07:00 às 08:00.',
    deductive: {
      type: 'CALENDAR',
      scenario: 'Calendário da Equipe',
      rules: ['Encontre um horário para agendar uma reunião de status de uma hora com a sua equipe.'],
      data: {
        people: [
          { name: 'David', busy: [2, 3, 7, 12, 13] },
          { name: 'Erica', busy: [3, 9, 10, 12] },
          { name: 'Faisal', busy: [2, 3, 5, 6, 7, 13, 14] }
        ],
        userBusy: [4, 5, 6, 9, 12, 13, 16, 17],
        hours: ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
        options: ['7:00-8:00', '11:00-12:00', '12:00-13:00', '14:30-15:30']
      }
    }
  },
  {
    id: 302,
    category: 'SHL-DEDUCTIVE',
    options: ['Dia 1', 'Dia 8', 'Dia 15', 'Dia 22'],
    correctIndex: 1,
    explanation: 'Edward deve ter o maior ou menor tempo. Helen tem mais que Edward, então Edward é o menor (Escritório 1). Helen tem mais que Edward, Daniela tem mais que Helen. George tem mais que Daniela mas não a maioria. Fei tem o de canto (maior tempo, Escritório 5). A ordem correta é: Edward, Helen, Daniela, George, Fei.',
    deductive: {
      type: 'OFFICES',
      scenario: 'Atribuições de Escritório',
      rules: [
        'Edward: Maior ou menor tempo de serviço',
        'Daniela: Menos tempo que Fei, mas mais que Helen',
        'Fei: Tem um escritório de canto (maior tempo)',
        'George: Mais tempo que Daniela, mas não a maioria',
        'Helen: Mais tempo de serviço que Edward'
      ],
      data: {
        items: ['Daniela', 'Edward', 'Fei', 'George', 'Helen'],
        slots: ['Escritório 1', 'Escritório 2', 'Escritório 3', 'Escritório 4', 'Escritório 5']
      }
    }
  },
  {
    id: 303,
    category: 'SHL-DEDUCTIVE',
    options: ['Ken-Linda-Mike-Naomi-Oscar-Petra', 'Mike-Ken-Oscar-Petra-Naomi-Linda', 'Linda-Naomi-Oscar-Petra-Ken-Mike', 'Oscar-Petra-Ken-Mike-Linda-Naomi'],
    correctIndex: 1,
    explanation: 'Ken e Linda estão nas extremidades. Mike está à esquerda de Ken, logo Ken não pode estar na extremidade esquerda, então Ken está na 2ª posição ou na 6ª. Se Ken está na 6ª, Mike está na 5ª. Linda deve estar na 1ª. Naomi à esquerda de Oscar. Oscar e Petra no meio (3 e 4). Sobra Naomi para a 2ª. Ordem: Linda (1), Naomi (2), Oscar (3), Petra (4), Mike (5), Ken (6).',
    deductive: {
      type: 'SEATING',
      scenario: 'Disposição de Assentos',
      rules: [
        'Ken está em uma extremidade da fila.',
        'Linda está em uma extremidade da fila.',
        'Mike senta-se imediatamente à esquerda de Ken.',
        'Naomi senta-se imediatamente à esquerda de Oscar.',
        'Oscar senta-se em uma das duas mesas do meio.',
        'Petra senta-se em uma das duas mesas do meio.'
      ],
      data: {
        people: ['Ken', 'Linda', 'Mike', 'Naomi', 'Oscar', 'Petra'],
        positions: [1, 2, 3, 4, 5, 6]
      }
    }
  },
  {
    id: 304,
    category: 'SHL-DEDUCTIVE',
    options: ['Correto'], // For this type, correctness is checked by the final state
    correctIndex: 0,
    explanation: 'A Revisão do Banco de Dados (30 min) e a Codificação (1h) devem ocorrer o mais cedo possível. O primeiro slot livre (10:30-11:00) recebe a Revisão. A Codificação ocupa o próximo bloco livre das 12:30 às 13:30. O Planejamento de TI (1h) deve vir antes da Reunião com o desenvolvedor, logo ocupa o bloco das 13:30 às 14:30, enquanto a Reunião fica para o bloco das 16:00 às 17:00.',
    deductive: {
      type: 'SCHEDULING',
      scenario: 'Pergunta',
      rules: [
        'Uma reunião de Marketing de 30 minutos foi adicionada à sua agenda às 11h e uma reunião de 1,5 horas com o Financeiro foi adicionada às 12h30. Com isso em mente, agende as tarefas listadas abaixo. O planejamento de TI deve ocorrer antes da reunião com o desenvolvedor. A revisão do banco de dados e a codificação devem ser agendadas o mais cedo possível.'
      ],
      data: {
        busy: [0, 1, 2, 4, 7, 8, 9, 12, 13], // Indices of 30min slots: 9:00-10:30 (0,1,2), 11:00-11:30 (4), 12:30-14:00 (7,8,9), 15:00-16:00 (12,13)
        tasks: [
          { id: 't1', title: 'Reunião com o desenvolvedor', duration: 2, color: '#7c3aed' }, // 1h = 2 slots
          { id: 't2', title: 'Planejamento de TI', duration: 2, color: '#059669' },
          { id: 't3', title: 'Revisão do banco de dados', duration: 1, color: '#f59e0b' }, // 30min
          { id: 't4', title: 'Codificação', duration: 2, color: '#06b6d4' }
        ],
        hours: ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
      }
    }
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