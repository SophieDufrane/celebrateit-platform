import React from "react";
import styles from "../styles/LoadingIndicator.module.css";

function LoadingIndicator({ message = "Loading..." }) {
  return (
    <div className={styles.LoaderWrapper} role="status" aria-live="polite">
      <div className={styles.Spinner} />
      <p className={styles.Message}>{message}</p>
    </div>
  );
}

export default LoadingIndicator;
