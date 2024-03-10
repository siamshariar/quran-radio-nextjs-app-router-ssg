import CommonHeader from "@/components/sections/CommonHeader";
import styles from "@/components/pages/Pages.module.css";
import SupportContent from "@/components/pages/Support";
import HeaderHome from "@/components/sections/HeaderHome";
import Meta from "@/components/core/Meta";
import { server } from "@/lib/config";

const Support = () => {
	return (
		<>
			<Meta
				title="Support"
				description="Quran Live Radio and Audio"
				url={`server/support`}
				image={`${server}/img/logo/quran-radio-social.png`}
				type="website"
			/>
			<div className={styles.panel_content}>
				<div className={styles.wrapper}>
					<div className="page_width">
						<HeaderHome />
						<CommonHeader title="Support" />
						<SupportContent />
					</div>
				</div>
			</div>
		</>
	);
};

export default Support;
