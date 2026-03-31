"use client";

import { useState, useEffect, useRef, memo, useTransition, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getQuestions, LocalizedQuestion, questions } from "@/i18n/questions";

type GameState = "menu" | "playing" | "finished";

const categoryTheme: Record<string, { color: string, border: string, bg: string }> = {
  definition: { color: "text-sky-400", border: "border-sky-500/30", bg: "bg-sky-500/10" },
  advantages: { color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10" },
  "structural-systems": { color: "text-indigo-400", border: "border-indigo-500/30", bg: "bg-indigo-500/10" },
  industrial: { color: "text-orange-400", border: "border-orange-500/30", bg: "bg-orange-500/10" },
  "high-rise": { color: "text-rose-400", border: "border-rose-500/30", bg: "bg-rose-500/10" },
  classification: { color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/10" },
  earthquake: { color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10" },
  foundation: { color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/10" },
  insulation: { color: "text-teal-400", border: "border-teal-500/30", bg: "bg-teal-500/10" },
  connections: { color: "text-pink-400", border: "border-pink-500/30", bg: "bg-pink-500/10" },
  materials: { color: "text-violet-400", border: "border-violet-500/30", bg: "bg-violet-500/10" },
  components: { color: "text-fuchsia-400", border: "border-fuchsia-500/30", bg: "bg-fuchsia-500/10" },
  durability: { color: "text-green-400", border: "border-green-500/30", bg: "bg-green-500/10" },
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const ANSWER_LABELS = ["A", "B", "C", "D"];

function QuizGameComponent() {
  const { locale, t } = useLanguage();
  const [, startTransition] = useTransition();
  const [gameState, setGameState] = useState<GameState>("menu");
  const [selectedQuestion, setSelectedQuestion] = useState<LocalizedQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<LocalizedQuestion[]>([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const initialRender = useRef(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      const qs = getQuestions(locale);
      setShuffledQuestions(shuffleArray(qs));
      return;
    }
    startTransition(() => {
      setShuffledQuestions((prev) => {
        const newQs = getQuestions(locale);
        return prev.map(oldQ => {
          const updatedQ = newQs.find(newQ => newQ.id === oldQ.id);
          return updatedQ || oldQ;
        });
      });
    });
  }, [locale]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleQuestionClick = useCallback((question: LocalizedQuestion) => {
    if (correctAnswers.includes(question.id) || wrongAnswers.includes(question.id)) return;
    setSelectedQuestion(question);
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, [correctAnswers, wrongAnswers]);

  const handleAnswer = useCallback((answerIndex: number) => {
    if (selectedAnswer !== null || !selectedQuestion) return;

    setSelectedAnswer(answerIndex);

    if (answerIndex === selectedQuestion.correctAnswer) {
      setScore((prev) => prev + 10);
      setCorrectAnswers((prev) => [...prev, selectedQuestion.id]);
      setStreak((prev) => {
        const next = prev + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
    } else {
      setWrongAnswers((prev) => [...prev, selectedQuestion.id]);
      setStreak(0);
    }

    setTimeout(() => setShowExplanation(true), 300);
  }, [selectedAnswer, selectedQuestion, bestStreak]);

  const closeCard = useCallback(() => {
    setSelectedQuestion(null);
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setCorrectAnswers([]);
    setWrongAnswers([]);
    setSelectedQuestion(null);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setStreak(0);
    setBestStreak(0);
    setElapsedTime(0);
    setIsTimerRunning(true);
    const qs = getQuestions(locale);
    setShuffledQuestions(shuffleArray(qs));
    setGameState("playing");
  }, [locale]);

  const finishGame = useCallback(() => {
    setIsTimerRunning(false);
    setGameState("finished");
  }, []);

  const answeredCount = correctAnswers.length + wrongAnswers.length;
  const progressPercent = shuffledQuestions.length > 0
    ? Math.round((answeredCount / shuffledQuestions.length) * 100)
    : 0;

  if (gameState === "menu") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="glass-card-v3 p-6 sm:p-10 md:p-12 max-w-lg sm:max-w-xl w-full text-center animate-card-entry tech-border">
          <div className="mb-8 sm:mb-10">
            <div className="relative inline-block mb-4">
              <div className="text-5xl sm:text-6xl animate-bounce-custom">🏗️</div>
              <div className="absolute -inset-4 bg-sky-500/20 rounded-full blur-xl animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
              <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">AGALAR</span>
              <span className="text-slate-400"> QUIZ</span>
            </h1>
            <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-sky-500 to-cyan-500 mx-auto mb-4 rounded-full" />
            <p className="text-slate-400 text-sm sm:text-base font-medium uppercase tracking-widest">
              {t.menuSubtitle}
            </p>
          </div>
          
          <div className="bg-white/5 rounded-2xl border border-white/10 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
                <div className="text-2xl sm:text-3xl font-black text-sky-400">{questions.length}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Sorular</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">5</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Kategoriler</div>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="text-2xl sm:text-3xl font-black text-purple-400">✓</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Sınav</div>
              </div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="group relative w-full py-4 sm:py-5 px-6 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-cyan-500 text-white font-bold rounded-xl text-lg sm:text-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-sky-500/25 uppercase tracking-wider cursor-pointer overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>{t.startButton}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
          </button>
          
          <p className="text-slate-600 text-xs mt-4 uppercase tracking-widest">
            v3.0 • AGALAR MÜHENDİSLİK GRUP
          </p>
        </div>
      </div>
    );
  }

  if (gameState === "finished") {
    const percentage = Math.round((correctAnswers.length / shuffledQuestions.length) * 100);

    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="glass-card-v3 p-8 sm:p-12 max-w-xl w-full text-center animate-card-entry tech-border">
          <div className="text-5xl mb-6">{percentage >= 70 ? "🎯" : "📖"}</div>
          <h1 className="text-3xl font-bold text-white mb-2 uppercase">{t.gameFinished}</h1>
          <div className="text-6xl font-black text-sky-400 mb-8 neon-text-blue">%{percentage}</div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-slate-500 text-xs uppercase mb-1">{t.correct}</div>
              <div className="text-2xl font-bold text-emerald-400">{correctAnswers.length}</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-slate-500 text-xs uppercase mb-1">{t.timeElapsed}</div>
              <div className="text-2xl font-bold text-sky-400">{formatTime(elapsedTime)}</div>
            </div>
          </div>

          <div className="exam-note text-left mb-8">
            <p className="text-slate-300">
              {percentage >= 80 ? t.excellent : percentage >= 60 ? t.good : t.keepStudying}
            </p>
          </div>

          <button
            onClick={startGame}
            className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all cursor-pointer border border-white/10"
          >
            {t.playAgain}
          </button>
        </div>
      </div>
    );
  }

  if (selectedQuestion) {
    const isAnswered = selectedAnswer !== null;
    const theme = categoryTheme[selectedQuestion.category] || categoryTheme.definition;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-slate-950/40" onClick={closeCard}>
        <div 
          className="glass-card-v3 p-5 sm:p-8 w-full max-w-2xl md:max-w-3xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto animate-card-entry relative tech-border shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6 sm:mb-8 gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className={`px-3 py-1 sm:px-4 sm:py-1.5 ${theme.bg} ${theme.color} ${theme.border} border rounded-full text-xs font-bold uppercase tracking-widest`}>
                {selectedQuestion.category.replace("-", " ")}
              </span>
              <span className="text-slate-600 text-xs font-mono">ID: #{selectedQuestion.id.toString().padStart(3, '0')}</span>
            </div>
            <button onClick={closeCard} className="text-slate-500 hover:text-white text-2xl sm:text-3xl transition-transform hover:rotate-90 cursor-pointer">&times;</button>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-medium mb-6 sm:mb-10 text-center leading-relaxed">
            {selectedQuestion.question}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {selectedQuestion.options.map((option, index) => {
              const isCorrect = index === selectedQuestion.correctAnswer;
              const isSelected = selectedAnswer === index;
              const statusClasses = !isAnswered 
                ? "bg-white/5 border-white/10 hover:border-sky-500/50 hover:bg-sky-500/5"
                : isCorrect 
                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 scale-[1.02]"
                  : isSelected 
                    ? "bg-rose-500/20 border-rose-500 text-rose-400"
                    : "bg-white/5 border-white/10 opacity-40";

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={`flex items-center p-4 sm:p-5 rounded-2xl border-2 transition-all text-left group cursor-pointer ${statusClasses}`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold mr-4 shrink-0 transition-colors ${
                    isSelected ? "bg-current text-slate-900" : "bg-white/10 text-slate-400 group-hover:text-sky-400"
                  }`}>
                    {ANSWER_LABELS[index]}
                  </span>
                  <span className="text-base sm:text-lg">{option}</span>
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className={`animate-slide-up p-6 rounded-2xl border-l-4 ${selectedAnswer === selectedQuestion.correctAnswer ? "bg-emerald-500/10 border-emerald-500" : "bg-rose-500/10 border-rose-500"}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{selectedAnswer === selectedQuestion.correctAnswer ? "✅" : "❌"}</span>
                <span className="font-bold uppercase tracking-tight text-sm">
                  {selectedAnswer === selectedQuestion.correctAnswer ? t.correct : t.wrong}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed italic">
                {selectedQuestion.explanation}
              </p>
            </div>
          )}

          {isAnswered && (
            <button
              onClick={closeCard}
              className="w-full mt-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition-all cursor-pointer shadow-lg shadow-sky-900/20"
            >
              {t.continue}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 relative z-10 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* V3 Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">AGALAR MÜHENDİSLİK</span>
              <span className="text-slate-500"> GRUP</span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                SYSTEM_ONLINE
              </div>
              <div className="text-slate-600 text-sm font-mono">VER: 3.0.0_EXAM_READY</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="glass-card-v3 px-4 py-2 flex flex-col items-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Time</span>
              <span className="text-sky-400 font-mono text-xl">{formatTime(elapsedTime)}</span>
            </div>
            <div className="glass-card-v3 px-4 py-2 flex flex-col items-center border-emerald-500/30">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Score</span>
              <span className="text-emerald-400 font-mono text-xl">{score}</span>
            </div>
            {streak >= 2 && (
              <div className="glass-card-v3 px-4 py-2 flex flex-col items-center border-amber-500/30 animate-bounce-custom">
                <span className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">Streak</span>
                <span className="text-amber-400 font-mono text-xl">{streak}🔥</span>
              </div>
            )}
            <button onClick={finishGame} className="px-6 py-3 bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 rounded-xl border border-white/10 transition-all text-sm font-bold uppercase cursor-pointer">
              {t.finish}
            </button>
          </div>
        </div>

        {/* Progress Bar V3 */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-2">
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{t.progress}</span>
            <span className="text-sky-400 font-mono text-sm">{progressPercent}%</span>
          </div>
          <div className="progress-line">
            <div className="progress-fill shadow-[0_0_15px_rgba(56,189,248,0.5)]" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Question Grid V3 - Enlarged Edition */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {shuffledQuestions.map((q, index) => {
            const isCorrect = correctAnswers.includes(q.id);
            const isWrong = wrongAnswers.includes(q.id);
            const isAnswered = isCorrect || isWrong;
            const theme = categoryTheme[q.category] || categoryTheme.definition;

            return (
              <button
                key={q.id}
                onClick={() => handleQuestionClick(q)}
                disabled={isAnswered}
                className={`
                  aspect-square rounded-[32px] border-3 flex flex-col items-center justify-center transition-all relative overflow-hidden group cursor-pointer
                  ${isCorrect 
                    ? "bg-emerald-500/20 border-emerald-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]" 
                    : isWrong
                    ? "bg-rose-500/10 border-rose-500/30 opacity-40"
                    : `bg-slate-900/40 border-white/10 hover:border-sky-500 hover:scale-105 hover:bg-slate-800 active:scale-95 shadow-lg`
                  }
                `}
              >
                <span className={`text-4xl sm:text-5xl font-black tracking-tighter ${isCorrect ? "text-emerald-400" : isWrong ? "text-rose-400" : "text-slate-600 group-hover:text-white group-hover:neon-text-blue"}`}>
                  {index + 1}
                </span>
                {!isAnswered && (
                  <div className={`absolute bottom-0 left-0 right-0 h-2 ${theme.bg.replace("bg-", "bg-").split(" ")[0].replace("/10", "/60")}`} />
                )}
                {isCorrect && <span className="absolute top-2 right-4 text-lg">✅</span>}
                {isWrong && <span className="absolute top-2 right-4 text-lg">❌</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const QuizGame = memo(QuizGameComponent);
export default QuizGame;
