import { KartaLozka } from "./KartaLozka";

export function SekcjaSali({ nazwa, lozka, onKliknij }) {
  const zajete = lozka.filter((l) => l.zajete).length;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-base font-bold text-gray-700">{nazwa}</h2>
        <div className="flex items-center gap-1.5">
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">
            {zajete} zajęte
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold">
            {lozka.length - zajete} wolne
          </span>
        </div>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {lozka.map((lozko) => (
          <KartaLozka key={lozko.id} lozko={lozko} onKliknij={onKliknij} />
        ))}
      </div>
    </div>
  );
}
