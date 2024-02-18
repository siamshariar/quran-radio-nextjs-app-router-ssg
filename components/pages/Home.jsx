import HomeContent from "@/components/ui/HomeContent";
import styles from "./Home.module.css";
import { IonContent } from "@ionic/react";
import { LocalStore } from "@/store/local";
import Meta from "../core/Meta";
import { server } from "@/lib/config";

const Home = () => {
	const isTab = LocalStore.useState((s) => s.isTab);

	return (
		<>
			<Meta
				title=""
				description="Quran Live Radio and Audio"
				url={server}
				image={`${server}/img/logo/quran-radio-social.png`}
				type="website"
			/>
			{isTab ? (
				<IonContent>
					<HomeContent />
				</IonContent>
			) : (
				<HomeContent />
			)}
		</>
	);
};

export default Home;
