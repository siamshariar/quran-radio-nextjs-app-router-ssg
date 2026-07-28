import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import { server } from "@/lib/config";
import FavoritesView from "@/components/pages/FavoritesView";

export async function generateMetadata({ searchParams }) {
	const params = isStaticExport ? {} : await searchParams;
	return buildMetadata({
		title: "Favorites",
		description: "Quran Live Radio and Audio",
		url: `${server}/favorites`,
		image: `${server}/img/logo/quran-radio-social.png`,
		playback: getPlaybackMeta(params),
	});
}

export default function Page() {
	return <FavoritesView />;
}
