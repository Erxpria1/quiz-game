export type Locale = "en" | "tr";

export interface Translations {
  // Menu
  menuTitle: string;
  menuSubtitle: string;
  menuDescription: (count: number) => string;
  startButton: string;

  // Playing
  pickQuestion: string;
  clickQuestion: string;
  score: string;
  finish: string;
  questionLabel: (id: number) => string;
  correct: string;
  wrong: string;
  continue: string;
  progress: string;
  answered: (correct: number, total: number) => string;
  streak: string;
  timeElapsed: string;

  // Legend
  legendCorrect: string;
  legendUnanswered: string;
  legendWrong: string;

  // Finished
  gameFinished: string;
  finalScore: (score: number, max: number) => string;
  correctCount: (correct: number, total: number) => string;
  excellent: string;
  good: string;
  keepStudying: string;
  playAgain: string;
  shareResult: string;

  // Language
  language: string;
  english: string;
  turkish: string;

  // Metadata
  pageTitle: string;
  pageDescription: string;
}

export const translations: Record<Locale, Translations> = {
  en: {
    menuTitle: "Prefabricated Structures",
    menuSubtitle: "Quiz Game",
    menuDescription: (count) => `${count} questions from Industrial Structures`,
    startButton: "Start",

    pickQuestion: "Pick a Question",
    clickQuestion: "Click on a question to answer",
    score: "Score",
    finish: "Finish",
    questionLabel: (id) => `Question #${id}`,
    correct: "Correct!",
    wrong: "Wrong!",
    continue: "Continue",
    progress: "Progress",
    answered: (correct, total) => `${correct}/${total} answered`,
    streak: "Streak",
    timeElapsed: "Time",

    legendCorrect: "Correct",
    legendUnanswered: "Unanswered",
    legendWrong: "Wrong",

    gameFinished: "Game Over!",
    finalScore: (score, max) => `Score: ${score} / ${max}`,
    correctCount: (correct, total) => `Correct: ${correct} / ${total}`,
    excellent: "Excellent!",
    good: "Good job!",
    keepStudying: "Keep studying!",
    playAgain: "Play Again",
    shareResult: "Share Result",

    language: "Language",
    english: "English",
    turkish: "Türkçe",

    pageTitle: "Prefabricated Structures Quiz",
    pageDescription: "Industrial Structures Quiz Game",
  },
  tr: {
    menuTitle: "Prefabrik Yapılar",
    menuSubtitle: "Quiz Oyunu",
    menuDescription: (count) => `Endüstriyel Yapılar dersinden ${count} soru`,
    startButton: "Başla",

    pickQuestion: "Soru Seç",
    clickQuestion: "Cevaplamak için bir soruya tıkla",
    score: "Skor",
    finish: "Bitir",
    questionLabel: (id) => `Soru #${id}`,
    correct: "Doğru!",
    wrong: "Yanlış!",
    continue: "Devam Et",
    progress: "İlerleme",
    answered: (correct, total) => `${correct}/${total} cevaplandı`,
    streak: "Seri",
    timeElapsed: "Süre",

    legendCorrect: "Doğru",
    legendUnanswered: "Cevaplanmadı",
    legendWrong: "Yanlış",

    gameFinished: "Oyun Bitti!",
    finalScore: (score, max) => `Skor: ${score} / ${max}`,
    correctCount: (correct, total) => `Doğru: ${correct} / ${total}`,
    excellent: "Mükemmel!",
    good: "İyi iş!",
    keepStudying: "Daha fazla çalışmalısın!",
    playAgain: "Tekrar Oyna",
    shareResult: "Sonucu Paylaş",

    language: "Dil",
    english: "English",
    turkish: "Türkçe",

    pageTitle: "Prefabrik Yapılar Quiz",
    pageDescription: "Endüstriyel Yapılar Quiz Oyunu",
  },
};
