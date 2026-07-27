import { buildMetadata } from "@/lib/metadata";
import { server } from "@/lib/config";
import HomeView from "@/components/pages/HomeView";

export const metadata = buildMetadata({
	title: "",
	description: "Quran Live Radio and Audio",
	url: server,
	image: `${server}/img/logo/quran-radio-social.png`,
});

export default function Page() {
	return <HomeView />;
}
