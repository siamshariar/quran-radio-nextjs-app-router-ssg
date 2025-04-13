import Chapters from "@/components/pages/Chapters";
import { reciters } from "@/data/reciters";
import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import HeaderHome from "@/components/sections/HeaderHome";
import { getReciterById } from "@/lib/fetch";
import Meta from "@/components/core/Meta";
import { server } from "@/lib/config";
import { Virtuoso } from "react-virtuoso";
import { useEffect, useRef, useState } from "react";

export default function Home({ reciter, chapterList }) {
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
		<>
			<Meta
				title="Chapters"
				description="Quran Live Radio and Audio"
				url={`server/reciters/${reciter.id}`}
				image={`${server}/img/logo/quran-radio-social.png`}
				type="website"
			/>

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
		</>
	);
}

export async function getStaticProps(context) {
	const id = encodeURI(context.params.id);
	const reciterId = parseInt(id);

	// const reciter = reciters.find((obj) => obj.id === reciterId);
	const reciter = await getReciterById(reciterId);
	const chapterList = reciter.moshaf[0].surah_list.split(",");

	if (!chapterList) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			reciter,
			chapterList,
			// key: id,
		},
		revalidate: 60,
	};
}

export async function getStaticPaths() {
	let paths = [];

	reciters.map((reciter) => {
		let id = encodeURI(reciter.id);
		let obj = { params: { id: id } };
		paths.push(obj);
	});

	return {
		paths: paths,
		fallback: "blocking",
	};
}
