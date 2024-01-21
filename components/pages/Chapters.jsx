import ChapterCard from "@/components/cards/Chapter";
import styles from "@/components/pages/Pages.module.css";

const ChapterListPage = ({ reciter, chapterList }) => {
	// const slug = match.params.slug;

	return (
		<>
			<div className={styles.reciter}>
				<div className={styles.reciter_name}>
					<span>{reciter.name}</span>
				</div>
				<div className={styles.image}>
					<img src={reciter.imgUrl} alt="reciter" />
				</div>
			</div>

			<div className={styles.content}>
				<div className="page_width">
					{chapterList &&
						chapterList.length &&
						chapterList.map((chapterNo, index) => (
							<ChapterCard
								key={chapterNo}
								index={index}
								reciter={reciter}
								chapterNo={chapterNo}
							/>
						))}
				</div>
			</div>
		</>
	);
};

export default ChapterListPage;
