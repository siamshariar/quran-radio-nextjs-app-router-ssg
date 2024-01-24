import Reciters from "@/components/pages/Reciters";
import CommonHeader from "@/components/sections/CommonHeader";
import { LocalStore, setIsBack, setScrollPosition } from "@/store/local";
import { IonContent } from "@ionic/react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import styles from "@/components/pages/Pages.module.css";
import HeaderHome from "@/components/sections/HeaderHome";
import { getAllReciters } from "@/lib/fetch";
import Meta from "@/components/core/Meta";
import { server } from "@/lib/config";

export default function Home({ reciters }) {
	const isTab = LocalStore.useState((s) => s.isTab);
	const isBack = LocalStore.useState((s) => s.isBack);
	const yp = LocalStore.useState((s) => s.yp);
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
				title="Reciters"
				description="Audio Quran and Live Radio"
				url={`server/reciters`}
				image={`${server}/img/logo/logo.png`}
				type="website"
			/>
			{isTab ? (
				<>
					<CommonHeader title="Reciters" />
					<IonContent
						ref={contentRef}
						scrollEvents={true}
						onIonScroll={handleScroll}>
						<div className={styles.panel_content}>
							<div className={styles.wrapper}>
								<div className="page_width">
									<Reciters reciters={reciters} />
								</div>
							</div>
						</div>
					</IonContent>
				</>
			) : (
				<div className={styles.panel_content}>
					<div className={styles.wrapper}>
						<HeaderHome />
						<CommonHeader title="Reciters" />
						<div className="page_width">
							<Reciters reciters={reciters} />
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export async function getStaticProps() {
	const reciters = await getAllReciters();

	return {
		props: {
			reciters,
		},
	};
}
