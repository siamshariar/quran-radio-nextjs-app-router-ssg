import { useState, useEffect, useRef } from "react";
import { search } from "@/icons";
import ReciterCard from "@/components/cards/Reciter";
import styles from "./Pages.module.css";
import { IonIcon } from "@ionic/react";
import { Virtuoso } from "react-virtuoso";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { getSessionItem, getSessionNumber } from "@/components/utils/session-storage";
// import { Virtuoso } from "react-virtuoso";

const ANCHOR_ID_KEY = "reciterScrollAnchorId";
const ANCHOR_TOP_KEY = "reciterScrollAnchorTop";

const Reciters = ({ reciters }) => {
	// const reciters = PlayerStore.useState((s) => s.reciters);
	const [filter, setFilter] = useState("");
	const [isReady, setIsReady] = useState(false);
	const hasRestoredScroll = useRef(false);

	const filteredReciters = reciters.filter((item) =>
		item.name.toLowerCase().includes(filter.toLowerCase())
	);

	const { scrollRef, initialScrollTop } = useScrollPosition();

  useEffect(() => {
    setIsReady(true)
  }, [])

	// Virtuoso's initialScrollTop prop only takes effect if the list is already
	// tall enough to scroll that far at mount time — on first paint it hasn't
	// measured real row heights yet, so it silently ignores the prop when the
	// estimated height is still shorter than the saved position. Calling
	// Virtuoso's own scrollTo() (rather than raw window.scrollTo) is what the
	// original Pages Router version did on router.events' routeChangeComplete;
	// App Router has no equivalent "new page is ready" event, so retry across
	// frames until the document has actually grown tall enough to reach it.
	useEffect(() => {
		if (!isReady || !initialScrollTop || hasRestoredScroll.current) return;

		let cancelled = false;
		let attempts = 0;

		const tryRestore = () => {
			if (cancelled) return;
			attempts += 1;
			const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
			if (maxScroll >= initialScrollTop || attempts > 20) {
				scrollRef.current?.scrollTo({ top: initialScrollTop, behavior: "auto" });

				const anchorId = getSessionItem(ANCHOR_ID_KEY);
				const savedAnchorTop = getSessionNumber(ANCHOR_TOP_KEY, Number.NaN);
				if (anchorId && Number.isFinite(savedAnchorTop)) {
					requestAnimationFrame(() => {
						const anchorEl = document.getElementById(anchorId);
						if (!anchorEl) return;

						const currentTop = Math.round(anchorEl.getBoundingClientRect().top);
						const delta = currentTop - savedAnchorTop;
						if (Math.abs(delta) > 1) {
							window.scrollBy({ top: delta, behavior: "auto" });
						}
					});
				}

				hasRestoredScroll.current = true;
				return;
			}
			requestAnimationFrame(tryRestore);
		};
		requestAnimationFrame(tryRestore);

		return () => {
			cancelled = true;
		};
	}, [isReady, initialScrollTop]);

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
        {isReady && filteredReciters && (
          <Virtuoso
            ref={scrollRef}
            overscan={200}
            useWindowScroll
            style={{ height: "100%" }}
            totalCount={filteredReciters.length}
            itemContent={(index) => ( <ReciterCard key={filteredReciters[index].id} reciter={filteredReciters[index]} noRemoveIcon isLast={index === filteredReciters.length - 1} /> )}
            components={{
              Footer: () => <div style={{ height: "80px" }}></div>,
            }}
            initialScrollTop={initialScrollTop}
          />
        )}
			</div>
		</>
	);
};

export default Reciters;
