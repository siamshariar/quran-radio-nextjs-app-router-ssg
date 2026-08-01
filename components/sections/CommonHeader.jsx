"use client";

import { chevronBack } from "@/icons";
import { IonIcon } from "@ionic/react";
import styles from "../pages/Pages.module.css";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CommonHeader({ title, prev_page = "/" }) {
	const router = useRouter();
	const pathname = usePathname();
	const [historyLength, setHistoryLength] = useState(0);

	useEffect(() => {
		setHistoryLength(window.history.length);
	}, [pathname]);

	const goBack = () => {
		if (historyLength > 2) {
			router.back();
		} else {
			router.push(`${prev_page}`, { scroll: false });
		}
	};

	return (
		<div className={styles.header}>
			<div className="page_width">
				<div className={styles.header_content}>
					<div className={styles.nav_left}>
						<button type="button" className={styles.back} onClick={goBack}>
							<IonIcon icon={chevronBack} slot="start" class={styles.icon} />
						</button>
					</div>

					<div className={styles.nav_text}>{title}</div>
					<div className={styles.nav_left}></div>
				</div>
			</div>
		</div>
	);
}
