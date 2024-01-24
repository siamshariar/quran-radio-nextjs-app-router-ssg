import { useEffect, useRef } from "react";
import { IonContent } from "@ionic/react";
import { LocalStore, setIsBack, setScrollPosition } from "@/store/local";
import { useRouter } from "next/router";
import CommonHeader from "@/components/sections/CommonHeader";
import LiveRadioList from "@/components/pages/LiveRadio";
import styles from "@/components/pages/Pages.module.css";
import HeaderHome from "@/components/sections/HeaderHome";
import { getAllLiveRadios } from "@/lib/fetch";
import Meta from "@/components/core/Meta";
import { server } from "@/lib/config";

const LiveRadio = ({ liveRadios }) => {
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
				title="Live Radios"
				description="Audio Quran and Live Radio"
				url={`server/live-radio`}
				image={`${server}/img/logo/logo.png`}
				type="website"
			/>
			{isTab ? (
				<>
					<CommonHeader title="Live Radios" />
					<IonContent
						ref={contentRef}
						scrollEvents={true}
						onIonScroll={handleScroll}>
						<div className={styles.panel_content}>
							<div className={styles.wrapper}>
								<div className="page_width">
									<LiveRadioList liveRadios={liveRadios} />
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
							<CommonHeader title="Live Radios" />
							<LiveRadioList liveRadios={liveRadios} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default LiveRadio;

export async function getStaticProps() {
	const liveRadios = await getAllLiveRadios();

	return {
		props: {
			liveRadios,
		},
	};
}
