import { useState, useEffect } from "react";
import { search } from "@/icons";
import ReciterCard from "@/components/cards/Reciter";
import styles from "./Pages.module.css";
import { IonIcon } from "@ionic/react";
import { Virtuoso } from "react-virtuoso";
import { useScrollPosition } from "@/hooks/useScrollPosition";
// import { Virtuoso } from "react-virtuoso";

const Reciters = ({ reciters }) => {
	// const reciters = PlayerStore.useState((s) => s.reciters);
	const [filter, setFilter] = useState("");
	const [isReady, setIsReady] = useState(false);

	const filteredReciters = reciters.filter((item) =>
		item.name.toLowerCase().includes(filter.toLowerCase())
	);

	const { scrollRef, initialScrollTop } = useScrollPosition();


  useEffect(() => {
    setIsReady(true)
  }, [])

  const contentStyle = {
    visibility: isReady ? "visible" : "hidden",
    height: "calc(100vh - 120px)",
  }

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
			<div className={styles.content} style={contentStyle}>
				{filteredReciters && (
          <Virtuoso
            ref={scrollRef}
            overscan={200}
            useWindowScroll
            style={{ height: "100%" }}
            totalCount={filteredReciters.length}
            itemContent={(index) => <ReciterCard key={filteredReciters[index].id} reciter={filteredReciters[index]} />}
            components={{
              Footer: () => <div style={{ height: "20px" }}></div>,
            }}
            initialScrollTop={initialScrollTop}
          />
        )}
			</div>
		</>
	);
};

export default Reciters;
