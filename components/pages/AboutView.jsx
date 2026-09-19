"use client";

import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import AboutContent from "@/components/pages/About";
import HeaderHome from "@/components/sections/HeaderHome";

export default function AboutView() {
	return (
		<div className={styles.panel_content}>
			<div className={styles.wrapper}>
				<div className="page_width">
					<HeaderHome />
					<CommonHeader title="About" />
					<AboutContent />
				</div>
			</div>
		</div>
	);
}
