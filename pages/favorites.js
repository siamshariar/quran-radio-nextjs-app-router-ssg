import Meta from "@/components/core/Meta";
import FavoriteContent from "@/components/pages/Favorites";
import styles from "@/components/pages/Pages.module.css";
import CommonHeader from "@/components/sections/CommonHeader";
import HeaderHome from "@/components/sections/HeaderHome";
import { server } from "@/lib/config";

export default function Favorites() {
	return (
		<>
			<Meta
				title="Favorites"
				description="Quran Live Radio and Audio"
				url={`server/favorites`}
				image={`${server}/img/logo/quran-radio-social.png`}
				type="website"
			/>

			<div className={styles.panel_content}>
				<div className={styles.wrapper}>
					<div className="page_width">
						<HeaderHome />
						<CommonHeader title="Favorites" />
						<FavoriteContent />
					</div>
				</div>
			</div>
		</>
	);
}
