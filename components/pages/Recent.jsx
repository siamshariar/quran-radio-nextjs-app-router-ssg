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
import { useRecentStorage } from "@/hooks/useRecentStorage";
import { useLiveRecentStorage } from "@/hooks/useLiveRecentStorage";

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

function groupItemsByDate(items) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const formatter = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
    });

    const grouped = {
        today: [],
        yesterday: [],
        older: {},
    };

    items.forEach((item) => {
        const createdAt = new Date(item.createdAt);
        const createdDate = createdAt.toDateString();

        if (createdDate === today.toDateString()) {
            grouped.today.push(item);
        } else if (createdDate === yesterday.toDateString()) {
            grouped.yesterday.push(item);
        } else {
            const formattedDate = formatter.format(createdAt);
            if (!grouped.older[formattedDate]) {
                grouped.older[formattedDate] = [];
            }
            grouped.older[formattedDate].push(item);
        }
    });

    return grouped;
}

const Recents = () => {
	const [value, setValue] = useState(0);
	const recents = LocalStore.useState((s) => s.recent);
	const liveRecents = LocalStore.useState((s) => s.liveRecent);
	const { removeRecent } = useRecentStorage();
	const { removeLiveRecent } = useLiveRecentStorage();
	const groupedRecents = groupItemsByDate(recents);
	const groupedLiveRecents = groupItemsByDate(liveRecents);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

  const noRecordsFound = 
    Object.keys(groupedRecents).every((key) => groupedRecents[key].length === 0) && 
    Object.keys(groupedLiveRecents).every((key) => groupedLiveRecents[key].length === 0);

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

                {noRecordsFound ? (
                    <p>No records found.</p>
                ) : (
                    <>
                        <CustomTabPanel value={value} index={0}>
                            <div className={styles.content}>
                                {Object.entries(groupedRecents).map(([key, items]) => (
                                    <div key={key}>
                                        {items.length > 0 && (
                                            <h3 className={styles.dateHeader}>
                                                {key === "today"
                                                    ? "Today"
                                                    : key === "yesterday"
                                                    ? "Yesterday"
                                                    : key === "older"
                                                    ? ""
                                                    : key}
                                            </h3>
                                        )}
                                        {key === "older" ? (
                                            Object.entries(items).map(([date, olderItems]) => (
                                                <div key={date}>
                                                    <h4 className={styles.subDateHeader}>{date}</h4>
                                                    {olderItems.map((recent, index) => (
                                                        <FavRecentList
                                                            key={index}
                                                            item={recent}
                                                            isRecent={true}
                                                            handleRemoveRecent={removeRecent}
                                                        />
                                                    ))}
                                                </div>
                                            ))
                                        ) : (
                                            items.map((recent, index) => (
                                                <FavRecentList
                                                    key={index}
                                                    item={recent}
                                                    isRecent={true}
                                                    handleRemoveRecent={removeRecent}
                                                />
                                            ))
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={1}>
                            <div className={styles.content}>
                                {Object.entries(groupedLiveRecents).map(([key, items]) => (
                                    <div key={key}>
                                        {items.length > 0 && (
                                            <h3 className={styles.dateHeader}>
                                                {key === "today"
                                                    ? "Today"
                                                    : key === "yesterday"
                                                    ? "Yesterday"
                                                    : key === "older"
                                                    ? ""
                                                    : key}
                                            </h3>
                                        )}
                                        {key === "older" ? (
                                            Object.entries(items).map(([date, olderItems]) => (
                                                <div key={date}>
                                                    <h4 className={styles.subDateHeader}>{date}</h4>
                                                    {olderItems.map((recent, index) => (
                                                        <LiveFavRecent
                                                            key={index}
                                                            item={recent}
                                                            handleRemoveLiveRecent={removeLiveRecent}
                                                        />
                                                    ))}
                                                </div>
                                            ))
                                        ) : (
                                            items.map((recent, index) => (
                                                <LiveFavRecent
                                                    key={index}
                                                    item={recent}
                                                    handleRemoveLiveRecent={removeLiveRecent}
                                                />
                                            ))
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CustomTabPanel>
                    </>
                )}
			</Box>
		</div>
	);
};

export default Recents;
