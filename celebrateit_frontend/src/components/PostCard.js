import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

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
  } = props;

  const truncatedContent =
    content.length > 150 ? content.slice(0, 150) + "..." : content;

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between mb-3">
          {/* Icon Placeholder */}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#ccc",
            }}
          ></div>

          {/* Author name */}
          <strong className="ml-2 flex-grow-1">{display_name}</strong>
          {/* Date */}
          <small className="text-muted">{created_at}</small>
        </div>

        {/* Clickable area */}
        <Link
          to={`/posts/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {/* Title */}
          <Card.Title>{title}</Card.Title>
          {/* Content */}
          <Card.Text>{truncatedContent}</Card.Text>
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
