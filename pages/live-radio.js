import CommonHeader from "@/components/sections/CommonHeader";
import LiveRadioList from "@/components/pages/LiveRadio";
import styles from "@/components/pages/Pages.module.css";
import HeaderHome from "@/components/sections/HeaderHome";
import { getAllLiveRadios } from "@/lib/fetch";
import Meta from "@/components/core/Meta";
import { server } from "@/lib/config";

const LiveRadio = ({ liveRadios }) => {
	return (
		<>
			<Meta
				title="Live Radios"
				description="Quran Live Radio and Audio"
				url={`server/live-radio`}
				image={`${server}/img/logo/quran-radio-social.png`}
				type="website"
			/>
			<div className={styles.panel_content}>
				<div className={styles.wrapper}>
					<div className="page_width">
						<HeaderHome />
						<CommonHeader title="Live Radios" />
						<LiveRadioList liveRadios={liveRadios} />
					</div>
				</div>
			</div>
		</>
	);
};

export default LiveRadio;

export async function getStaticProps() {
	const liveRadios = await getAllLiveRadios();

	return {
		props: {
			liveRadios,
		},
	};
}
