"use client";

import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import SupportContent from "@/components/pages/Support";
import HeaderHome from "@/components/sections/HeaderHome";

export default function SupportView() {
	return (
		<div className={styles.panel_content}>
			<div className={styles.wrapper}>
				<div className="page_width">
					<HeaderHome />
					<CommonHeader title="Support" />
					<SupportContent />
				</div>
			</div>
		</div>
	);
}
