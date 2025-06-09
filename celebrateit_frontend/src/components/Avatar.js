import React from "react";
import styles from "../styles/Avatar.module.css";

// Helper to optimize image format, quality, and size for performance
function optimizeCloudinaryURL(url, width = 100, height = 100) {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width},h_${height},c_fill/`
  );
}

function Avatar(props) {
  // Props and defaults
  const { src, alt, size, first_name, last_name, username } = props;
  const avatarSize = size || "md";
  const sizeMap = {
    sm: 80,
    md: 200,
    lg: 400,
  };
  const dimension = sizeMap[avatarSize] || 100;
  const avatarAlt = alt || "avatar";

  // Helpers
  const getInitials = () => {
    if (first_name && last_name) {
      return `${first_name[0]}${last_name[0]}`.toUpperCase();
    }
    if (first_name) {
      return first_name[0].toUpperCase();
    }
    if (last_name) {
      return last_name[0].toUpperCase();
    }
    if (username) {
      return username[0].toUpperCase();
    }
    return "?";
  };

  return src ? (
    <img
      src={optimizeCloudinaryURL(src, dimension, dimension)}
      alt={avatarAlt}
      width={dimension}
      height={dimension}
      className={`${styles.Avatar} ${styles[avatarSize]}`}
    />
  ) : (
    <div className={`${styles.AvatarFallback} ${styles[avatarSize]}`}>
      {getInitials()}
    </div>
  );
}

export default Avatar;
