import { buildMetadata } from "@/lib/metadata";
import { server } from "@/lib/config";
import { getAllReciters } from "@/lib/fetch";
import RecitersListView from "@/components/pages/RecitersListView";

export const metadata = buildMetadata({
	title: "Reciters",
	description: "Quran Live Radio and Audio",
	url: `${server}/reciters`,
	image: `${server}/img/logo/quran-radio-social.png`,
});

export default async function Page() {
	const reciters = await getAllReciters();
	return <RecitersListView reciters={reciters} />;
}
