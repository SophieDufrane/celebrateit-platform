import React from "react";
import { Card } from "react-bootstrap";
import styles from "../styles/PostCard.module.css";

const PostLayoutShell = (props) => {
  const {
    title,
    content,
    image,
    display_name,
    created_at,
    likes_count,
    comments_count,
  } = props;

  return (
    <Card className={`mb-3 ${styles.CardWrapper}`}>
      <Card.Body>
        {/* Header: Avatar + Author name + Date */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          {/* Left: Icon + Author name */}
          <div className="d-flex align-items-center">
            <div className={styles.AvatarPlaceholder} />
            <strong className="ms-2">{display_name}</strong>
          </div>

          {/* Right: Date */}
          <div className="d-flex align-items-center">
            <small className="text-muted">{created_at}</small>
          </div>
        </div>

        {/* Title and Content */}
        <h5 className={styles.PostTitle}>{title}</h5>
        <p className={styles.PostContent}>{content}</p>

        {/* Image */}
        {image && <Card.Img variant="top" src={image} alt={title} />}
      </Card.Body>

      {/* Like and Comment icons */}
      <div className={styles.PostFooter}>
        <div className={styles.ActionItem}>
          <i className="far fa-thumbs-up"></i>
          <span>{likes_count}</span>
        </div>
        <div className={styles.ActionItem}>
          <i className="far fa-comment"></i>
          <span>{comments_count}</span>
        </div>
      </div>
    </Card>
  );
};

export default PostLayoutShell;
