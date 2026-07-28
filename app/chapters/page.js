import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import { server } from "@/lib/config";
import { getAllChapters } from "@/lib/fetch";
import ChaptersView from "@/components/pages/ChaptersView";

export async function generateMetadata({ searchParams }) {
	const params = isStaticExport ? {} : await searchParams;
	return buildMetadata({
		title: "Chapters",
		description: "Quran Live Radio and Audio",
		url: `${server}/chapters`,
		image: `${server}/img/logo/quran-radio-social.png`,
		playback: getPlaybackMeta(params),
	});
}

export default async function Page() {
	const chapters = await getAllChapters();
	return <ChaptersView chapters={chapters} />;
}
