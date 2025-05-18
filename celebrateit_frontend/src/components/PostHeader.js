import React from "react";
// import styles from "../styles/PostCard.module.css";
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
    <div className="d-flex justify-content-between mb-3">
      <div className="d-flex align-items-center">
        <img src={profile_image} alt={display_name} className={styles.Avatar} />
        <div className="ms-3">
          <strong className="d-block">{display_name}</strong>
          {presentation && (
            <div className="text-muted small">{presentation}</div>
          )}
        </div>
      </div>
      <div className="d-flex align-items-start">
        {created_at && <small className="text-muted me-2">{created_at}</small>}
        {renderDropdown}
      </div>
    </div>
  );
}

export default PostHeader;
