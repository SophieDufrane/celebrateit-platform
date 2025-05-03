import React from "react";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MoreDropdown from "./MoreDropdown";
import { axiosReq } from "../api/axiosDefaults";
import styles from "../styles/PostCard.module.css";

const PostCard = (props) => {
  const {
    id,
    title,
    content,
    image,
    display_name,
    created_at,
    likes_count,
    comments_count,
    is_user,
    onPostDelete,
  } = props;

  const truncatedContent =
    content.length > 150
      ? content.slice(0, content.slice(0, 150).lastIndexOf(" ")) + "..."
      : content;

  const history = useHistory();

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/posts/${id}/`);
      if (onPostDelete) {
        onPostDelete(id);
      }
      history.push("/?deleted=true");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <Card className={`mb-3 ${styles.CardWrapper}`}>
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between mb-3">
          {/* Left: Icon + Author name */}
          <div className="d-flex align-items-center">
            <div className={styles.AvatarPlaceholder} />
            <strong className="ml-2">{display_name}</strong>
          </div>

          {/* Right: Date + Dropdown */}
          <div className="d-flex align-items-center">
            <small className="text-muted">{created_at}</small>
            {is_user && (
              <MoreDropdown
                handleEdit={() => history.push(`/posts/${id}/edit`)}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </div>
        <Link
          to={`/posts/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {/* Title */}
          <Card.Title>{title}</Card.Title>
          {/* Content */}
          <Card.Text>{truncatedContent}</Card.Text>
          {content.length > 150 && <div>Read more…</div>}
          {/* Image */}
          {image && <Card.Img variant="top" src={image} alt={title} />}
        </Link>
      </Card.Body>

      {/* Like and Comment icons */}
      <div className="d-flex justify-content-around mt-3">
        <div className="text-center">
          <i className="far fa-heart fa-lg"></i>
          <div>
            <small>{likes_count}</small>
          </div>
        </div>
        <div className="text-center">
          <i className="far fa-comment fa-lg"></i>
          <div>
            <small>{comments_count}</small>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
