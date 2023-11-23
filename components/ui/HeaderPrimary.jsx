import { chevronBack } from "ionicons/icons";
import styles from "./HeaderPrimary.module.css";
import { IonButton, IonHeader, IonIcon } from "@ionic/react";

const Header = ({ title }) => {
	return (
		<IonHeader class={styles.header}>
			<IonButton
				class={styles.back} //
				fill="clear"
				routerLink="/">
				<IonIcon icon={chevronBack} slot="start" class={styles.icon} />
			</IonButton>
			<span>{title}</span>
		</IonHeader>
	);
};

export default Header;
