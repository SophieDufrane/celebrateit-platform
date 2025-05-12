import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import MoreDropdown from "./MoreDropdown";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import styles from "../styles/PostCard.module.css";
import PostLayoutShell from "./PostLayoutShell";

const NominationCard = (props) => {
  const {
    id,
    title,
    content,
    display_name,
    created_at,
    is_user,
    nominee_display_name: nominee,
    tag,
    tag_color,
    onPostDelete,
    detailUrl = `/nominations/${id}`,
    editUrl = `/nominations/${id}/edit`,
    deleteUrl = `/nominations/${id}`,
  } = props;

  // User & Navigation
  const currentUser = useCurrentUser();
  const history = useHistory();

  // Local UI State
  const [showConfirm, setShowConfirm] = useState(false);

  // Derived display content
  const truncatedContent =
    content.length > 150
      ? content.slice(0, content.slice(0, 150).lastIndexOf(" ")) + "..."
      : content;

  // Event Handlers
  const handleDelete = () => setShowConfirm(true);

  const confirmDelete = async () => {
    try {
      await axiosReq.delete(deleteUrl);
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
        display_name={display_name}
        created_at={created_at}
        renderDropdown={
          is_user && (
            <MoreDropdown
              handleEdit={() => history.push(editUrl)}
              handleDelete={handleDelete}
            />
          )
        }
        metaTop={
          nominee &&
          tag && (
            <p className={styles.NominationMeta}>
              <strong>{nominee}</strong> was nominated by{" "}
              <strong>{display_name}</strong>{" "}
              <span
                style={{
                  backgroundColor: tag_color,
                  color: "#fff",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "0.8rem",
                }}
              >
                {tag}
              </span>
            </p>
          )
        }
        extraContent={
          content.length > 150 && (
            <div className={styles.ViewFullPos}>
              <Link to={detailUrl} className={styles.ViewFullPosLink}>
                <div className={styles.ViewFullPos}>View full post</div>
              </Link>
            </div>
          )
        }
      />

      <ConfirmDeleteModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default NominationCard;
