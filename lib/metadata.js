import { server } from "@/lib/config";
import { reciters } from "@/data/reciters";
import { chapters } from "@/data/chapters";

const commonTitle = "Quran.radio | Quran Live Radio and Audio";

// The Capacitor static-export build (npm run export) has no per-request
// server, so generateMetadata can't read searchParams there at all — even
// awaiting the searchParams promise (regardless of what's done with the
// result) throws a StaticGenBailoutError and fails the whole export. Pages
// must skip reading it entirely in that mode and fall back to static
// metadata, matching pre-existing export behavior.
export const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

// The app tracks playback at reciter + chapter (surah) level only — there's
// no per-verse/ayah state anywhere in the player, so shared-link metadata
// can only ever reflect reciter + surah, never a specific ayah number.
export function getPlaybackMeta(searchParams) {
	const reciterId = searchParams?.reciter;
	const chapterNo = searchParams?.chapter;
	if (!reciterId || !chapterNo) return null;

	const reciter = reciters.find((r) => String(r.id) === String(reciterId));
	const chapter = chapters.find((c) => String(c.chapterNo) === String(chapterNo));
	if (!reciter || !chapter) return null;

	return {
		reciterName: reciter.name,
		chapterNo: chapter.chapterNo,
		chapterName: chapter.name,
		chapterMeaning: chapter.meaning,
	};
}

export function buildMetadata({ title = "", description = "", url = "", image = "", type = "website", playback = null } = {}) {
	let fullTitle;
	let fullDescription = description;

	if (playback) {
		fullTitle = `${playback.reciterName} — Surah ${playback.chapterName} | ${commonTitle}`;
		fullDescription = `Listen to Surah ${playback.chapterName} (${playback.chapterMeaning}) recited by ${playback.reciterName} on Quran.radio.`;
	} else {
		fullTitle = title ? `${title} | ${commonTitle}` : commonTitle;
	}

	const resolvedImage = image || `${server}/img/logo/quran-radio-social.png`;

	return {
		title: fullTitle,
		description: fullDescription,
		openGraph: {
			title: fullTitle,
			description: fullDescription,
			url,
			images: [{ url: resolvedImage }],
			type,
			siteName: "Quran.radio",
		},
		twitter: {
			card: "summary",
			site: "@Quranradio",
			title: fullTitle,
			description: fullDescription,
			images: [resolvedImage],
		},
	};
}
