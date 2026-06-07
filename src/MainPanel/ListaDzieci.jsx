import { useState, useRef, useEffect } from "react";
import "./ListaDzieci.css";

const NA_STRONE = 10;

function ListaDzieci({ uzytkownicy, onDodajDziecko, onDodajRodzica, onUsun, onEdytuj }) {
  const [szukaj, setSzukaj] = useState("");
  const [menuOtwarte, setMenuOtwarte] = useState(false);
  const [strona, setStrona] = useState(1);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOtwarte(false);
      }
    }
    if (menuOtwarte) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOtwarte]);

  useEffect(() => {
    setStrona(1);
  }, [szukaj]);

  const przefiltrowane = uzytkownicy.filter(u =>
    `${u.imie} ${u.nazwisko}`.toLowerCase().includes(szukaj.toLowerCase())
  );

  const liczbaStron = Math.max(1, Math.ceil(przefiltrowane.length / NA_STRONE));
  const biezacaStrona = Math.min(strona, liczbaStron);
  const widoczne = przefiltrowane.slice((biezacaStrona - 1) * NA_STRONE, biezacaStrona * NA_STRONE);

  return (
    <div className="lista-dzieci">
      <div className="lista-dzieci__naglowek">
        <h1 className="lista-dzieci__tytul">Lista dzieci i rodziców</h1>
        <div className="lista-dzieci__sciezka">
          <span>Baza danych</span>
        </div>
      </div>

      <div className="lista-dzieci__tresc">
        <div className="lista-dzieci__pasek-narzedzi">
          <div ref={menuRef} style={{ position: "relative" }}>
            <button
              className="lista-dzieci__btn-dodaj"
              onClick={() => setMenuOtwarte(prev => !prev)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              DODAJ DZIECKO
            </button>

            {menuOtwarte && (
              <div className="lista-dzieci__menu-dodaj">
                <div
                  className="lista-dzieci__menu-dodaj-opcja"
                  onClick={() => { setMenuOtwarte(false); onDodajDziecko(); }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                  Dodaj dziecko
                </div>
                <div
                  className="lista-dzieci__menu-dodaj-opcja"
                  onClick={() => { setMenuOtwarte(false); onDodajRodzica(); }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  Dodaj rodzica
                </div>
              </div>
            )}
          </div>

          <div className="lista-dzieci__szukaj">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="search"
              placeholder="Szukaj..."
              value={szukaj}
              onChange={e => setSzukaj(e.target.value)}
            />
          </div>
        </div>

        <div className="lista-dzieci__tabela-kontener">
          <table className="lista-dzieci__tabela">
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <div className="lista-dzieci__kolumna-naglowek">
                    Imię i Nazwisko
                    <span className="lista-dzieci__filtr-ikona">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                      </svg>
                    </span>
                  </div>
                </th>
                <th>Status</th>
                <th>
                  <div className="lista-dzieci__kolumna-naglowek">
                    Wzrost [cm]
                    <span className="lista-dzieci__filtr-ikona">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                      </svg>
                    </span>
                  </div>
                </th>
                <th>
                  <div className="lista-dzieci__kolumna-naglowek">
                    Płeć
                    <span className="lista-dzieci__filtr-ikona">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                      </svg>
                    </span>
                  </div>
                </th>
                <th>
                  <div className="lista-dzieci__kolumna-naglowek">
                    Data urodzenia
                    <span className="lista-dzieci__filtr-ikona">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                      </svg>
                    </span>
                  </div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {widoczne.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "48px 16px", color: "#94a3b8", fontSize: "14px" }}>
                    {szukaj ? "Brak wynikow dla wyszukiwanej frazy." : "Brak zapisanych danych. Kliknij DODAJ DZIECKO bądź DODAJ RODZICA, aby dodać osobę."}
                  </td>
                </tr>
              ) : (
                widoczne.map((u, idx) => (
                  <tr key={u.id}>
                    <td>{(biezacaStrona - 1) * NA_STRONE + idx + 1}</td>
                    <td>{u.imie} {u.nazwisko}</td>
                    <td>
                      <span className={`lista-dzieci__badge lista-dzieci__badge--${u.typ}`}>
                        {u.typ === "dziecko" ? "Dziecko" : "Rodzic"}
                      </span>
                    </td>
                    <td>{u.wzrost || "—"}</td>
                    <td>{u.plec || "—"}</td>
                    <td>{u.dataUrodzenia}</td>
                    <td>
                      <div className="lista-dzieci__akcje">
                        <button
                          className="lista-dzieci__akcja-btn"
                          title="Edytuj"
                          onClick={() => onEdytuj(u)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button
                          className="lista-dzieci__akcja-btn lista-dzieci__akcja-btn--usun"
                          title="Usuń"
                          onClick={() => onUsun(u.id)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6"/><path d="M14 11v6"/>
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {liczbaStron > 1 && (
            <div className="lista-dzieci__paginacja">
              <button
                className="lista-dzieci__paginacja-strzalka"
                disabled={biezacaStrona === 1}
                onClick={() => setStrona(s => Math.max(1, s - 1))}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              {Array.from({ length: liczbaStron }, (_, i) => i + 1).map(nr => (
                <button
                  key={nr}
                  className={`lista-dzieci__paginacja-btn ${biezacaStrona === nr ? "lista-dzieci__paginacja-btn--aktywny" : ""}`}
                  onClick={() => setStrona(nr)}
                >
                  {nr}
                </button>
              ))}
              <button
                className="lista-dzieci__paginacja-strzalka"
                disabled={biezacaStrona === liczbaStron}
                onClick={() => setStrona(s => Math.min(liczbaStron, s + 1))}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListaDzieci;
