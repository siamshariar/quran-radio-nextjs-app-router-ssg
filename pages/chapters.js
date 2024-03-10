import AllChapters from "@/components/pages/AllChapters";
import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import HeaderHome from "@/components/sections/HeaderHome";
import { getAllChapters } from "@/lib/fetch";
import Meta from "@/components/core/Meta";
import { server } from "@/lib/config";

export default function Home({ chapters }) {
	return (
		<>
			<Meta
				title="Chapters"
				description="Quran Live Radio and Audio"
				url={`/chapters`}
				image={`${server}/img/logo/quran-radio-social.png`}
				type="website"
			/>

			<div className={styles.panel_content}>
				<div className={styles.wrapper}>
					<HeaderHome />
					<CommonHeader title="Chapters" prev_page="/" />
					<AllChapters chapters={chapters} />
				</div>
			</div>
		</>
	);
}

export async function getStaticProps() {
	const chapters = await getAllChapters();

	return {
		props: {
			chapters,
		},
	};
}
