import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import MoreDropdown from "./MoreDropdown";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import styles from "../styles/PostCard.module.css";
import PostLayoutShell from "./PostLayoutShell";

const PostCard = (props) => {
  const {
    id,
    title,
    content,
    image,
    display_name,
    created_at,
    likes_count,
    comments_count,
    is_user,
    onPostDelete,
    detailUrl = `/posts/${id}`,
    editUrl = `/posts/${id}/edit`,
    extraContent = null,
  } = props;

  const truncatedContent =
    content.length > 150
      ? content.slice(0, content.slice(0, 150).lastIndexOf(" ")) + "..."
      : content;

  const history = useHistory();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosReq.delete(`/posts/${id}/`);
      if (onPostDelete) {
        onPostDelete(id);
      }
      history.push("/?deleted=true");
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <>
      <PostLayoutShell
        title={title}
        content={truncatedContent}
        image={image}
        display_name={display_name}
        created_at={created_at}
        likes_count={likes_count}
        comments_count={comments_count}
        renderDropdown={
          is_user && (
            <MoreDropdown
              handleEdit={() => history.push(editUrl)}
              handleDelete={handleDelete}
            />
          )
        }
      >
        <Link
          to={detailUrl}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {extraContent}
          <h5 className={styles.PostTitle}>{title}</h5>
          <p className={styles.PostContent}>{truncatedContent}</p>
          {content.length > 150 && (
            <div className={styles.ReadMore}>Read more…</div>
          )}
          {image && <Card.Img variant="top" src={image} alt={title} />}
        </Link>
      </PostLayoutShell>
      <ConfirmDeleteModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default PostCard;
