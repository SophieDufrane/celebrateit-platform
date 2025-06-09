import React from "react";
import MoreDropdown from "../../components/MoreDropdown";
import styles from "../../styles/Comment.module.css";

// Comment: Displays a single comment with edit/delete options if owner
function Comment(props) {
  const { comment, setEditingComment, setShowDeleteModal } = props;

  return (
    <div className={styles.SingleComment}>
      <div className="d-flex justify-content-between align-items-start">
        <strong className={styles.CommentAuthor}>{comment.display_name}</strong>

        {/* Edit/Delete dropdown for owner */}
        {comment.is_user && (
          <MoreDropdown
            handleEdit={() => setEditingComment(comment)}
            handleDelete={() => setShowDeleteModal(comment.id)}
          />
        )}
      </div>

      {/* Comment content */}
      <p className={styles.CommentText}>{comment.content}</p>

      {/* Timestamp */}
      <small className={styles.CommentDate}>{comment.created_at}</small>
    </div>
  );
}

export default Comment;
