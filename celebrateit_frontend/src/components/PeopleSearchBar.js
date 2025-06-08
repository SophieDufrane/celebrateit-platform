import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import styles from "../styles/PeopleSearchBar.module.css";

function PeopleSearchBar({
  onUserSelect,
  className = "",
  enableSelectionDisplay = false,
  prefillValue = "",
  placeholderText = "Search people...", // default value
}) {
  // Input state
  const [input, setInput] = useState(prefillValue);
  useEffect(() => {
    if (enableSelectionDisplay && prefillValue) {
      setInput(prefillValue);
    }
  }, [prefillValue, enableSelectionDisplay]);

  // Search results
  const [results, setResults] = useState([]);

  // Fetch users as input changes
  useEffect(() => {
    const fetchUsers = async () => {
      if (!input.trim()) {
        setResults([]);
        return;
      }

      try {
        const { data } = await axiosReq.get(`/users/?search=${input}`);
        setResults(data.results);
      } catch (err) {
        console.error("Error fetching users", err);
        setResults([]);
      }
    };

    const delayDebounce = setTimeout(fetchUsers, 500);
    return () => clearTimeout(delayDebounce);
  }, [input]);

  // Handle input changes
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSelect = (user) => {
    const fullName =
      `${user.first_name} ${user.last_name}`.trim() || user.username;

    if (enableSelectionDisplay) {
      setInput(fullName);
    }

    setResults([]);
    onUserSelect(user);
  };

  return (
    <div className={className}>
      <Form.Control
        type="text"
        placeholder={placeholderText}
        value={input}
        onChange={handleChange}
        autoComplete="off"
        aria-label={placeholderText}
      />
      <div className={styles.suggestionBox}>
        {results.map((user) => (
          <div
            key={user.id}
            className={styles.suggestionItem}
            onClick={() => handleSelect(user)}
          >
            {user.first_name || user.last_name
              ? `${user.first_name} ${user.last_name}`.trim()
              : user.username}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PeopleSearchBar;
