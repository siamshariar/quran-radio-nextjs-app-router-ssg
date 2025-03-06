import { AudioStore, setCurrentTime, setIsProgress, initializeAudioStore } from "@/store/audio";
import styles from "./Visualizer.module.css";
import { LocalStore } from "@/store/local";
import classNames from "classnames";
import { useEffect, useState } from "react";
import storage from "@/store/storage"; // import storage

const Visualizer = () => {
	const currentTime = AudioStore.useState((s) => s.currentTime);
	const mode = LocalStore.useState((s) => s.settings.mode);
	const dur = AudioStore.useState((s) => s.dur);
	const isPlaying = AudioStore.useState((s) => s.isPlaying);

	const [progressWidth, setProgressWidth] = useState(100);

    useEffect(() => {
        initializeAudioStore();
    }, []);

	useEffect(() => {
		if (mode === "normal" && dur) {
			setProgressWidth((currentTime * 100) / dur);
		} else {
			setProgressWidth(100);
		}
	}, [mode, currentTime, dur]);

    useEffect(() => {
        if (mode === "normal" && dur) {
            localStorage.setItem("audioPausedTime", currentTime);
            storage.setItem("audioPausedTime", currentTime);
        }
    }, [currentTime, mode, dur]);

	function formatDur(s) {
		const h = ~~(s / 3600);
		const m = ~~((s % 3600) / 60);
		const rs = ~~(s % 60);
		return `${
			h > 0 ? String(h).padStart(2, "0").concat(":") : ""
		}${String(m).padStart(2, "0")}:${String(rs).padStart(2, "0")}`;
	}

	const handleProgress = (progress) => {
		setIsProgress(false);
		let compute = (progress * dur) / 100;
		setCurrentTime(compute);
		localStorage.setItem("audioPausedTime", compute);
        storage.setItem("audioPausedTime", compute);
		setTimeout(() => {
			setIsProgress(true);
		}, 1);
	};

	return (
		<div className={styles.root}>
			<div className={styles.start}>
				<span style={{ width: `${formatDur(currentTime).length > 5 ? 48 : 35}px` }}>
					{formatDur(currentTime)}
				</span>
			</div>
			<div className={styles.progress}>
				<div
					className={classNames(styles.label)}
					style={{
						width: `${progressWidth}%`,
					}}></div>
				<input
					type="range"
					min="0"
					max="100"
					value={mode === "normal" && dur ? progressWidth : 100}
					onChange={(e) =>
						mode === "normal" && dur && handleProgress(e.target.value)
					}
					name="progressBar"
				/>
			</div>
			<div className={styles.end}>
				<span className={styles.fixedWidth}>
					{mode === "normal" ? formatDur(dur) : "Live"}
				</span>
			</div>
		</div>
	);
};

export default Visualizer;
