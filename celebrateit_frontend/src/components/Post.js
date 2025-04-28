import React from "react";
import { Card } from "react-bootstrap";

const Post = ({ title, content, image, display_name, created_at }) => {
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
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
      {image && <Card.Img variant="top" src={image} alt={title} />}
    </Card>
  );
};

export default Post;
