import Image from "next/image";
import Link from "next/link";
import { menuController } from "@ionic/core";
import { menuSharp } from "ionicons/icons";

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
  return (
    // <ion-content fullscreen>
    <ion-grid>
      <ion-row>
        {new Array(6).fill("").map((k, i) => (
          <ion-col size="6" key={i}>
            <ion-card>
              {/* <Image
									src="/cat.jpg"
									alt="Picture of the author"
									width={500}
									height={500}
								/> */}
              <ion-card-header>
                <ion-card-subtitle>Destination</ion-card-subtitle>
                <ion-card-title>Madison, WI</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-icon name="pin" slot="start"></ion-icon>
                Keep close to Nature's heart... and break clear away, once in
                awhile, and climb a mountain or spend a week in the woods. Wash
                your spirit clean.
              </ion-card-content>
            </ion-card>
          </ion-col>
        ))}
      </ion-row>
    </ion-grid>
    // </ion-content>
  );
}
