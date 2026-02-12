
import React, { useState } from 'react';
import { ViewState, User, ExamCategory, ExamResult, ExamHistoryItem, SavedExamState, Plan, Question } from './types';
import LandingPage from './screens/LandingPage';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import ExamList from './screens/ExamList';
import ExamSession from './screens/ExamSession';
import Results from './screens/Results';
import Review from './screens/Review';
import Profile from './screens/Profile';
import ExamDetails from './screens/ExamDetails';
import CVBuilder from './screens/CVBuilder';
import Achievements from './screens/Achievements';
import UsefulLinks from './screens/UsefulLinks';
import DeductiveLanding from './screens/DeductiveLanding';
import DeductiveSession from './screens/DeductiveSession';
import DeductiveResults from './screens/DeductiveResults';
import AdminPanel from './screens/AdminPanel';
import { Sidebar } from './components/layout/Sidebar';
import { MOCK_USER, MOCK_QUESTIONS, MOCK_EXAM_HISTORY, EXAM_CATEGORIES, MOCK_PLANS, INITIAL_LINKS, INITIAL_FEATURES } from './constants';
import { Menu } from 'lucide-react';
import { Toast, ToastType } from './components/ui/Toast';
import { MobileHeader } from './components/layout/MobileHeader';
import LanguageHub from './screens/LanguageHub';
import LanguageExam from './screens/LanguageExam';
import CabinSimulator from './screens/CabinSimulator';

const App: React.FC = () => {
  // --- Global State ---
  const [currentView, setCurrentView] = useState<ViewState>('LANDING');
  const [activeExamFilter, setActiveExamFilter] = useState<string>('ANAC'); // 'ALL', 'ANAC', 'PORTUGUESE', 'SHL'
  const [user, setUser] = useState<User | null>(null);
  const [loginMode, setLoginMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');

  // Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Exam State
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [lastExamResult, setLastExamResult] = useState<ExamResult | null>(null);
  const [currentAnswers, setCurrentAnswers] = useState<Record<number, number>>({});
  const [examHistory, setExamHistory] = useState<ExamHistoryItem[]>(MOCK_EXAM_HISTORY);

  // Plans State
  const [plans, setPlans] = useState(MOCK_PLANS);

  // Favorites State
  const [favorites, setFavorites] = useState<number[]>([1, 4]);

  // Links State
  const [usefulLinks, setUsefulLinks] = useState(INITIAL_LINKS);

  // Features State
  const [features, setFeatures] = useState(INITIAL_FEATURES);

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  // Exam Context (Normal vs Favorites Only vs Resumed)
  const [isFavoritesExam, setIsFavoritesExam] = useState(false);
  const [initialSessionState, setInitialSessionState] = useState<SavedExamState | null>(null);

  // Deductive State
  const [deductiveMode, setDeductiveMode] = useState<'TRAINING' | 'SIMULATION' | null>(null);
  const [deductiveSubcategory, setDeductiveSubcategory] = useState<string | undefined>(undefined);
  const [activeDeductiveQuestions, setActiveDeductiveQuestions] = useState<Question[]>([]);
  const [deductiveAnswers, setDeductiveAnswers] = useState<Record<number, string>>({});
  const [deductiveTimeTaken, setDeductiveTimeTaken] = useState(0);

  // Language Exam State
  const [selectedLanguage, setSelectedLanguage] = useState<'ENGLISH' | 'SPANISH'>('ENGLISH');
  const [selectedLevel, setSelectedLevel] = useState<string>('BEGINNER');

  // --- Handlers ---

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type, isVisible: true });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleLogin = () => {
    setUser(MOCK_USER);
    setCurrentView('DASHBOARD');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('LANDING');
  };

  const handleNavigate = (view: ViewState, filter?: string) => {
    setCurrentView(view);
    if (filter) setActiveExamFilter(filter);
    // Reset specific states when navigating top level
    if (view === 'DASHBOARD' || view === 'EXAM_LIST') {
      setSelectedCategory(null);
      setIsFavoritesExam(false);
      setInitialSessionState(null);
    }
  };

  const handleSelectCategory = (category: ExamCategory) => {
    setSelectedCategory(category);
    if (category.id === 'SHL-DEDUCTIVE') {
      setCurrentView('DEDUCTIVE_REASONING');
    } else {
      setCurrentView('EXAM_DETAILS');
    }
  };

  const handleStartExam = (category: ExamCategory, favoritesOnly: boolean = false) => {
    setSelectedCategory(category);
    setIsFavoritesExam(favoritesOnly);
    setInitialSessionState(null); // Clear any resume state
    setCurrentAnswers({});

    // Logic to generate questions (Standard vs Pre-Banca)
    let questionsToUse: Question[] = [];

    if (category.id === 'PRE-BANCA') {
      const subjects = ['RPA', 'CGA', 'PSS', 'ESS'];
      subjects.forEach(sub => {
        const subPool = MOCK_QUESTIONS.filter(q => q.category === sub);
        // Shuffle and take 20
        const selected = [...subPool].sort(() => Math.random() - 0.5).slice(0, 20);
        questionsToUse = [...questionsToUse, ...selected];
      });
      // Shuffle final mix
      questionsToUse = questionsToUse.sort(() => Math.random() - 0.5);
    } else {
      const allQs = MOCK_QUESTIONS.filter(q => q.category === category.id);
      questionsToUse = favoritesOnly
        ? allQs.filter(q => favorites.includes(q.id))
        : allQs;
    }

    setGeneratedQuestions(questionsToUse);

    // For deductive reasoning, go to landing page first
    if (category.id === 'SHL-DEDUCTIVE') {
      setCurrentView('DEDUCTIVE_REASONING');
    } else {
      setCurrentView('EXAM_SESSION');
    }
  };

  const handleSaveExam = (answers: Record<number, number>, timeLeft: number, currentQuestionIndex: number) => {
    if (!selectedCategory) return;

    const timeSpentSeconds = (selectedCategory.durationMinutes * 60) - timeLeft;
    const mins = Math.floor(timeSpentSeconds / 60);
    const secs = timeSpentSeconds % 60;
    const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    const newHistoryItem: ExamHistoryItem = {
      id: Date.now().toString(), // Generate a simple ID
      categoryId: selectedCategory.id,
      date: new Date().toLocaleString('pt-BR'),
      status: 'Em aberto',
      correct: null,
      incorrect: null,
      blank: null,
      time: formattedTime,
      result: '-',
      savedState: {
        answers,
        timeLeft,
        currentQuestionIndex,
        isFavoritesExam
      }
    };

    setExamHistory(prev => [newHistoryItem, ...prev]);
    showToast('Simulado salvo no Diário de Bordo!', 'success');
    // Return to details
    setCurrentView('EXAM_DETAILS');
  };

  const handleResumeExam = (item: ExamHistoryItem) => {
    if (!item.savedState) return;

    const category = EXAM_CATEGORIES.find(c => c.id === item.categoryId);
    if (category) {
      setSelectedCategory(category);
      setInitialSessionState(item.savedState);
      setIsFavoritesExam(item.savedState.isFavoritesExam);
      setCurrentView('EXAM_SESSION');

      // Remove from history to avoid duplicates
      setExamHistory(prev => prev.filter(h => h.id !== item.id));
      showToast('Simulado retomado com sucesso.', 'info');
    }
  };

  const handleExamComplete = (answers: Record<number, number>, timeTakenSeconds: number) => {
    if (!selectedCategory) return;

    // Filter questions based on exam mode
    // Filter questions based on what was generated
    const questions = generatedQuestions.length > 0 ? generatedQuestions : (
      // Fallback logic if needed (e.g. results view directly without start?)
      isFavoritesExam
        ? MOCK_QUESTIONS.filter(q => q.category === selectedCategory.id && favorites.includes(q.id))
        : MOCK_QUESTIONS.filter(q => q.category === selectedCategory.id)
    );

    // Calculate Score
    let score = 0;
    let blank = 0;

    // Detailed stats for Pre-Banca
    const blockStats: Record<string, { total: number, correct: number }> = {
      'RPA': { total: 0, correct: 0 },
      'CGA': { total: 0, correct: 0 },
      'PSS': { total: 0, correct: 0 },
      'ESS': { total: 0, correct: 0 }
    };

    questions.forEach(q => {
      if (answers[q.id] === undefined) {
        blank++;
      } else if (answers[q.id] === q.correctIndex) {
        score++;
      }

      // Track block stats for Pre-Banca
      if (selectedCategory.id === 'PRE-BANCA' && blockStats[q.category]) {
        blockStats[q.category].total++;
        if (answers[q.id] === q.correctIndex) {
          blockStats[q.category].correct++;
        }
      }
    });

    const incorrect = questions.length - score - blank;
    const percentage = Math.round((score / questions.length) * 100);

    let resultStatus = percentage >= 70 ? 'Aprovado' : 'Reprovado';

    // Pre-Banca Special Rules
    if (selectedCategory.id === 'PRE-BANCA') {
      const failedBlocks = Object.entries(blockStats).filter(([cat, stats]) => {
        if (stats.total === 0) return false;
        return (stats.correct / stats.total) < 0.7; // < 70%
      }).map(([cat]) => cat);

      if (failedBlocks.length === 0) {
        resultStatus = 'Aprovado';
      } else if (failedBlocks.length === 1) {
        resultStatus = `Reprovado – 2ª Época (${failedBlocks[0]})`;
      } else {
        resultStatus = 'Reprovado';
      }
    }

    const mins = Math.floor(timeTakenSeconds / 60);
    const secs = timeTakenSeconds % 60;
    const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    // Add to history
    const newHistoryItem: ExamHistoryItem = {
      id: Date.now().toString(),
      categoryId: selectedCategory.id,
      date: new Date().toLocaleString('pt-BR'),
      status: 'Finalizado',
      correct: score,
      incorrect: incorrect,
      blank: blank,
      time: formattedTime,
      result: resultStatus as any
    };

    setExamHistory(prev => [newHistoryItem, ...prev]);

    const result: ExamResult = {
      categoryId: selectedCategory.id,
      date: new Date().toISOString(),
      score,
      totalQuestions: questions.length,
      answers,
      timeTakenSeconds
    };

    setLastExamResult(result);
    setCurrentAnswers(answers);
    setCurrentView('RESULTS');
  };

  const handleDeductiveComplete = (answers: Record<number, string>, timeTakenSeconds: number) => {
    if (!selectedCategory) return;

    // For now, we'll just show a success message since results are complex for deductive
    // In a real app, we'd calculate the correct rooms/order and show a Results screen
    setDeductiveAnswers(answers);
    setDeductiveTimeTaken(timeTakenSeconds);
    showToast('Teste finalizado! Sua performance foi registrada.', 'success');
    setCurrentView('DEDUCTIVE_RESULTS');
  };

  const handleRetry = () => {
    setCurrentAnswers({});
    setInitialSessionState(null);
    setCurrentView('EXAM_SESSION');
  };

  const toggleFavorite = (questionId: number) => {
    setFavorites(prev => {
      if (prev.includes(questionId)) {
        // Warning/Info to user that it was removed
        showToast('Questão removida dos favoritos.', 'info');
        return prev.filter(id => id !== questionId);
      } else {
        // Success message
        showToast('Questão adicionada aos favoritos!', 'success');
        return [...prev, questionId];
      }
    });
  };

  const handleUpdatePlans = (newPlans: Plan[]) => {
    setPlans(newPlans);
    showToast('Preços atualizados com sucesso!', 'success');
  };

  const handleUpdateLinks = (newLinks: any[]) => {
    setUsefulLinks(newLinks);
    showToast('Links atualizados com sucesso!', 'success');
  };

  const handleUpdateFeatures = (newFeatures: any[]) => {
    setFeatures(newFeatures);
    showToast('Recursos atualizados com sucesso!', 'success');
  };

  // --- Render Helpers ---

  const renderContent = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return user ? <Dashboard user={user} onNavigate={handleNavigate} /> : null;

      case 'EXAM_LIST':
        return (
          <ExamList
            onSelectCategory={handleSelectCategory}
            activeFilter={activeExamFilter}
          />
        );

      case 'EXAM_DETAILS':
        if (!selectedCategory) return null;
        return (
          <ExamDetails
            category={selectedCategory}
            examHistory={examHistory}
            onBack={() => setCurrentView('EXAM_LIST')}
            onStartExam={() => handleStartExam(selectedCategory, false)}
            onStartFavorites={() => handleStartExam(selectedCategory, true)}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            allQuestions={MOCK_QUESTIONS}
            onResumeExam={handleResumeExam}
          />
        );

      case 'EXAM_SESSION':
        if (!selectedCategory) return null;
        // Determine Question Set
        // Use generatedQuestions if available (for Pre-Banca and stability), otherwise fallback
        const sessionQuestions = generatedQuestions.length > 0 ? generatedQuestions : (
          isFavoritesExam
            ? MOCK_QUESTIONS.filter(q => q.category === selectedCategory.id && favorites.includes(q.id))
            : MOCK_QUESTIONS.filter(q => q.category === selectedCategory.id)
        );

        return (
          <ExamSession
            category={selectedCategory}
            questions={sessionQuestions}
            onComplete={handleExamComplete}
            onSave={handleSaveExam}
            onCancel={() => setCurrentView('EXAM_DETAILS')}
            initialAnswers={initialSessionState?.answers}
            initialTimeLeft={initialSessionState?.timeLeft}
            initialQuestionIndex={initialSessionState?.currentQuestionIndex}
          />
        );

      case 'DEDUCTIVE_SESSION':
        if (!selectedCategory) return null;
        const deductiveQs = MOCK_QUESTIONS.filter(q => q.category === 'SHL-DEDUCTIVE');
        return (
          <DeductiveSession
            category={selectedCategory}
            questions={activeDeductiveQuestions}
            mode={deductiveMode || 'TRAINING'}
            subcategory={deductiveSubcategory}
            onComplete={handleDeductiveComplete}
            onCancel={() => {
              setActiveDeductiveQuestions([]);
              setCurrentView('DEDUCTIVE_REASONING');
            }}
          />
        );

      case 'DEDUCTIVE_RESULTS':
        if (!selectedCategory) return null;
        return (
          <DeductiveResults
            category={selectedCategory}
            questions={activeDeductiveQuestions}
            answers={deductiveAnswers}
            timeTaken={deductiveTimeTaken}
            onHome={() => {
              setActiveDeductiveQuestions([]);
              setCurrentView('DASHBOARD');
            }}
            onRetry={() => {
              setDeductiveAnswers({});
              setCurrentView('DEDUCTIVE_SESSION');
            }}
          />
        );

      case 'RESULTS':
        if (!lastExamResult || !selectedCategory) return null;

        const resultCatQuestions = MOCK_QUESTIONS.filter(q => q.category === selectedCategory.id);
        const displayQs = isFavoritesExam
          ? resultCatQuestions.filter(q => favorites.includes(q.id))
          : (resultCatQuestions.length > 0 ? resultCatQuestions : MOCK_QUESTIONS);

        return (
          <Results
            result={lastExamResult}
            category={selectedCategory}
            questions={displayQs}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onReview={() => setCurrentView('REVIEW')}
            onRetry={handleRetry}
            onNewExam={() => handleStartExam(selectedCategory, false)}
            onHome={() => setCurrentView('DASHBOARD')}
          />
        );

      case 'REVIEW':
        if (!lastExamResult || !selectedCategory) return null;
        const reviewCatQuestions = MOCK_QUESTIONS.filter(q => q.category === selectedCategory.id);
        const displayReviewQs = isFavoritesExam
          ? reviewCatQuestions.filter(q => favorites.includes(q.id))
          : (reviewCatQuestions.length > 0 ? reviewCatQuestions : MOCK_QUESTIONS);

        return (
          <Review
            questions={displayReviewQs}
            userAnswers={currentAnswers}
            onClose={() => setCurrentView('RESULTS')}
          />
        );

      case 'CV_BUILDER':
        return user ? <CVBuilder user={user} onBack={() => setCurrentView('DASHBOARD')} /> : null;

      case 'PROFILE':
        return user ? <Profile user={user} onLogout={handleLogout} /> : null;

      case 'ACHIEVEMENTS':
        return user ? <Achievements user={user} onBack={() => setCurrentView('DASHBOARD')} /> : null;

      case 'USEFUL_LINKS':
        return <UsefulLinks links={usefulLinks} onBack={() => setCurrentView('DASHBOARD')} />;

      case 'DEDUCTIVE_REASONING':
        if (!selectedCategory) return null;
        return (
          <DeductiveLanding
            category={selectedCategory}
            onBack={() => setCurrentView('EXAM_LIST')}
            onStart={(mode, sub) => {
              const allDeductive = MOCK_QUESTIONS.filter(q => q.category === 'SHL-DEDUCTIVE');
              let filtered = allDeductive;

              if (mode === 'TRAINING' && sub) {
                filtered = allDeductive.filter(q => {
                  const type = q.deductive?.type;
                  if (sub === 'CALENDAR') return type === 'CALENDAR';
                  if (sub === 'SCHEDULING') return type === 'SCHEDULING';
                  if (sub === 'TEAM_CALENDAR') return type === 'TEAM_CALENDAR';
                  if (sub === 'SPATIAL') return type === 'OFFICES' || type === 'SEATING';
                  return true;
                });
              } else if (mode === 'SIMULATION') {
                filtered = [...allDeductive].sort(() => Math.random() - 0.5).slice(0, 12);
              }

              setDeductiveMode(mode);
              setDeductiveSubcategory(sub);
              setActiveDeductiveQuestions(filtered);
              setCurrentView('DEDUCTIVE_SESSION');
            }}
          />
        );

      case 'ADMIN':
        return user ? <AdminPanel
          user={user}
          plans={plans}
          onUpdatePlans={handleUpdatePlans}
          links={usefulLinks}
          onUpdateLinks={handleUpdateLinks}
          features={features}
          onUpdateFeatures={handleUpdateFeatures}
        /> : null;

      case 'LANGUAGE_HUB':
        return <LanguageHub
          onBack={() => setCurrentView('DASHBOARD')}
          onStartExam={(lang, level) => {
            setSelectedLanguage(lang);
            setSelectedLevel(level);
            setCurrentView('LANGUAGE_EXAM');
          }}
        />;

      case 'LANGUAGE_EXAM':
        return <LanguageExam
          language={selectedLanguage}
          level={selectedLevel}
          onBack={() => setCurrentView('LANGUAGE_HUB')}
          onComplete={() => {
            showToast('Sessão finalizada!', 'success');
            setCurrentView('DASHBOARD');
          }}
        />;

      case 'CABIN_SIMULATOR':
        return <CabinSimulator onBack={() => setCurrentView('DASHBOARD')} />;

      case 'LANDING':
        return <LandingPage
          plans={plans}
          features={features}
          onLoginClick={(mode) => {
            if (mode) setLoginMode(mode);
            setCurrentView('LOGIN');
          }}
        />;

      default:
        return null;
    }
  };

  // --- Layout Wrapper ---

  if (currentView === 'LANDING') {
    return (
      <div className="min-h-screen">
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={closeToast}
        />
        {renderContent()}
      </div>
    );
  }

  if (currentView === 'LOGIN') {
    return <Login
      initialMode={loginMode}
      onLogin={handleLogin}
      onBack={() => setCurrentView('LANDING')}
    />;
  }

  return (
    <div className="min-h-screen bg-[#080C18] flex overflow-hidden font-sans text-slate-300 selection:bg-cyan-500/30">

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />

      {/* Sidebar Navigation */}
      <Sidebar
        user={user!}
        currentView={currentView}
        activeFilter={activeExamFilter}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">

        <MobileHeader onOpenSidebar={() => setIsSidebarOpen(true)} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative custom-scrollbar">
          {renderContent()}
        </main>
      </div>

    </div>
  );
};

export default App;
