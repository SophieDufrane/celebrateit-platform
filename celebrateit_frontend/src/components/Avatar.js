import React from "react";
import styles from "../styles/Avatar.module.css";

function Avatar(props) {
  const { src, alt, size } = props;

  const avatarSize = size || "md";
  const avatarAlt = alt || "avatar";

  return (
    <img
      src={src}
      alt={avatarAlt}
      className={`${styles.Avatar} ${styles[avatarSize]}`}
    />
  );
}

export default Avatar;
