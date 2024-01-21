import HomeContent from "@/components/pages/Home";
import { reciters } from "@/data/reciters";
import { useSettingStorage } from "@/hooks/useSettingStorage";
import { getReciterById } from "@/lib/fetch";
import { setChapter, setChapterListByList, setReciter, setSrc } from "@/store";
import { LocalStore } from "@/store/local";
import { useEffect } from "react";

export default function HomePlay({ reciterId, chapterList, chapterIndex }) {
	const mode = LocalStore.useState((s) => s.settings.mode);
	const { setMode } = useSettingStorage();
	const setPlaybackMode = async (mode) => {
		await setMode(mode);
		return;
	};

	useEffect(() => {
		if (mode === "live") {
			setPlaybackMode("normal");
		}

		setReciter(reciterId);
		setChapterListByList(chapterList);
		setChapter(chapterList, chapterIndex);
		setSrc(chapterList, reciterId, chapterIndex);
	}, []);

	return <HomeContent />;
}

export async function getStaticProps({ params }) {
	const reciterId = parseInt(params.id);
	const chapId = params.chapId;

	const reciter = await getReciterById(reciterId);
	const chapterList = reciter.moshaf[0].surah_list.split(",");
	const chapterIndex = chapterList.indexOf(chapId);

	return {
		props: {
			reciterId,
			chapterList,
			chapterIndex,
		},
		revalidate: 60,
	};
}

export async function getStaticPaths() {
	let paths = [];

	return {
		paths: paths,
		fallback: "blocking",
	};
}
