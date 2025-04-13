import { Virtuoso } from 'react-virtuoso';
import ChapterCard from "@/components/cards/Chapter";
import styles from "@/components/pages/Pages.module.css";

const ChapterListPage = ({ reciter, chapterList, index }) => {
	// const slug = match.params.slug;
  const chapterNo = chapterList[index];

	return (
		<>
      {index === 0 && (
			<div className={styles.reciter}>
				<div className={styles.reciter_name}>
					<span>{reciter.name}</span>
				</div>
				<div className={styles.image}>
					<img src={reciter.imgUrl} alt="reciter" />
				</div>
			</div>
      )}

			<div className={styles.content}>
				<div className="page_width">
          <Virtuoso
            style={{ height: '100%' }}
            totalCount={chapterList.length}
            useWindowScroll
            initialTopMostItemIndex={index}
            itemContent={(index) => (
							<ChapterCard
								key={`${reciter?.id}-${chapterList[index]}`}
								index={index}
								reciter={reciter}
								chapterNo={chapterList[index]}
							/>
            )}
            overscan={200}
							/>
				</div>
			</div>
		</>
	);
};

export default ChapterListPage;
