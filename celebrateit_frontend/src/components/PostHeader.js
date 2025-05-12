import React from "react";
import styles from "../styles/PostCard.module.css";

/**
 * Shared header for posts/nominations.
 * Includes avatar placeholder, display name, date, and optional dropdown.
 */
function PostHeader(props) {
  const { display_name, created_at, renderDropdown } = props;

  return (
    <div className="d-flex align-items-center justify-content-between mb-3">
      <div className="d-flex align-items-center">
        <div className={styles.AvatarPlaceholder} />
        <strong className="ml-2">{display_name}</strong>
      </div>
      <div className="d-flex align-items-center">
        <small className="text-muted me-2">{created_at}</small>
        {renderDropdown}
      </div>
    </div>
  );
}

export default PostHeader;
