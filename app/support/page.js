import { buildMetadata } from "@/lib/metadata";
import { server } from "@/lib/config";
import SupportView from "@/components/pages/SupportView";

export const metadata = buildMetadata({
	title: "Support",
	description: "Quran Live Radio and Audio",
	url: `${server}/support`,
	image: `${server}/img/logo/quran-radio-social.png`,
});

export default function Page() {
	return <SupportView />;
}
