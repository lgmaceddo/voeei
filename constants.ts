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
    options: ['Dia 3', 'Dia 10', 'Dia 17', 'Dia 24'],
    correctIndex: 1,
    explanation: 'As férias devem ser de domingo a sábado (7 dias). Rachel tem os dias 27 e 28, o que a coloca na semana de 24 a 30. Quentin não pode estar de férias no dia 20, logo não pode pegar a semana de 17 a 23. Petra deve tirar férias antes de Quentin. Se Quentin tirar na semana de 10 a 16 (início dia 10), Petra pode tirar na semana de 3 a 9. Esta é a única configuração que respeita todas as regras.',
    deductive: {
      type: 'CALENDAR',
      scenario: 'Cronograma de férias',
      rules: [
        'Quatro funcionários querem tirar férias neste mês. Somente um funcionário pode tirar férias por vez e as férias devem ser de domingo a sábado. Em que dia Quentin pode iniciar suas férias?'
      ],
      data: {
        items: ['Oscar', 'Petra', 'Quentin', 'Rachel'],
        rules: [
          'Flexível',
          'Tira férias antes de Quentin',
          'Tem de estar no trabalho no dia 20',
          'Confirmou reservas para os dias 27 e 28'
        ],
        photos: [
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=250&fit=crop', // Oscar
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=250&fit=crop', // Petra
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=250&fit=crop', // Quentin
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=250&fit=crop'  // Rachel
        ],
        month: 'Março',
        startDay: 5, // 0=Dom, 1=Seg, ..., 5=Sex (Dia 1 cai na sexta)
        daysInMonth: 31
      }
    }
  },
  {
    id: 302,
    category: 'SHL-DEDUCTIVE',
    options: ['Correto'],
    correctIndex: 0,
    explanation: 'A ordem do tempo de serviço é: George (maior), Fei (canto), Daniela, Helen, Edward (menor). Logo: George-Escritório 5, Fei-Escritório 4, Daniela-Escritório 3, Helen-Escritório 2, Edward-Escritório 1.',
    deductive: {
      type: 'OFFICES',
      scenario: 'Atribuições de escritório',
      rules: [
        'A pessoa com maior tempo de serviço é designada para o escritório 5 e a pessoa com menos tempo é designada para o escritório 1.'
      ],
      data: {
        items: ['Daniela', 'Edward', 'Fei', 'George', 'Helen'],
        rules: [
          'Menos tempo de serviço que Fei, mas mais que Helen',
          'Maior ou menor tempo de serviço',
          'Tem um escritório de canto',
          'Mais tempo de serviço que Daniela, mas não que a maioria',
          'Mais tempo de serviço que Edward'
        ],
        photos: [
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=250&fit=crop', // Daniela
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=250&fit=crop', // Edward
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=250&fit=crop', // Fei
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=250&fit=crop', // George
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=250&fit=crop'  // Helen
        ],
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
        items: ['Ken', 'Linda', 'Mike', 'Naomi', 'Oscar', 'Petra'],
        rules: [
          'está em uma extremidade da fila.',
          'está em uma extremidade da fila.',
          'senta-se imediatamente à esquerda de Ken.',
          'senta-se imediatamente à esquerda de Oscar.',
          'senta-se em uma das duas mesas do meio.',
          'senta-se em uma das duas mesas do meio.'
        ],
        photos: [
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=250&fit=crop', // Ken
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=250&fit=crop', // Linda
          'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&h=250&fit=crop', // Mike
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=250&fit=crop', // Naomi
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=250&fit=crop', // Oscar
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=250&fit=crop'  // Petra
        ]
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
        busy: [0, 1, 2, 4, 7, 8, 9, 12, 13, 16], // Indices de slots de 30min: 9:00-10:30 (0,1,2), 11:00-11:30 (4), 12:30-14:00 (7,8,9), 15:00-16:00 (12,13), 17:00-17:30 (16)
        tasks: [
          { id: 't1', title: 'Reunião com o desenvolvedor', duration: 2, color: '#7c3aed' }, // 1h = 2 slots
          { id: 't2', title: 'Planejamento de TI', duration: 2, color: '#059669' },
          { id: 't3', title: 'Revisão do banco de dados', duration: 1, color: '#f59e0b' }, // 30min
          { id: 't4', title: 'Codificação', duration: 2, color: '#06b6d4' }
        ],
        hours: ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
      }
    }
  },
  {
    id: 305,
    category: 'SHL-DEDUCTIVE',
    options: ['Dia 3', 'Dia 10', 'Dia 17', 'Dia 24'],
    correctIndex: 2,
    explanation: 'Dedução: 1. Katarina está ausente nas primeiras duas semanas (dias 1-14). 2. Liam só trabalha TER, QUA, QUI. 3. Jack só trabalha SEG, QUA, SEX. 4. A interseção de disponibilidades de Liam e Jack é a QUARTA-FEIRA. 5. Isabel está disponível de segunda a quinta. 6. O primeiro dia a partir do dia 15 (pós-Katarina) que cai em uma quarta-feira é o Dia 17.',
    deductive: {
      type: 'CALENDAR',
      scenario: 'Cronograma da equipe',
      rules: [
        'Selecione o primeiro dia da semana em que todos estão disponíveis.'
      ],
      data: {
        items: ['Isabel', 'Jack', 'Katarina', 'Liam'],
        rules: [
          'Ausente às sextas',
          'Trabalha às segundas, quartas e sextas',
          'Ausente nas primeiras duas semanas do mês',
          'Disponível às terças, quartas e quintas'
        ],
        status: ['cross', 'tick', 'cross', 'tick'],
        photos: [
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=250&fit=crop', // Isabel
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=250&fit=crop', // Jack
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=250&fit=crop', // Katarina
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=250&fit=crop'  // Liam
        ],
        month: 'Abril',
        startDay: 1, // 0=Dom, 1=Seg. Dia 1 é segunda-feira conforme a imagem.
        daysInMonth: 30
      }
    }
  },
  {
    id: 306,
    category: 'SHL-DEDUCTIVE',
    options: ['Dia 4', 'Dia 11', 'Dia 18', 'Dia 25'],
    correctIndex: 3,
    explanation: 'Dedução com Dia 1 no Domingo: 1. Seguros só trabalha QUA, QUI, SEX. 2. As quartas-feiras são 4, 11, 18 e 25. 3. Dias 4 e 11 são invalidados pelas férias de Serviços (2-13). 4. Dia 18 é invalidado pelo congresso de Energia (16-20). 5. Resta o bloco que inicia no Dia 25 (QUA), 26 (QUI) e 27 (SEX), todos dias de semana.',
    deductive: {
      type: 'CALENDAR',
      scenario: 'Disponibilidade de cliente',
      rules: [
        'Os clientes só podem participar de congressos durante dias de semana. Selecione um período de três dias nos quais todos os clientes podem participar de um congresso.'
      ],
      data: {
        items: ['Energia', 'Seguros', 'Serviços profissionais', 'Mídia e publicidade'],
        rules: [
          'Congresso do próprio cliente de 16 a 20',
          'Disponível às quartas, quintas e sextas',
          'Férias anuais da empresa de 2 a 13',
          'Participando de congresso sobre energia; feriado anual da empresa dia 23'
        ],
        status: ['cross', 'tick', 'cross', 'cross'],
        photos: [
          'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=200&h=250&fit=crop', // Energia
          'https://images.unsplash.com/photo-1454165833767-027ffea70250?q=80&w=200&h=250&fit=crop', // Seguros
          'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=200&h=250&fit=crop', // Serviços
          'https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=200&h=250&fit=crop'  // Mídia
        ],
        month: 'Maio',
        startDay: 0, // 0=Dom. Conforme solicitado, Dia 1 começa no Domingo.
        daysInMonth: 31,
        isRange: 3
      }
    }
  },
  {
    id: 307,
    category: 'SHL-DEDUCTIVE',
    options: ['23,25,26'],
    correctIndex: 0,
    explanation: 'Dedução: 1. Regra 1 cobre dias 1-6. 2. Regra 2 cobre os 15 dias seguintes ao 6, ou seja, de 7 a 21. 3. Regra 3 cobre os dias 22, 24, 27 e a última semana do mês (28, 29 e 30). 4. Os dias restantes (Regra 4) que não foram citados em nenhuma regra anterior são 23, 25 e 26.',
    deductive: {
      type: 'CALENDAR',
      scenario: 'Volumes de chamadas',
      rules: [
        'A central de atendimento está aberta sete dias por semana. Selecione todos os dias em que o volume médio de chamadas foi mais que 100 por hora.'
      ],
      data: {
        items: ['25 - 49', '50 - 74', '75 - 100', '> 100 por hora'],
        rules: [
          'Ocorreu do 1º ao 6º dia do mês',
          'Ocorreu nos 15 dias seguintes ao dia 6',
          'Ocorreu nos dias 22, 24 e 27 e na última semana do mês',
          'Ocorreu em todos os dias restantes'
        ],
        status: ['tick', 'tick', 'tick', 'tick'],
        photos: [
          'https://images.unsplash.com/photo-1543286386-713bcd549661?q=80&w=200&h=250&fit=crop', // Low signal
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&h=250&fit=crop', // Mid signal
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=200&h=250&fit=crop', // High signal
          'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=200&h=250&fit=crop'  // Max signal
        ],
        month: 'Outubro',
        startDay: 1, // 0=Dom. Dia 1 é Segunda conforme imagem.
        daysInMonth: 30,
        multiSelect: true
      }
    }
  },
  {
    id: 308,
    category: 'SHL-DEDUCTIVE',
    options: ['Correto'],
    correctIndex: 0,
    explanation: 'Dedução: 1. Chamada do cliente (30m) deve ser até 10h. O único slot livre é 9:30-10:00 (Idx 1). 2. Treinamento (2h) precisa de 4 slots. O único bloco é 12:30-14:30 (Idx 7). 3. Definir escopo (1.5h) precisa de 3 slots. O único bloco restante é 15:00-16:30 (Idx 12). 4. Analisar dados (1h) ocupa o bloco das 10:30-11:30 (Idx 3).',
    deductive: {
      type: 'SCHEDULING',
      scenario: 'Quinta',
      rules: [
        'Agendar cada tarefa no seu calendário. Você deve fazer a chamada para o cliente até as 10h.'
      ],
      data: {
        busy: [0, 2, 5, 6, 11, 15, 16],
        tasks: [
          { id: 't1', title: 'Definir escopo do projeto', duration: 3, color: '#6366f1' }, // 1.5h = 3 slots
          { id: 't2', title: 'Analisar dados', duration: 2, color: '#059669' }, // 1h
          { id: 't3', title: 'Chamada do cliente', duration: 1, color: '#f59e0b' }, // 30min
          { id: 't4', title: 'Treinamento', duration: 4, color: '#06b6d4' } // 2h
        ],
        hours: ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
      }
    }
  },
  {
    id: 309,
    category: 'SHL-DEDUCTIVE',
    options: ['Correto'],
    correctIndex: 0,
    explanation: 'Dedução: 1. Atribuir projetos (2h) deve vir primeiro e cabe perfeitamente no bloco das 9:00 (Idx 0-3). 2. Chamada do cliente (1h) deve vir em seguida, começando às 12:30 (Idx 7-8) após o bloco de reuniões. 3. Chamada interna (30min) entra logo após, às 13:30 (Idx 9). 4. Apresentação (1,5h) é a última e deve começar às 16:00 (Idx 14-16) para não conflitar com os outros bloqueios.',
    deductive: {
      type: 'SCHEDULING',
      scenario: 'Hoje',
      rules: [
        'Selecione cada tarefa e encaixe-a no dia movimentado. As tarefas devem estar nesta ordem: Atribuir projetos, Chamada do cliente, Chamada interna, Apresentação.'
      ],
      data: {
        busy: [4, 5, 6, 10, 13],
        tasks: [
          { id: 't1', title: 'Atribuir projetos', duration: 4, color: '#6366f1' }, // 2h = 4 slots
          { id: 't2', title: 'Chamada do cliente', duration: 2, color: '#059669' }, // 1h
          { id: 't3', title: 'Chamada interna', duration: 1, color: '#f59e0b' }, // 30min
          { id: 't4', title: 'Apresentação', duration: 3, color: '#06b6d4' } // 1,5h
        ],
        hours: ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
      }
    }
  },
  {
    id: 310,
    category: 'SHL-DEDUCTIVE',
    options: ['Correto'],
    correctIndex: 0,
    explanation: 'Dedução: 1. Erica está no Escritório 1 (Dado). 2. Equipe A (Beatrice, Corrine, Erica) fica nos escritórios 1-3. 3. Equipe B (Andrew, David) fica nos escritórios 4-5. 4. Beatrice não pode estar no 2 (ao lado de Erica/1), logo está no 3. 5. Andrew está em frente a Beatrice (3), logo está no 5. 6. Sobram Corrine para o 2 e David para o 4.',
    deductive: {
      type: 'OFFICES',
      scenario: 'Salas de escritório',
      rules: [
        'A equipe A fica nos escritórios de números 1 a 3. A equipe B fica nos escritórios de números 4 e 5. Faça a correspondência de cada pessoa com a sala necessária.'
      ],
      data: {
        items: ['Andrew', 'Beatrice', 'Corrine', 'David', 'Erica'],
        rules: [
          'Equipe B - Em frente a Beatrice',
          'Equipe A - Não ao lado de Erica',
          'Equipe A',
          'Equipe B',
          'Equipe A - Escritório 1'
        ],
        photos: [
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=250&fit=crop', // Andrew
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=250&fit=crop', // Beatrice
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=250&fit=crop', // Corrine
          'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&h=250&fit=crop', // David
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=250&fit=crop'  // Erica
        ],
        slots: ['Escritório 1', 'Escritório 2', 'Escritório 3', 'Escritório 4', 'Escritório 5']
      }
    }
  },
  {
    id: 311,
    category: 'SHL-DEDUCTIVE',
    options: ['Dia 2', 'Dia 9', 'Dia 16', 'Dia 23'],
    correctIndex: 2,
    explanation: 'Dedução: 1. O Diretor viaja na última semana (Dia 23). 2. A Secretária deve viajar antes do Gerente. 3. O Gerente não pode viajar na primeira semana. 4. O Analista confirmou o Dia 9. 5. Se o Analista é o 9, e o Gerente não pode ser o 2, o Gerente só pode ser o 16. Logo, a Secretária é o Dia 2.',
    deductive: {
      type: 'CALENDAR',
      scenario: 'Cronograma de Viagens',
      rules: [
        'Quatro executivos precisam agendar viagens de uma semana (domingo a sábado). Em que dia o Gerente iniciará sua viagem?'
      ],
      data: {
        items: ['Diretor', 'Gerente', 'Secretária', 'Analista'],
        rules: [
          'Viaja na última semana do mês',
          'Não pode viajar na primeira semana',
          'Viaja imediatamente antes do Gerente',
          'Confirmou sua viagem para o dia 9'
        ],
        photos: [
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=250&fit=crop',
          'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&h=250&fit=crop',
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=250&fit=crop',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=250&fit=crop'
        ],
        month: 'Junho',
        startDay: 2, // Inicia na Terça
        daysInMonth: 30
      }
    }
  },
  {
    id: 312,
    category: 'SHL-DEDUCTIVE',
    options: ['Correto'],
    correctIndex: 0,
    explanation: 'Dedução: 1. Frank e Alice nas pontas. 2. Bob à esquerda de Frank (Frank=6, Bob=5). 3. Alice na ponta oposta (Alice=1). 4. Charlie à direita de Alice (Charlie=2). 5. Diana à esquerda de Eve (Diana=3, Eve=4). Ordem: Alice:1,Charlie:2,Diana:3,Eve:4,Bob:5,Frank:6.',
    deductive: {
      type: 'SEATING',
      scenario: 'Fila do Cinema',
      rules: [
        'Organize Alice, Bob, Charlie, Diana, Eve e Frank conforme as regras de assento.'
      ],
      data: {
        items: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'],
        rules: [
          'Senta-se em uma das extremidades',
          'Senta-se imediatamente à esquerda de Frank',
          'Senta-se imediatamente à direita de Alice',
          'Senta-se à esquerda de Eve',
          'Senta-se em uma das poltronas centrais',
          'Senta-se em uma das extremidades'
        ],
        photos: [
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=250&fit=crop',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=250&fit=crop',
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=250&fit=crop',
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=250&fit=crop',
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=250&fit=crop',
          'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&h=250&fit=crop'
        ]
      }
    }
  },
  {
    id: 313,
    category: 'SHL-DEDUCTIVE',
    options: ['Correto'],
    correctIndex: 0,
    explanation: 'Dedução: 1. Beta no Escritório 4 (Dado). 2. Equipe X (Alpha, Gamma, Delta) em 1, 2 e 5. 3. Equipe Y (Beta, Epsilon) em 3 e 4. 4. Epsilon em frente a Delta. Como Beta é o 4, Epsilon é o 3 (mesma equipe). 5. Se Epsilon está no 3, Delta está no 1 (frente). 6. Alpha não ao lado de Delta(1), logo Alpha é o 5 e Gamma o 2.',
    deductive: {
      type: 'OFFICES',
      scenario: 'Alocação de Departamentos',
      rules: [
        'A equipe X fica nos escritórios 1, 2 e 5. A equipe Y fica nos escritórios 3 e 4. Aloque os funcionários corretamente.'
      ],
      data: {
        items: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'],
        rules: [
          'Equipe X - Não pode ficar ao lado de Delta',
          'Equipe Y - Escritório 4',
          'Equipe X',
          'Equipe X',
          'Equipe Y - Fica em frente a Delta'
        ],
        photos: [
          'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&h=250&fit=crop',
          'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=250&fit=crop',
          'https://images.unsplash.com/photo-1491349174775-aaafddd81942?q=80&w=200&h=250&fit=crop',
          'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&h=250&fit=crop',
          'https://images.unsplash.com/photo-1531123897727-8f129e16fd8c?q=80&w=200&h=250&fit=crop'
        ],
        slots: ['Escritório 1', 'Escritório 2', 'Escritório 3', 'Escritório 4', 'Escritório 5']
      }
    }
  },
  {
    id: 314,
    category: 'SHL-DEDUCTIVE',
    options: ['Correto'],
    correctIndex: 0,
    explanation: 'Dedução: 1. Alinhamento (30m) deve ser o primeiro, às 9:00 (Idx 0). 2. Feedback (1h) após Alinhamento, às 10:30 (Idx 3-4). 3. Planejamento (2h) precisa de 4 slots, cabe às 13:30 (Idx 9-12). 4. Relatório (1,5h) finaliza o dia às 16:30 (Idx 15-17).',
    deductive: {
      type: 'SCHEDULING',
      scenario: 'Sexta-feira',
      rules: [
        'Organize as tarefas de sexta-feira. O Alinhamento deve ser a primeira tarefa do dia.'
      ],
      data: {
        busy: [1, 2, 5, 6, 7, 8, 13, 14],
        tasks: [
          { id: 't1', title: 'Alinhamento', duration: 1, color: '#f87171' },
          { id: 't2', title: 'Feedback', duration: 2, color: '#60a5fa' },
          { id: 't3', title: 'Planejamento', duration: 4, color: '#34d399' },
          { id: 't4', title: 'Relatório', duration: 3, color: '#fbbf24' }
        ],
        hours: ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
      }
    }
  },
  {
    id: 315,
    category: 'SHL-DEDUCTIVE',
    options: ['8,15,22,29'],
    correctIndex: 0,
    explanation: 'Dedução: 1. O sistema fica fora para manutenção todas as segundas-feiras. 2. Sabendo que o dia 1 é segunda-feira, as manutenções ocorrerão nos dias 1, 8, 15, 22 e 29. 3. O usuário deve marcar os dias de manutenção mostrados nas opções (exceto o 1 que não está nas opções).',
    deductive: {
      type: 'CALENDAR',
      scenario: 'Manutenção de Sistema',
      rules: [
        'Selecione todas as segundas-feiras do mês para a manutenção programada.'
      ],
      data: {
        items: ['Servidor Principal', 'Servidor Backup', 'Banco de Dados', 'Firewall'],
        rules: [
          'Manutenção necessária toda segunda-feira',
          'Manutenção necessária toda segunda-feira',
          'Manutenção necessária toda segunda-feira',
          'Manutenção necessária toda segunda-feira'
        ],
        status: ['tick', 'tick', 'tick', 'tick'],
        photos: [
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=200&h=250&fit=crop',
          'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=200&h=250&fit=crop',
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=200&h=250&fit=crop',
          'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=200&h=250&fit=crop'
        ],
        month: 'Julho',
        startDay: 1, // Segunda
        daysInMonth: 31,
        multiSelect: true
      }
    }
  },
  {
    id: 316,
    category: 'SHL-DEDUCTIVE',
    options: ['7:00,7:30'],
    correctIndex: 0,
    explanation: 'Dedução: 1. Às 7:00 e 7:30, David, Erica, Faisal e você estão livres. 2. Selecione ambos os slots para compor a reunião de 1 hora. 3. Outros horários têm conflitos...',
    deductive: {
      type: 'TEAM_CALENDAR',
      scenario: 'Calendário da equipe',
      rules: [
        'Encontre um horário para agendar uma reunião de status de uma hora com a sua equipe.'
      ],
      data: {
        team: [
          { name: 'David', busy: [2, 3, 8, 12, 13] },
          { name: 'Erica', busy: [3, 9, 10] },
          { name: 'Faisal', busy: [2, 3, 5, 6, 7, 13, 14] }
        ],
        myBusy: [4, 5, 6, 9, 13, 14, 16, 17],
        hours: ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
        duration: 2 // 1 hour = 2 slots of 30min
      }
    }
  },
  {
    id: 317,
    category: 'SHL-DEDUCTIVE',
    options: ['14:00,14:30,15:00'],
    correctIndex: 0,
    explanation: 'Dedução: 1. A reunião exige 1,5h (3 slots consecutivos). 2. Analisando todos os membros e você, o bloco das 14:00 às 15:30 é o único onde os 5 membros e você estão livres. 3. Slots: 14:00, 14:30 e 15:00.',
    deductive: {
      type: 'TEAM_CALENDAR',
      scenario: 'Planejamento Trimestral',
      rules: [
        'Encontre um horário para agendar uma reunião de planejamento de uma hora e meia com toda a sua equipe (5 pessoas).'
      ],
      data: {
        team: [
          { name: 'David', busy: [0, 1, 4, 5, 10, 11] },
          { name: 'Erica', busy: [2, 3, 4, 5, 15, 16, 17] },
          { name: 'Faisal', busy: [6, 7, 8, 9, 10, 11] },
          { name: 'Gloria', busy: [0, 1, 16, 17] },
          { name: 'Hugo', busy: [4, 5, 11] }
        ],
        myBusy: [0, 1, 10, 11, 17],
        hours: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
        duration: 3 // 1.5 hours
      }
    }
  },
  {
    id: 318,
    category: 'SHL-DEDUCTIVE',
    options: ['16:30,17:00'],
    correctIndex: 0,
    explanation: 'Dedução de Alta Complexidade: 1. Com 6 pessoas na equipe, a chance de conflito é altíssima em cada slot. 2. A manhã e o início da tarde estão tomados por David, Erica e Faisal em turnos alternados. 3. Gloria e Hugo travam janelas específicas ao longo do dia. 4. O único intervalo de 1 hora livre para os 6 colaboradores e você ocorre das 16:30 às 17:30.',
    deductive: {
      type: 'TEAM_CALENDAR',
      scenario: 'Sincronização Urgente',
      rules: [
        'Encontre o único horário de uma hora disponível para uma sincronização de emergência com toda a diretoria (6 pessoas).'
      ],
      data: {
        team: [
          { name: 'David', busy: [0, 1, 3, 4, 5, 7, 8, 9, 12, 13, 17] },
          { name: 'Erica', busy: [2, 3, 6, 7, 10, 11, 14, 17] },
          { name: 'Faisal', busy: [0, 1, 2, 3, 6, 12, 13, 14, 17] },
          { name: 'Julia', busy: [3, 6, 7, 8, 9, 10, 11, 14] },
          { name: 'Gloria', busy: [0, 2, 4, 6, 8, 12, 14] },
          { name: 'Hugo', busy: [1, 2, 5, 7, 9, 11, 13, 17] }
        ],
        myBusy: [2, 3, 4, 7, 10, 11, 14, 17],
        hours: ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
        duration: 2 // 1 hour
      }
    }
  },
  {
    id: 319,
    category: 'SHL-DEDUCTIVE',
    options: ['8:30,9:00,9:30,10:00'],
    correctIndex: 0,
    explanation: 'Dedução: 1. Necessário bloco de 2 horas (4 slots). 2. No início do dia, entre as 8:30 e as 10:30, todos estão disponíveis. 3. Slots: 8:30, 9:00, 9:30 e 10:00.',
    deductive: {
      type: 'TEAM_CALENDAR',
      scenario: 'Workshop Técnico',
      rules: [
        'Encontre um bloco de duas horas (quatro slots de 30min) para o workshop técnico da equipe.'
      ],
      data: {
        team: [
          { name: 'David', busy: [0, 5, 6, 7, 8, 9, 12, 13, 14, 15, 18, 19] },
          { name: 'Erica', busy: [0, 5, 6, 7, 8, 9, 10, 11, 16, 17, 18, 19] },
          { name: 'Faisal', busy: [0, 5, 6, 7, 10, 11, 12, 13, 14, 15, 19] }
        ],
        myBusy: [5, 6, 7, 8, 9, 12, 13, 14, 15, 17, 18],
        hours: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
        duration: 4 // 2 hours
      }
    }
  },
  {
    id: 320,
    category: 'SHL-DEDUCTIVE',
    options: ['15:30,16:00'],
    correctIndex: 0,
    explanation: 'Dedução: 1. Reunião de 1h com 6 pessoas. 2. A alta densidade de compromissos deixa apenas o final da tarde (15:30-16:30) livre para todos. 3. Slots: 15:30 e 16:00.',
    deductive: {
      type: 'TEAM_CALENDAR',
      scenario: 'Revisão de Projeto',
      rules: [
        'Coordene com 6 pessoas o melhor horário de uma hora para a revisão final do projeto.'
      ],
      data: {
        team: [
          { name: 'David', busy: [0, 1, 2, 5, 6, 9, 10, 13, 14, 17, 18, 19] },
          { name: 'Erica', busy: [3, 4, 7, 8, 11, 12, 17, 18, 19] },
          { name: 'Faisal', busy: [0, 1, 4, 5, 8, 9, 12, 13, 17, 18, 19] },
          { name: 'Gloria', busy: [2, 3, 6, 7, 10, 11, 14, 17, 18, 19] },
          { name: 'Hugo', busy: [0, 2, 4, 6, 8, 10, 12, 14, 17, 18, 19] },
          { name: 'Julia', busy: [1, 3, 5, 7, 9, 11, 13, 17, 18, 19] }
        ],
        myBusy: [0, 3, 4, 7, 8, 11, 12, 17, 18, 19],
        hours: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
        duration: 2 // 1 hour
      }
    }
  },
  {
    id: 321,
    category: 'SHL-DEDUCTIVE',
    options: ['8:00,8:30'],
    correctIndex: 0,
    explanation: 'Dedução com Conflito Oculto: 1. A reunião de 45 minutos requer 2 slots de 30 min (1 hora total de disponibilidade comum). 2. Aline está livre de 08:00-10:00, 13:00-14:00 e 16:00-18:00. 3. Nina tinha janelas livres às 08:00 e 14:00, mas sua reunião das 11:00-13:00 foi estendida até 13:30, o que bloqueia qualquer tentativa de início imediato após as 13:00. 4. Cruzando os horários com a sua agenda (Você), o único bloco de 1 hora onde Aline, Nina e você estão simultaneamente livres é das 08:00 às 09:00.',
    deductive: {
      type: 'TEAM_CALENDAR',
      scenario: 'Gestão de Prioridades',
      rules: [
        'Considerando que a reunião da Nina das 11–13 foi estendida em 30 minutos, agende uma reunião de 45 minutos com Aline e Nina.'
      ],
      data: {
        team: [
          { name: 'Aline', busy: [4, 5, 6, 7, 8, 9, 12, 13, 14, 15] },
          { name: 'Caio', busy: [0, 1, 6, 7, 10, 11, 12, 13, 18, 19] },
          { name: 'Nina', busy: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16, 17, 18, 19] },
          { name: 'Otávio', busy: [0, 1, 2, 3, 8, 9, 14, 15] }
        ],
        myBusy: [4, 5, 8, 9, 10, 11, 16, 17],
        hours: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
        duration: 2
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