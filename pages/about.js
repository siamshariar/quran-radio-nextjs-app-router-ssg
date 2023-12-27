import { IonContent } from "@ionic/react";
import { LocalStore } from "@/store/local";
import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import AboutContent from "@/components/pages/About";

const About = () => {
	const isTab = LocalStore.useState((s) => s.isTab);

	return isTab ? (
		<>
			<CommonHeader title="About" />
			<IonContent>
				<div className={styles.panel_content}>
					<div className={styles.wrapper}>
						<div className="page_width">
							<AboutContent />
						</div>
					</div>
				</div>
			</IonContent>
		</>
	) : (
		<div className={styles.panel_content}>
			<div className={styles.wrapper}>
				<div className="page_width">
					<CommonHeader title="About" />
					<AboutContent />
				</div>
			</div>
		</div>
	);
};

export default About;
