import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import { server } from "@/lib/config";
import RecentView from "@/components/pages/RecentView";

export async function generateMetadata({ searchParams }) {
	const params = isStaticExport ? {} : await searchParams;
	return buildMetadata({
		title: "Recents",
		description: "Quran Live Radio and Audio",
		url: `${server}/recent`,
		image: `${server}/img/logo/quran-radio-social.png`,
		playback: getPlaybackMeta(params),
	});
}

export default function Page() {
	return <RecentView />;
}
