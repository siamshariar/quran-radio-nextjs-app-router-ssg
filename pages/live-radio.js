import { useEffect, useRef } from "react";
import { IonContent } from "@ionic/react";
import { LocalStore, setIsBack, setScrollPosition } from "@/store/local";
import { useRouter } from "next/router";
import CommonHeader from "@/components/sections/CommonHeader";
import LiveRadioList from "@/components/pages/LiveRadio";
import styles from "@/components/pages/Pages.module.css";
import HeaderHome from "@/components/sections/HeaderHome";

const LiveRadio = () => {
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

	return isTab ? (
		<>
			<CommonHeader title="Live Radios" />
			<IonContent
				ref={contentRef}
				scrollEvents={true}
				onIonScroll={handleScroll}>
				<div className={styles.panel_content}>
					<div className={styles.wrapper}>
						<div className="page_width">
							<LiveRadioList />
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
					<CommonHeader title="Reciters" />
					<LiveRadioList />
				</div>
			</div>
		</div>
	);
};

export default LiveRadio;
