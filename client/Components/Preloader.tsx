// components/Preloader.js

import React from "react";
import styles from "./Preloader.module.css"; // Import the CSS module

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.loadingContainer}>
        <div className={styles.firstLetter}>
          <div className={styles.hammer2}>
            <p></p>
          </div>
          <div className={styles.thirdLetter}>
            <div className={styles.t}></div>
          </div>
          <div className={styles.verticalRotate}></div>
          <div className={styles.animatedBar}></div>
          <div className={styles.hammer}>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
