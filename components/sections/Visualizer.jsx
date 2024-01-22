import { AudioStore, setCurrentTime, setIsProgress } from "@/store/audio";
import styles from "./Visualizer.module.css";
import { LocalStore } from "@/store/local";
import classNames from "classnames";

const Visualizer = () => {
	const currentTime = AudioStore.useState((s) => s.currentTime);
	const mode = LocalStore.useState((s) => s.settings.mode);
	const dur = AudioStore.useState((s) => s.dur);
	// console.log(dur);
	const formatDur = (s) => {
		return (s - (s %= 60)) / 60 + (s < 10 ? ":0" : ":") + ~~s;
	};

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
			<div className={styles.duration}>
				<div className={styles.start}>{formatDur(currentTime)}</div>
				{mode === "normal" ? (
					<div className={styles.end}>{formatDur(dur)}</div>
				) : (
					<div className={styles.end}>Live</div>
				)}
			</div>

			<div className={styles.progress}>
				<div
					className={classNames(styles.label)}
					style={{
						width: `${
							dur && mode === "normal" ? (currentTime * 100) / dur : 100
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
		</div>
	);
};

export default Visualizer;
