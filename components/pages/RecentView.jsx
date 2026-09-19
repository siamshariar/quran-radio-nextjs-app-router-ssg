"use client";

import RecentContent from "@/components/pages/Recent";
import styles from "@/components/pages/Pages.module.css";
import CommonHeader from "@/components/sections/CommonHeader";
import HeaderHome from "@/components/sections/HeaderHome";

export default function RecentView() {
	return (
		<div className={styles.panel_content}>
			<div className={styles.wrapper}>
				<div className="page_width">
					<HeaderHome />
					<CommonHeader title="Recents" />
					<RecentContent />
				</div>
			</div>
		</div>
	);
}
