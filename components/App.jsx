import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { StatusBar, Style } from "@capacitor/status-bar";

import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import Main from "./pages/Main";
import Menu from "./ui/Menu";

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
        <IonRouterOutlet id="main">
          <Route path="/" render={() => <Main />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
