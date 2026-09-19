"use client";

import FavoriteContent from "@/components/pages/Favorites";
import styles from "@/components/pages/Pages.module.css";
import CommonHeader from "@/components/sections/CommonHeader";
import HeaderHome from "@/components/sections/HeaderHome";

export default function FavoritesView() {
	return (
		<div className={styles.panel_content}>
			<div className={styles.wrapper}>
				<div className="page_width">
					<HeaderHome />
					<CommonHeader title="Favorites" />
					<FavoriteContent />
				</div>
			</div>
		</div>
	);
}
