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
import { formatDate } from "../utils/formatDate";
import {
    AudioStore,
    setCurrentTime,
    setIsPlaying,
    initializeAudioStore,
    loadPausedTime,
    setDuration,
} from "@/store/audio";
import { useEffect, useState } from "react";
import storage from "@/store/storage"; // import storage

const FavRecentList = ({ item, handleRemoveFavorite, handleRemoveRecent, noRemoveIcon, isRecent }) => {
    const playing = PlayerStore.useState((s) => s.playing);
    const reciterId = PlayerStore.useState((s) => s.reciterId);
    const chapterIndex = PlayerStore.useState((s) => s.chapterIndex);
    const mode = LocalStore.useState((s) => s.settings.mode);
    const { setMode } = useSettingStorage();
    const [showPausedAt, setShowPausedAt] = useState(true);

    const currentTime = AudioStore.useState((s) => s.currentTime);
    const dur = AudioStore.useState((s) => s.dur);
    const [trackDuration, setTrackDuration] = useState(0);

    useEffect(() => {
        initializeAudioStore();
        if (AudioStore.getRawState().isPlaying) {
            setPlaying(true);
            const pausedTime = loadPausedTime();
            setCurrentTime(pausedTime);
        }

        const fetchTrackDurations = async () => {
            const savedDurations = JSON.parse(await storage.getItem("trackDurations") || "{}");
            const trackKey = `${item.reciterId}-${item.chapterNo}`;
            if (savedDurations[trackKey]) {
                setTrackDuration(savedDurations[trackKey]);
            }
        };
        fetchTrackDurations();
    }, [item.reciterId, item.chapterNo]);

    useEffect(() => {
        if (reciterId === item.reciterId && chapterIndex === item.chapterIndex && dur > 0) {
            setTrackDuration(dur);
            saveTrackDuration(item.reciterId, item.chapterNo, dur);
        }
    }, [dur, reciterId, chapterIndex, item.reciterId, item.chapterIndex, item.chapterNo]);

    const saveTrackDuration = async (reciterId, chapterNo, duration) => {
        const trackKey = `${reciterId}-${chapterNo}`;
        const savedDurations = JSON.parse(await storage.getItem("trackDurations") || "{}");
        savedDurations[trackKey] = duration;
        await storage.setItem("trackDurations", JSON.stringify(savedDurations));
    };

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

        const trackKey = `${item.reciterId}-${item.chapterNo}`;
        const fetchPausedTimes = async () => {
            const savedPausedTimes = JSON.parse(await storage.getItem("trackPausedTimes") || "{}");
            if (savedPausedTimes[trackKey] && isRecent) {
                setCurrentTime(savedPausedTimes[trackKey]);
            } else {
                setCurrentTime(0);
            }
        };
        fetchPausedTimes();

        const fetchTrackDurations = async () => {
            const savedDurations = JSON.parse(await storage.getItem("trackDurations") || "{}");
            if (savedDurations[trackKey]) {
                setDuration(savedDurations[trackKey]);
            }
        };
        fetchTrackDurations();

        setShowPausedAt(false);
    };

    const play = () => {
        if (mode === "live") {
            setPlaybackMode("normal");
        }
        setPlaying(true);
        setIsPlaying(true);
        setShowPausedAt(false);
    };

    const pause = async () => {
        setPlaying(false);
        setIsPlaying(false);

        const trackKey = `${item.reciterId}-${item.chapterNo}`;
        const savedPausedTimes = JSON.parse(await storage.getItem("trackPausedTimes") || "{}");
        savedPausedTimes[trackKey] = currentTime;
        await storage.setItem("trackPausedTimes", JSON.stringify(savedPausedTimes));

        await storage.setItem("audioPausedTime", currentTime);
        updatePausedAtTime(item.reciterId, item.chapterNo, currentTime);
        setShowPausedAt(true);
    };

    const updatePausedAtTime = (reciterId, chapterNo, time) => {
        const recents = LocalStore.getRawState().recent;
        const updatedRecents = recents.map((recent) => {
            if (recent.reciterId === reciterId && recent.chapterNo === chapterNo) {
                return { ...recent, pausedAt: time };
            }
            return recent;
        });
        LocalStore.update((s) => ({ ...s, recent: updatedRecents }));
    };

    const handleRemove = () => {
        if (handleRemoveFavorite) {
            handleRemoveFavorite(item.reciterId, item.chapterNo);
        } else if (handleRemoveRecent) {
            handleRemoveRecent(item.reciterId, item.chapterNo);
        }
    };

    const formatDur = (s) => {
        if (!s || isNaN(s)) return "00:00";
        const h = ~~(s / 3600);
        const m = ~~((s % 3600) / 60);
        const rs = ~~(s % 60);
        return `${h > 0 ? String(h).padStart(2, "0").concat(":") : ""}${String(m).padStart(2, "0")}:${String(rs).padStart(2, "0")}`;
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
                    {item.pausedAt && showPausedAt && (
                        <div className={styles.pausedAt}>
                            Duration: {formatDur(item.pausedAt)} / {formatDur(trackDuration)}
                        </div>
                    )}
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
