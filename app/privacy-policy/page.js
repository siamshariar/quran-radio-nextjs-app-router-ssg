import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import PrivacyPolicyView from "@/components/pages/PrivacyPolicyView";

export async function generateMetadata({ searchParams }) {
	const params = isStaticExport ? {} : await searchParams;
	return buildMetadata({
		title: "Privacy Policy",
		description: "Quran Live Radio and Audio",
		path: "/privacy-policy",
		playback: getPlaybackMeta(params),
	});
}

export default function Page() {
	return <PrivacyPolicyView />;
}
