import React from "react";
import { Dropdown } from "react-bootstrap";

const MoreDropdown = ({ handleEdit }) => {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        as="button"
        style={{
          background: "none",
          border: "none",
          boxShadow: "none",
          padding: 0,
          color: "#333",
        }}
        size="sm"
      >
        <i className="fas fa-ellipsis-v" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MoreDropdown;
