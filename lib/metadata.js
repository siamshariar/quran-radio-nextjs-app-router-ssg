import { server } from "@/lib/config";

const commonTitle = "Quran.radio | Quran Live Radio and Audio";

export function buildMetadata({ title = "", description = "", url = "", image = "", type = "website" } = {}) {
	const fullTitle = title ? `${title} | ${commonTitle}` : commonTitle;
	const resolvedImage = image || `${server}/img/logo/quran-radio-social.png`;

	return {
		title: fullTitle,
		description,
		openGraph: {
			title: fullTitle,
			description,
			url,
			images: [{ url: resolvedImage }],
			type,
			siteName: "Quran.radio",
		},
		twitter: {
			card: "summary",
			site: "@Quranradio",
			title: fullTitle,
			description,
			images: [resolvedImage],
		},
	};
}
