import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./DeeniTvPromoModal.module.css";

const DeeniTvPromoModal = ({ onClose }) => {
	return (
		<div className={styles.root} role="dialog" aria-modal="true" aria-label="Deeni TV promo">
			<div className={styles.backdrop} />
			<div className={styles.card}>
				<button className={styles.closeButton} onClick={onClose} aria-label="Close promo">
					<CloseIcon />
				</button>
				<div className={styles.popupLogo}>
					<Image
						src="/img/logo/deeni-tv.png"
						alt="Quran.radio"
						width={150}
						height={80}
						style={{ objectFit: "contain", objectPosition: "center" }}
						loading="eager"
						unoptimized
					/>
				</div>
				<p className={styles.title}>Deeni TV is now live</p>
				<p className={styles.text}>
					Watch the latest Islamic videos, updates, and launches on Deeni TV.
				</p>
			</div>
		</div>
	);
};

export default DeeniTvPromoModal;