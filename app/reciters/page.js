import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import { getAllReciters } from "@/lib/fetch";
import RecitersListView from "@/components/pages/RecitersListView";

export async function generateMetadata({ searchParams }) {
	const params = isStaticExport ? {} : await searchParams;
	return buildMetadata({
		title: "Reciters",
		description: "Quran Live Radio and Audio",
		path: "/reciters",
		playback: getPlaybackMeta(params),
	});
}

export default async function Page() {
	const reciters = await getAllReciters();
	return <RecitersListView reciters={reciters} />;
}
