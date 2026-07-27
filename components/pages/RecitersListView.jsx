"use client";

import Reciters from "@/components/pages/Reciters";
import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import HeaderHome from "@/components/sections/HeaderHome";

export default function RecitersListView({ reciters }) {
	return (
		<div className={styles.panel_content}>
			<div className={styles.wrapper}>
				<HeaderHome />
				<CommonHeader title="Reciters" />
				<div className="page_width">
					<Reciters reciters={reciters} />
				</div>
			</div>
		</div>
	);
}
