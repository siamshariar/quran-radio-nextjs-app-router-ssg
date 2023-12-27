import { server } from "@/lib/config";
import { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import styles from "./share.module.scss";
import ShareModal from "./share-modal";
import { LocalStore } from "@/store/local";

export default function Share({ url, title }) {
	const [shareOpen, setShareOpen] = useState(false);
	const [shareUrl, setShareUrl] = useState("");
	const [shareTitle, setShareTitle] = useState("");
	const isTab = LocalStore.useState((s) => s.isTab);

	const handleShareClose = () => {
		setShareOpen(false);
	};

	const handleShare = () => {
		if (isTab && navigator.share) {
			navigator.share({
				title: title,
				url: url,
			});
		} else {
			setShareUrl(`${server}${url}`);
			setShareTitle(title);
			setShareOpen(true);
		}
	};

	return (
		<>
			<div className={styles.wrapper}>
				<button
					onClick={handleShare}
					className={`${styles.btn} ${styles.btn_web}`}>
					<ShareIcon /> Share
				</button>
			</div>

			<ShareModal
				openModal={shareOpen}
				closer={handleShareClose}
				url={shareUrl}
				title={shareTitle}
			/>
		</>
	);
}
