import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { chevronBack, search } from "@/icons";
import { PlayerStore } from "@/store";
import ReciterCard from "@/components/cards/Reciter";
import CommonHeader from "../sections/CommonHeader";
import styles from "./Pages.module.css";
import { IonButton, IonContent, IonIcon } from "@ionic/react";
import { LocalStore, setIsBack, setScrollPosition } from "@/store/local";
import { useRouter } from "next/router";

const Reciters = () => {
	const reciters = PlayerStore.useState((s) => s.reciters);
	const isBack = LocalStore.useState((s) => s.isBack);
	const yp = LocalStore.useState((s) => s.yp);
	const [filter, setFilter] = useState("");

	const router = useRouter();
	const contentRef = useRef(null);

	const filteredReciters = reciters.filter((item) =>
		item.name.toLowerCase().includes(filter.toLowerCase())
	);

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
			<CommonHeader title="Reciters" />
			<IonContent
				ref={contentRef}
				scrollEvents={true}
				onIonScroll={handleScroll}>
				<div className={styles.panel_content}>
					<div className={styles.wrapper}>
						<div className={styles.search}>
							<IonIcon icon={search} slot="start" class={styles.s_icon} />
							<input
								type="text"
								name="search"
								placeholder="Search"
								value={filter}
								onChange={(e) => setFilter(e.target.value)}
							/>
						</div>

						<div className={styles.content}>
							{filteredReciters &&
								filteredReciters.map((reciter, index) => (
									<ReciterCard key={index} reciter={reciter} />
								))}
						</div>
					</div>
				</div>
			</IonContent>
		</>
	);
};

export default Reciters;
