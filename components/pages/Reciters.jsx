import { useState, useEffect } from "react";
import { chevronBack, search } from "@/icons";
import ReciterCard from "@/components/cards/Reciter";
import styles from "./Pages.module.css";
import { IonIcon } from "@ionic/react";
// import { Virtuoso } from "react-virtuoso";
import { useReciterFavoriteStorage } from "@/hooks/useReciterFavoriteStorage";
import storage from "@/store/storage";

const Reciters = ({ reciters: initialReciters }) => {
	// const reciters = PlayerStore.useState((s) => s.reciters);
	const [filter, setFilter] = useState("");

	const [reciters, setReciters] = useState(initialReciters)
	const { removeReciterFavorite: removeFromStorage, isLoaded } = useReciterFavoriteStorage()

  useEffect(() => {
    const loadReciters = async () => {
      try {
        const favoriteIdsStr = localStorage.getItem("reciterFavorites")
        const favoriteIds = favoriteIdsStr ? JSON.parse(favoriteIdsStr) : []

        const filteredReciters = initialReciters.filter((reciter) => {
          return true 
        })

        setReciters(filteredReciters)
      } catch (error) {
        console.error("Error loading reciters:", error)
        setReciters(initialReciters)
      }
    }

    if (isLoaded) {
      loadReciters()
    }
  }, [initialReciters, isLoaded])

  const removeReciterFavorite = async (reciterId) => {

    setReciters((prevReciters) => prevReciters.filter((reciter) => reciter.id !== reciterId))

    if (removeFromStorage) {
      await removeFromStorage(reciterId)
    }

    try {
      await storage.remove(`reciter_${reciterId}`)

      const storedFavorites = await storage.get("reciterFavorites")
      if (storedFavorites) {
        const favorites = Array.isArray(storedFavorites) ? storedFavorites : JSON.parse(storedFavorites)

        const updatedFavorites = favorites.filter((fav) => {
          return fav.id !== undefined ? fav.id !== reciterId : fav !== reciterId
        })

        await storage.set("reciterFavorites", updatedFavorites)
      }
    } catch (error) {
      console.error("Error removing from Ion storage:", error)
    }
  }

  const filteredReciters = reciters.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))

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

			{/* <div className={styles.content}>
				{filteredReciters && (
					// filteredReciters.map((reciter, index) => (
					// 	<ReciterCard key={index} reciter={reciter} />
					// ))}
					<Virtuoso
						overscan={2}
						style={{ height: "100vh" }}
						totalCount={filteredReciters.length}
						className=""
						itemContent={(index) => (
							<ReciterCard key={index} reciter={filteredReciters[index]} />
						)}
					/>
				)}
			</div> */}
			<div className={styles.content}>
				{filteredReciters && filteredReciters.length > 0 ? (
					filteredReciters.map((reciter) => (
						<ReciterCard
              key={reciter.id}
              reciter={reciter}
              noRemoveIcon= {true}
              removeReciterFavorite={removeReciterFavorite}
            />
          ))
        ) : (
          <h2 className={styles.no_record}>No record found!</h2>
        )}
			</div>
		</>
	);
};

export default Reciters;
