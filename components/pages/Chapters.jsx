import ChapterCard from "@/components/cards/Chapter";
import styles from "@/components/pages/Pages.module.css";
import { heart, heartOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import Image from "next/image";
import { useReciterFavoriteStorage } from "@/hooks/useReciterFavoriteStorage";

const ChapterListPage = ({ reciter, chapterList, index }) => {
	const { addReciterFavorite, removeReciterFavorite, isReciterFavorite } = useReciterFavoriteStorage();

	const chapterNo = chapterList[index];

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
			{index === 0 && (
				<div className={styles.reciter}>
					<div
						className={styles.reciter_name}
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
						<Image src={reciter.imgUrl || "/placeholder.svg"} alt="reciter" width={100} height={100} loading="eager" unoptimized />
					</div>
				</div>
			)}

			<div className={styles.content}>
				<div className="page_width">
					<ChapterCard
						key={`${reciter?.id}-${chapterNo}`}
						index={index}
						reciter={reciter}
						chapterNo={chapterNo}
						isLast={index === chapterList.length - 1}
					/>
				</div>
			</div>
		</>
	);
};

export default ChapterListPage;
