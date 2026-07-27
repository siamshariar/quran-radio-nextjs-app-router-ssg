import { buildMetadata } from "@/lib/metadata";
import { server } from "@/lib/config";
import { getAllChapters } from "@/lib/fetch";
import ChaptersView from "@/components/pages/ChaptersView";

export const metadata = buildMetadata({
	title: "Chapters",
	description: "Quran Live Radio and Audio",
	url: `${server}/chapters`,
	image: `${server}/img/logo/quran-radio-social.png`,
});

export default async function Page() {
	const chapters = await getAllChapters();
	return <ChaptersView chapters={chapters} />;
}
