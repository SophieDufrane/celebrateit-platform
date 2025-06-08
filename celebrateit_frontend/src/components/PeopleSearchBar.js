import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";

function PeopleSearchBar({ onUserSelect, enableSelectionDisplay = false }) {
  // Input state
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Search results
  const [results, setResults] = useState([]);

  // Fetch users as input changes
  useEffect(() => {
    const fetchUsers = async () => {
      if (!input.trim() || selectedUser) {
        setResults([]);
        return;
      }

      try {
        const { data } = await axiosReq.get(`/users/?search=${input}`);
        setResults(data.results);
        console.log("Fetched users:", data.results); // TEMP for testing
      } catch (err) {
        console.error("Error fetching users", err);
        setResults([]);
      }
    };

    const delayDebounce = setTimeout(fetchUsers, 500);
    return () => clearTimeout(delayDebounce);
  }, [input, selectedUser]);

  // Handle input changes
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <Form.Control
        type="text"
        placeholder="Search people..."
        value={input}
        onChange={handleChange}
        autoComplete="off"
        aria-label="Search teammates"
      />
      {results.map((user) => (
        <div
          key={user.id}
          onMouseDown={() => {
            const fullName =
              `${user.first_name} ${user.last_name}`.trim() || user.username;

            // If enabled (form), display the selected name in the input and store it
            if (enableSelectionDisplay) {
              setInput(fullName);
              setSelectedUser(user);
            }

            setResults([]);
            onUserSelect(user);
          }}
        >
          {user.first_name || user.last_name
            ? `${user.first_name} ${user.last_name}`.trim()
            : user.username}
        </div>
      ))}
    </>
  );
}

export default PeopleSearchBar;
