import React from "react";
import { Form } from "react-bootstrap";
import styles from "../styles/PostForm.module.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const PostForm = ({
  title,
  content,
  image,
  handleChange,
  handleSubmit,
  children,
}) => {
  return (
    <Form onSubmit={handleSubmit} className={styles.FormWrapper}>
      <Form.Group controlId="title" className={styles.FormGroupSpacing}>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Enter a short, clear post title</Tooltip>}
        >
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </OverlayTrigger>
      </Form.Group>

      <Form.Group controlId="content" className={styles.FormGroupSpacing}>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Write the story you want to share</Tooltip>}
        >
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Write your story..."
            name="content"
            value={content}
            onChange={handleChange}
          />
        </OverlayTrigger>
      </Form.Group>
      <Form.Group controlId="image" className={styles.FormGroupSpacing}>
        <Form.Label>Image (optional)</Form.Label>
        <Form.Control type="file" name="image" onChange={handleChange} />
        {children}
      </Form.Group>
    </Form>
  );
};

export default PostForm;
