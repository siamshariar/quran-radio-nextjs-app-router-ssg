import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import AboutView from "@/components/pages/AboutView";

export async function generateMetadata({ searchParams }) {
	const params = isStaticExport ? {} : await searchParams;
	return buildMetadata({
		title: "About",
		description: "Quran Live Radio and Audio",
		path: "/about",
		playback: getPlaybackMeta(params),
	});
}

export default function Page() {
	return <AboutView />;
}
