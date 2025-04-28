import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Post = ({ title, content, image }) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>{content}</p>
      {image && (
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "auto" }}
        />
      )}
    </div>
  );
};

export default Post;
