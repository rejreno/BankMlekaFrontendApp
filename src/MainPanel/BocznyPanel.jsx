import "./Uklad.css";
import { Link } from "wouter";

function BocznyPanel({ aktywnaStrona }) {
  return (
    <aside className="boczny-panel">
      <div className="boczny-panel__logo">Panel główny</div>
      <nav className="boczny-panel__nav">
        <div className={`boczny-panel__item ${aktywnaStrona === "uzytkownicy" ? "boczny-panel__item--aktywny" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          BAZA DANYCH
        </div>
        <Link href="/mapa" className={`boczny-panel__item ${aktywnaStrona === "mapa" ? "boczny-panel__item--aktywny" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          MAPA ODDZIAŁU
        </Link>
      </nav>
    </aside>
  );
}

export default BocznyPanel;
