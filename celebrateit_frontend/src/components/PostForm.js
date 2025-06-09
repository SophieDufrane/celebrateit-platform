import React from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import FormFooter from "./FormFooter";
import styles from "../styles/PostForm.module.css";

// PostForm: Reusable form component for creating or editing a recognition
function PostForm({
  title,
  content,
  handleChange,
  handleSubmit,
  children,
  submitText = "Submit",
  onCancel,
  errors,
}) {
  return (
    <Form onSubmit={handleSubmit} className={styles.FormWrapper}>
      {/* Title field with tooltip and error display */}
      <Form.Group controlId="title" className={styles.FormGroupSpacing}>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Enter a short, clear post title</Tooltip>}
        >
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            aria-label="Enter a short, clear post title"
            value={title}
            onChange={handleChange}
          />
        </OverlayTrigger>
        {Array.isArray(errors?.title) &&
          errors?.title?.map((message, idx) => (
            <div key={idx} className="text-danger mt-1">
              {message}
            </div>
          ))}
      </Form.Group>

      {/* Content field with tooltip and error display */}
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
            aria-label="Write the story you want to share"
            value={content}
            onChange={handleChange}
          />
        </OverlayTrigger>
        {Array.isArray(errors?.content) &&
          errors?.content?.map((message, idx) => (
            <div key={idx} className="text-danger mt-1">
              {message}
            </div>
          ))}
      </Form.Group>

      {children}
      <FormFooter submitText={submitText} onCancel={onCancel} />
    </Form>
  );
}

export default PostForm;
