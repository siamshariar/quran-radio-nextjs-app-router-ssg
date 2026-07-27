import { buildMetadata } from "@/lib/metadata";
import { server } from "@/lib/config";
import FavoritesView from "@/components/pages/FavoritesView";

export const metadata = buildMetadata({
	title: "Favorites",
	description: "Quran Live Radio and Audio",
	url: `${server}/favorites`,
	image: `${server}/img/logo/quran-radio-social.png`,
});

export default function Page() {
	return <FavoritesView />;
}
