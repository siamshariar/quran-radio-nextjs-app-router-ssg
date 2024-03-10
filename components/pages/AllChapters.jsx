import AllChapterCard from "@/components/cards/AllChapter";
import styles from "@/components/pages/Pages.module.css";

const AllChapterList = ({ chapters }) => {
	return (
		<>
			<div className={styles.content}>
				<div className="page_width">
					{chapters &&
						chapters.length &&
						chapters.map((chapter, index) => (
							<AllChapterCard key={index} index={index} chapter={chapter} />
						))}
				</div>
			</div>
		</>
	);
};

export default AllChapterList;
