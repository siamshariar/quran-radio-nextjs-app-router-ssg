import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import { server } from "@/lib/config";
import AboutView from "@/components/pages/AboutView";

export async function generateMetadata({ searchParams }) {
	const params = isStaticExport ? {} : await searchParams;
	return buildMetadata({
		title: "About",
		description: "Quran Live Radio and Audio",
		url: `${server}/about`,
		image: `${server}/img/logo/quran-radio-social.png`,
		playback: getPlaybackMeta(params),
	});
}

export default function Page() {
	return <AboutView />;
}
