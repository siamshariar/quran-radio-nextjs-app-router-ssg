import classNames from "classnames";
import {
	PlayerStore,
	setReciter,
	setChapter,
	setSrc,
	setPlaying,
	setChapterListByList,
} from "@/store";
import { LocalStore } from "@/store/local";
import { trashOutline } from "ionicons/icons";
import { playCircle, pauseCircle } from "@/icons";
import styles from "./Card.module.css";
import { IonIcon } from "@ionic/react";
import { useSettingStorage } from "@/hooks/useSettingStorage";
import Image from "next/image";
import Link from "next/link";

const FavRecentList = ({ item, handleRemoveFavorite, handleRemoveRecent, noRemoveIcon }) => {
    const playing = PlayerStore.useState((s) => s.playing);
    const reciterId = PlayerStore.useState((s) => s.reciterId);
    const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
    const mode = LocalStore.useState((s) => s.settings.mode);
    const { setMode } = useSettingStorage();

    const setPlaybackMode = async (mode) => {
        await setMode(mode);
        return;
    };

    const handleReciterChange = () => {
        if (mode === "live") {
            setPlaybackMode("normal");
        }

        setReciter(item.reciterId);
        setChapterListByList(item.chapterList);
        setChapter(item.chapterList, item.chapterIndex);
        setSrc(item.chapterList, item.reciterId, item.chapterIndex);
        setPlaying(true);
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

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };
    

    const handleRemove = () => {
        if (handleRemoveFavorite) {
            handleRemoveFavorite(item.reciterId, item.chapterNo);
        } else if (handleRemoveRecent) {
            handleRemoveRecent(item.reciterId, item.chapterNo);
        }
    };

    return (
        <div className={classNames(styles.card, styles.fav_card)}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <Link href={`/reciters/${item.reciterId}`}>
                        <div className={styles.image}>
                            <Image
                                src={
                                    item.reciterImage
                                        ? item.reciterImage
                                        : "/img/reciters/quran-reciting.jpg"
                                }
                                alt=""
                                width={100}
                                height={100}
                                loading="eager"
                                unoptimized
                            />
                        </div>
                    </Link>
                </div>

                <Link href={`/reciters/${item.reciterId}`} className={styles.middle}>
					{/* <div className={styles.middle}> */}
                    <div className={styles.name}>{item.reciterName}</div>
                    <div className={styles.meaning}>- {item.chapterName}</div>
                    <div className={styles.date}>{formatDate(item.createdAt)}</div>
                </Link>

                <div className={classNames(styles.right, styles.btns)}>
                    {!noRemoveIcon && (
                        <IonIcon
                            icon={trashOutline}
                            slot="start"
                            class={styles.icon}
                            onClick={handleRemove}
                        />
                    )}
                    {reciterId === item.reciterId &&
                    item.chapterIndex === chapterIndex ? (
                        playing && mode === "normal" ? (
                            <IonIcon
                                icon={playCircle}
                                slot="start"
                                className={styles.icon}
                                onClick={pause}
                            />
                        ) : (
                            <IonIcon
                                icon={pauseCircle}
                                slot="start"
                                className={styles.icon}
                                onClick={play}
                            />
                        )
                    ) : (
                        <IonIcon
                            icon={pauseCircle}
                            slot="start"
                            className={styles.icon}
                            onClick={() => handleReciterChange()}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default FavRecentList;
