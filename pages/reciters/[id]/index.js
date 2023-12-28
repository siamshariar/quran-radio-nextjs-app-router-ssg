import Chapters from "@/components/pages/Chapters";
import { reciters } from "@/data/reciters";
import { IonContent } from "@ionic/react";
import { LocalStore, setIsBack, setScrollPosition } from "@/store/local";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";

export default function Home({ reciter, chapterList }) {
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

	return isTab ? (
		<>
			<CommonHeader title="Chapters" prev_page="/reciters" />
			<IonContent
				ref={contentRef}
				scrollEvents={true}
				onIonScroll={handleScroll}>
				<div className={styles.panel_content}>
					<div className={styles.wrapper}>
						<Chapters reciter={reciter} chapterList={chapterList} />
					</div>
				</div>
			</IonContent>
		</>
	) : (
		<div className={styles.panel_content}>
			<div className={styles.wrapper}>
				<CommonHeader title="Chapters" prev_page="/reciters" />
				<Chapters reciter={reciter} chapterList={chapterList} />
			</div>
		</div>
	);
}

export async function getStaticProps(context) {
	const id = encodeURI(context.params.id);
	const reciterId = parseInt(id);
	const reciter = reciters.find((obj) => obj.id === reciterId);
	const chapterList = reciter.moshaf[0].surah_list.split(",");

	if (!chapterList) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			reciter,
			chapterList,
			key: id,
		},
		revalidate: 60,
	};
}

export async function getStaticPaths() {
	let paths = [];

	reciters.map((reciter) => {
		let id = encodeURI(reciter.id);
		let obj = { params: { id: id } };
		paths.push(obj);
	});

	return {
		paths: paths,
		fallback: "blocking",
	};
}
