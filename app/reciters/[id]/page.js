import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { server } from "@/lib/config";
import { getReciterById } from "@/lib/fetch";
import { reciters } from "@/data/reciters";
import RecitersDetailView from "@/components/pages/RecitersDetailView";

export const revalidate = 60;

export async function generateStaticParams() {
	return reciters.map((reciter) => ({ id: encodeURI(String(reciter.id)) }));
}

export async function generateMetadata({ params }) {
	const { id } = await params;
	return buildMetadata({
		title: "Chapters",
		description: "Quran Live Radio and Audio",
		url: `${server}/reciters/${id}`,
		image: `${server}/img/logo/quran-radio-social.png`,
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
