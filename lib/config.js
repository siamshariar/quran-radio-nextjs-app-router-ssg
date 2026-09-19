// `server` is used everywhere as `${server}/path` (callers always add the
// leading slash), so it must NOT have a trailing slash — a trailing slash
// here produced a double slash (e.g. quran.radio//img/...) in every OG/
// favicon/manifest URL across the whole app.
//
// On Vercel, VERCEL_ENV is "production" only for the domain(s) actually
// assigned as production; every preview/staging deployment (like this
// quran-radio-nextjs-app-router-ssg.vercel.app branch deploy) gets
// VERCEL_ENV="preview" with its own VERCEL_URL. Hardcoding the production
// domain unconditionally meant og:image/og:url on staging pointed at
// www.quran.radio instead of the deployment actually being shared, so link
// previews either showed the wrong page or failed to load the image.
const vercelDeploymentUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;

export const server =
	!process.env.NODE_ENV || process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: process.env.VERCEL_ENV === "production"
		? "https://www.quran.radio"
		: vercelDeploymentUrl || "https://www.quran.radio";

// const apiBaseUrl =
//   !process.env.NODE_ENV || process.env.NODE_ENV === "development"
//     ? "http://localhost:8000/api"
//     : "https://hages.dk/ditqapi/public/api"

const apiBaseUrl = "https://hages.dk/ditqapi/public/api";

export const config = {
	// localDB: "quran_radio",
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	databaseURL: process.env.DB_URL,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
	measurementId: process.env.MEASUREMENT_ID,
	apiBaseUrl: apiBaseUrl,
	localizationCode: "bn",
	translationCode: "tafseer_zakariya",
};

export const appVariables = {
	defaultMode: "normal",
};
