import classNames from "classnames";

import {
  homeOutline,
  exploreOutline,
  subscriptionOutline,
  libraryOutline,
  musicalNoteOutline,
  musicalNote,
} from "../../icons";

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
