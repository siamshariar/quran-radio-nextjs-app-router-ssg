import { buildMetadata } from "@/lib/metadata";
import { server } from "@/lib/config";
import PrivacyPolicyView from "@/components/pages/PrivacyPolicyView";

export const metadata = buildMetadata({
	title: "Privacy Policy",
	description: "Quran Live Radio and Audio",
	url: `${server}/privacy-policy`,
	image: `${server}/img/logo/quran-radio-social.png`,
});

export default function Page() {
	return <PrivacyPolicyView />;
}
