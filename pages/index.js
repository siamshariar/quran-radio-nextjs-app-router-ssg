// import dynamic from "next/dynamic";

// const App = dynamic(() => import("../components/App"), {
//   ssr: false,
// });

// export default function Index() {
//   return <App />;
// }

import Image from "next/image";
import Link from "next/link";
import { menuController } from "@ionic/core";
import { menuSharp } from "ionicons/icons";

import HomeContent from "../components/pages/Home";

const menuClick = async (e) => {
  e.preventDefault();
  window.menuController = menuController;
  await menuController.open();
};

Home.header = (
  <ion-header translucent>
    <ion-toolbar>
      <ion-buttons slot="start">
        <Link href="/">
          <ion-button onClick={menuClick}>
            <ion-icon icon={menuSharp}></ion-icon>
          </ion-button>
        </Link>
      </ion-buttons>
      <ion-title>Home</ion-title>
    </ion-toolbar>
  </ion-header>
);

export default function Home() {
  return <HomeContent />;
}
