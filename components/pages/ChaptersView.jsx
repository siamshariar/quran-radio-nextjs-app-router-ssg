"use client";

import AllChapters from "@/components/pages/AllChapters";
import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import HeaderHome from "@/components/sections/HeaderHome";

export default function ChaptersView({ chapters }) {
	return (
		<div className={styles.panel_content}>
			<div className={styles.wrapper}>
				<HeaderHome />
				<CommonHeader title="Chapters" prev_page="/" />
				<AllChapters chapters={chapters} />
			</div>
		</div>
	);
}
