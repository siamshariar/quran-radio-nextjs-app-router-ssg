import { PlayerStore } from "@/store";
import styles from "./Pages.module.css";
import LiveRadioCard from "../cards/LiveRadioCard";

export default function LiveRadioList({ liveRadios }) {
	// const liveRadios = PlayerStore.useState((s) => s.liveRadios);

	return (
		<div className={styles.content}>
			{liveRadios.map((liveRadio, i) => (
				<LiveRadioCard key={i} liveRadio={liveRadio} index={i} />
			))}
		</div>
	);
}
