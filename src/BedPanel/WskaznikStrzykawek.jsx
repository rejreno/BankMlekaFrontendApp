function IkonaStrzykawki({ wypelniona }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={wypelniona ? "#3b82f6" : "none"}
      stroke={wypelniona ? "#2563eb" : "#9ca3af"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="2" x2="22" y2="6" />
      <path d="M17 7l-1-1" />
      <path d="m13.5 17.5-3 3H7v-3.5l3-3" />
      <path d="m8 12 4 4 6-6-4-4Z" />
      <path d="m16 8-2 2" />
      <path d="m13 11-2 2" />
    </svg>
  );
}

export function WskaznikStrzykawek({ zjedzone, razem }) {
  if (razem === 0) return null;

  return (
    <div className="flex items-center gap-0.5 flex-wrap">
      {Array.from({ length: razem }).map((_, i) => (
        <IkonaStrzykawki key={i} wypelniona={i < zjedzone} />
      ))}
      <span className="text-xs font-semibold text-blue-700 ml-1">
        {zjedzone}/{razem}
      </span>
    </div>
  );
}
