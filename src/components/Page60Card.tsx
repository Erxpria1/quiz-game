"use client";

import { useState, useEffect, useCallback, memo, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { page60Questions, Page60Question } from "@/data/page60Questions";
import FrameSystemDiagram from "@/components/FrameSystemDiagram";

const ANSWER_LABELS = ["A", "B", "C", "D"];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function Page60CardComponent() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [shakeWrong, setShakeWrong] = useState(false);
  const [pulseCorrect, setPulseCorrect] = useState(false);
  const [hoveredAnswer, setHoveredAnswer] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const currentQuestion = page60Questions[currentIndex];
  const answeredCount = Object.keys(results).length;
  const progressPercent = Math.round((answeredCount / page60Questions.length) * 100);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setIsTimerRunning(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsTimerRunning(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectCount(0);
    setWrongCount(0);
    setStreak(0);
    setBestStreak(0);
    setElapsedTime(0);
    setResults({});
    setIsFinished(false);
    setShowConfetti(false);
  }, []);

  const handleAnswer = useCallback((answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    setResults((prev) => ({ ...prev, [currentIndex]: isCorrect }));

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setStreak((prev) => {
        const next = prev + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
      setPulseCorrect(true);
      setTimeout(() => setPulseCorrect(false), 600);
    } else {
      setWrongCount((prev) => prev + 1);
      setStreak(0);
      setShakeWrong(true);
      setTimeout(() => setShakeWrong(false), 600);
    }

    setTimeout(() => setShowExplanation(true), 300);
  }, [selectedAnswer, currentQuestion, bestStreak, currentIndex]);

  const goToQuestion = useCallback((index: number) => {
    if (results[index] !== undefined) return;
    setCurrentIndex(index);
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, [results]);

  const handleNext = useCallback(() => {
    const nextUnanswered = page60Questions.findIndex((_, i) => results[i] === undefined);
    if (nextUnanswered !== -1) {
      setCurrentIndex(nextUnanswered);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      setIsTimerRunning(false);
      if (correctCount >= 7) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  }, [results, correctCount]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectCount(0);
    setWrongCount(0);
    setStreak(0);
    setBestStreak(0);
    setElapsedTime(0);
    setResults({});
    setIsFinished(false);
    setShowConfetti(false);
    setIsTimerRunning(true);
  }, []);

  const percentage = page60Questions.length > 0 ? Math.round((correctCount / page60Questions.length) * 100) : 0;

  return (
    <>
      <button
        onClick={handleOpen}
        className="aspect-square rounded-[32px] border-2 flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden cursor-pointer group bg-gradient-to-br from-red-600 via-red-500 to-amber-500 border-red-400/40 hover:scale-105 hover:shadow-[0_0_40px_rgba(239,68,68,0.5),0_0_80px_rgba(245,158,11,0.3)] active:scale-95 shadow-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-300/20 to-transparent animate-shimmer" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.3)_0%,transparent_70%)] animate-pulse" />
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-red-300 animate-ping" style={{ animationDelay: "1s" }} />
        <span className="relative z-10 text-3xl sm:text-4xl font-black text-white drop-shadow-lg group-hover:scale-110 transition-transform">
          📄60
        </span>
        <span className="relative z-10 text-[9px] sm:text-[10px] font-bold text-white/90 uppercase tracking-wider mt-1">
          Sayfa
        </span>
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400 animate-gradient-x bg-[length:200%_100%]" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 backdrop-blur-xl bg-slate-950/70" onClick={handleClose}>
          <div
            ref={modalRef}
            className={`w-full max-w-3xl md:max-w-4xl max-h-[90vh] overflow-hidden rounded-[28px] border border-red-500/30 shadow-[0_0_60px_rgba(239,68,68,0.15),0_25px_50px_rgba(0,0,0,0.5)] relative bg-slate-900/95 backdrop-blur-xl animate-card-entry flex flex-col ${shakeWrong ? "animate-shake" : ""} ${pulseCorrect ? "animate-pulse-correct" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-400 to-red-500 animate-gradient-x bg-[length:200%_100%]" />

            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-sm animate-confetti-fall"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: "-5%",
                      backgroundColor: i % 3 === 0 ? "#ef4444" : i % 3 === 1 ? "#f59e0b" : "#fbbf24",
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
            )}

            <div className="p-4 sm:p-6 md:p-8 flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-start mb-4 gap-3 shrink-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1.5 bg-red-500/15 text-red-400 border border-red-500/25 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    Sayfa 60
                  </span>
                  <span className="px-3 py-1.5 bg-amber-500/15 text-amber-400 border border-amber-500/25 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    Frame Systems
                  </span>
                  <span className="px-3 py-1.5 bg-white/5 text-slate-400 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest font-mono">
                    {page60Questions.length} Soru
                  </span>
                </div>
                <button onClick={handleClose} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all cursor-pointer border border-white/10 hover:border-red-500/30">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {isFinished ? (
                /* ===== RESULTS SCREEN ===== */
                <div className="flex-1 flex flex-col items-center justify-center py-8 animate-card-entry">
                  <div className="relative mb-6">
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl font-black ${
                      percentage >= 80 ? "bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-2 border-emerald-500/40 text-emerald-400" :
                      percentage >= 60 ? "bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-2 border-amber-500/40 text-amber-400" :
                      "bg-gradient-to-br from-red-500/20 to-red-600/10 border-2 border-red-500/40 text-red-400"
                    }`}>
                      %{percentage}
                    </div>
                    <div className="absolute -inset-3 rounded-full border border-white/5 animate-pulse" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    {percentage >= 80 ? "🎯 Mükemmel!" : percentage >= 60 ? "👍 İyi!" : "📖 Çalışmalısın!"}
                  </h3>
                  <p className="text-slate-400 mb-8 text-center max-w-sm">
                    {percentage >= 80
                      ? "Sayfa 60 konusuna hakimsin! Frame Systems elemanlarını iyi biliyorsun."
                      : percentage >= 60
                      ? "Fena değil ama birkaç elemanı tekrar gözden geçir."
                      : "PDF sayfa 60'taki elemanları tekrar çalışman gerekiyor."}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 w-full max-w-lg">
                    <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 text-center">
                      <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Doğru</div>
                      <div className="text-3xl font-black text-emerald-400">{correctCount}</div>
                    </div>
                    <div className="bg-rose-500/10 p-4 rounded-2xl border border-rose-500/20 text-center">
                      <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Yanlış</div>
                      <div className="text-3xl font-black text-rose-400">{wrongCount}</div>
                    </div>
                    <div className="bg-sky-500/10 p-4 rounded-2xl border border-sky-500/20 text-center">
                      <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Süre</div>
                      <div className="text-2xl font-black text-sky-400 font-mono">{formatTime(elapsedTime)}</div>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20 text-center">
                      <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">En İyi Seri</div>
                      <div className="text-3xl font-black text-amber-400">{bestStreak}🔥</div>
                    </div>
                  </div>

                  <div className="w-full max-w-lg mb-8">
                    <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-2">Soru Detayları</div>
                    <div className="flex flex-wrap gap-2">
                      {page60Questions.map((q, i) => (
                        <div
                          key={i}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold border ${
                            results[i]
                              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                          }`}
                          title={`Soru ${i + 1}: ${results[i] ? "Doğru" : "Yanlış"}`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleRestart}
                    className="w-full max-w-sm py-4 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold rounded-2xl transition-all cursor-pointer shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98] text-lg"
                  >
                    🔄 Tekrar Çöz
                  </button>
                </div>
              ) : (
                /* ===== QUIZ SCREEN ===== */
                <>
                  {/* Stats Bar */}
                  <div className="flex items-center justify-between mb-4 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                        <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Süre</div>
                        <div className="text-sky-400 font-mono text-lg font-bold">{formatTime(elapsedTime)}</div>
                      </div>
                      <div className="px-4 py-2 bg-white/5 rounded-xl border border-emerald-500/20">
                        <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Skor</div>
                        <div className="text-emerald-400 font-mono text-lg font-bold">{correctCount * 10}</div>
                      </div>
                      {streak >= 2 && (
                        <div className="px-4 py-2 bg-amber-500/10 rounded-xl border border-amber-500/30 animate-bounce-custom">
                          <div className="text-[9px] text-amber-500 uppercase tracking-widest font-bold">Seri</div>
                          <div className="text-amber-400 font-mono text-lg font-bold">{streak}🔥</div>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-slate-500 text-xs font-mono">
                        {currentIndex + 1} / {page60Questions.length}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-5 shrink-0">
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">İlerleme</span>
                      <span className="text-amber-400 font-mono text-sm font-bold">{progressPercent}%</span>
                    </div>
                    <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-red-500 rounded-full transition-all duration-700 ease-out bg-[length:200%_100%] animate-gradient-x"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Question Map */}
                  <div className="mb-5 shrink-0">
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">Soru Haritası</div>
                    <div className="flex flex-wrap gap-1.5">
                      {page60Questions.map((q, i) => {
                        const isAnswered = results[i] !== undefined;
                        const isCorrect = results[i] === true;
                        const isCurrent = i === currentIndex;
                        return (
                          <button
                            key={i}
                            onClick={() => goToQuestion(i)}
                            disabled={isAnswered}
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all cursor-pointer border ${
                              isCurrent
                                ? "bg-gradient-to-br from-red-500 to-amber-500 border-amber-400/50 text-white scale-110 shadow-lg shadow-red-500/30"
                                : isAnswered && isCorrect
                                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                                : isAnswered && !isCorrect
                                ? "bg-rose-500/10 border-rose-500/20 text-rose-400 opacity-50"
                                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-amber-500/30 hover:text-amber-400"
                            }`}
                          >
                            {isAnswered ? (isCorrect ? "✓" : "✗") : i + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Frame System Diagram */}
                  <FrameSystemDiagram />

                  {/* Question Area */}
                  <div className="flex-1 overflow-y-auto min-h-0">
                    <div className="mb-2">
                      <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">
                        Soru {currentIndex + 1} • Eleman #{page60Questions[currentIndex].id}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg md:text-xl text-white font-medium mb-6 leading-relaxed">
                      {currentQuestion.question.tr}
                    </h3>

                    {/* Answer Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {currentQuestion.options.tr.map((option, index) => {
                        const isAnswered = selectedAnswer !== null;
                        const isCorrect = index === currentQuestion.correctAnswer;
                        const isSelected = selectedAnswer === index;
                        const isHovered = hoveredAnswer === index;

                        let btnClass = "relative flex items-center p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 text-left group cursor-pointer ";

                        if (!isAnswered) {
                          btnClass += "bg-white/[0.03] border-white/10 hover:border-amber-500/60 hover:bg-amber-500/[0.06] hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:scale-[1.02] active:scale-[0.98]";
                        } else if (isCorrect) {
                          btnClass += "bg-emerald-500/15 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.2)] scale-[1.02]";
                        } else if (isSelected) {
                          btnClass += "bg-rose-500/15 border-rose-500 text-rose-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]";
                        } else {
                          btnClass += "bg-white/[0.02] border-white/5 text-slate-500 opacity-40";
                        }

                        return (
                          <button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            disabled={isAnswered}
                            onMouseEnter={() => setHoveredAnswer(index)}
                            onMouseLeave={() => setHoveredAnswer(null)}
                            className={btnClass}
                          >
                            <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black mr-4 shrink-0 transition-all duration-300 text-sm ${
                              isSelected && isAnswered
                                ? isCorrect
                                  ? "bg-emerald-500 text-white"
                                  : "bg-rose-500 text-white"
                                : isCorrect && isAnswered
                                ? "bg-emerald-500 text-white"
                                : isHovered && !isAnswered
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                : "bg-white/[0.06] text-slate-400 group-hover:text-amber-400 group-hover:bg-amber-500/10"
                            }`}>
                              {isAnswered && isCorrect ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              ) : isAnswered && isSelected && !isCorrect ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              ) : (
                                ANSWER_LABELS[index]
                              )}
                            </span>
                            <span className="text-sm sm:text-base leading-snug">{option}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {showExplanation && (
                      <div className={`p-5 rounded-2xl border-l-4 mb-4 animate-slide-up ${
                        selectedAnswer === currentQuestion.correctAnswer
                          ? "bg-emerald-500/10 border-emerald-500"
                          : "bg-rose-500/10 border-rose-500"
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{selectedAnswer === currentQuestion.correctAnswer ? "✅" : "❌"}</span>
                          <span className="font-bold uppercase tracking-tight text-sm">
                            {selectedAnswer === currentQuestion.correctAnswer ? t.correct : t.wrong}
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {currentQuestion.explanation.tr}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Next Button */}
                  {selectedAnswer !== null && (
                    <div className="mt-4 shrink-0">
                      <button
                        onClick={handleNext}
                        className="w-full py-4 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold rounded-2xl transition-all cursor-pointer shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:scale-[1.01] active:scale-[0.99] text-base flex items-center justify-center gap-2"
                      >
                        {answeredCount < page60Questions.length - 1 ? (
                          <>
                            Sonraki Soru
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        ) : (
                          <>
                            Sonuçları Gör
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%); }
          100% { transform: translateX(100%) translateY(100%); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        @keyframes pulse-correct {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes bounce-custom {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
        .animate-pulse-correct {
          animation: pulse-correct 0.6s ease-out;
        }
        .animate-confetti-fall {
          animation: confetti-fall 3s ease-in forwards;
        }
        .animate-bounce-custom {
          animation: bounce-custom 1s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </>
  );
}

const Page60Card = memo(Page60CardComponent);
export default Page60Card;
