import Meta from "@/components/core/Meta";
import FavoriteContent from "@/components/pages/Favorites";
import styles from "@/components/pages/Pages.module.css";
import CommonHeader from "@/components/sections/CommonHeader";
import HeaderHome from "@/components/sections/HeaderHome";
import { server } from "@/lib/config";
import { LocalStore, setIsBack, setScrollPosition } from "@/store/local";
import { IonContent } from "@ionic/react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function Favorites() {
	const isBack = LocalStore.useState((s) => s.isBack);
	const yp = LocalStore.useState((s) => s.yp);
	const isTab = LocalStore.useState((s) => s.isTab);

	const router = useRouter();
	const contentRef = useRef(null);

	function handleScroll(ev) {
		setScrollPosition(router.pathname, ev.detail.scrollTop);
	}

	useEffect(() => {
		if (isTab) {
			console.log("isBack: " + isBack, yp);
			if (isBack == true) {
				contentRef.current.scrollToPoint(0, yp[router.pathname]);
			} else {
				setScrollPosition(router.pathname, 0);
			}
			return () => {
				setIsBack(false);
			};
		}
	}, []);

	return (
		<>
			<Meta
				title="Favorites"
				description="Audio Quran and Live Radio"
				url={`server/favorites`}
				image={`${server}/img/logo/logo.png`}
				type="website"
			/>
			{isTab ? (
				<>
					<CommonHeader title="Favorites" />
					<IonContent
						ref={contentRef}
						scrollEvents={true}
						onIonScroll={handleScroll}>
						<div className={styles.panel_content}>
							<div className={styles.wrapper}>
								<div className="page_width">
									<FavoriteContent />
								</div>
							</div>
						</div>
					</IonContent>
				</>
			) : (
				<div className={styles.panel_content}>
					<div className={styles.wrapper}>
						<div className="page_width">
							<HeaderHome />
							<CommonHeader title="Favorites" />
							<FavoriteContent />
						</div>
					</div>
				</div>
			)}
		</>
	);
}
