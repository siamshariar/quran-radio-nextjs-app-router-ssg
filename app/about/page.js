import { buildMetadata } from "@/lib/metadata";
import { server } from "@/lib/config";
import AboutView from "@/components/pages/AboutView";

export const metadata = buildMetadata({
	title: "About",
	description: "Quran Live Radio and Audio",
	url: `${server}/about`,
	image: `${server}/img/logo/quran-radio-social.png`,
});

export default function Page() {
	return <AboutView />;
}
