import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import styles from "../styles/PostCard.module.css";
import PostHeader from "./PostHeader";

function PostLayoutShell(props) {
  const {
    title,
    content,
    user, // The username string used to check ownership (for dropdown)
    username, // Used only for fallback avatar initials
    first_name, // Used for fallback avatar initials
    last_name, // Used for fallback avatar initials
    display_name, // The public full name shown next to avatar
    profile_image,
    created_at,
    renderDropdown,
    postActions,
    children,
    extraContent,
    linkTo,
    metaTop,
  } = props;

  const cardBody = (
    <Card.Body>
      <PostHeader
        display_name={display_name}
        profile_image={profile_image}
        user={user}
        username={username}
        first_name={first_name}
        last_name={last_name}
        created_at={created_at}
        renderDropdown={renderDropdown}
      />
      {/* Optional metadata above title (e.g. nominee & tag for nominations) */}
      {metaTop && <div className={styles.MetaTopWrapper}>{metaTop}</div>}

      {/* Always show post title and content */}
      <h5 className={styles.PostTitle}>{title}</h5>
      <p className={styles.PostContent}>{content}</p>

      {/* Optional extra content after main content (e.g. 'View full post' link) */}
      {extraContent && (
        <div className={styles.ViewFullWrapper}>{extraContent}</div>
      )}

      {/* Detail-only content (comment form + comments) */}
      {children && <div className={styles.PostChildren}>{children}</div>}
    </Card.Body>
  );

  return (
    <Card className={`mb-3 ${styles.CardWrapper}`}>
      {linkTo ? (
        <Link to={linkTo} style={{ textDecoration: "none", color: "inherit" }}>
          {cardBody}
        </Link>
      ) : (
        cardBody
      )}

      {/* Like and Comment section */}
      {postActions}
    </Card>
  );
}

export default PostLayoutShell;
