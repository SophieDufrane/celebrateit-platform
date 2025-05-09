import React from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "../styles/PostForm.module.css";
import sharedStyles from "../App.module.css";

const PostForm = ({
  title,
  content,
  handleChange,
  handleSubmit,
  children,
  submitText = "Submit",
  onCancel,
}) => {
  const history = useHistory();
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
      {children}
      <div className={styles.FormButtonRow}>
        <Button type="submit" className={sharedStyles.YellowButton}>
          {submitText}
        </Button>
        <Button
          className={sharedStyles.BlueButton}
          variant="outline-secondary"
          onClick={onCancel || (() => history.goBack())}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default PostForm;
