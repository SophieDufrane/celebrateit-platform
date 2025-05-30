import React from "react";
import Avatar from "./Avatar";
import styles from "../styles/PostCard.module.css";

/**
 * Shared header for posts/nominations.
 * Includes avatar placeholder, display name, date, and optional dropdown.
 */
function PostHeader(props) {
  const {
    profile_image,
    username, // Used only for fallback avatar initials
    first_name, // Used for fallback avatar initials
    last_name, // Used for fallback avatar initials
    display_name, // The public full name shown next to avatar
    created_at,
    renderDropdown,
  } = props;

  return (
    <div className={styles.PostHeaderWrapper}>
      <div className={styles.HeaderLeft}>
        <div className={styles.AvatarWithName}>
          <Avatar
            src={profile_image}
            first_name={first_name}
            last_name={last_name}
            username={username}
            size="md"
          />
          <strong>{display_name}</strong>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <small className="text-muted me-2">{created_at}</small>
        {renderDropdown}
      </div>
    </div>
  );
}

export default PostHeader;
