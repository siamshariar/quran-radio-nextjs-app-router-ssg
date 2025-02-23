import { LocalStore } from '@/store/local';
import { search } from '@/icons';
import FavoriteCard from '@/components/cards/FavRecentList';
import styles from './Pages.module.css';
import { IonIcon } from '@ionic/react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import LiveFavorite from '../cards/LiveFavRecent';
import { useFavoriteStorage } from '@/hooks/useFavoriteStorage';
import { useLiveFavoriteStorage } from '@/hooks/useLiveFavoriteStorage';
import { useReciterFavoriteStorage } from '@/hooks/useReciterFavoriteStorage';
import ReciterCard from '../cards/Reciter';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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
    className: 'tab-btn',
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Favorites = () => {
  const [value, setValue] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");
	const favorites = LocalStore.useState((s) => s.favorites);
	const liveFavorites = LocalStore.useState((s) => s.liveFavorites);
	const { removeFavorite } = useFavoriteStorage();
	const { removeLiveFavorite } = useLiveFavoriteStorage();
	const { reciterFavorites, removeReciterFavorite } = useReciterFavoriteStorage();

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
	const handleRemoveReciterFavorite = async (reciterId) => {
		await removeReciterFavorite(reciterId);

		const favorites = LocalStore.getRawState().reciterFavorites || [];
		const updatedFavorites = favorites.filter((id) => id !== reciterId);
    LocalStore.update((s) => {
      s.reciterFavorites = updatedFavorites;
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredFavorites = favorites.filter((favorite) =>
    favorite.reciterName && favorite.reciterName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLiveFavorites = liveFavorites.filter((favorite) =>
    favorite.name && favorite.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReciters = reciterFavorites.filter(
    (reciter) => reciter.name && reciter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="favRecent">
      <div className={styles.search}>
        <IonIcon icon={search} slot="start" className={styles.s_icon} />
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
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
            <Tab label="Reciters" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <div className={styles.content}>
            {filteredFavorites.length > 0 ? (
              filteredFavorites.map((favorite, index) => (
                <FavoriteCard
                  key={index}
                  item={favorite}
                  handleRemoveFavorite={handleRemoveFavorite}
                />
              ))
            ) : (
              <h2 className={styles.no_record}>No record found!</h2>
            )}
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <div className={styles.content}>
            {filteredLiveFavorites.length > 0 ? (
              filteredLiveFavorites.map((favorite, index) => (
                <LiveFavorite
                  key={index}
                  item={favorite}
                  handleRemoveLiveFavorite={handleRemoveLiveFavorite}
                />
              ))
            ) : (
              <h2 className={styles.no_record}>No record found!</h2>
            )}
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <div className={styles.content}>
            {filteredReciters.length > 0 ? (
              filteredReciters.map((reciter, index) => (
                <ReciterCard key={index} reciter={reciter} removeReciterFavorite={handleRemoveReciterFavorite} />
              ))
            ) : (
              <h2 className={styles.no_record}>No record found!</h2>
            )}
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default Favorites;