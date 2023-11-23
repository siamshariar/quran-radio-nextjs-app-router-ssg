import Link from "next/link";
import { menuController } from "@ionic/core";
import { menuSharp } from "ionicons/icons";
import Chapters from "@/components/pages/Chapters";
import { reciters } from "@/data/reciters";
import { IonContent } from "@ionic/react";
import { LocalStore, setIsBack, setScrollPosition } from "@/store/local";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import CommonHeader from "@/components/sections/CommonHeader";

// const menuClick = async (e) => {
// 	e.preventDefault();
// 	window.menuController = menuController;
// 	await menuController.open();
// };

// Home.header = (
//   <ion-header translucent>
//     <ion-toolbar>
//       <ion-buttons slot="start">
//         <Link href="/">
//           <ion-button onClick={menuClick}>
//             <ion-icon icon={menuSharp}></ion-icon>
//           </ion-button>
//         </Link>
//       </ion-buttons>
//       <ion-title>Home</ion-title>
//     </ion-toolbar>
//   </ion-header>
// );

export default function Home({ reciter, chapterList }) {
	const isBack = LocalStore.useState((s) => s.isBack);
	const yp = LocalStore.useState((s) => s.yp);

	const router = useRouter();
	const contentRef = useRef(null);

	function handleScroll(ev) {
		setScrollPosition(router.pathname, ev.detail.scrollTop);
	}

	useEffect(() => {
		console.log("isBack: " + isBack, yp);

		if (isBack == true) {
			contentRef.current.scrollToPoint(0, yp[router.pathname]);
		} else {
			setScrollPosition(router.pathname, 0);
		}
		return () => {
			setIsBack(false);
		};
	}, []);

	return (
		<>
			<CommonHeader title="Chapters" prev_page="/reciters" />
			<IonContent
				ref={contentRef}
				scrollEvents={true}
				onIonScroll={handleScroll}>
				<Chapters reciter={reciter} chapterList={chapterList} />
			</IonContent>
		</>
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

	// reciters.map((reciter) => {
	//   let id = encodeURI(reciter.id);
	//   let obj = { params: { id: id } };
	//   paths.push(obj);
	// });

	return {
		paths: paths,
		fallback: "blocking",
	};
}
