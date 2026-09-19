import { useEffect, useState } from "react";
import Image from "next/image";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GetAppIcon from '@mui/icons-material/GetApp';
import styles from "./index.module.css";

const QuranTubeModal = ({ handleModal }) => {
	return (
		<div className={styles.promo_dialog}>
			<div className={styles.promo_modal_content}>
				<div className={styles.popup_logo}>
					<Image
						src="/img/logo/quran-tube-logo.png"
						alt="QuranTube logo"
						width={150}
						height={80}
						style={{ objectFit: "contain", objectPosition: "center" }}
						loading="eager"
						unoptimized
					/>
				</div>
				<p className={styles.dialog_title}>Install Quran.tube App</p>
				<div className={styles.dialog_text}>
					Experience Quranic content like never before with the Quran.tube app.
					Install now and enjoy authentic islamic videos.
				</div>
				<div className={styles.modal_btn}>
					<button onClick={handleModal}>
						Already installed
            <CheckCircleIcon />
					</button>
					<button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.deeniinfotech.qurantube&pcampaignid=web_share', '_blank')}>
						Install now
            <GetAppIcon />
					</button>
				</div>
			</div>
		</div>
	);
};

export default QuranTubeModal;