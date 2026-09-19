"use client";

// Reads ?reciter=&chapter= / ?liveRadio= once on mount to resume a shared/deep-linked
// playback URL. Split out of Audio.jsx because useSearchParams() requires a Suspense
// boundary on statically generated routes, and a Suspense-gated component mounts via
// a delayed post-hydration fetch — fine for this one-time URL read, but fatal for the
// actual <audio> element and its play()/pause() effects, which must mount synchronously
// so audio.play() still runs inside the browser's user-gesture window when triggered
// by a click (see Audio.jsx).
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
	setSrcAllChapters as setSrcFirst,
	setChapter,
	setLiveRadio,
	setLiveSrc,
	setReciterByReciter,
	setChapterListByList,
} from "@/store";
import { setActiveTrack, loadTrackInfo } from "@/store/audio";
import { getLiveIndexById, getReciterById } from "@/lib/fetch";
import { useSettingStorage } from "@/hooks/useSettingStorage";

export default function AudioDeepLinkInit() {
	const searchParams = useSearchParams();
	const { setMode } = useSettingStorage();

	useEffect(() => {
		const setMediaResources = async () => {
			const reciterId = searchParams.get("reciter");
			const chapId = searchParams.get("chapter");
			const reciter = await getReciterById(reciterId);
			const chapterList = reciter.moshaf[0].surah_list.split(",");
			const chapterIndex = chapterList.indexOf(chapId);

			setSrcFirst(chapId, reciter.moshaf);
			setReciterByReciter(reciter);
			setChapterListByList(chapterList);
			setChapter(chapterList, chapterIndex);
			await setMode("normal");
			setActiveTrack(reciterId, chapId);

			await loadTrackInfo(reciterId, chapId);
		};

		const setLiveMediaResources = async () => {
			const liveId = searchParams.get("liveRadio");
			const liveIndex = await getLiveIndexById(liveId);
			setLiveSrc(liveIndex);
			setLiveRadio(liveIndex);
			await setMode("live");
		};

		if (searchParams.get("reciter") && searchParams.get("chapter")) {
			setMediaResources();
		} else if (searchParams.get("liveRadio")) {
			setLiveMediaResources();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return null;
}
