import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";
import HomeView from "@/components/pages/HomeView";

export async function generateMetadata({ searchParams }) {
	const params = isStaticExport ? {} : await searchParams;
	// og:url must reflect the exact shared link (including ?reciter=&chapter=),
	// not just the bare path — crawlers like Facebook cache a shared link by its
	// og:url, so a constant "/" here would collapse every reciter/chapter share
	// into a single cached preview instead of one per shared track.
	const qs = new URLSearchParams(params).toString();
	return buildMetadata({
		title: "",
		description: "Quran Live Radio and Audio",
		path: qs ? `/?${qs}` : "/",
		playback: getPlaybackMeta(params),
	});
}

export default function Page() {
	return <HomeView />;
}
