import React, { useEffect } from "react";
import { defineCustomElements as ionDefineCustomElements } from "@ionic/core/loader";
import Head from "next/head";
import Script from "next/script";
// import Menu from "../component/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/core/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/core/css/normalize.css";
import "@ionic/core/css/structure.css";
import "@ionic/core/css/typography.css";

/* Optional CSS utils that can be commented out */
import "tailwindcss/tailwind.css";
import "@ionic/core/css/padding.css";
import "@ionic/core/css/float-elements.css";
import "@ionic/core/css/text-alignment.css";
import "@ionic/core/css/text-transformation.css";
import "@ionic/core/css/flex-utils.css";
import "@ionic/core/css/display.css";
// import "../styles/variables.css";
// import "../styles/custom.css";
import "@/styles/global.scss";

import Player from "@/components/player";
import Menu from "@/components/ui/Menu";
// import Menu2 from "@/components/ui/Menu2";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    ionDefineCustomElements(window);
  });

  // return (
  //   <>
  //     <Head>
  //       <meta
  //         name="viewport"
  //         content="width=device-width, initial-scale=1.0, viewport-fit=cover"
  //       ></meta>
  //     </Head>
  //     <Component {...pageProps} />
  //     {/* <Script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js"></Script> */}
  //   </>
  // );

  return (
    <>
      {/* <ion-app> */}
      {/* <Menu2 /> */}
      <Menu />

      <Player />
      <div className="page-primary ion-page" id="main-content">
        {/* <div className="ion-page" > */}
        {/* {Component.header} */}
        <ion-content fullscreen>
          <Component {...pageProps} />
        </ion-content>
        {/* <ion-footer>
          <ion-toolbar>
            <ion-title>Footer</ion-title>
          </ion-toolbar>
        </ion-footer> */}
      </div>
      {/* </ion-app> */}
    </>
  );
}

export default MyApp;
