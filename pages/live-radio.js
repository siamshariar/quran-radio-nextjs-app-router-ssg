import { useEffect, useRef } from "react";
import { IonContent } from "@ionic/react";
import { LocalStore, setIsBack, setScrollPosition } from "@/store/local";
import { useRouter } from "next/router";
import CommonHeader from "@/components/sections/CommonHeader";
import LiveRadioList from "@/components/pages/LiveRadio";

const LiveRadio = () => {
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
			<CommonHeader title="Live Radios" />
			<IonContent
				ref={contentRef}
				scrollEvents={true}
				onIonScroll={handleScroll}>
				<LiveRadioList />
			</IonContent>
		</>
	);
};

export default LiveRadio;
