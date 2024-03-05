import Image from "next/image";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import styles from "./index.module.css";

const Dialog = ({ handleDialog }) => {
	return (
		<div className={styles.dialog}>
			<div className={styles.dialog_content}>
				<div className={styles.popup_logo}>
					<Image
						src="/img/logo/logo.png"
						alt=""
						width={150}
						height={80}
						style={{ objectFit: "contain", objectPosition: "center" }}
						loading="eager"
						unoptimized
					/>
				</div>
				<p className={styles.dialog_title}>Quran Live Radio and Audio</p>
				<div className={styles.dialog_text}>
					Discover the beauty of Quranic recitations with Quran.radio. Choose
					between <span className={styles.dialog_des_mode}>Live</span> for
					real-time broadcasts and{" "}
					<span className={styles.dialog_des_mode}>Reciters</span> for recorded
					sessions. Switch sources if you encounter any connection issues.
				</div>
				<div className={styles.dialog_btn}>
					<button onClick={handleDialog}>
						Start Listening
						<PlayCircleOutlineIcon />
					</button>
				</div>
			</div>
		</div>
	);
};
export default Dialog;
