export const server =
	!process.env.NODE_ENV || process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: "https://www.quran.radio/";

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
	defaultMode: "live",
};
