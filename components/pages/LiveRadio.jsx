import { PlayerStore } from "@/store";
import styles from "./Pages.module.css";
import LiveRadioCard from "../cards/LiveRadioCard";

export default function LiveRadioList() {
	const liveRadios = PlayerStore.useState((s) => s.liveRadios);

	return (
		<div className={styles.panel_content}>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					{liveRadios.map((liveRadio, i) => (
						<LiveRadioCard key={i} liveRadio={liveRadio} index={i} />
					))}
				</div>
			</div>
		</div>
	);
}
