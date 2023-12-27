import { chevronBack } from "@/icons";
import { IonButton, IonIcon } from "@ionic/react";
import styles from "../pages/Pages.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setIsBack } from "@/store/local";

export default function CommonHeader({ title, prev_page = "/" }) {
	const router = useRouter();
	const [historyLength, setHistoryLength] = useState(0);

	useEffect(() => {
		setHistoryLength(window.history.length);
	}, [router]);

	const goBack = () => {
		if (historyLength > 2) {
			router.back();
		} else {
			setIsBack(true);
			router.push(`${prev_page}`).then((r) => "/");
		}
	};

	return (
		<div className={styles.header}>
			<div className="page_width">
				<div className={styles.header_content}>
					<div className={styles.nav_left}>
						<IonButton class={styles.back} fill="clear" onClick={goBack}>
							<IonIcon icon={chevronBack} slot="start" class={styles.icon} />
						</IonButton>
					</div>

					<div className={styles.nav_text}>{title}</div>
					<div className={styles.nav_left}></div>
				</div>
			</div>
		</div>
	);
}
