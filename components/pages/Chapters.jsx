import ChapterCard from "@/components/cards/Chapter";
import styles from "@/components/pages/Pages.module.css";
import { heart, heartOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { useReciterFavoriteStorage } from "@/hooks/useReciterFavoriteStorage";

const ChapterListPage = ({ reciter, chapterList }) => {
	// const slug = match.params.slug;

    const { addReciterFavorite, removeReciterFavorite, isReciterFavorite } = useReciterFavoriteStorage();

    const toggleFavorite = () => {
        if (isReciterFavorite(reciter.id)) {
            removeReciterFavorite(reciter.id);
        } else {
            addReciterFavorite({
                id: reciter.id,
                name: reciter.name,
                imgUrl: reciter.imgUrl,
                moshaf: reciter.moshaf,
            });
        }
    };

	return (
		<>
			<div className={styles.reciter}>
				<div className={styles.reciter_name}
            onClick={toggleFavorite}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
            }}
          >
					<span>{reciter.name}</span>
          <span>|</span>
          <IonIcon
              icon={isReciterFavorite(reciter.id) ? heart : heartOutline}
              slot="end"
              className={`${styles.icon} ${isReciterFavorite(reciter.id) ? styles.favoriteIcon : ""}`}
          />
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
