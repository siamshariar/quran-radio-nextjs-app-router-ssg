import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import Player from "./player";
import Menu from "./ui/Menu";
import Home from "./pages/Home";
import Chapters from "./pages/Chapters";
import Reciters from "./pages/Reciters";

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addListener(async (status) => {
    try {
      await StatusBar.setStyle({
        style: status.matches ? Style.Dark : Style.Light,
      });
    } catch {}
  });

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Menu />
        <Player />
        <IonRouterOutlet id="main" style={{ zIndex: "9" }}>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/chapters" exact render={() => <Chapters />} />
          <Route path="/reciters" exact render={() => <Reciters />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
