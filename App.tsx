
import React, { useState } from 'react';
import { ViewState, User, ExamCategory, ExamResult, ExamHistoryItem, SavedExamState, Plan } from './types';
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
import AdminPanel from './screens/AdminPanel';
import { Sidebar } from './components/layout/Sidebar';
import { MOCK_USER, MOCK_QUESTIONS, MOCK_EXAM_HISTORY, EXAM_CATEGORIES, MOCK_PLANS } from './constants';
import { Menu } from 'lucide-react';
import { Toast, ToastType } from './components/ui/Toast';
import { MobileHeader } from './components/layout/MobileHeader';

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
  const [lastExamResult, setLastExamResult] = useState<ExamResult | null>(null);
  const [currentAnswers, setCurrentAnswers] = useState<Record<number, number>>({});
  const [examHistory, setExamHistory] = useState<ExamHistoryItem[]>(MOCK_EXAM_HISTORY);

  // Plans State
  const [plans, setPlans] = useState(MOCK_PLANS);

  // Favorites State
  const [favorites, setFavorites] = useState<number[]>([1, 4]);

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  // Exam Context (Normal vs Favorites Only vs Resumed)
  const [isFavoritesExam, setIsFavoritesExam] = useState(false);
  const [initialSessionState, setInitialSessionState] = useState<SavedExamState | null>(null);

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
    // Go to Details first instead of session
    setCurrentView('EXAM_DETAILS');
  };

  const handleStartExam = (category: ExamCategory, favoritesOnly: boolean = false) => {
    setSelectedCategory(category);
    setIsFavoritesExam(favoritesOnly);
    setInitialSessionState(null); // Clear any resume state
    setCurrentAnswers({});
    setCurrentView('EXAM_SESSION');
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
    const allQuestions = MOCK_QUESTIONS.filter(q => q.category === selectedCategory.id);
    const questions = isFavoritesExam
      ? allQuestions.filter(q => favorites.includes(q.id))
      : allQuestions;

    // Calculate Score
    let score = 0;
    let blank = 0;
    questions.forEach(q => {
      if (answers[q.id] === undefined) {
        blank++;
      } else if (answers[q.id] === q.correctIndex) {
        score++;
      }
    });

    const incorrect = questions.length - score - blank;
    const percentage = Math.round((score / questions.length) * 100);
    const resultStatus = percentage >= 70 ? 'Aprovado' : 'Reprovado';

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
      result: resultStatus
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

  const handleUpdatePlans = (newPlans: any[]) => {
    setPlans(newPlans);
    showToast('Preços atualizados com sucesso!', 'success');
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
        const catQuestions = MOCK_QUESTIONS.filter(q => q.category === selectedCategory.id);
        const sessionQuestions = isFavoritesExam
          ? catQuestions.filter(q => favorites.includes(q.id))
          : (catQuestions.length > 0 ? catQuestions : MOCK_QUESTIONS);

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

      case 'ADMIN':
        return user ? <AdminPanel user={user} plans={plans} onUpdatePlans={handleUpdatePlans} /> : null;

      case 'LANDING':
        return <LandingPage
          plans={plans}
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
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans text-slate-600">

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
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          {renderContent()}
        </main>
      </div>

    </div>
  );
};

export default App;
