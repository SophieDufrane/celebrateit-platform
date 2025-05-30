import React from "react";
import styles from "../styles/Avatar.module.css";

function Avatar(props) {
  const { src, alt, size, first_name, last_name, username } = props;

  const avatarSize = size || "md";
  const avatarAlt = alt || "avatar";

  const getInitials = () => {
    if (first_name && last_name) {
      return `${first_name[0]}${last_name[0]}`.toUpperCase();
    } else if (first_name) {
      return first_name[0].toUpperCase();
    } else if (username) {
      return username[0]?.toUpperCase();
    }
    return "?";
  };

  return src ? (
    <img
      src={src}
      alt={avatarAlt}
      className={`${styles.Avatar} ${styles[avatarSize]}`}
    />
  ) : (
    <div className={`${styles.AvatarFallback} ${styles[avatarSize]}`}>
      {getInitials()}
    </div>
  );
}

export default Avatar;
