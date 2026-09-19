import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import { getAllChapters } from "@/lib/fetch";
import ChaptersView from "@/components/pages/ChaptersView";

export async function generateMetadata({ searchParams }) {
	const params = isStaticExport ? {} : await searchParams;
	return buildMetadata({
		title: "Chapters",
		description: "Quran Live Radio and Audio",
		path: "/chapters",
		playback: getPlaybackMeta(params),
	});
}

export default async function Page() {
	const chapters = await getAllChapters();
	return <ChaptersView chapters={chapters} />;
}
