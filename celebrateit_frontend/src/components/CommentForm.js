import React from "react";
import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "../styles/PostForm.module.css";
import sharedStyles from "../App.module.css";

function CommentForm({ disabled = false }) {
  return (
    <Form className={styles.FormWrapper}>
      <Form.Group controlId="commentText" className={styles.FormGroupSpacing}>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Add your comment</Tooltip>}
        >
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write a comment..."
            name="comment"
            disabled={disabled}
          />
        </OverlayTrigger>
      </Form.Group>

      <div className={styles.FormButtonRow}>
        <Button type="submit" className={sharedStyles.YellowButton}>
          Post
        </Button>
      </div>
    </Form>
  );
}

export default CommentForm;
