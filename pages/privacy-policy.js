import { LocalStore } from "@/store/local";
import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import PrivacyPolicyContent from "@/components/pages/PrivacyPolicy";
import HeaderHome from "@/components/sections/HeaderHome";
import Meta from "@/components/core/Meta";
import { server } from "@/lib/config";

const PrivacyPolicy = () => {
	return (
		<>
			<Meta
				title="Privacy Policy"
				description="Quran Live Radio and Audio"
				url={`server/privacy-policy`}
				image={`${server}/img/logo/quran-radio-social.png`}
				type="website"
			/>

			<div className={styles.panel_content}>
				<div className={styles.wrapper}>
					<div className="page_width">
						<HeaderHome />
						<CommonHeader title="Privacy Policy" />
						<PrivacyPolicyContent />
					</div>
				</div>
			</div>
		</>
	);
};

export default PrivacyPolicy;
