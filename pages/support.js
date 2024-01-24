import { IonContent } from "@ionic/react";
import { LocalStore } from "@/store/local";
import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import SupportContent from "@/components/pages/Support";
import HeaderHome from "@/components/sections/HeaderHome";
import Meta from "@/components/core/Meta";
import { server } from "@/lib/config";

const Support = () => {
	const isTab = LocalStore.useState((s) => s.isTab);

	return (
		<>
			<Meta
				title="Support"
				description="Audio Quran and Live Radio"
				url={`server/support`}
				image={`${server}/img/logo/logo.png`}
				type="website"
			/>

			{isTab ? (
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
							<HeaderHome />
							<CommonHeader title="Support" />
							<SupportContent />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Support;
