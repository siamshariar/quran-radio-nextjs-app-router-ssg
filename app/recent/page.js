import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import RecentView from "@/components/pages/RecentView";

export async function generateMetadata({ searchParams }) {
	const params = isStaticExport ? {} : await searchParams;
	return buildMetadata({
		title: "Recents",
		description: "Quran Live Radio and Audio",
		path: "/recent",
		playback: getPlaybackMeta(params),
	});
}

export default function Page() {
	return <RecentView />;
}
