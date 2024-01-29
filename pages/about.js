import { IonContent } from "@ionic/react";
import { LocalStore } from "@/store/local";
import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import AboutContent from "@/components/pages/About";
import HeaderHome from "@/components/sections/HeaderHome";
import Meta from "@/components/core/Meta";
import { server } from "@/lib/config";

const About = () => {
	const isTab = LocalStore.useState((s) => s.isTab);

	return (
		<>
			<Meta
				title="About"
				description="Quran Live Radio and Audio"
				url={`server/about`}
				image={`${server}/img/logo/quran-radio-social.png`}
				type="website"
			/>
			{isTab ? (
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
							<HeaderHome />
							<CommonHeader title="About" />
							<AboutContent />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default About;
