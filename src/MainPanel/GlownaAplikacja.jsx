import { useState } from "react";
import BocznyPanel from "./BocznyPanel";
import GornyPasek from "./GornyPasek";
import ListaDzieci from "./ListaDzieci";
import UtworzProfilDziecka from "./UtworzProfilDziecka";
import UtworzProfilRodzica from "./UtworzProfilRodzica";
import "./Uklad.css";

function GlownaAplikacja() {
  const [widok, setWidok] = useState("lista");
  const [uzytkownicy, setUzytkownicy] = useState([]);
  const [edytowany, setEdytowany] = useState(null);

  function dodaj(profil) {
    setUzytkownicy(prev => [...prev, profil]);
    setEdytowany(null);
    setWidok("lista");
  }

  function zaktualizuj(profil) {
    setUzytkownicy(prev => prev.map(u => u.id === profil.id ? profil : u));
    setEdytowany(null);
    setWidok("lista");
  }

  function usun(id) {
    setUzytkownicy(prev => prev.filter(u => u.id !== id));
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
