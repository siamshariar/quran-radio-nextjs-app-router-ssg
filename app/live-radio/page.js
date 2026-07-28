import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import { server } from "@/lib/config";
import { getAllLiveRadios } from "@/lib/fetch";
import LiveRadioView from "@/components/pages/LiveRadioView";

export async function generateMetadata({ searchParams }) {
	const params = isStaticExport ? {} : await searchParams;
	return buildMetadata({
		title: "Live Radios",
		description: "Quran Live Radio and Audio",
		url: `${server}/live-radio`,
		image: `${server}/img/logo/quran-radio-social.png`,
		playback: getPlaybackMeta(params),
	});
}

export default async function Page() {
	const liveRadios = await getAllLiveRadios();
	return <LiveRadioView liveRadios={liveRadios} />;
}
