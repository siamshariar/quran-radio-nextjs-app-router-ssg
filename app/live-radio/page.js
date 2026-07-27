import { buildMetadata } from "@/lib/metadata";
import { server } from "@/lib/config";
import { getAllLiveRadios } from "@/lib/fetch";
import LiveRadioView from "@/components/pages/LiveRadioView";

export const metadata = buildMetadata({
	title: "Live Radios",
	description: "Quran Live Radio and Audio",
	url: `${server}/live-radio`,
	image: `${server}/img/logo/quran-radio-social.png`,
});

export default async function Page() {
	const liveRadios = await getAllLiveRadios();
	return <LiveRadioView liveRadios={liveRadios} />;
}
