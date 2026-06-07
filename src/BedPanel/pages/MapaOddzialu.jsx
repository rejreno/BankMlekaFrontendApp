import { useState } from "react";
import { LOZKA, SALE } from "@/BedPanel/data/lozka";
import { SekcjaSali } from "@/BedPanel/SekcjaSali";
import { ModalLozka } from "@/BedPanel/ModalLozka";

export function MapaOddzialu() {
  const [lozka, setLozka] = useState(LOZKA);
  const [wybranaLozko, setWybranaLozko] = useState(null);

  const zajeteLozka = lozka.filter((l) => l.zajete).length;
  const wszystkieLozka = lozka.length;

  function zaktualizujLozko(id, zmiany) {
    setLozka((poprzednie) =>
      poprzednie.map((l) => (l.id === id ? { ...l, ...zmiany } : l))
    );
  }

  function otworzModal(lozko) {
    setWybranaLozko(lozko);
  }

  function zamknijModal() {
    setWybranaLozko(null);
  }

  const aktualneLozko = wybranaLozko
    ? lozka.find((l) => l.id === wybranaLozko.id)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-800 leading-tight">Piętro I — Oddział Noworodkowy</h1>
              <p className="text-xs text-muted-foreground leading-tight">Mapa rozmieszczenia łóżek</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
              <span className="text-xs font-semibold text-green-700">{zajeteLozka} zajętych</span>
            </div>
            <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              <span className="text-xs font-semibold text-red-700">{wszystkieLozka - zajeteLozka} wolnych</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Razem: <strong>{wszystkieLozka}</strong>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-green-200 border border-green-400 inline-block" />
            Matka leży (zajęte)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-gray-200 border border-gray-300 inline-block" />
            Brak matki
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-red-200 border border-red-400 inline-block" />
            Łóżko wolne
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="2" x2="22" y2="6" />
              <path d="M17 7l-1-1" />
              <path d="m13.5 17.5-3 3H7v-3.5l3-3" />
              <path d="m8 12 4 4 6-6-4-4Z" />
              <path d="m16 8-2 2" />
              <path d="m13 11-2 2" />
            </svg>
            Strzykawki (zjedzone)
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Notatka
          </div>
        </div>

        {SALE.map((sala) => {
          const lozkaWsali = lozka.filter((l) => l.sala === sala.id);
          return (
            <SekcjaSali
              key={sala.id}
              nazwa={sala.name}
              lozka={lozkaWsali}
              onKliknij={otworzModal}
            />
          );
        })}
      </main>

      {aktualneLozko && (
        <ModalLozka
          lozko={aktualneLozko}
          onZamknij={zamknijModal}
          onZapisz={zaktualizujLozko}
        />
      )}
    </div>
  );
}

