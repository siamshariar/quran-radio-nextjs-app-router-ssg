import { LocalStore } from "@/store/local";
import { useSettingStorage } from "@/hooks/useSettingStorage";
import styles from "./PlaybackMode.module.css";
import { IonIcon } from "@ionic/react";

const PlaybackMode = ({ classes, icon }) => {
	const mode = LocalStore.useState((s) => s.settings.mode);
	const { setMode } = useSettingStorage();

	const setPlaybackMode = async (e, mode) => {
		await setMode(mode);
		return;
	};

	return (
		<div className={`${classes.root}, ${classes.mode}`}>
			{mode && mode === "normal" && (
				<>
				<div
					className={classes.btn}
					onClick={(e) => setPlaybackMode(e, "live")}>
					<IonIcon icon={icon.normal} slot="start" class={classes.icon} />
				</div>
				<div
					onClick={(e) => setPlaybackMode(e, "live")}
					className={classes.mode_txt}>Mode</div>
				</>
			)}

			{mode && mode === "live" && (
				<>
				<div
					className={classes.btn} //
					onClick={(e) => setPlaybackMode(e, "normal")}>
					<IonIcon icon={icon.live} slot="start" class={classes.icon} />
				</div>
				<div
					onClick={(e) => setPlaybackMode(e, "normal")}
					className={classes.mode_txt}>Mode</div>
				</>
			)}
		</div>
	);
};

export default PlaybackMode;
