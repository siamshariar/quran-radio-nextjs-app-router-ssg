import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import FavoritesView from "@/components/pages/FavoritesView";

export async function generateMetadata({ searchParams }) {
	const params = isStaticExport ? {} : await searchParams;
	return buildMetadata({
		title: "Favorites",
		description: "Quran Live Radio and Audio",
		path: "/favorites",
		playback: getPlaybackMeta(params),
	});
}

export default function Page() {
	return <FavoritesView />;
}
