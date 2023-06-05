import classNames from "classnames";
import { menu } from "ionicons/icons";

import {
  homeOutline,
  exploreOutline,
  subscriptionOutline,
  libraryOutline,
  musicalNoteOutline,
  musicalNote,
} from "../../icons";

import Header from "../sections/Header";
import Name from "../sections/Name";
import Image from "../sections/Image";
import Tune from "../sections/Tune";
import ButtonGroup from "../sections/ButtonGroup";
import Visualizer from "../sections/Visualizer";
import ControlButtons from "../sections/ControlButtons";
import AudioMini from "../player/AudioMini";
import Footer from "../sections/Footer";
import Timer from "../sections/Timer";
import PlaybackMode from "../actions/PlaybackMode";
import HomeContent from "../ui/HomeContent";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.panel_content}>
      <HomeContent />
    </div>
  );
};

export default Home;
