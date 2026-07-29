import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { LocalStore } from "@/store/local";
import { useSettingStorage } from "@/hooks/useSettingStorage";
import styles from "./PlaybackRate.module.css";
import { IonIcon } from "@ionic/react";
import { MoreVert } from "@mui/icons-material";

const PlaybackRate = ({ classes, icon, mode }) => {
	const [modalOpen, setModalOpen] = useState(false);

	const handleModal = (e, open) => {
		if (mode === "normal") {
			e.stopPropagation();
			setModalOpen(open);
		}
	};

	return (
		<>
			<div className={classes.root}>
				<div className={classes.btn} onClick={(e) => handleModal(e, true)}>
					{/* <IonIcon icon={icon} slot="start" class={classes.icon} /> */}
					<MoreVert />
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
		// Only listen for outside clicks while the dropdown is actually open — this
		// used to attach unconditionally on mount, meaning every click anywhere on
		// the site (not just while the dropdown was open) hit handler(e, false),
		// which calls e.stopPropagation() whenever mode === "normal" (the default).
		// That silently swallowed every click on the page before it could reach
		// React's own delegated listener on document, breaking every button site-wide.
		if (!open) return;

		const handleOpen = (e) => {
			// Must check the whole subtree, not just the modal's own wrapper node —
			// clicking a speed button inside the modal is a click on a *descendant*
			// of modalRef.current, so a strict === check let this listener close the
			// modal (and stopPropagation) before the button's own onClick could ever
			// fire, silently discarding every speed selection except whatever the
			// default happened to already be.
			if (modalRef.current && modalRef.current.contains(e.target)) return;
			handler(e, false);
		};
		document.body.addEventListener("click", handleOpen);
		return () => {
			document.body.removeEventListener("click", handleOpen);
		};
	}, [open, handler]);

	const setPlaybackSpeed = (e, rate) => {
		setPlaybackRate(rate);
		handler(e, false);
	};

	return (
		<div
			ref={modalRef}
			className={classNames(styles.modal, open ? styles.open : "")}
			// onClick={(e) => handler(e, false)}
		>
			<div className={styles.playback}>
				<div className={styles.header}>Playback Speed</div>
				<button
					className={playbackRate === 0.5 ? styles.active : ""}
					onClick={(e) => setPlaybackSpeed(e, 0.5)}>
					0.5
				</button>
				<button
					className={playbackRate === 0.75 ? styles.active : ""}
					onClick={(e) => setPlaybackSpeed(e, 0.75)}>
					0.75
				</button>
				<button
					className={playbackRate === 1 ? styles.active : ""}
					onClick={(e) => setPlaybackSpeed(e, 1)}>
					Normal
				</button>
				<button
					className={playbackRate === 1.25 ? styles.active : ""}
					onClick={(e) => setPlaybackSpeed(e, 1.25)}>
					1.25
				</button>
				<button
					className={playbackRate === 1.5 ? styles.active : ""}
					onClick={(e) => setPlaybackSpeed(e, 1.5)}>
					1.5
				</button>
			</div>
		</div>
	);
};

export default PlaybackRate;
