export function IkonaLozka({ zajete, brakMatki = false, rozmiar = 32 }) {
  const kolor = brakMatki ? "#9ca3af" : zajete ? "#16a34a" : "#dc2626";
  const tlo = brakMatki ? "#f3f4f6" : zajete ? "#dcfce7" : "#fee2e2";

  return (
    <div
      style={{
        width: rozmiar,
        height: rozmiar,
        backgroundColor: tlo,
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width={rozmiar * 0.7}
        height={rozmiar * 0.7}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="14" width="20" height="5" rx="1.5" fill={kolor} />
        <rect x="2" y="12" width="20" height="3" rx="1" fill={kolor} opacity="0.7" />
        <rect x="3" y="8" width="7" height="5" rx="2" fill={kolor} opacity="0.85" />
        <rect x="2" y="17" width="2" height="3" rx="1" fill={kolor} />
        <rect x="20" y="17" width="2" height="3" rx="1" fill={kolor} />
      </svg>
    </div>
  );
}
