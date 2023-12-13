import classNames from "classnames";
import { musicalNoteOutline, musicalNote } from "../../icons";
import HeaderHome from "../sections/HeaderHome";
import Name from "../sections/Name";
import Tune from "../sections/Tune";
import ButtonGroup from "../sections/ButtonGroup";
import Visualizer from "../sections/Visualizer";
import ControlButtons from "../sections/ControlButtons";
import PlaybackMode from "../actions/PlaybackMode";
import styles from "./HomeContent.module.css";

const HomeContent = () => {
	return (
		<div className={styles.panel_content}>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<HeaderHome />
				</div>
				<div className={styles.name}>
					<Name />
				</div>
				<div className={styles.image}>
					<div className={classNames(styles.item, styles.btn)}></div>
					<Tune />
					<PlaybackMode
						classes={{
							root: styles.item,
							btn: styles.btn,
							icon: styles.icon,
						}}
						icon={{
							normal: musicalNote,
							live: musicalNoteOutline,
						}}
					/>
				</div>

				<div className={styles.buttons}>
					<ButtonGroup />
				</div>

				<div className={styles.visualizer}>
					<Visualizer />
				</div>
				<div className={styles.audio}>
					<ControlButtons />
				</div>
			</div>
		</div>
	);
};

export default HomeContent;
