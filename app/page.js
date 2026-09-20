import { buildMetadata, getPlaybackMeta, isStaticExport } from "@/lib/metadata";

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

// The home page's actual UI (HomeContent, with its playback controls) is
// already rendered by the globally-mounted <Player /> panel in
// app/providers.jsx for the "/" route — rendering it again here would show
// two overlapping playback control bars.
export default function Page() {
	return null;
}
