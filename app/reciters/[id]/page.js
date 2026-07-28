import { notFound } from "next/navigation";
import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import { getReciterById } from "@/lib/fetch";
import { reciters } from "@/data/reciters";
import RecitersDetailView from "@/components/pages/RecitersDetailView";

export const revalidate = 60;

export async function generateStaticParams() {
	return reciters.map((reciter) => ({ id: encodeURI(String(reciter.id)) }));
}

export async function generateMetadata({ params, searchParams }) {
	const { id } = await params;
	const query = isStaticExport ? {} : await searchParams;
	const reciter = await getReciterById(parseInt(encodeURI(id)));

	return buildMetadata({
		title: reciter ? `${reciter.name} — Chapters` : "Chapters",
		description: "Quran Live Radio and Audio",
		path: `/reciters/${id}`,
		playback: getPlaybackMeta(query),
	});
}

export default async function Page({ params }) {
	const { id } = await params;
	const reciterId = parseInt(encodeURI(id));

	const reciter = await getReciterById(reciterId);
	const chapterList = reciter.moshaf[0].surah_list.split(",");

	if (!chapterList) {
		notFound();
	}

	return <RecitersDetailView reciter={reciter} chapterList={chapterList} />;
}
