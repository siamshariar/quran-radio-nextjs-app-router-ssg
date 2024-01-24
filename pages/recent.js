import RecentContent from "@/components/pages/Recent";
import styles from "@/components/pages/Pages.module.css";
import CommonHeader from "@/components/sections/CommonHeader";
import { LocalStore, setIsBack, setScrollPosition } from "@/store/local";
import { IonContent } from "@ionic/react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import HeaderHome from "@/components/sections/HeaderHome";
import Meta from "@/components/core/Meta";
import { server } from "@/lib/config";

export default function Recents() {
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
				title="Recents"
				description="Audio Quran and Live Radio"
				url={`server/recent`}
				image={`${server}/img/logo/logo.png`}
				type="website"
			/>
			{isTab ? (
				<>
					<CommonHeader title="Recents" />
					<IonContent
						ref={contentRef}
						scrollEvents={true}
						onIonScroll={handleScroll}>
						<div className={styles.panel_content}>
							<div className={styles.wrapper}>
								<div className="page_width">
									<RecentContent />
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
							<CommonHeader title="Recents" />
							<RecentContent />
						</div>
					</div>
				</div>
			)}
		</>
	);
}
