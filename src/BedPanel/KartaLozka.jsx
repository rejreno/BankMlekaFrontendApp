import { IkonaLozka } from "@/BedPanel/IkonkaLozka";
import { WskaznikStrzykawek } from "@/BedPanel/WskaznikStrzykawek";
import { useState } from "react";

const KOLORY_AVATARA = {
  A: "#6366f1", B: "#ec4899", C: "#14b8a6", D: "#f59e0b", E: "#8b5cf6",
  F: "#06b6d4", G: "#84cc16", H: "#f97316", I: "#64748b", J: "#a855f7",
  K: "#10b981", L: "#f43f5e", M: "#3b82f6", N: "#22d3ee", O: "#fbbf24",
  P: "#c084fc", Q: "#4ade80", R: "#fb923c", S: "#38bdf8", T: "#e879f9",
  U: "#a3e635", W: "#fb7185", V: "#facc15", X: "#67e8f9", Y: "#86efac",
  Z: "#c4b5fd",
};

function pobierzKolorAvatara(litera, szary) {
  if (szary) return "#9ca3af";
  return KOLORY_AVATARA[litera.toUpperCase()] ?? "#94a3b8";
}

function pobierzStanLozka(lozko) {
  if (!lozko.zajete) return "wolne";
  if (lozko.matkaObecna === false) return "brak-matki";
  return "zajete";
}

const STYLE_STANU = {
  wolne:        { ramka: "#fecaca", tlo: "#ffffff", naglowek: "#fef2f2", etykieta: "Wolne",      etykietaTlo: "#fee2e2", etykietaKolor: "#b91c1c", tytulKolor: "#b91c1c" },
  zajete:       { ramka: "#bbf7d0", tlo: "#ffffff", naglowek: "#f0fdf4", etykieta: "Zajęte",     etykietaTlo: "#dcfce7", etykietaKolor: "#15803d", tytulKolor: "#15803d" },
  "brak-matki": { ramka: "#e5e7eb", tlo: "#ffffff", naglowek: "#f9fafb", etykieta: "Brak matki", etykietaTlo: "#f3f4f6", etykietaKolor: "#6b7280", tytulKolor: "#6b7280" },
};

export function KartaLozka({ lozko, onKliknij }) {
  const [hover, setHover] = useState(false);
  const stan = pobierzStanLozka(lozko);
  const s = STYLE_STANU[stan];
  const brakMatki = stan === "brak-matki";

  const kolorCienia =
    stan === "zajete"       ? "rgba(22,163,74,0.13)"
    : stan === "brak-matki" ? "rgba(0,0,0,0.08)"
    : "rgba(220,38,38,0.10)";

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onKliknij && onKliknij(lozko)}
      className="relative rounded-xl border transition-all duration-200 cursor-pointer"
      style={{
        borderColor: s.ramka,
        backgroundColor: s.tlo,
        boxShadow: hover ? `0 4px 16px 0 ${kolorCienia}` : "0 1px 4px 0 rgba(0,0,0,0.06)",
        transform: hover ? "translateY(-2px)" : "none",
        filter: brakMatki ? "grayscale(0.6)" : "none",
        opacity: brakMatki ? 0.85 : 1,
      }}
    >
      <div
        className="rounded-t-xl px-3 py-1.5 flex items-center justify-between"
        style={{ backgroundColor: s.naglowek }}
      >
        <div className="flex items-center gap-2">
          <IkonaLozka zajete={lozko.zajete} brakMatki={brakMatki} rozmiar={28} />
          <span className="text-xs font-bold tracking-wide" style={{ color: s.tytulKolor }}>
            Łóżko {lozko.id}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {lozko.notatka && (
            <span title={lozko.notatka}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </span>
          )}
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: s.etykietaTlo, color: s.etykietaKolor }}
          >
            {s.etykieta}
          </span>
        </div>
      </div>

      <div className="px-3 py-2.5 min-h-[100px] flex flex-col gap-2">
        {lozko.zajete && lozko.pacjent ? (
          <>
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow"
                style={{ backgroundColor: pobierzKolorAvatara(lozko.pacjent.avatar, brakMatki) }}
              >
                {lozko.pacjent.avatar}
              </div>
              <div className="min-w-0">
                <div
                  className="font-semibold text-sm truncate leading-tight"
                  style={{ color: brakMatki ? "#6b7280" : "#1f2937" }}
                >
                  {lozko.pacjent.imieNoworo}
                </div>
                <div className="text-xs truncate leading-tight" style={{ color: brakMatki ? "#9ca3af" : "#6b7280" }}>
                  {brakMatki ? "Matka nieobecna" : lozko.pacjent.imie}
                </div>
                <div
                  className="text-xs font-mono leading-tight"
                  style={{ color: brakMatki ? "#9ca3af" : "#2563eb" }}
                >
                  {lozko.pacjent.idPacjenta}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-2">
              <div className="text-xs text-muted-foreground mb-0.5">Strzykawki</div>
              {lozko.strzykawkiRazem > 0 && (
                <WskaznikStrzykawek zjedzone={lozko.strzykawkiZjedzone ?? 0} razem={lozko.strzykawkiRazem} />
              )}
            </div>

            {lozko.mlekoDawczyni && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ backgroundColor: "#f5f3ff" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
                <span className="text-xs font-semibold" style={{ color: "#7c3aed" }}>
                  Mleko dawczyni: {lozko.mlekoDawczyniSzt ?? 0} szt.
                </span>
              </div>
            )}

            {lozko.notatka && (
              <div className="border-t border-gray-100 pt-2">
                <div className="text-xs text-muted-foreground mb-0.5">Notatka</div>
                <p className="text-xs text-gray-700 line-clamp-2">{lozko.notatka}</p>
              </div>
            )}

            {brakMatki && (
              <div className="mt-auto pt-1 flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span className="text-xs font-semibold" style={{ color: "#f59e0b" }}>Matka nieobecna</span>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-1">
            <span className="text-sm text-muted-foreground italic">Łóżko wolne</span>
            <span className="text-xs text-muted-foreground">kliknij aby dodać notatkę</span>
          </div>
        )}
      </div>
    </div>
  );
}
