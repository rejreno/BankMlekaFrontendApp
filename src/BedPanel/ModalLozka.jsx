import { useState, useEffect } from "react";
import { WybierakDawczyni } from "./WybieranieDawczyni";

function LicznikStrzykawek({ wartosc, onZmiana, max, kolor = "#3b82f6" }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onZmiana(Math.max(0, wartosc - 1))}
        disabled={wartosc <= 0}
        className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        −
      </button>
      <div className="flex-1 flex flex-col items-center gap-1">
        <span className="text-2xl font-bold" style={{ color: kolor }}>{wartosc}</span>
        {max > 0 && (
          <div className="flex gap-0.5 flex-wrap justify-center">
            {Array.from({ length: max }).map((_, i) => (
              <button
                key={i}
                onClick={() => onZmiana(i + 1)}
                className="w-5 h-5 rounded transition-colors"
                style={{ backgroundColor: i < wartosc ? kolor : "#e5e7eb" }}
                title={`${i + 1}/${max}`}
              />
            ))}
          </div>
        )}
        <span className="text-xs text-muted-foreground">
          {max > 0 ? `${wartosc} z ${max}` : `${wartosc} strzykawek`}
        </span>
      </div>
      <button
        onClick={() => onZmiana(max > 0 ? Math.min(max, wartosc + 1) : wartosc + 1)}
        disabled={max > 0 && wartosc >= max}
        className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        +
      </button>
    </div>
  );
}

export function ModalLozka({ lozko, onZamknij, onZapisz }) {
  const [strzykawki, setStrzykawki] = useState(lozko.strzykawkiZjedzone ?? 0);
  const [notatka, setNotatka] = useState(lozko.notatka ?? "");
  const [mlekoDawczyni, setMlekoDawczyni] = useState(lozko.mlekoDawczyni ?? false);
  const [mlekoDawczyniSzt, setMlekoDawczyniSzt] = useState(lozko.mlekoDawczyniSzt ?? 0);
  const [wybranaDawczyni, setWybranaDawczyni] = useState(lozko.wybranaDawczyni ?? null);

  useEffect(() => {
    setStrzykawki(lozko.strzykawkiZjedzone ?? 0);
    setNotatka(lozko.notatka ?? "");
    setMlekoDawczyni(lozko.mlekoDawczyni ?? false);
    setMlekoDawczyniSzt(lozko.mlekoDawczyniSzt ?? 0);
    setWybranaDawczyni(lozko.wybranaDawczyni ?? null);
  }, [lozko.id]);

  useEffect(() => {
    function onKlawisz(e) {
      if (e.key === "Escape") onZamknij();
    }
    window.addEventListener("keydown", onKlawisz);
    return () => window.removeEventListener("keydown", onKlawisz);
  }, [onZamknij]);

  function handleToggleMleko(checked) {
    setMlekoDawczyni(checked);
    if (!checked) {
      setMlekoDawczyniSzt(0);
      setWybranaDawczyni(null);
    }
  }

  function handleZapisz() {
    onZapisz(lozko.id, {
      strzykawkiZjedzone: strzykawki,
      notatka: notatka.trim(),
      mlekoDawczyni,
      mlekoDawczyniSzt: mlekoDawczyni ? mlekoDawczyniSzt : 0,
      wybranaDawczyni: mlekoDawczyni ? wybranaDawczyni : null,
    });
    onZamknij();
  }

  const max = lozko.strzykawkiRazem || 0;
  const brakPacjenta = !lozko.zajete || !lozko.pacjent;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={onZamknij}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-gray-800">Łóżko {lozko.id}</h2>
            {lozko.pacjent && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {lozko.pacjent.imieNoworo} · {lozko.pacjent.idPacjenta}
              </p>
            )}
          </div>
          <button
            onClick={onZamknij}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-5 overflow-y-auto">
          {brakPacjenta ? (
            <p className="text-sm text-muted-foreground italic text-center py-2">
              Łóżko wolne — brak pacjenta
            </p>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  Strzykawki zjedzone
                </label>
                <LicznikStrzykawek
                  wartosc={strzykawki}
                  onZmiana={setStrzykawki}
                  max={max}
                  kolor="#3b82f6"
                />
              </div>

              <div className="border border-gray-100 rounded-xl overflow-visible">
                <button
                  onClick={() => handleToggleMleko(!mlekoDawczyni)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left rounded-xl"
                >
                  <div
                    className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{
                      borderColor: mlekoDawczyni ? "#8b5cf6" : "#d1d5db",
                      backgroundColor: mlekoDawczyni ? "#8b5cf6" : "transparent",
                    }}
                  >
                    {mlekoDawczyni && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-700">Mleko od dawczyni</span>
                    <span className="text-xs text-muted-foreground">
                      {mlekoDawczyni ? "Uzupełnij dawczynię i ilość strzykawek" : "Kliknij aby odblokować"}
                    </span>
                  </div>
                </button>

                {mlekoDawczyni && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-purple-50 rounded-b-xl flex flex-col gap-3">
                    <div>
                      <p className="text-xs text-purple-600 font-semibold mb-2">Dawczyni</p>
                      <WybierakDawczyni
                        wybrana={wybranaDawczyni}
                        onWybierz={setWybranaDawczyni}
                      />
                    </div>
                    <div>
                      <p className="text-xs text-purple-600 font-semibold mb-2">
                        Liczba strzykawek od dawczyni
                      </p>
                      <LicznikStrzykawek
                        wartosc={mlekoDawczyniSzt}
                        onZmiana={setMlekoDawczyniSzt}
                        max={0}
                        kolor="#7c3aed"
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">
              Notatka
            </label>
            <textarea
              value={notatka}
              onChange={(e) => setNotatka(e.target.value)}
              placeholder="Wpisz notatkę dla pielęgniarki..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-300"
            />
          </div>
        </div>

        <div className="px-5 pb-5 pt-2 flex gap-2 flex-shrink-0 border-t border-gray-100">
          <button
            onClick={onZamknij}
            className="flex-1 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Anuluj
          </button>
          <button
            onClick={handleZapisz}
            className="flex-1 py-2 rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Zapisz
          </button>
        </div>
      </div>
    </div>
  );
}
