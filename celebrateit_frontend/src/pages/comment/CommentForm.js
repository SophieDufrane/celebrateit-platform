import React, { useState } from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import FormFooter from "../../components/FormFooter";
import styles from "../../styles/PostForm.module.css";

function CommentForm({ postId, onCommentSubmit, disabled = false }) {
  // State
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  // Derived/computed values
  const isValidComment = content.trim().length > 0;

  // Handlers
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
        {disabled ? (
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Log in to comment"
            name="comment"
            disabled
            value={content}
            onChange={handleChange}
          />
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Add your comment</Tooltip>}
          >
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Write a comment..."
              name="comment"
              disabled={disabled}
              value={content}
              onChange={handleChange}
            />
          </OverlayTrigger>
        )}
        {errors?.content && (
          <div className="text-danger mt-2">{errors.content}</div>
        )}
      </Form.Group>

      <FormFooter
        submitText="Post"
        disabled={disabled || !isValidComment}
        showCancel={false}
      />
    </Form>
  );
}

export default CommentForm;
