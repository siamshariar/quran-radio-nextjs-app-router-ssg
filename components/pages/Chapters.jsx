import ChapterCard from "@/components/cards/Chapter";
import styles from "@/components/pages/Pages.module.css";
import Link from "next/link";
import classNames from "classnames";
import { PlayerStore, setReciter, setChapter, setPlaying, setSrc, setReciterByReciter, setChapterListByList } from "@/store";
import { playCircle, pauseCircle, heart, heartOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { useSettingStorage } from "@/hooks/useSettingStorage";
import { LocalStore } from "@/store/local";
import Image from "next/image";
import { useReciterFavoriteStorage } from "@/hooks/useReciterFavoriteStorage";
import Favorite from "../actions/Favorite";

const ChapterListPage = ({ reciter, chapterList }) => {
	// const slug = match.params.slug;
    const playing = PlayerStore.useState((s) => s.playing);
    const reciterId = PlayerStore.useState((s) => s.reciterId);
    const mode = LocalStore.useState((s) => s.settings.mode);

    const { setMode } = useSettingStorage();
    const { addReciterFavorite, removeReciterFavorite, isReciterFavorite } = useReciterFavoriteStorage();

    const setPlaybackMode = async (mode) => {
        await setMode(mode);
        return;
    };

    const handleReciterChange = () => {
        if (mode === "live") {
            setPlaybackMode("normal");
        }

        const reciterId = reciter.id;
        const chapterList = reciter.moshaf[0].surah_list.split(",");
        const randomChapterIndex = Math.floor(Math.random() * (chapterList.length > 100 ? 100 : chapterList.length));

        setSrc(chapterList, reciterId, randomChapterIndex);
        setPlaying(true);
        setReciterByReciter(reciter);
        setChapter(chapterList, randomChapterIndex);
        setChapterListByList(chapterList);
    };

    const play = () => {
        if (mode === "live") {
            setPlaybackMode("normal");
        }
        setPlaying(true);
    };

    const pause = () => {
        setPlaying(false);
    };

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
					<Image src={reciter.imgUrl || "/placeholder.svg"} alt="reciter" width={100} height={100} loading="eager" unoptimized />
				</div>
			</div>

			<div className={styles.content}>
				<div className="page_width">
					{chapterList &&
						chapterList.length > 0 &&
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
