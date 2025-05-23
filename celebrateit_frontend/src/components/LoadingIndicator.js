import React from "react";
import styles from "../styles/LoadingIndicator.module.css";

const LoadingIndicator = ({ message = "Loading..." }) => {
  return (
    <div className={styles.LoaderWrapper}>
      <div className={styles.Spinner} />
      <p className={styles.Message}>{message}</p>
    </div>
  );
};

export default LoadingIndicator;
