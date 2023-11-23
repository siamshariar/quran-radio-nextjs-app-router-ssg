import HomeContent from "@/components/ui/HomeContent";
import styles from "./Home.module.css";
import { IonContent } from "@ionic/react";

const Home = () => {
	return (
		<IonContent>
			<div className={styles.panel_content}>
				<HomeContent />
			</div>
		</IonContent>
	);
};

export default Home;
