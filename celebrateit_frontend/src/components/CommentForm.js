import React, { useState } from "react";
import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import styles from "../styles/PostForm.module.css";
import sharedStyles from "../App.module.css";

function CommentForm({ postId, onCommentSubmit, disabled = false }) {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axiosReq.post("/comments/", {
        content,
        post: postId,
      });
      setContent("");
      setErrors({});
      if (onCommentSubmit) {
        onCommentSubmit(data);
      }
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.FormWrapper}>
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
            value={content}
            onChange={handleChange}
          />
        </OverlayTrigger>
        {errors?.content && (
          <div className="text-danger mt-2">{errors.content}</div>
        )}
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
