import Link from "next/link";
import { LocalStore } from "@/store/local";
// import { useFavoriteStorage } from "@/hooks/useFavoriteStorage";
// import { checkIsFavorite } from "@/lib/check";
import { chevronBack, search } from "@/icons";
import FavoriteCard from "@/components/cards/Favorite";
import styles from "./Pages.module.css";
import { IonButton, IonContent, IonIcon } from "@ionic/react";

const Favorites = () => {
	const favorites = LocalStore.useState((s) => s.favorites);

	return (
		<IonContent>
			<div className={styles.panel_content}>
				<div className={styles.wrapper}>
					<div className={styles.header}>
						<div className={styles.nav_left}>
							<Link href="/">
								<IonButton class={styles.back} fill="clear">
									<IonIcon
										icon={chevronBack}
										slot="start"
										class={styles.icon}
									/>
								</IonButton>
							</Link>
						</div>

						<div className={styles.nav_text}>Favorites</div>
						<div className={styles.nav_left}></div>
					</div>

					<div className={styles.search}>
						<IonIcon icon={search} slot="start" class={styles.s_icon} />
						<input type="text" name="search" placeholder="Search" />
					</div>

					<div className={styles.content}>
						{favorites &&
							favorites.map((favorite, index) => (
								<FavoriteCard key={index} item={favorite} />
							))}

						{favorites.length === 0 && (
							<h2 className={styles.no_record}>No record found!</h2>
						)}
					</div>
				</div>
			</div>
		</IonContent>
	);
};

export default Favorites;
