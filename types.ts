
export type ViewState =
  | 'LANDING'
  | 'LOGIN'
  | 'DASHBOARD'
  | 'EXAM_LIST'
  | 'EXAM_DETAILS'
  | 'EXAM_SESSION'
  | 'RESULTS'
  | 'REVIEW'
  | 'PROFILE'
  | 'CV_BUILDER'
  | 'ACHIEVEMENTS'
  | 'ADMIN';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'STUDY' | 'PERFORMANCE' | 'PRO';
  isUnlocked?: boolean;
  unlockedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role?: 'admin' | 'user';
  planType?: string;
  planExpiration?: string;
  achievements?: string[]; // IDs of earned achievements
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number; // 0-3
  explanation: string;
  category: string;
}

export interface ExamCategory {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  durationMinutes: number;
  color: string;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  duration: string;
  features: string[];
}

export interface ExamResult {
  categoryId: string;
  date: string;
  score: number;
  totalQuestions: number;
  answers: Record<number, number>; // QuestionId -> SelectedOptionIndex
  timeTakenSeconds: number;
}

export interface SavedExamState {
  answers: Record<number, number>;
  timeLeft: number;
  currentQuestionIndex: number;
  isFavoritesExam: boolean;
}

export interface ExamHistoryItem {
  id: string;
  date: string;
  status: 'Finalizado' | 'Em aberto';
  correct: number | null;
  incorrect: number | null;
  blank: number | null;
  time: string;
  result: 'Aprovado' | 'Reprovado' | '-';
  categoryId: string;
  savedState?: SavedExamState;
}

export interface GlobalState {
  currentView: ViewState;
  user: User | null;
  selectedCategory: ExamCategory | null;
  currentExamQuestions: Question[];
  currentExamAnswers: Record<number, number>; // questionId -> selectedIndex
  lastExamResult: ExamResult | null;
  favorites: number[]; // Global favorites list
}

// --- CV BUILDER TYPES ---

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export interface ExtraCourse {
  id: string;
  name: string;
  institution: string;
  year: string;
}

export interface CVData {
  photo?: string; // Base64 string for the photo
  fullName: string;
  role: string;

  // Contact & Address
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  linkedin: string;

  // Personal Specs (Aviation specific)
  nationality: string;
  birthPlace: string; // Naturalidade
  maritalStatus: string;
  birthDate: string;
  height: string;
  weight: string;

  // Documentation
  canac: string;
  cmaCode: string; // New field: MC251 etc
  cma: string; // Validity or Code
  cmaValidity: string;
  passport: string;
  passportValidity: string;

  summary: string;
  experiences: Experience[];
  education: Education[];
  extraCourses: ExtraCourse[]; // Specific section for courses
  skills: string[];
  languages: string[];
}
