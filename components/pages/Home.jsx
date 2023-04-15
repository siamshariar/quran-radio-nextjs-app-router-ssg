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
import ShareButton from "../sections/ShareButton";
import Visualizer from "../sections/Visualizer";
import ControlButtons from "../sections/ControlButtons";
import AudioMini from "../player/AudioMini";
import Footer from "../sections/Footer";
import Timer from "../sections/Timer";
import PlaybackRate from "../actions/PlaybackRate";
import styles from "./Home.module.css";

const pages = [
  {
    title: "Home",
    icon: homeOutline,
    url: "/",
  },
  {
    title: "Chapters",
    icon: exploreOutline,
    url: "/chapters",
  },
  {
    title: "Subscriptions",
    icon: subscriptionOutline,
    url: "/chapters",
  },
  {
    title: "Library",
    icon: libraryOutline,
    url: "/chapters",
  },
  {
    title: "Reciters",
    icon: exploreOutline,
    url: "/reciters",
  },
  {
    title: "Subscriptions",
    icon: subscriptionOutline,
    url: "/reciters",
  },
];

const Home = () => {
  return (
    <div className={styles.panel_content}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.name}>
          <Name />
        </div>
        <div className={styles.image}>
          <div className={classNames(styles.item, styles.btn)}></div>
          <Tune />
          <PlaybackRate
            classes={{
              root: styles.item,
              btn: styles.btn,
              icon: styles.icon,
            }}
            icon={musicalNoteOutline}
          />
        </div>

        <div className={styles.buttons}>
          <ButtonGroup />
        </div>

        {/* <div className={styles.share}>
            <ShareButton />
          </div> */}
        <div className={styles.visualizer}>
          <Visualizer />
        </div>
        <div className={styles.audio}>
          <ControlButtons />
        </div>
        {/* <div className={styles.menu}>
            <Footer />
          </div> */}
      </div>
    </div>
  );
};

export default Home;
