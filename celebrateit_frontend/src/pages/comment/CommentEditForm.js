import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Form } from "react-bootstrap";
import styles from "../../styles/PostCard.module.css";
import FormFooter from "../../components/FormFooter";

function CommentEditForm(props) {
  // Props from parent
  const { comment, setComments, setEditingComment, onCancel } = props;

  // Local state
  const [content, setContent] = useState(comment.content);

  // Handlers
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axiosReq.patch(`/comments/${comment.id}/`, {
        content,
      });
      setComments((prevComments) =>
        prevComments.map((c) => (c.id === comment.id ? data : c))
      );
      setEditingComment(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };
  return (
    <Form onSubmit={handleSubmit} className={styles.CommentBlock}>
      <Form.Group>
        <Form.Control
          as="textarea"
          value={content}
          onChange={handleChange}
          rows={2}
          className={styles.CommentText}
        />
      </Form.Group>
      <FormFooter submitText="Update" onCancel={onCancel} />
    </Form>
  );
}

export default CommentEditForm;
