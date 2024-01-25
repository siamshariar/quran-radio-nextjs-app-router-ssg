import { LocalStore } from "@/store/local";
import { search } from "@/icons";
import FavoriteCard from "@/components/cards/FavRecentList";
import styles from "./Pages.module.css";
import { IonIcon } from "@ionic/react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import LiveRadioCard from "../cards/LiveRadioCard";
import LiveFavorite from "../cards/LiveFavRecent";
import { useFavoriteStorage } from "@/hooks/useFavoriteStorage";
import { useLiveFavoriteStorage } from "@/hooks/useLiveFavoriteStorage";

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && <>{children}</>}
		</div>
	);
}

CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};
function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		className: "tab-btn",
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const Favorites = () => {
	const [value, setValue] = useState(0);
	const favorites = LocalStore.useState((s) => s.favorites);
	const liveFavorites = LocalStore.useState((s) => s.liveFavorites);
	const { removeFavorite } = useFavoriteStorage();
	const { removeLiveFavorite } = useLiveFavoriteStorage();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleRemoveFavorite = async (reciterId, chapterIndex) => {
		await removeFavorite(reciterId, chapterIndex);
		return;
	};

	const handleRemoveLiveFavorite = async (fav) => {
		await removeLiveFavorite(fav);
		return;
	};

	return (
		<div className="favRecent">
			<div className={styles.search}>
				<IonIcon icon={search} slot="start" class={styles.s_icon} />
				<input type="text" name="search" placeholder="Search" />
			</div>

			<Box sx={{ width: "100%" }}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs
						centered
						value={value}
						onChange={handleChange}
						aria-label="basic tabs">
						<Tab label="Chapters" {...a11yProps(0)} />
						<Tab label="Live Radios" {...a11yProps(1)} />
					</Tabs>
				</Box>

				<CustomTabPanel value={value} index={0}>
					<div className={styles.content}>
						{favorites &&
							favorites.map((favorite, index) => (
								<FavoriteCard
									key={index}
									item={favorite}
									handleRemoveFavorite={handleRemoveFavorite}
								/>
							))}

						{favorites.length === 0 && (
							<h2 className={styles.no_record}>No record found!</h2>
						)}
					</div>
				</CustomTabPanel>

				<CustomTabPanel value={value} index={1}>
					<div className={styles.content}>
						{liveFavorites &&
							liveFavorites.map((favorite, index) => (
								<LiveFavorite
									key={index}
									item={favorite}
									handleRemoveLiveFavorite={handleRemoveLiveFavorite}
								/>
							))}

						{liveFavorites.length === 0 && (
							<h2 className={styles.no_record}>No record found!</h2>
						)}
					</div>
				</CustomTabPanel>
			</Box>
		</div>
	);
};

export default Favorites;
