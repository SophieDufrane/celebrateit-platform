import React from "react";
import { Form } from "react-bootstrap";

const PostForm = ({
  title,
  content,
  image,
  handleChange,
  handleSubmit,
  children,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          placeholder="Write your story..."
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="image">
        <Form.Label>Image (optional)</Form.Label>
        <Form.Control type="file" name="image" onChange={handleChange} />
      </Form.Group>

      {children}
    </Form>
  );
};

export default PostForm;
