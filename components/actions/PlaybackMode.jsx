import { LocalStore } from "@/store/local";
import { useSettingStorage } from "@/hooks/useSettingStorage";
import styles from "./PlaybackMode.module.css";

const PlaybackMode = ({ classes, icon }) => {
  const mode = LocalStore.useState((s) => s.settings.mode);
  const { setMode } = useSettingStorage();

  const setPlaybackMode = async (e, mode) => {
    await setMode(mode);
    return;
  };

  return (
    <div className={classes.root}>
      {mode && mode === "normal" && (
        <div
          className={classes.btn} //
          onClick={(e) => setPlaybackMode(e, "live")}
        >
          <ion-icon icon={icon.normal} slot="start" class={classes.icon} />
        </div>
      )}

      {mode && mode === "live" && (
        <div
          className={classes.btn} //
          onClick={(e) => setPlaybackMode(e, "normal")}
        >
          <ion-icon icon={icon.live} slot="start" class={classes.icon} />
        </div>
      )}
    </div>
  );
};

export default PlaybackMode;
