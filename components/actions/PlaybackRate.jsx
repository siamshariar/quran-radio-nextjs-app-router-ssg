import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { LocalStore } from "@/store/local";
import { useSettingStorage } from "@/hooks/useSettingStorage";
import styles from "./PlaybackRate.module.css";
import { IonIcon } from "@ionic/react";

const PlaybackRate = ({ classes, icon }) => {
	const [modalOpen, setModalOpen] = useState(false);

	const handleModal = (e, open) => {
		e.stopPropagation();
		setModalOpen(open);
	};

	return (
		<>
			<div className={classes.root}>
				<div
					className={classes.btn} //
					onClick={(e) => handleModal(e, true)}>
					<IonIcon icon={icon} slot="start" class={classes.icon} />
				</div>
			</div>
			<PlaybackRateModal open={modalOpen} handler={handleModal} />
		</>
	);
};

const PlaybackRateModal = ({ open, handler }) => {
	const modalRef = useRef(null);
	const playbackRate = LocalStore.useState((s) => s.settings.playbackRate);
	const { setPlaybackRate } = useSettingStorage();

	useEffect(() => {
		const handleOpen = (e) => {
			if (e.target === modalRef.current) return;
			handler(e, false);
		};
		document.body.addEventListener("click", handleOpen);
		return () => {
			document.body.removeEventListener("click", handleOpen);
		};
	}, [handler]);

	const setPlaybackSpeed = (rate) => {
		setPlaybackRate(rate);
	};

	return (
		<div
			ref={modalRef}
			className={classNames(styles.modal, open ? styles.open : "")}
			// onClick={(e) => handler(e, false)}
		>
			<div className={styles.playback}>
				<button
					className={playbackRate === 0.25 ? styles.active : ""}
					onClick={() => setPlaybackSpeed(0.25)}>
					0.25
				</button>
				<button
					className={playbackRate === 0.5 ? styles.active : ""}
					onClick={() => setPlaybackSpeed(0.5)}>
					0.5
				</button>
				<button
					className={playbackRate === 0.75 ? styles.active : ""}
					onClick={() => setPlaybackSpeed(0.75)}>
					0.75
				</button>
				<button
					className={playbackRate === 1 ? styles.active : ""}
					onClick={() => setPlaybackSpeed(1)}>
					Normal
				</button>
				<button
					className={playbackRate === 1.25 ? styles.active : ""}
					onClick={() => setPlaybackSpeed(1.25)}>
					1.25
				</button>
				<button
					className={playbackRate === 1.5 ? styles.active : ""}
					onClick={() => setPlaybackSpeed(1.5)}>
					1.5
				</button>
				<button
					className={playbackRate === 1.75 ? styles.active : ""}
					onClick={() => setPlaybackSpeed(1.75)}>
					1.75
				</button>
				<button
					className={playbackRate === 2 ? styles.active : ""}
					onClick={() => setPlaybackSpeed(2)}>
					2
				</button>
			</div>
		</div>
	);
};

export default PlaybackRate;
