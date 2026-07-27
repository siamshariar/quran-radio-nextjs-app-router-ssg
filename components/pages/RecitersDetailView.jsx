"use client";

import Chapters from "@/components/pages/Chapters";
import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import HeaderHome from "@/components/sections/HeaderHome";
import { Virtuoso } from "react-virtuoso";
import { useEffect, useRef, useState } from "react";

export default function RecitersDetailView({ reciter, chapterList }) {
	const virtuosoRef = useRef(null);
	const [initialScrollTop, setInitialScrollTop] = useState(0);

	useEffect(() => {
		const savedPosition = sessionStorage.getItem(`reciters-page-scroll-${reciter.id}`);
		setInitialScrollTop(savedPosition ? parseInt(savedPosition, 10) : 0);

		return () => {
			const currentScrollTop = virtuosoRef.current?.getScrollTop() || 0;
			sessionStorage.setItem(`reciters-page-scroll-${reciter.id}`, currentScrollTop);
		};
	}, [reciter.id]);

	return (
		<div className={styles.panel_content}>
			<div className={styles.wrapper}>
				<HeaderHome />
				<CommonHeader title="Chapters" prev_page="/reciters" />
				<Virtuoso
					ref={virtuosoRef}
					overscan={200}
					useWindowScroll
					totalCount={chapterList.length}
					itemContent={(index) => {
						const chapterNo = chapterList[index];
						return (
							<Chapters
								key={chapterNo}
								reciter={reciter}
								chapterList={chapterList}
								index={index}
							/>
						);
					}}
					components={{
						Footer: () => <div style={{ height: "20px" }}></div>,
					}}
					initialScrollTop={initialScrollTop}
				/>
			</div>
		</div>
	);
}
