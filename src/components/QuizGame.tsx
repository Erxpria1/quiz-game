"use client";

/* eslint-disable react-hooks/purity */
import { useState, useEffect, useRef, memo, useTransition, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getQuestions, LocalizedQuestion, questions } from "@/i18n/questions";

type GameState = "menu" | "playing" | "finished";

interface ScorePopup {
  id: number;
  x: number;
  y: number;
  value: number;
}

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
}

const categoryColors: Record<string, string> = {
  definition: "from-blue-500/20 to-blue-600/10",
  advantages: "from-green-500/20 to-green-600/10",
  "structural-systems": "from-purple-500/20 to-purple-600/10",
  industrial: "from-orange-500/20 to-orange-600/10",
  "high-rise": "from-red-500/20 to-red-600/10",
  classification: "from-cyan-500/20 to-cyan-600/10",
  earthquake: "from-yellow-500/20 to-yellow-600/10",
  foundation: "from-amber-500/20 to-amber-600/10",
  insulation: "from-teal-500/20 to-teal-600/10",
  connections: "from-pink-500/20 to-pink-600/10",
  materials: "from-indigo-500/20 to-indigo-600/10",
  components: "from-violet-500/20 to-violet-600/10",
  durability: "from-emerald-500/20 to-emerald-600/10",
};

const categoryBorderColors: Record<string, string> = {
  definition: "border-blue-500/30 hover:border-blue-400/60",
  advantages: "border-green-500/30 hover:border-green-400/60",
  "structural-systems": "border-purple-500/30 hover:border-purple-400/60",
  industrial: "border-orange-500/30 hover:border-orange-400/60",
  "high-rise": "border-red-500/30 hover:border-red-400/60",
  classification: "border-cyan-500/30 hover:border-cyan-400/60",
  earthquake: "border-yellow-500/30 hover:border-yellow-400/60",
  foundation: "border-amber-500/30 hover:border-amber-400/60",
  insulation: "border-teal-500/30 hover:border-teal-400/60",
  connections: "border-pink-500/30 hover:border-pink-400/60",
  materials: "border-indigo-500/30 hover:border-indigo-400/60",
  components: "border-violet-500/30 hover:border-violet-400/60",
  durability: "border-emerald-500/30 hover:border-emerald-400/60",
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
const CELEBRATION_EMOJIS = ["🎉", "⭐", "✨", "🏆", "🎊"];
const CONFETTI_COLORS = ["#6366f1", "#8b5cf6", "#a855f7", "#10b981", "#f59e0b", "#ec4899"];

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
  const [shuffledQuestions, setShuffledQuestions] = useState<LocalizedQuestion[]>(() => {
    const qs = getQuestions("en");
    return shuffleArray(qs);
  });
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [scorePopups, setScorePopups] = useState<ScorePopup[]>([]);
  const [confettiParticles, setConfettiParticles] = useState<ConfettiParticle[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const initialRender = useRef(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    startTransition(() => {
      setShuffledQuestions((prev) => {
        const newQs = getQuestions(locale);
        // Map previous order to new translations instead of reshuffling
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

  useEffect(() => {
    const popupInterval = setInterval(() => {
      setScorePopups((prev) => prev.filter((popup) => popup.id > Date.now() - 1000));
    }, 100);
    return () => clearInterval(popupInterval);
  }, []);

  useEffect(() => {
    const confettiInterval = setInterval(() => {
      setConfettiParticles((prev) => prev.filter((p) => p.id > Date.now() - 3000));
    }, 100);
    return () => clearInterval(confettiInterval);
  }, []);

  const createConfetti = useCallback(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1000;
    const baseId = Date.now();
    const newParticles: ConfettiParticle[] = Array.from({ length: 30 }, (_, i) => ({
      id: baseId + i,
      x: Math.random() * w,
      y: -20,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * 360,
    }));
    setConfettiParticles((prev) => [...prev, ...newParticles]);
  }, []);

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
      const newStreak = streak + 1;
      const pointsEarned = 10 + (newStreak > 1 ? newStreak * 2 : 0);
      setScore((prev) => prev + pointsEarned);
      setCorrectAnswers((prev) => [...prev, selectedQuestion.id]);
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setScorePopups((prev) => [
          ...prev,
          {
            id: Date.now(),
            x: rect.left + rect.width / 2,
            y: rect.top,
            value: pointsEarned,
          },
        ]);
      }

      if (newStreak >= 3) {
        createConfetti();
      }

      if (newStreak >= 5) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }
    } else {
      setWrongAnswers((prev) => [...prev, selectedQuestion.id]);
      setStreak(0);
    }

    setTimeout(() => setShowExplanation(true), 400);
  }, [selectedAnswer, selectedQuestion, streak, bestStreak, createConfetti]);

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
    const shuffled = shuffleArray(qs);
    setShuffledQuestions(shuffled);
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
      <>
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none">
            <div className="text-5xl sm:text-6xl md:text-8xl animate-bounce-custom">🎉</div>
          </div>
        )}
        <div className="min-h-screen flex items-center justify-center p-4 relative z-10 pointer-events-auto">
          <div className="glass-card-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 max-w-md sm:max-w-lg w-full text-center animate-scale-in pointer-events-auto">
            <div className="mb-4 sm:mb-6">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 animate-bounce-custom">🏗️</div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient mb-2 sm:mb-3 neon-text">
                {t.menuTitle}
              </h1>
              <h2 className="text-base sm:text-lg md:text-2xl text-white/80 mb-3 sm:mb-4 animate-slide-up">{t.menuSubtitle}</h2>
            </div>
            <p className="text-white/60 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg animate-slide-up delay-100">
              {t.menuDescription(questions.length)}
            </p>
            <button
              onClick={startGame}
              className="button-gradient w-full py-3 sm:py-4 px-6 text-white font-bold rounded-xl text-base sm:text-lg transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/50 neon-glow touch-feedback mobile-touch-target cursor-pointer"
            >
              {t.startButton}
            </button>
          </div>
        </div>
      </>
    );
  }

  if (gameState === "finished") {
    const maxScore = shuffledQuestions.length * 10;
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    const totalAnswered = correctAnswers.length + wrongAnswers.length;

    return (
      <>
        {percentage >= 80 && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="confetti-particle animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
                  fontSize: `${Math.random() * 16 + 10}px`,
                }}
              >
                {CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)]}
              </div>
            ))}
          </div>
        )}
        <div className="min-h-screen flex items-center justify-center p-4 relative z-10 pointer-events-auto">
          <div className="glass-card-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 max-w-md sm:max-w-lg w-full text-center animate-scale-in pointer-events-auto">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 animate-bounce-custom">
              {percentage >= 80 ? "🏆" : percentage >= 60 ? "👏" : "📚"}
            </div>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-4 sm:mb-6 animate-slide-up">{t.gameFinished}</h1>

            <div className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient mb-4 sm:mb-6 neon-text">
              {percentage}%
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="glass-card rounded-xl p-2 sm:p-3 card-hover">
                <div className="text-white/50 text-xs mb-1">{t.score}</div>
                <div className="text-white font-bold text-sm sm:text-lg">{score}</div>
              </div>
              <div className="glass-card rounded-xl p-2 sm:p-3 card-hover">
                <div className="text-white/50 text-xs mb-1">{t.timeElapsed}</div>
                <div className="text-white font-bold text-sm sm:text-lg">{formatTime(elapsedTime)}</div>
              </div>
              <div className="glass-card rounded-xl p-2 sm:p-3 card-hover">
                <div className="text-white/50 text-xs mb-1">{t.correct}</div>
                <div className="text-green-400 font-bold text-sm sm:text-lg">{correctAnswers.length}/{totalAnswered}</div>
              </div>
              <div className="glass-card rounded-xl p-2 sm:p-3 card-hover">
                <div className="text-white/50 text-xs mb-1">{t.streak}</div>
                <div className="text-amber-400 font-bold text-sm sm:text-lg">{bestStreak}🔥</div>
              </div>
            </div>

            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 animate-slide-up delay-100">
              <span className={
                percentage >= 80
                  ? "text-green-400 animate-pulse-glow"
                  : percentage >= 60
                  ? "text-yellow-400"
                  : "text-red-400"
              }>
                {percentage >= 80 ? t.excellent : percentage >= 60 ? t.good : t.keepStudying}
              </span>
            </p>

            <button
              onClick={startGame}
              className="button-gradient w-full py-3 sm:py-4 px-6 sm:px-8 text-white font-bold rounded-xl text-base sm:text-lg transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/50 neon-glow touch-feedback mobile-touch-target animate-slide-up delay-200 cursor-pointer"
            >
              {t.playAgain}
            </button>
          </div>
        </div>
      </>
    );
  }

  if (selectedQuestion) {
    const isAnswered = selectedAnswer !== null;
    const isCorrect = selectedAnswer === selectedQuestion.correctAnswer;

    return (
      <>
        {scorePopups.map((popup) => (
          <div
            key={popup.id}
            className="score-popup animate-score-popup"
            style={{
              left: popup.x,
              top: popup.y,
            }}
          >
            +{popup.value}
          </div>
        ))}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md" onClick={closeCard}>
          <div
            ref={cardRef}
            className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in duration-300 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4 sm:mb-6 relative">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 pr-12">
                <span className="px-2 sm:px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs sm:text-sm animate-pulse-glow">
                  {t.questionLabel(selectedQuestion.id)}
                </span>
                <span className="px-2 py-0.5 bg-white/5 text-white/40 rounded-full text-xs capitalize">
                  {selectedQuestion.category.replace("-", " ")}
                </span>
              </div>
              <button
                onClick={closeCard}
                className="absolute top-0 right-0 text-white/50 hover:text-white transition-all hover:rotate-90 duration-300 text-3xl sm:text-2xl leading-none p-1 sm:p-2 cursor-pointer z-20"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <h2 className="text-base sm:text-lg md:text-2xl text-white font-semibold mb-4 sm:mb-8 text-center leading-relaxed animate-slide-up">
              {selectedQuestion.question}
            </h2>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-8">
              {selectedQuestion.options.map((option, index) => {
                const isCorrectAnswer = index === selectedQuestion.correctAnswer;
                const isSelectedAnswer = selectedAnswer === index;
                const isWrongAnswer = isSelectedAnswer && !isCorrectAnswer;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={`answer-button w-full p-3 sm:p-4 md:p-5 rounded-xl text-left transition-all duration-300 border-2 mobile-touch-target cursor-pointer relative z-10 ${
                      !isAnswered
                        ? "bg-white/5 border-white/10 hover:bg-white/10 text-white hover:scale-[1.02] hover:border-indigo-500/50 active:scale-[0.98]"
                        : isCorrectAnswer
                        ? "bg-green-500/20 border-green-500 text-green-300 scale-[1.02] shadow-lg shadow-green-500/30"
                        : isWrongAnswer
                        ? "bg-red-500/20 border-red-500 text-red-300 animate-shake"
                        : "bg-white/5 border-white/10 text-white/30"
                    }`}
                  >
                    <span className={`inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg mr-2 sm:mr-3 text-xs sm:text-sm font-bold transition-all flex-shrink-0 ${
                      isCorrectAnswer
                        ? "bg-green-500/30 text-green-300 scale-110"
                        : isWrongAnswer
                        ? "bg-red-500/30 text-red-300"
                        : "bg-white/10 text-white/70"
                    }`}>
                      {ANSWER_LABELS[index]}
                    </span>
                    <span className="align-middle text-sm sm:text-base">{option}</span>
                    {isCorrectAnswer && (
                      <span className="float-right text-green-400 text-lg sm:text-xl mt-0.5 animate-bounce">✓</span>
                    )}
                    {isWrongAnswer && (
                      <span className="float-right text-red-400 text-lg sm:text-xl mt-0.5">✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className={`p-3 sm:p-5 rounded-xl border transition-all duration-500 animate-slide-up ${
                isCorrect
                  ? "bg-green-500/10 border-green-500/30 shadow-lg shadow-green-500/20"
                  : "bg-red-500/10 border-red-500/30 shadow-lg shadow-red-500/20"
              }`}>
                <p className={`font-semibold mb-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 ${
                  isCorrect ? "text-green-400" : "text-red-400"
                }`}>
                  <span className="text-lg sm:text-xl">{isCorrect ? "✓" : "✗"}</span>
                  <span>{isCorrect ? t.correct : t.wrong}</span>
                  {isCorrect && streak > 1 && (
                    <span className="sm:ml-auto text-amber-400 text-sm flex items-center gap-1">
                      <span className="streak-fire">🔥</span> {streak}x streak!
                    </span>
                  )}
                </p>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  {selectedQuestion.explanation}
                </p>
              </div>
            )}

            {showExplanation && (
              <button
                onClick={closeCard}
                className="button-gradient w-full mt-4 sm:mt-6 px-4 sm:px-6 py-3 sm:py-4 text-white font-semibold rounded-xl transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/30 touch-feedback mobile-touch-target cursor-pointer"
              >
                {t.continue}
              </button>
            )}
          </div>
        </div>
      </>
    );
  }

  const gridCols = isMobile
    ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    : "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6";

  return (
    <>
      {confettiParticles.map((particle) => (
        <div
          key={particle.id}
          className="confetti-particle animate-confetti"
          style={{
            left: particle.x,
            top: particle.y,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: particle.color,
              borderRadius: "2px",
            }}
          />
        </div>
      ))}
      <div className="min-h-screen p-3 sm:p-4 md:p-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3 sm:gap-4 animate-slide-up">
            <div className="text-center sm:text-left">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white neon-text">{t.pickQuestion}</h1>
              <p className="text-white/50 text-xs sm:text-sm">{t.clickQuestion}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-end w-full sm:w-auto">
              {/* Timer */}
              <div className="glass-card px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl flex items-center gap-1.5 sm:gap-2 card-hover">
                <span className="text-white/40 text-xs sm:text-sm">⏱</span>
                <span className="text-white/80 font-mono text-xs sm:text-sm">{formatTime(elapsedTime)}</span>
              </div>
              {/* Streak */}
              {streak > 0 && (
                <div className="glass-card px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl flex items-center gap-1.5 sm:gap-2 border-amber-500/30 animate-pulse-glow">
                  <span className="text-amber-400 text-xs sm:text-sm streak-fire">🔥</span>
                  <span className="text-amber-300 font-bold text-xs sm:text-sm">{streak}x</span>
                </div>
              )}
              {/* Score */}
              <div className="glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border-indigo-500/30">
                <span className="text-indigo-300 font-semibold text-xs sm:text-sm">{t.score}: {score}</span>
              </div>
              {/* Finish */}
              <button
                onClick={finishGame}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white/70 hover:text-white rounded-xl transition-all border border-white/10 text-xs sm:text-sm touch-feedback mobile-touch-target cursor-pointer"
              >
                {t.finish}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6 animate-slide-up delay-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/40 text-xs sm:text-sm">{t.progress}</span>
              <span className="text-white/40 text-xs sm:text-sm">{t.answered(answeredCount, shuffledQuestions.length)}</span>
            </div>
            <div className="h-2 sm:h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
              <div
                className="progress-bar-animated h-full rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Grid */}
          <div className={`grid ${gridCols} gap-2 sm:gap-3 md:gap-4 animate-slide-up delay-200`}>
            {shuffledQuestions.map((q, index) => {
              const isCorrect = correctAnswers.includes(q.id);
              const isWrong = wrongAnswers.includes(q.id);
              const isAnswered = isCorrect || isWrong;

              return (
                <button
                  key={q.id}
                  onClick={() => handleQuestionClick(q)}
                  disabled={isAnswered}
                  className={`
                    question-card relative p-3 sm:p-3 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl border-2 mobile-touch-target cursor-pointer
                    ${isCorrect
                      ? "bg-green-500/20 border-green-500/50 cursor-default shadow-lg shadow-green-500/20"
                      : isWrong
                      ? "bg-red-500/10 border-red-500/30 cursor-default opacity-60"
                      : `bg-gradient-to-br ${categoryColors[q.category] ?? "from-white/5 to-white/10"} ${categoryBorderColors[q.category] ?? "border-white/10 hover:border-indigo-400/60"} active:scale-95`
                    }
                  `}
                >
                  <span className={`text-base sm:text-xl md:text-2xl lg:text-3xl font-bold ${
                    isCorrect ? "text-green-400" : isWrong ? "text-red-400/60" : "text-white"
                  }`}>
                    {index + 1}
                  </span>
                  {isCorrect && (
                    <span className="absolute top-1 sm:top-2 right-1 sm:right-2 text-green-400 text-sm sm:text-lg animate-bounce">✓</span>
                  )}
                  {isWrong && (
                    <span className="absolute top-1 sm:top-2 right-1 sm:right-2 text-red-400/60 text-sm sm:text-lg">✗</span>
                  )}
                  {!isAnswered && (
                    <span className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 text-[8px] sm:text-[10px] text-white/20 uppercase tracking-wider hidden sm:block">
                      {q.category.replace("-", " ").slice(0, 6)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/50 animate-slide-up delay-300">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-green-500/30 border border-green-500/50 shadow-lg shadow-green-500/20"></span>
              <span>{t.legendCorrect}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-red-500/20 border border-red-500/30"></span>
              <span>{t.legendWrong}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-white/10 border border-white/20"></span>
              <span>{t.legendUnanswered}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const QuizGame = memo(QuizGameComponent);
/* eslint-enable react-hooks/purity */
export default QuizGame;
