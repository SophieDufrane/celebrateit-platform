import React, { useState } from "react";
import { Form } from "react-bootstrap";

function PeopleSearchBar({ onUserSelect }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
    console.log("Typed:", e.target.value);
  };

  return (
    <Form.Control
      type="text"
      placeholder="Search teammates..."
      value={input}
      onChange={handleChange}
      autoComplete="off"
    />
  );
}

export default PeopleSearchBar;
