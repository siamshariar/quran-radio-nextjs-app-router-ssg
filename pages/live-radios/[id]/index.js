import HomeContent from "@/components/pages/Home";
import { useSettingStorage } from "@/hooks/useSettingStorage";
import { getLiveIndexById } from "@/lib/fetch";
import { setLiveRadio, setLiveSrc } from "@/store";
import { LocalStore } from "@/store/local";
import { useEffect } from "react";

export default function HomePlay({ liveIndex }) {
	const mode = LocalStore.useState((s) => s.settings.mode);
	const { setMode } = useSettingStorage();

	const setPlaybackMode = async (mode) => {
		await setMode(mode);
		return;
	};

	useEffect(() => {
		if (mode === "normal") {
			setPlaybackMode("live");
		}
		setLiveRadio(liveIndex);
		setLiveSrc(liveIndex);
	}, []);

	return <HomeContent />;
}

export async function getStaticProps({ params }) {
	const liveId = parseInt(params.id);

	let liveIndex = await getLiveIndexById(liveId);

	return {
		props: {
			liveIndex,
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
