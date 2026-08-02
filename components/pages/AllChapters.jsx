import { useState, useEffect } from "react";
import { Virtuoso } from 'react-virtuoso';
import AllChapterCard from "@/components/cards/AllChapter";
import styles from "@/components/pages/Pages.module.css";

const AllChapterList = ({ chapters }) => {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		setIsReady(true);
	}, []);

	const contentStyle = {
		visibility: isReady ? "visible" : "hidden",
		height: "calc(100vh - 120px)",
	};

	return (
		<>
			<div className={styles.content} style={contentStyle}>
			<div className="page_width" style={{ paddingBottom: "100px" }}>
			{isReady && (
				<Virtuoso

				totalCount={chapters.length}
							useWindowScroll
				itemContent={(index) => (
					<AllChapterCard
					key={chapters[index].id}
					index={index}
					chapter={chapters[index]}
					/>
				)}
				overscan={200}
				/>
			)}
			</div>
			</div>
		</>
	);
};

export default AllChapterList;
