import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import MoreDropdown from "../../components/MoreDropdown";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import styles from "../../styles/PostCard.module.css";
import PostLayoutShell from "../../components/PostLayoutShell";

function RecognitionCard(props) {
  // Use frontend naming for routing, but backend naming for delete endpoint
  const {
    id,
    title,
    content,
    image,
    user, // The username string used to check ownership (for dropdown)
    username, // Used only for fallback avatar initials
    first_name, // Used for fallback avatar initials
    last_name, // Used for fallback avatar initials
    display_name, // The public full name shown next to avatar
    profile_image,
    created_at,
    likes_count,
    comments_count,
    like_id,
    setRecognitions,
    onPostDelete,
    detailUrl = `/recognitions/${id}`,
    editUrl = `/recognitions/${id}/edit`,
    deleteUrl = `/posts/${id}/`,
  } = props;

  // User & Navigation
  const { currentUser, currentUserLoaded } = useCurrentUser();
  const history = useHistory();

  // Local UI State
  const [showConfirm, setShowConfirm] = useState(false);

  // Wait until auth state is resolved to avoid false unauthenticated UI
  if (!currentUserLoaded) return null;

  // Derived display content
  const truncatedContent =
    content.length > 150
      ? `${content.slice(0, content.slice(0, 150).lastIndexOf(" "))}...`
      : content;

  // Event Handlers
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", {
        post: id,
      });

      setRecognitions((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, likes_count: item.likes_count + 1, like_id: data.id }
            : item
        )
      );
    } catch (err) {
      // TODO: handle like failure (e.g., notify user)
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);

      setRecognitions((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, likes_count: item.likes_count - 1, like_id: null }
            : item
        )
      );
    } catch (err) {
      // TODO: handle unlike failure (e.g., notify user)
    }
  };

  const handleDelete = () => setShowConfirm(true);

  const confirmDelete = async () => {
    try {
      await axiosReq.delete(deleteUrl);
      if (onPostDelete) {
        onPostDelete(id);
      }
      history.push("/?deleted=true");
    } catch (err) {
      // console.error("Delete failed:", err);
      // TODO: add user feedback on error
    } finally {
      setShowConfirm(false);
    }
  };

  // Footer: Likes + Comments
  const postActions = (
    <div className={styles.PostFooter}>
      <div className={styles.ActionItem}>
        {props.is_user ? (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`tooltip-self-like-${id}`}>
                Can't like your own recognition!
              </Tooltip>
            }
          >
            <span
              className={styles.DisabledIcon}
              aria-label="You can't like your own recognition"
            >
              <i className="far fa-thumbs-up" />
            </span>
          </OverlayTrigger>
        ) : like_id ? (
          <span
            onClick={handleUnlike}
            className={`${styles.ActionItem} ${styles.Clickable}`}
            aria-label="Unlike this recognition"
          >
            <i
              className={`fas fa-thumbs-up ${styles.Heart} ${styles.Clickable}`}
            />
          </span>
        ) : currentUser ? (
          <span
            onClick={handleLike}
            className={`${styles.ActionItem} ${styles.Clickable}`}
            aria-label="Like this recognition"
          >
            <i
              className={`far fa-thumbs-up ${styles.HeartOutline} ${styles.Clickable}`}
            />
          </span>
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`tooltip-login-like-${id}`}>
                Log in to like recognitions!
              </Tooltip>
            }
          >
            <span
              className={styles.DisabledIcon}
              aria-label="Log in to like this recognition"
            >
              <i className="far fa-thumbs-up" />
            </span>
          </OverlayTrigger>
        )}
        <span>{likes_count}</span>
      </div>
      <Link
        to={`/recognitions/${id}`}
        className={`${styles.ActionItem} ${styles.Clickable}`}
      >
        <i className="far fa-comment" />
        <span>{comments_count}</span>
      </Link>
    </div>
  );

  return (
    <>
      <PostLayoutShell
        title={title}
        content={truncatedContent}
        user={user}
        username={username}
        first_name={first_name}
        last_name={last_name}
        display_name={display_name}
        profile_image={profile_image}
        created_at={created_at}
        likes_count={likes_count}
        comments_count={comments_count}
        renderDropdown={
          props.is_user && (
            <MoreDropdown
              handleEdit={() => history.push(editUrl)}
              handleDelete={handleDelete}
            />
          )
        }
        postActions={postActions}
        extraContent={
          <div className={styles.ViewFullPostWrapper}>
            <Link to={detailUrl} className={styles.ViewFullPostLink}>
              View full recognition
            </Link>
          </div>
        }
      >
        {image && (
          <div className={styles.ImageWrapper}>
            <img src={image} alt={title} className={styles.PostImage} />
          </div>
        )}
      </PostLayoutShell>

      <ConfirmDeleteModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default RecognitionCard;
