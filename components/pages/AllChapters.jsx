import { Virtuoso } from 'react-virtuoso';
import AllChapterCard from "@/components/cards/AllChapter";
import styles from "@/components/pages/Pages.module.css";

const AllChapterList = ({ chapters }) => {
	return (
		<>
			<div className={styles.content}>
				<div className="page_width">
					<Virtuoso
						style={{ height: '100%' }}
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
				</div>
			</div>
		</>
	);
};

export default AllChapterList;
