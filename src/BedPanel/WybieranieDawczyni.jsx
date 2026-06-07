import { useState, useEffect, useRef } from "react";
import { DAWCZYNIE } from "./data/dawczynie"; 

export function WybierakDawczyni({ wybrana, onWybierz }) {
  const [szukaj, setSzukaj] = useState("");
  const [otwarte, setOtwarte] = useState(false);
  const kontenerRef = useRef(null);

  const przefiltrowane = DAWCZYNIE.filter((d) =>
    d.imie.toLowerCase().includes(szukaj.toLowerCase())
  );

  useEffect(() => {
    function handleKlik(e) {
      if (kontenerRef.current && !kontenerRef.current.contains(e.target)) {
        setOtwarte(false);
        setSzukaj("");
      }
    }
    document.addEventListener("mousedown", handleKlik);
    return () => document.removeEventListener("mousedown", handleKlik);
  }, []);

  function handleWybierz(dawczyni) {
    onWybierz(dawczyni);
    setSzukaj("");
    setOtwarte(false);
  }

  function handleWyczysc() {
    onWybierz(null);
    setSzukaj("");
  }

  if (wybrana) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50">
        <div className="w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-purple-700">
            {wybrana.imie.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-purple-800 truncate">{wybrana.imie}</div>
          <div className="text-xs text-purple-500">{wybrana.id}</div>
        </div>
        <button
          onClick={handleWyczysc}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-purple-200 text-purple-400 hover:text-purple-700 transition-colors flex-shrink-0"
          title="Usuń wybór"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div ref={kontenerRef} className="relative">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={szukaj}
          onChange={(e) => { setSzukaj(e.target.value); setOtwarte(true); }}
          onFocus={() => setOtwarte(true)}
          placeholder="Szukaj dawczyni po nazwisku..."
          className="w-full pl-8 pr-3 py-2 border border-purple-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white placeholder:text-gray-300"
        />
      </div>

      {otwarte && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-48 overflow-y-auto">
          {przefiltrowane.length === 0 ? (
            <div className="px-4 py-3 text-sm text-muted-foreground italic">
              Brak wyników dla „{szukaj}"
            </div>
          ) : (
            przefiltrowane.map((dawczyni) => (
              <button
                key={dawczyni.id}
                onClick={() => handleWybierz(dawczyni)}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-purple-50 transition-colors text-left border-b border-gray-50 last:border-0"
              >
                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-purple-600">
                    {dawczyni.imie.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-800 truncate">{dawczyni.imie}</div>
                  <div className="text-xs text-muted-foreground">{dawczyni.id}</div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
