"use client";

import { useState, useCallback, memo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { page60Questions, Page60Question } from "@/data/page60Questions";

const ANSWER_LABELS = ["A", "B", "C", "D"];

function Page60CardComponent() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = page60Questions[currentIndex];

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectCount(0);
    setWrongCount(0);
    setCompletedQuestions(new Set());
    setIsFinished(false);
  }, []);

  const handleAnswer = useCallback((answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);

    if (answerIndex === currentQuestion.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }

    setCompletedQuestions((prev) => new Set(prev).add(currentIndex));

    setTimeout(() => setShowExplanation(true), 300);
  }, [selectedAnswer, currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentIndex < page60Questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  }, [currentIndex]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectCount(0);
    setWrongCount(0);
    setCompletedQuestions(new Set());
    setIsFinished(false);
  }, []);

  const progressPercent = Math.round((completedQuestions.size / page60Questions.length) * 100);

  return (
    <>
      <button
        onClick={handleOpen}
        className="aspect-square rounded-[32px] border-3 flex flex-col items-center justify-center transition-all relative overflow-hidden cursor-pointer group bg-gradient-to-br from-red-600 via-red-500 to-amber-500 border-red-400/50 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] active:scale-95 shadow-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600/0 via-amber-400/20 to-red-600/0 animate-shimmer" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.3)_0%,transparent_70%)] animate-pulse" />
        <span className="relative z-10 text-3xl sm:text-4xl font-black text-white drop-shadow-lg">
          📄60
        </span>
        <span className="relative z-10 text-[9px] sm:text-[10px] font-bold text-white/90 uppercase tracking-wider mt-1">
          Sayfa
        </span>
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-red-500" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-slate-950/60" onClick={handleClose}>
          <div
            className="w-full max-w-2xl md:max-w-3xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto rounded-[24px] border-2 border-red-500/40 shadow-[0_0_40px_rgba(239,68,68,0.2)] relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 animate-card-entry"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-amber-500 to-red-500 animate-gradient-x" />

            <div className="p-5 sm:p-8">
              <div className="flex justify-between items-start mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs font-bold uppercase tracking-widest">
                    Sayfa 60
                  </span>
                  <span className="px-3 py-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-widest">
                    Frame Systems
                  </span>
                </div>
                <button onClick={handleClose} className="text-slate-500 hover:text-white text-2xl sm:text-3xl transition-transform hover:rotate-90 cursor-pointer">
                  &times;
                </button>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 text-center">
                🏗️ Precast Frame Systems — Özel Çalışma
              </h2>
              <p className="text-slate-400 text-sm text-center mb-6">
                {page60Questions.length} soru • PDF Sayfa 60
              </p>

              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">İlerleme</span>
                  <span className="text-amber-400 font-mono text-sm">{progressPercent}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {isFinished ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">{correctCount >= 7 ? "🎯" : "📖"}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Tamamlandı!</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6 max-w-xs mx-auto">
                    <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                      <div className="text-slate-500 text-xs uppercase">Doğru</div>
                      <div className="text-2xl font-bold text-emerald-400">{correctCount}</div>
                    </div>
                    <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                      <div className="text-slate-500 text-xs uppercase">Yanlış</div>
                      <div className="text-2xl font-bold text-rose-400">{wrongCount}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleRestart}
                    className="px-8 py-3 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Tekrar Çöz
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-500 text-sm font-mono">
                      Soru {currentIndex + 1}/{page60Questions.length}
                    </span>
                    <span className="text-xs text-slate-600">
                      ✅ {correctCount} ❌ {wrongCount}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg md:text-xl text-white font-medium mb-6 text-center leading-relaxed">
                    {currentQuestion.question.tr}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {currentQuestion.options.tr.map((option, index) => {
                      const isAnswered = selectedAnswer !== null;
                      const isCorrect = index === currentQuestion.correctAnswer;
                      const isSelected = selectedAnswer === index;
                      const statusClasses = !isAnswered
                        ? "bg-white/5 border-white/10 hover:border-amber-500/50 hover:bg-amber-500/5"
                        : isCorrect
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                          : isSelected
                            ? "bg-rose-500/20 border-rose-500 text-rose-400"
                            : "bg-white/5 border-white/10 opacity-40";

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswer(index)}
                          disabled={isAnswered}
                          className={`flex items-center p-4 rounded-xl border-2 transition-all text-left cursor-pointer ${statusClasses}`}
                        >
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold mr-3 shrink-0 ${
                            isSelected ? "bg-current text-slate-900" : "bg-white/10 text-slate-400"
                          }`}>
                            {ANSWER_LABELS[index]}
                          </span>
                          <span className="text-sm sm:text-base">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showExplanation && (
                    <div className={`p-5 rounded-xl border-l-4 mb-6 ${
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
                      <p className="text-slate-300 text-sm leading-relaxed italic">
                        {currentQuestion.explanation.tr}
                      </p>
                    </div>
                  )}

                  {selectedAnswer !== null && (
                    <button
                      onClick={handleNext}
                      className="w-full py-4 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold rounded-xl transition-all cursor-pointer shadow-lg"
                    >
                      {currentIndex < page60Questions.length - 1 ? "Sonraki Soru →" : "Sonuçları Gör"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%); }
          100% { transform: translateX(100%) translateY(100%); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </>
  );
}

const Page60Card = memo(Page60CardComponent);
export default Page60Card;
