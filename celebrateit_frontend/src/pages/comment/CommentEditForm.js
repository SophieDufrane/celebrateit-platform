import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory, useLocation } from "react-router-dom";
import styles from "../../styles/Comment.module.css";
import FormFooter from "../../components/FormFooter";

function CommentEditForm(props) {
  // Props from parent
  const { comment, setComments, setEditingComment, onCancel } = props;

  // Routing
  const history = useHistory();
  const location = useLocation();

  // Local state
  const [content, setContent] = useState(comment.content);
  const [errors, setErrors] = useState({});

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
      history.replace(`${location.pathname}?comment_edited=true`);
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };
  return (
    <Form onSubmit={handleSubmit} className={styles.SingleComment}>
      <Form.Group>
        <Form.Control
          as="textarea"
          value={content}
          onChange={handleChange}
          rows={2}
          className={styles.CommentText}
        />
        {Array.isArray(errors?.content) &&
          errors.content.map((message, idx) => (
            <div key={idx} className="text-danger mt-1">
              {message}
            </div>
          ))}
      </Form.Group>
      <FormFooter submitText="Update" onCancel={onCancel} />
    </Form>
  );
}

export default CommentEditForm;
