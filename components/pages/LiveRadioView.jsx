"use client";

import CommonHeader from "@/components/sections/CommonHeader";
import LiveRadioList from "@/components/pages/LiveRadio";
import styles from "@/components/pages/Pages.module.css";
import HeaderHome from "@/components/sections/HeaderHome";

export default function LiveRadioView({ liveRadios }) {
	return (
		<div className={styles.panel_content}>
			<div className={styles.wrapper}>
				<div className="page_width">
					<HeaderHome />
					<CommonHeader title="Live Radios" />
					<LiveRadioList liveRadios={liveRadios} />
				</div>
			</div>
		</div>
	);
}
