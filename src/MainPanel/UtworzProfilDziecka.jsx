import { useState, useEffect } from "react";
import "./Formularz.css";

const MIESIAC_OPCJE = [
  "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
];

const biezacyRok = new Date().getFullYear();
const LATA_OPCJE = Array.from({ length: 100 }, (_, i) => biezacyRok - i);
const DNI_OPCJE = Array.from({ length: 31 }, (_, i) => i + 1);

function pustyFormularz() {
  return {
    imie: "",
    nazwisko: "",
    idPacjenta: "",
    dzien: "1",
    miesiac: "Styczeń",
    rok: String(biezacyRok - 10),
    wzrost: "",
    waga: "",
    plec: "",
  };
}

function tylkoCyfry(val, maxLen) {
  return val.replace(/\D/g, "").slice(0, maxLen);
}

function dataUrodzeniaNaPola(dataUrodzenia) {
  if (!dataUrodzenia) return { dzien: "1", miesiac: "Styczeń", rok: String(biezacyRok - 10) };
  const [d, m, r] = dataUrodzenia.split("/");
  return {
    dzien: String(parseInt(d, 10)),
    miesiac: MIESIAC_OPCJE[parseInt(m, 10) - 1] || "Styczeń",
    rok: r || String(biezacyRok - 10),
  };
}

function UtworzProfilDziecka({ edytowany, onPowrot, onZapisz }) {
  const [formularz, setFormularz] = useState(pustyFormularz);
  const [bledy, setBledy] = useState({});

  useEffect(() => {
    if (edytowany) {
      const pola = dataUrodzeniaNaPola(edytowany.dataUrodzenia);
      setFormularz({
        imie: edytowany.imie || "",
        nazwisko: edytowany.nazwisko || "",
        idPacjenta: edytowany.idPacjenta || "",
        wzrost: edytowany.wzrost || "",
        waga: edytowany.waga || "",
        plec: edytowany.plec || "",
        ...pola,
      });
    } else {
      setFormularz(pustyFormularz());
    }
    setBledy({});
  }, [edytowany]);

  function zmienPole(pole, wartosc) {
    setFormularz(prev => ({ ...prev, [pole]: wartosc }));
    setBledy(prev => ({ ...prev, [pole]: "" }));
  }

  function waliduj() {
    const nowe = {};
    if (!formularz.imie.trim()) nowe.imie = "Imię jest wymagane.";
    if (!formularz.nazwisko.trim()) nowe.nazwisko = "Nazwisko jest wymagane.";
    if (formularz.idPacjenta.length !== 5) nowe.idPacjenta = "ID musi mieć dokładnie 5 cyfr.";
    if (!formularz.wzrost || formularz.wzrost.length < 2) nowe.wzrost = "Wzrost musi mieć 2–3 cyfry.";
    if (!formularz.waga || formularz.waga.length < 2) nowe.waga = "Waga musi mieć 2–3 cyfry.";
    if (!formularz.plec) nowe.plec = "Płeć jest wymagana.";
    return nowe;
  }

  function handleZapisz() {
    const nowe = waliduj();
    if (Object.keys(nowe).length > 0) { setBledy(nowe); return; }
    const miesiacNr = String(MIESIAC_OPCJE.indexOf(formularz.miesiac) + 1).padStart(2, "0");
    const dzienNr = String(formularz.dzien).padStart(2, "0");
    onZapisz({
      id: edytowany ? edytowany.id : Date.now(),
      typ: "dziecko",
      imie: formularz.imie.trim(),
      nazwisko: formularz.nazwisko.trim(),
      idPacjenta: formularz.idPacjenta,
      wzrost: formularz.wzrost,
      waga: formularz.waga,
      plec: formularz.plec,
      dataUrodzenia: `${dzienNr}/${miesiacNr}/${formularz.rok}`,
    });
  }

  function handleUsunZmiany() {
    setFormularz(edytowany ? (() => {
      const pola = dataUrodzeniaNaPola(edytowany.dataUrodzenia);
      return { imie: edytowany.imie || "", nazwisko: edytowany.nazwisko || "", idPacjenta: edytowany.idPacjenta || "", wzrost: edytowany.wzrost || "", waga: edytowany.waga || "", plec: edytowany.plec || "", ...pola };
    })() : pustyFormularz());
    setBledy({});
  }

  return (
    <div className="formularz-profilu">
      <div className="formularz-profilu__naglowek">
        <button className="formularz-profilu__powrot" onClick={onPowrot}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          {edytowany ? "Edytuj Profil Dziecka" : "Utwórz Profil Dziecka"}
        </button>
        <div className="formularz-profilu__sciezka">
          Baza Danych / <span>{edytowany ? "Edytuj Profil Dziecka" : "Utwórz Profil Dziecka"}</span>
        </div>
      </div>

      <div className="formularz-profilu__tresc">
        <div className="formularz-profilu__sekcja">
          <div className="formularz-profilu__siatka">

            <div className="formularz-profilu__pole formularz-profilu__pole--pelna-szerokosc">
              <label className="formularz-profilu__etykieta">Imię</label>
              <input
                className={`formularz-profilu__input${bledy.imie ? " formularz-profilu__input--blad" : ""}`}
                type="text"
                value={formularz.imie}
                onChange={e => zmienPole("imie", e.target.value)}
                placeholder="Wpisz Imię"
              />
              {bledy.imie && <div className="formularz-profilu__blad-tekst">{bledy.imie}</div>}
            </div>

            <div className="formularz-profilu__pole formularz-profilu__pole--pelna-szerokosc">
              <label className="formularz-profilu__etykieta">Nazwisko</label>
              <input
                className={`formularz-profilu__input${bledy.nazwisko ? " formularz-profilu__input--blad" : ""}`}
                type="text"
                value={formularz.nazwisko}
                onChange={e => zmienPole("nazwisko", e.target.value)}
                placeholder="Wpisz Nazwisko"
              />
              {bledy.nazwisko && <div className="formularz-profilu__blad-tekst">{bledy.nazwisko}</div>}
            </div>

            <div className="formularz-profilu__pole formularz-profilu__pole--pelna-szerokosc">
              <label className="formularz-profilu__etykieta">ID_Dziecka</label>
              <input
                className={`formularz-profilu__input${bledy.idPacjenta ? " formularz-profilu__input--blad" : ""}`}
                type="text"
                inputMode="numeric"
                value={formularz.idPacjenta}
                onChange={e => zmienPole("idPacjenta", tylkoCyfry(e.target.value, 5))}
                placeholder="12345"
                maxLength={5}
              />
              <div className="formularz-profilu__info">
                {formularz.idPacjenta.length}/5 cyfr
                {bledy.idPacjenta && <span style={{ color: "#ef4444", marginLeft: 6 }}>— {bledy.idPacjenta}</span>}
              </div>
            </div>

            <div className="formularz-profilu__sekcja-tytul">Data urodzenia</div>

            <div className="formularz-profilu__pole">
              <label className="formularz-profilu__etykieta">Dzień*</label>
              <select className="formularz-profilu__select" value={formularz.dzien} onChange={e => zmienPole("dzien", e.target.value)}>
                {DNI_OPCJE.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="formularz-profilu__pole">
              <label className="formularz-profilu__etykieta">Miesiąc*</label>
              <select className="formularz-profilu__select" value={formularz.miesiac} onChange={e => zmienPole("miesiac", e.target.value)}>
                {MIESIAC_OPCJE.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="formularz-profilu__pole">
              <label className="formularz-profilu__etykieta">Rok*</label>
              <select className="formularz-profilu__select" value={formularz.rok} onChange={e => zmienPole("rok", e.target.value)}>
                {LATA_OPCJE.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="formularz-profilu__pole formularz-profilu__pole--pelna-szerokosc">
              <label className="formularz-profilu__etykieta">Wzrost (cm)*</label>
              <input
                className={`formularz-profilu__input${bledy.wzrost ? " formularz-profilu__input--blad" : ""}`}
                type="text"
                inputMode="numeric"
                value={formularz.wzrost}
                onChange={e => zmienPole("wzrost", tylkoCyfry(e.target.value, 3))}
                placeholder="np. 120"
                maxLength={3}
              />
              {bledy.wzrost && <div className="formularz-profilu__blad-tekst">{bledy.wzrost}</div>}
            </div>

            <div className="formularz-profilu__pole formularz-profilu__pole--pelna-szerokosc">
              <label className="formularz-profilu__etykieta">Waga (kg)*</label>
              <input
                className={`formularz-profilu__input${bledy.waga ? " formularz-profilu__input--blad" : ""}`}
                type="text"
                inputMode="numeric"
                value={formularz.waga}
                onChange={e => zmienPole("waga", tylkoCyfry(e.target.value, 3))}
                placeholder="np. 35"
                maxLength={3}
              />
              {bledy.waga && <div className="formularz-profilu__blad-tekst">{bledy.waga}</div>}
            </div>

            <div className="formularz-profilu__pole formularz-profilu__pole--pelna-szerokosc">
              <label className="formularz-profilu__etykieta">Płeć*</label>
              <select
                className={`formularz-profilu__select${bledy.plec ? " formularz-profilu__input--blad" : ""}`}
                value={formularz.plec}
                onChange={e => zmienPole("plec", e.target.value)}
              >
                <option value="K">---Wybierz---</option>
                <option value="K">K (Kobieta)</option>
                <option value="M">M (Mężczyzna)</option>
              </select>
              {bledy.plec && <div className="formularz-profilu__blad-tekst">{bledy.plec}</div>}
            </div>

            <div className="formularz-profilu__akcje">
              <button className="formularz-profilu__btn formularz-profilu__btn--stworz" onClick={handleZapisz}>
                {edytowany ? "ZAPISZ" : "STWÓRZ"}
              </button>
              <button className="formularz-profilu__btn formularz-profilu__btn--usun" onClick={handleUsunZmiany}>USUŃ ZMIANY</button>
              <button className="formularz-profilu__btn formularz-profilu__btn--anuluj" onClick={onPowrot}>ANULUJ</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UtworzProfilDziecka;
