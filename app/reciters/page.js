import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import { server } from "@/lib/config";
import { getAllReciters } from "@/lib/fetch";
import RecitersListView from "@/components/pages/RecitersListView";

export async function generateMetadata({ searchParams }) {
	const params = isStaticExport ? {} : await searchParams;
	return buildMetadata({
		title: "Reciters",
		description: "Quran Live Radio and Audio",
		url: `${server}/reciters`,
		image: `${server}/img/logo/quran-radio-social.png`,
		playback: getPlaybackMeta(params),
	});
}

export default async function Page() {
	const reciters = await getAllReciters();
	return <RecitersListView reciters={reciters} />;
}
