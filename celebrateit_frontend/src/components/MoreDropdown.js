import React from "react";
import { Dropdown } from "react-bootstrap";
import styles from "../styles/MoreDropdown.module.css";

// Custom toggle icon for dropdown menu (3 vertical dots)
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className={`fas fa-ellipsis-v ${styles.DropdownToggle}`}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    role="button"
    aria-label="More options"
  />
));

// MoreDropdown: shows edit/delete actions for a post or comment
function MoreDropdown({ handleEdit, handleDelete }) {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu>
        {handleEdit && (
          <Dropdown.Item className={styles.DropdownItem} onClick={handleEdit}>
            <i className="fas fa-edit" />
            Edit
          </Dropdown.Item>
        )}
        {handleDelete && (
          <Dropdown.Item className={styles.DropdownItem} onClick={handleDelete}>
            <i className="fas fa-trash-alt" />
            Delete
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MoreDropdown;
