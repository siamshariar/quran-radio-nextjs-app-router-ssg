import { IonContent } from "@ionic/react";
import { LocalStore } from "@/store/local";
import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import OfflineContent from "@/components/pages/Offline";
import HeaderHome from "@/components/sections/HeaderHome";
import Meta from "@/components/core/Meta";
import { server } from "@/lib/config";

const Offline = () => {
	const isTab = LocalStore.useState((s) => s.isTab);

	return (
		<>
			<Meta
				title="Offline"
				description="Quran Live Radio and Audio"
				url={`server/privacy-policy`}
				image={`${server}/img/logo/quran-radio-social.png`}
				type="website"
			/>
			{isTab ? (
				<>
					<CommonHeader title="Offline" />
					<IonContent>
						<div className={styles.panel_content}>
							<div className={styles.wrapper}>
								<div className="page_width">
									<OfflineContent />
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
							<CommonHeader title="Offline" />
							<OfflineContent />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Offline;
