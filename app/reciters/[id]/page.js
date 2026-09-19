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

	// og:url must reflect the exact shared link (including ?reciter=&chapter=),
	// not just the bare path — crawlers like Facebook cache a shared link by its
	// og:url, so a constant path here would collapse every chapter share on this
	// reciter into a single cached preview instead of one per shared chapter.
	const qs = new URLSearchParams(query).toString();

	return buildMetadata({
		title: reciter ? `${reciter.name} — Chapters` : "Chapters",
		description: "Quran Live Radio and Audio",
		path: qs ? `/reciters/${id}?${qs}` : `/reciters/${id}`,
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
