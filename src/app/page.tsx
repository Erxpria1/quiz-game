"use client";

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/i18n/LanguageContext";
import QuizGame from "@/components/QuizGame";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen relative overflow-hidden" style={{ position: 'relative', zIndex: 1, pointerEvents: 'auto' }}>
        <Scene />
        <div style={{ position: 'relative', zIndex: 2, pointerEvents: 'auto' }}>
          <LanguageSwitcher />
          <QuizGame />
        </div>
      </main>
    </LanguageProvider>
  );
}
