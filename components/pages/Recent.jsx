import { LocalStore } from "@/store/local";
import { search } from "@/icons";
import FavRecentList from "@/components/cards/FavRecentList";
import styles from "./Pages.module.css";
import { IonIcon } from "@ionic/react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import LiveFavRecent from "../cards/LiveFavRecent";

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

const Recents = () => {
	const [value, setValue] = useState(0);
	const recents = LocalStore.useState((s) => s.recent);
	const liveRecents = LocalStore.useState((s) => s.liveRecent);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className="favRecent">
			{/*<div className={styles.search}>*/}
			{/*	<IonIcon icon={search} slot="start" class={styles.s_icon} />*/}
			{/*	<input type="text" name="search" placeholder="Search" />*/}
			{/*</div>*/}

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
						{recents &&
							recents.map((recent, index) => (
								<FavRecentList key={index} item={recent} noRemoveIcon={true} />
							))}

						{recents.length === 0 && (
							<h2 className={styles.no_record}>No record found!</h2>
						)}
					</div>
				</CustomTabPanel>

				<CustomTabPanel value={value} index={1}>
					<div className={styles.content}>
						{liveRecents &&
							liveRecents.map((recent, index) => (
								<LiveFavRecent key={index} item={recent} noRemoveIcon={true} />
							))}

						{liveRecents.length === 0 && (
							<h2 className={styles.no_record}>No record found!</h2>
						)}
					</div>
				</CustomTabPanel>
			</Box>
		</div>
	);
};

export default Recents;
