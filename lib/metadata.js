import { headers } from "next/headers";
import { server } from "@/lib/config";
import { reciters } from "@/data/reciters";
import { chapters } from "@/data/chapters";

const commonTitle = "Quran.radio | Quran Live Radio and Audio";

// The Capacitor static-export build (npm run export) has no per-request
// server, so generateMetadata can't read searchParams (or headers) there at
// all — even awaiting the promise (regardless of what's done with the
// result) throws a StaticGenBailoutError and fails the whole export. Pages
// must skip reading it entirely in that mode and fall back to static
// metadata, matching pre-existing export behavior.
export const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

// og:url/og:image must be absolute per the Open Graph spec, so they need a
// real origin. Guessing it from VERCEL_ENV was wrong: this project's own
// Vercel deployment is itself the "production" slot for a separate test
// project (quran-radio-nextjs-app-router-ssg.vercel.app), not a preview of
// the real www.quran.radio site, so VERCEL_ENV === "production" doesn't mean
// what it sounds like here. Reading the actual request's Host header always
// matches whatever domain actually served the page — localhost, any Vercel
// preview/staging deployment, or the real production domain — with no
// guessing involved.
async function getRequestOrigin() {
	if (isStaticExport) return server;
	try {
		const h = await headers();
		const host = h.get("host");
		if (!host) return server;
		const proto = h.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
		return `${proto}://${host}`;
	} catch {
		return server;
	}
}

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

export async function buildMetadata({ title = "", description = "", path = "/", image = "", type = "website", playback = null } = {}) {
	let fullTitle;
	let fullDescription = description;

	if (playback) {
		fullTitle = `${playback.reciterName} — Surah ${playback.chapterName} | ${commonTitle}`;
		fullDescription = `Listen to Surah ${playback.chapterName} (${playback.chapterMeaning}) recited by ${playback.reciterName} on Quran.radio.`;
	} else {
		fullTitle = title ? `${title} | ${commonTitle}` : commonTitle;
	}

	const origin = await getRequestOrigin();
	const url = `${origin}${path}`;
	const resolvedImage = `${origin}${image || "/img/logo/quran-radio-social.png"}`;

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
