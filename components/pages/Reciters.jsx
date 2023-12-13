import { useState } from "react";
import { chevronBack, search } from "@/icons";
import { PlayerStore } from "@/store";
import ReciterCard from "@/components/cards/Reciter";
import styles from "./Pages.module.css";
import { IonIcon } from "@ionic/react";

const Reciters = () => {
	const reciters = PlayerStore.useState((s) => s.reciters);
	const [filter, setFilter] = useState("");

	const filteredReciters = reciters.filter((item) =>
		item.name.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<>
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
		</>
	);
};

export default Reciters;
