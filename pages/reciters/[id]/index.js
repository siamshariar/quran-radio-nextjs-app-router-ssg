import Chapters from "@/components/pages/Chapters";
import { reciters } from "@/data/reciters";
import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import HeaderHome from "@/components/sections/HeaderHome";
import { getReciterById } from "@/lib/fetch";
import Meta from "@/components/core/Meta";
import { server } from "@/lib/config";

export default function Home({ reciter, chapterList }) {
	return (
		<>
			<Meta
				title="Chapters"
				description="Quran Live Radio and Audio"
				url={`server/reciters/${reciter.id}`}
				image={`${server}/img/logo/quran-radio-social.png`}
				type="website"
			/>

			<div className={styles.panel_content}>
				<div className={styles.wrapper}>
					<HeaderHome />
					<CommonHeader title="Chapters" prev_page="/reciters" />
					<Chapters reciter={reciter} chapterList={chapterList} />
				</div>
			</div>
		</>
	);
}

export async function getStaticProps(context) {
	const id = encodeURI(context.params.id);
	const reciterId = parseInt(id);

	// const reciter = reciters.find((obj) => obj.id === reciterId);
	const reciter = await getReciterById(reciterId);
	const chapterList = reciter.moshaf[0].surah_list.split(",");

	if (!chapterList) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			reciter,
			chapterList,
			// key: id,
		},
		revalidate: 60,
	};
}

export async function getStaticPaths() {
	let paths = [];

	reciters.map((reciter) => {
		let id = encodeURI(reciter.id);
		let obj = { params: { id: id } };
		paths.push(obj);
	});

	return {
		paths: paths,
		fallback: "blocking",
	};
}
