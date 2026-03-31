"use client";

import { useState, useCallback, memo } from "react";

const ELEMENTS = [
  { id: 1, tr: "Ana yan kiriş", en: "Main side beam", color: "#3b82f6" },
  { id: 2, tr: "Boşluklu döşme", en: "Hollow-core slab", color: "#10b981" },
  { id: 3, tr: "İç dikdörtgen kiriş", en: "Internal rectangular beam", color: "#8b5cf6" },
  { id: 4, tr: "Yan kiriş", en: "Side beam", color: "#f59e0b" },
  { id: 5, tr: "Yan kiriş", en: "Side beam", color: "#f59e0b" },
  { id: 6, tr: "Ana yan kiriş", en: "Main side beam", color: "#3b82f6" },
  { id: 7, tr: "Sahanlık kirişi", en: "Landing beam", color: "#ec4899" },
  { id: 8, tr: "Merdiven ve sahanlık", en: "Stairs and landing", color: "#ec4899" },
  { id: 9, tr: "Bağ kirişi", en: "Tie beam", color: "#06b6d4" },
  { id: 10, tr: "Kolon", en: "Column", color: "#ef4444" },
  { id: 11, tr: "Duvar", en: "Wall", color: "#6b7280" },
  { id: 12, tr: "Çift T kirişi", en: "Double T beam", color: "#f97316" },
  { id: 13, tr: "İç kiriş", en: "Internal beam", color: "#8b5cf6" },
  { id: 14, tr: "Ana kenar kiriş", en: "Main edge beam", color: "#3b82f6" },
];

function FrameSystemDiagram() {
  const [hoveredElement, setHoveredElement] = useState<number | null>(null);
  const [showLabels, setShowLabels] = useState(true);

  const element = hoveredElement !== null ? ELEMENTS.find(e => e.id === hoveredElement) : null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          📐 Sayfa 60 — Çerçeve Sistem Kesiti
        </span>
        <button
          onClick={() => setShowLabels(!showLabels)}
          className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
            showLabels
              ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
              : "bg-white/5 text-slate-500 border-white/10"
          }`}
        >
          {showLabels ? "Etiketler Açık" : "Etiketler Kapalı"}
        </button>
      </div>

      <div className="relative bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-2xl border border-white/10 overflow-hidden">
        {element && (
          <div className="absolute top-3 left-3 z-10 px-3 py-2 rounded-xl bg-slate-900/90 backdrop-blur-sm border border-white/10 animate-slide-up">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: element.color }} />
              <span className="text-white font-bold text-sm">#{element.id} {element.tr}</span>
            </div>
            <div className="text-slate-400 text-xs mt-0.5">{element.en}</div>
          </div>
        )}

        <svg viewBox="0 0 800 600" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <rect width="800" height="600" fill="url(#bgGrad)" />

          {/* Ground line */}
          <line x1="50" y1="560" x2="750" y2="560" stroke="#334155" strokeWidth="2" strokeDasharray="10,5" />
          <text x="400" y="585" textAnchor="middle" fill="#475569" fontSize="11" fontFamily="monospace">ZEMİN / GROUND</text>

          {/* Building outline - simplified frame system cross-section */}
          
          {/* Columns (Element #10) */}
          <g 
            className="cursor-pointer"
            onMouseEnter={() => setHoveredElement(10)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <rect x="150" y="120" width="30" height="440" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" rx="2" />
            <rect x="350" y="120" width="30" height="440" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" rx="2" />
            <rect x="550" y="120" width="30" height="440" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" rx="2" />
            {showLabels && <text x="165" y="540" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">10</text>}
          </g>

          {/* Foundation beams */}
          <rect x="140" y="540" width="450" height="20" fill="#475569" fillOpacity="0.3" stroke="#475569" strokeWidth="1" rx="2" />

          {/* Floor slabs - Hollow-core slab (Element #2) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredElement(2)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <rect x="140" y="440" width="450" height="25" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" rx="2" />
            <rect x="140" y="340" width="450" height="25" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" rx="2" />
            <rect x="140" y="240" width="450" height="25" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" rx="2" />
            <rect x="140" y="140" width="450" height="25" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" rx="2" />
            {showLabels && <text x="600" y="455" fill="#10b981" fontSize="10" fontWeight="bold">2</text>}
          </g>

          {/* Main side beams (Element #1, #6) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredElement(1)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <rect x="140" y="430" width="450" height="12" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
            <rect x="140" y="230" width="450" height="12" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
            {showLabels && <text x="130" y="438" textAnchor="end" fill="#3b82f6" fontSize="10" fontWeight="bold">1,6</text>}
          </g>

          {/* Internal rectangular beam (Element #3) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredElement(3)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <rect x="180" y="330" width="170" height="12" fill="#8b5cf6" fillOpacity="0.25" stroke="#8b5cf6" strokeWidth="2" rx="2" />
            {showLabels && <text x="265" y="325" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold">3</text>}
          </g>

          {/* Side beams (Element #4, #5) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredElement(4)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <rect x="380" y="330" width="170" height="12" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="2" rx="2" />
            {showLabels && <text x="465" y="325" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">4,5</text>}
          </g>

          {/* Double T beam (Element #12) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredElement(12)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <path d="M 180 130 L 180 115 L 350 115 L 350 130 Z" fill="#f97316" fillOpacity="0.3" stroke="#f97316" strokeWidth="2" />
            <path d="M 380 130 L 380 115 L 550 115 L 550 130 Z" fill="#f97316" fillOpacity="0.3" stroke="#f97316" strokeWidth="2" />
            {showLabels && <text x="265" y="108" textAnchor="middle" fill="#f97316" fontSize="10" fontWeight="bold">12</text>}
          </g>

          {/* Internal beam (Element #13) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredElement(13)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <rect x="180" y="230" width="370" height="10" fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="5,3" rx="1" />
            {showLabels && <text x="365" y="225" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold">13</text>}
          </g>

          {/* Main edge beam (Element #14) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredElement(14)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <rect x="140" y="120" width="450" height="15" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" rx="2" />
            {showLabels && <text x="600" y="130" fill="#3b82f6" fontSize="10" fontWeight="bold">14</text>}
          </g>

          {/* Wall (Element #11) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredElement(11)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <rect x="140" y="140" width="15" height="400" fill="#6b7280" fillOpacity="0.2" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,2" rx="1" />
            {showLabels && <text x="125" y="340" textAnchor="middle" fill="#6b7280" fontSize="10" fontWeight="bold" transform="rotate(-90, 125, 340)">11</text>}
          </g>

          {/* Stairs and landing (Element #8) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredElement(8)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <polygon points="600,540 600,440 680,440 680,540" fill="#ec4899" fillOpacity="0.15" stroke="#ec4899" strokeWidth="2" />
            <line x1="600" y1="520" x2="680" y2="520" stroke="#ec4899" strokeWidth="1" />
            <line x1="600" y1="500" x2="680" y2="500" stroke="#ec4899" strokeWidth="1" />
            <line x1="600" y1="480" x2="680" y2="480" stroke="#ec4899" strokeWidth="1" />
            <line x1="600" y1="460" x2="680" y2="460" stroke="#ec4899" strokeWidth="1" />
            {showLabels && <text x="640" y="555" textAnchor="middle" fill="#ec4899" fontSize="10" fontWeight="bold">8</text>}
          </g>

          {/* Landing beam (Element #7) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredElement(7)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <rect x="590" y="435" width="100" height="8" fill="#ec4899" fillOpacity="0.3" stroke="#ec4899" strokeWidth="1.5" rx="1" />
            {showLabels && <text x="700" y="440" fill="#ec4899" fontSize="10" fontWeight="bold">7</text>}
          </g>

          {/* Tie beam (Element #9) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredElement(9)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <line x1="180" y1="340" x2="580" y2="340" stroke="#06b6d4" strokeWidth="2" strokeDasharray="8,4" />
            {showLabels && <text x="380" y="360" textAnchor="middle" fill="#06b6d4" fontSize="10" fontWeight="bold">9</text>}
          </g>

          {/* Title */}
          <text x="400" y="30" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold" fontFamily="monospace">
            FRAME SYSTEMS — ÇERÇEVE SİSTEMLER
          </text>
          <text x="400" y="50" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">
            PDF Sayfa 60 • 14 Yapısal Eleman
          </text>

          {/* Legend */}
          <g transform="translate(620, 160)">
            <rect x="0" y="0" width="160" height="260" fill="#0f172a" fillOpacity="0.8" stroke="#334155" strokeWidth="1" rx="8" />
            <text x="80" y="20" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">ELEMANLAR</text>
            {ELEMENTS.map((el, i) => (
              <g key={el.id} transform={`translate(10, ${35 + i * 16})`}>
                <circle cx="6" cy="6" r="4" fill={el.color} fillOpacity="0.6" />
                <text x="16" y="10" fill="#cbd5e1" fontSize="8">{el.id}. {el.tr}</text>
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* Quick reference chips */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {ELEMENTS.map(el => (
          <span
            key={el.id}
            onMouseEnter={() => setHoveredElement(el.id)}
            onMouseLeave={() => setHoveredElement(null)}
            className="px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all border hover:scale-105"
            style={{
              backgroundColor: hoveredElement === el.id ? el.color + "30" : "transparent",
              borderColor: hoveredElement === el.id ? el.color + "60" : "rgba(255,255,255,0.1)",
              color: hoveredElement === el.id ? el.color : "#64748b",
            }}
          >
            #{el.id} {el.tr}
          </span>
        ))}
      </div>
    </div>
  );
}

export default memo(FrameSystemDiagram);
