import React from "react";
import MoreDropdown from "../../components/MoreDropdown";
import styles from "../../styles/Comment.module.css";

function Comment(props) {
  const { comment, setEditingComment, setShowDeleteModal } = props;

  return (
    <>
      <div className="d-flex justify-content-between align-items-start">
        <strong className={styles.CommentAuthor}>{comment.display_name}</strong>

        {comment.is_user && (
          <MoreDropdown
            handleEdit={() => setEditingComment(comment)}
            handleDelete={() => setShowDeleteModal(comment.id)}
          />
        )}
      </div>

      <p className={styles.CommentText}>{comment.content}</p>
      <small className={styles.CommentDate}>{comment.created_at}</small>
    </>
  );
}

export default Comment;
