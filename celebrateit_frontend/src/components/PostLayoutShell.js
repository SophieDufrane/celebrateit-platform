import React from "react";
import { Card } from "react-bootstrap";
import styles from "../styles/PostCard.module.css";
import PostHeader from "./PostHeader";

const PostLayoutShell = (props) => {
  const {
    title,
    content,
    image,
    display_name,
    created_at,
    renderDropdown,
    nominee,
    tag,
    tag_color,
    postActions,
    children,
    extraContent,
  } = props;

  return (
    <Card className={`mb-3 ${styles.CardWrapper}`}>
      <Card.Body>
        <PostHeader
          display_name={display_name}
          created_at={created_at}
          renderDropdown={renderDropdown}
        />

        {/* Always show post title and content */}
        <h5 className={styles.PostTitle}>{title}</h5>

        {nominee && display_name && (
          <p>
            <strong>{nominee}</strong> was nominated by{" "}
            <strong>{display_name}</strong>{" "}
            {tag && tag_color && (
              <span
                style={{
                  backgroundColor: tag_color,
                  color: "#fff",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "0.8rem",
                }}
              >
                {tag}
              </span>
            )}
          </p>
        )}

        <p className={styles.PostContent}>{content}</p>

        {/* Show Read more if passed from PostCard */}
        {extraContent && <div>{extraContent}</div>}

        {image && <Card.Img variant="top" src={image} alt={title} />}

        {/* Detail-only content (comment form + comments) */}
        {children && <div className={styles.PostChildren}>{children}</div>}
      </Card.Body>

      {/* Like and Comment section */}
      {postActions}
    </Card>
  );
};

export default PostLayoutShell;
