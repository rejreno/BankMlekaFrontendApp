/* import LoginRegister from "./Components/LoginRegister/LoginRegister"; */
import { Router as WouterRouter, Switch, Route } from "wouter";
import { MapaOddzialu } from "./BedPanel/pages/MapaOddzialu";
import { GlownaAplikacja }  from "./MainPanel/GlownaAplikacja";

function NieZnaleziono() {

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">404</h1>
        <p className="text-muted-foreground mt-2">Strona nie znaleziona</p>
      </div>
    </div>
  );
}

function App() {

  return (
    
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Switch>
        <Route path="/" component={GlownaAplikacja} />
        <Route path="/panel" component={GlownaAplikacja} />
        <Route path="/mapa" component={MapaOddzialu} />

        <Route component={NieZnaleziono} />
      </Switch>
    </WouterRouter>
  );
}

export default App;



/* <Route path="/lg" component={LoginRegister} /> */
/* <Route path="/" component={MapaOddzialu} */