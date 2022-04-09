import styles from "./Menu.module.css";

import {
  IonHeader,
  IonFooter,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenu,
  IonList,
  IonItem,
} from "@ionic/react";

const Menu = () => {
  return (
    <IonMenu side="start" contentId="main" type="overlay" swipeGesture>
      <IonHeader className="ion-padding">
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
