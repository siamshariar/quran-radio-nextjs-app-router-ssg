import Reciters from "@/components/pages/Reciters";
import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import HeaderHome from "@/components/sections/HeaderHome";
import { getAllReciters } from "@/lib/fetch";
import Meta from "@/components/core/Meta";
import { server } from "@/lib/config";

export default function Home({ reciters }) {
	return (
		<>
			<Meta
				title="Reciters"
				description="Quran Live Radio and Audio"
				url={`server/reciters`}
				image={`${server}/img/logo/quran-radio-social.png`}
				type="website"
			/>

			<div className={styles.panel_content}>
				<div className={styles.wrapper}>
					<HeaderHome />
					<CommonHeader title="Reciters" />
					<div className="page_width">
						<Reciters reciters={reciters} />
					</div>
				</div>
			</div>
		</>
	);
}

export async function getStaticProps() {
	const reciters = await getAllReciters();

	return {
		props: {
			reciters,
		},
	};
}
