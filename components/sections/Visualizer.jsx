import { AudioStore, setCurrentTime, setIsProgress } from "@/store/audio";
import styles from "./Visualizer.module.css";
import { LocalStore } from "@/store/local";
import classNames from "classnames";

const Visualizer = () => {
	const currentTime = AudioStore.useState((s) => s.currentTime);
	const mode = LocalStore.useState((s) => s.settings.mode);
	const dur = AudioStore.useState((s) => s.dur);

	// const formatDur = (s) => {
	// 	// let h = s - (s %= 360);
	// 	return (s - (s %= 60)) / 60 + (s < 10 ? ":0" : ":") + ~~s;
	// };

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

	const handleProgress = (progress) => {
		setIsProgress(false);
		let compute = (progress * dur) / 100;
		setCurrentTime(compute);
		setTimeout(() => {
			setIsProgress(true);
		}, 1);
	};

	return (
		<div className={styles.root}>
			{/* <div className={styles.duration}>
				<div className={styles.start}>{formatDur(currentTime)}</div>
				{mode === "normal" ? (
					<div className={styles.end}>{formatDur(dur)}</div>
				) : (
					<div className={styles.end}>Live</div>
				)}
			</div> */}

			<div className={styles.start}>
				<span
					style={{ width: `${formatDur(currentTime).length > 5 ? 48 : 32}px` }}>
					{formatDur(currentTime)}
				</span>
			</div>
			<div className={styles.progress}>
				<div
					className={classNames(styles.label)}
					style={{
						width: `${
							dur && mode === "normal"
								? (currentTime * 100) / dur < 10
									? (currentTime * 100) / dur + 1
									: (currentTime * 100) / dur
								: 100
						}%`,
					}}></div>
				<input
					disabled={mode === "live" ? true : false}
					type="range"
					min="0"
					max="100"
					value={dur && mode === "normal" ? (currentTime * 100) / dur : 100}
					onChange={(e) => handleProgress(e.target.value)}
					name="progresBar"
				/>
			</div>
			{mode === "normal" ? (
				<div className={styles.end}>
					<span
						style={{
							width: `${formatDur(dur).length > 5 ? 48 : 32}px`,
						}}>
						{formatDur(dur)}
					</span>
				</div>
			) : (
				<div className={styles.end}>Live</div>
			)}
		</div>
	);
};

export default Visualizer;
