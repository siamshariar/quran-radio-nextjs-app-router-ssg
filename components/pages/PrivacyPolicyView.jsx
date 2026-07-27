"use client";

import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import PrivacyPolicyContent from "@/components/pages/PrivacyPolicy";
import HeaderHome from "@/components/sections/HeaderHome";

export default function PrivacyPolicyView() {
	return (
		<div className={styles.panel_content}>
			<div className={styles.wrapper}>
				<div className="page_width">
					<HeaderHome />
					<CommonHeader title="Privacy Policy" />
					<PrivacyPolicyContent />
				</div>
			</div>
		</div>
	);
}
