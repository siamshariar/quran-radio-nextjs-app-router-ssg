import HomeContent from "@/components/ui/HomeContent";
import styles from "./Home.module.css";
import { IonContent } from "@ionic/react";
import { LocalStore } from "@/store/local";

const Home = () => {
	const isTab = LocalStore.useState((s) => s.isTab);

	return isTab ? (
		<IonContent>
			<HomeContent />
		</IonContent>
	) : (
		<HomeContent />
	);
};

export default Home;
