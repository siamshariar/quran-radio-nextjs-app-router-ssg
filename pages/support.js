import { IonContent } from "@ionic/react";
import { LocalStore } from "@/store/local";
import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import SupportContent from "@/components/pages/Support";

const Support = () => {
	const isTab = LocalStore.useState((s) => s.isTab);

	return isTab ? (
		<>
			<CommonHeader title="Support" />
			<IonContent>
				<div className={styles.panel_content}>
					<div className={styles.wrapper}>
						<div className="page_width">
							<SupportContent />
						</div>
					</div>
				</div>
			</IonContent>
		</>
	) : (
		<div className={styles.panel_content}>
			<div className={styles.wrapper}>
				<div className="page_width">
					<CommonHeader title="Support" />
					<SupportContent />
				</div>
			</div>
		</div>
	);
};

export default Support;
