import React from "react";
import styles from "../styles/Profile.module.css";

/**
 * Shared header for posts/nominations.
 * Includes avatar placeholder, display name, date, and optional dropdown.
 */
function PostHeader(props) {
  const {
    profile_image,
    display_name,
    presentation,
    created_at,
    renderDropdown,
  } = props;

  console.log("Profile image src:", profile_image);

  return (
    <div className={styles.PostHeaderWrapper}>
      <div className={styles.HeaderLeft}>
        <img src={profile_image} alt={display_name} className={styles.Avatar} />
        <strong>{display_name}</strong>
      </div>
      <div className="d-flex align-items-center">
        <small className="text-muted me-2">{created_at}</small>
        {renderDropdown}
      </div>
    </div>
  );
}

export default PostHeader;
