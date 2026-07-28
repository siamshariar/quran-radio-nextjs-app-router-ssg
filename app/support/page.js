import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import SupportView from "@/components/pages/SupportView";

export async function generateMetadata({ searchParams }) {
	const params = isStaticExport ? {} : await searchParams;
	return buildMetadata({
		title: "Support",
		description: "Quran Live Radio and Audio",
		path: "/support",
		playback: getPlaybackMeta(params),
	});
}

export default function Page() {
	return <SupportView />;
}
