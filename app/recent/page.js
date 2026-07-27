import { buildMetadata } from "@/lib/metadata";
import { server } from "@/lib/config";
import RecentView from "@/components/pages/RecentView";

export const metadata = buildMetadata({
	title: "Recents",
	description: "Quran Live Radio and Audio",
	url: `${server}/recent`,
	image: `${server}/img/logo/quran-radio-social.png`,
});

export default function Page() {
	return <RecentView />;
}
