"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { Locale } from "@/i18n/translations";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "tr", label: "TR", flag: "🇹🇷" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div className="fixed top-3 right-3 sm:top-6 sm:right-6 z-[60] animate-fade-in">
      <div className="glass-card rounded-full p-1 flex items-center gap-1 mobile-touch-target">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            title={`${t.language}: ${lang.code === "en" ? t.english : t.turkish}`}
            className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 touch-feedback cursor-pointer ${
              locale === lang.code
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
                : "text-white/50 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95"
            }`}
          >
            <span className="mr-1 text-sm">{lang.flag}</span>
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
