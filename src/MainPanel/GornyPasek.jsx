import "./Uklad.css";

function GornyPasek() {
  return (
    <header className="gorny-pasek">
      <div className="gorny-pasek__ikona gorny-pasek__ikona--notif">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      </div>
      <div className="gorny-pasek__ikona">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>
      <div className="gorny-pasek__uzytkownik">
        <span className="gorny-pasek__uzytkownik-imie">Anna Pisarzowska</span>
        <span className="gorny-pasek__uzytkownik-strzalka">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </div>
    </header>
  );
}

export default GornyPasek;
