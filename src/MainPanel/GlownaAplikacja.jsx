import { useState, useEffect } from "react";
import BocznyPanel from "./BocznyPanel";
import GornyPasek from "./GornyPasek";
import ListaDzieci from "./ListaDzieci";
import UtworzProfilDziecka from "./UtworzProfilDziecka";
import UtworzProfilRodzica from "./UtworzProfilRodzica";
import "./Uklad.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const API_ENDPOINT = API_BASE_URL ? `${API_BASE_URL.replace(/\/$/, "")}/api/baby/list` : "/api/baby/list";

function GlownaAplikacja() {
  const [widok, setWidok] = useState("lista");
  const [uzytkownicy, setUzytkownicy] = useState([]);
  const [edytowany, setEdytowany] = useState(null);
  const [ladowanie, setLadowanie] = useState(false);
  const [blad, setBlad] = useState(null);

  // Pobieranie listy dzieci z API
  useEffect(() => {
    pobierzListeDzieci();
  }, []);

  async function pobierzListeDzieci() {
    setLadowanie(true);
    setBlad(null);
    try {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) {
        throw new Error(`Błąd ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      
      // Transformacja danych z API do formatu komponentu
      const sformatowani = data.map(dziecko => ({
        id: dziecko.id,
        typ: "dziecko",
        imie: dziecko.firstName || "",
        nazwisko: dziecko.lastName || "",
        plec: dziecko.gender || "",
        wzrost: "",
        waga: "",
        dataUrodzenia: "",
        idPacjenta: "",
      }));
      
      setUzytkownicy(sformatowani);
    } catch (error) {
      console.error("Błąd pobierania listy dzieci:", error);
      setBlad("Nie udało się pobrać listy dzieci. Spróbuj odświeżyć stronę.");
    } finally {
      setLadowanie(false);
    }
  }

  function dodaj(profil) {
    setUzytkownicy(prev => [...prev, profil]);
    setEdytowany(null);
    setWidok("lista");
    // Odśwież listę z backendu
    pobierzListeDzieci();
  }

  function zaktualizuj(profil) {
    setUzytkownicy(prev => prev.map(u => u.id === profil.id ? profil : u));
    setEdytowany(null);
    setWidok("lista");
    // Odśwież listę z backendu
    pobierzListeDzieci();
  }

  function usun(id) {
    setUzytkownicy(prev => prev.filter(u => u.id !== id));
    // Odśwież listę z backendu
    pobierzListeDzieci();
  }

  function otworzEdycje(u) {
    setEdytowany(u);
    setWidok(u.typ === "rodzic" ? "rodzic" : "dziecko");
  }

  function anuluj() {
    setEdytowany(null);
    setWidok("lista");
  }

  return (
    <div className="app-layout">
      <BocznyPanel aktywnaStrona="uzytkownicy" />
      <div className="app-glowna">
        <GornyPasek />
        <div className="app-tresc">
          {widok === "lista" && (
            <ListaDzieci
              uzytkownicy={uzytkownicy}
              onDodajDziecko={() => { setEdytowany(null); setWidok("dziecko"); }}
              onDodajRodzica={() => { setEdytowany(null); setWidok("rodzic"); }}
              onUsun={usun}
              onEdytuj={otworzEdycje}
              onOdwiezDane={pobierzListeDzieci}
            />
          )}
          {widok === "dziecko" && (
            <UtworzProfilDziecka
              edytowany={edytowany}
              onPowrot={anuluj}
              onZapisz={edytowany ? zaktualizuj : dodaj}
            />
          )}
          {widok === "rodzic" && (
            <UtworzProfilRodzica
              edytowany={edytowany}
              onPowrot={anuluj}
              onZapisz={edytowany ? zaktualizuj : dodaj}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export { GlownaAplikacja };
