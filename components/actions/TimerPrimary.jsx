import { useEffect, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import { PlayerStore, setPlaying, setTimer, stopTimer } from "@/store";
import styles from "./TimerPrimary.module.css";

const HOUR_OPTIONS = Array.from({ length: 13 }, (_, i) => i);
const MINUTE_OPTIONS = Array.from({ length: 12 }, (_, i) => i * 5);

function formatDur(s) {
	// ~~ => math.floor()
	const h = ~~(s / 3600);
	const m = ~~((s % 3600) / 60);
	const rs = ~~(s % 60);

	const formattedTime = `${
		h > 0 ? String(h).padStart(2, "0").concat(":") : ""
	}${String(m).padStart(2, "0")}:${String(rs).padStart(2, "0")}`;

	return formattedTime;
}

const TimerSet = ({ classes, icon, open, setOpen, handleSetTimer }) => {
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(5);

	const handleConfirm = () => {
		if (hour === 0 && minute === 0) return;
		handleSetTimer(hour * 3600 + minute * 60);
		setOpen(false);
	};

	return (
		<>
			<div className={classes.btn} onClick={() => setOpen(true)}>
				<IonIcon icon={icon} slot="start" class={classes.icon} />
			</div>
			<TimerModal open={open} setOpen={setOpen}>
				<div className={styles.header}>Sleep Timer</div>
				<div className={styles.row}>
					<select value={hour} onChange={(e) => setHour(Number(e.target.value))}>
						{HOUR_OPTIONS.map((h) => (
							<option key={h} value={h}>
								{h} hr
							</option>
						))}
					</select>
					<select value={minute} onChange={(e) => setMinute(Number(e.target.value))}>
						{MINUTE_OPTIONS.map((m) => (
							<option key={m} value={m}>
								{m} min
							</option>
						))}
					</select>
				</div>
				<div className={styles.actions}>
					<button type="button" onClick={() => setOpen(false)}>
						Cancel
					</button>
					<button type="button" className={styles.primary} onClick={handleConfirm}>
						Confirm
					</button>
				</div>
			</TimerModal>
		</>
	);
};

const UnsetTimer = ({ classes, icon, open, setOpen, timeRemaining }) => {
	return (
		<>
			<div className={classes.btn} onClick={() => setOpen(true)}>
				<IonIcon icon={icon} slot="start" class={classes.icon} />
			</div>
			<TimerModal open={open} setOpen={setOpen}>
				<div className={styles.header}>Sleep Timer</div>
				<div className={styles.status}>Stop after {formatDur(timeRemaining)}</div>
				<div className={styles.actions}>
					<button
						type="button"
						onClick={() => {
							stopTimer();
							setOpen(false);
						}}>
						Cancel Timer
					</button>
					<button type="button" className={styles.primary} onClick={() => setOpen(false)}>
						Hide
					</button>
				</div>
			</TimerModal>
		</>
	);
};

const TimerModal = ({ open, setOpen, children }) => {
	const modalRef = useRef(null);

	useEffect(() => {
		// Only listen for outside clicks while open — matches the pattern already
		// used by PlaybackRate's modal to avoid swallowing every click on the page.
		if (!open) return;

		const handleOutsideClick = (e) => {
			if (modalRef.current && modalRef.current.contains(e.target)) return;
			setOpen(false);
		};
		document.body.addEventListener("click", handleOutsideClick);
		return () => {
			document.body.removeEventListener("click", handleOutsideClick);
		};
	}, [open, setOpen]);

	return (
		<>
			<div className={`${styles.backdrop} ${open ? styles.open : ""}`} />
			<div
				ref={modalRef}
				className={`${styles.modal} ${open ? styles.open : ""}`}
				onClick={(e) => e.stopPropagation()}>
				<div className={styles.content}>{children}</div>
			</div>
		</>
	);
};

const Timer = ({ classes, icon }) => {
	const timer = PlayerStore.useState((s) => s.timer);
	const [open, setOpen] = useState(false);

	const handleSetTimer = (v) => {
		setTimer(v);
	};

	useEffect(() => {
		if (timer === 0) {
			stopTimer();
			setPlaying(false);
		}
	}, [timer]);

	return (
		<div className={classes.root}>
			{timer > 0 ? (
				<UnsetTimer
					classes={classes}
					icon={icon.added}
					open={open}
					setOpen={setOpen}
					timeRemaining={timer}
				/>
			) : (
				<TimerSet
					classes={classes}
					icon={icon.removed}
					open={open}
					setOpen={setOpen}
					handleSetTimer={handleSetTimer}
				/>
			)}
		</div>
	);
};

export default Timer;
