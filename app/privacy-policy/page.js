import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import { server } from "@/lib/config";
import PrivacyPolicyView from "@/components/pages/PrivacyPolicyView";

export async function generateMetadata({ searchParams }) {
	const params = isStaticExport ? {} : await searchParams;
	return buildMetadata({
		title: "Privacy Policy",
		description: "Quran Live Radio and Audio",
		url: `${server}/privacy-policy`,
		image: `${server}/img/logo/quran-radio-social.png`,
		playback: getPlaybackMeta(params),
	});
}

export default function Page() {
	return <PrivacyPolicyView />;
}
