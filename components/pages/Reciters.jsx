import { useState, useRef, useEffect } from "react";
import { search } from "@/icons";
import ReciterCard from "@/components/cards/Reciter";
import styles from "./Pages.module.css";
import { IonIcon } from "@ionic/react";
import { Virtuoso } from "react-virtuoso";
import { useRouter } from "next/router";
// import { Virtuoso } from "react-virtuoso";

const Reciters = ({ reciters }) => {
	// const reciters = PlayerStore.useState((s) => s.reciters);
	const [filter, setFilter] = useState("");

	const filteredReciters = reciters.filter((item) =>
		item.name.toLowerCase().includes(filter.toLowerCase())
	);

	const virtuosoRef = useRef(null);
	const router = useRouter();
	const scrollPositions = useRef({});
	const initialScrollRestored = useRef(false);


  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      if (virtuosoRef.current) {
        virtuosoRef.current.getState((state) => {
          const scrollTop = state.scrollTop
          scrollPositions.current[router.asPath] = scrollTop
          sessionStorage.setItem("reciterScrollPosition", String(scrollTop))
        })
      }
    }

    const handleRouteChangeComplete = (url) => {

      if (!initialScrollRestored.current && url === router.asPath) {
        const savedPosition = sessionStorage.getItem("reciterScrollPosition")

        if (savedPosition && virtuosoRef.current) {
          setTimeout(() => {
            virtuosoRef.current.scrollTo({
              top: Number.parseInt(savedPosition, 10),
              behavior: "auto",
            })
          }, 100)
          initialScrollRestored.current = true
        }
      }
    }

    router.events.on("routeChangeStart", handleRouteChangeStart)
    router.events.on("routeChangeComplete", handleRouteChangeComplete)

    const savedPosition = sessionStorage.getItem("reciterScrollPosition")
    if (savedPosition && virtuosoRef.current && !initialScrollRestored.current) {
      setTimeout(() => {
        virtuosoRef.current.scrollTo({
          top: Number.parseInt(savedPosition, 10),
          behavior: "auto",
        })
        initialScrollRestored.current = true
      }, 100)
    }

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart)
      router.events.off("routeChangeComplete", handleRouteChangeComplete)
    }
  }, [router])

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
				{filteredReciters && (
          <Virtuoso
            ref={virtuosoRef}
            overscan={200}
            useWindowScroll
            style={{ height: "calc(100vh - 120px)" }}
            totalCount={filteredReciters.length}
            itemContent={(index) => <ReciterCard key={filteredReciters[index].id} reciter={filteredReciters[index]} />}
            components={{
              Footer: () => <div style={{ height: "20px" }}></div>,
            }}
            initialTopMostItemIndex={0}
          />
        )}
			</div>
		</>
	);
};

export default Reciters;
