import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import HomeView from "@/components/pages/HomeView";

export async function generateMetadata({ searchParams }) {
	const params = isStaticExport ? {} : await searchParams;
	return buildMetadata({
		title: "",
		description: "Quran Live Radio and Audio",
		path: "/",
		playback: getPlaybackMeta(params),
	});
}

export default function Page() {
	return <HomeView />;
}
