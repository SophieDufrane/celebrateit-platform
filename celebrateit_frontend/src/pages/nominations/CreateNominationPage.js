import React, { useState, useEffect } from "react";
import { Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import PostForm from "../../components/PostForm";
import formStyles from "../../styles/PostForm.module.css";

function CreateNominationPage() {
  // Form fields
  const [nominationData, setNominationData] = useState({
    title: "",
    content: "",
    tag: "",
  });

  // Nominee search & selection
  const [nomineeInput, setNomineeInput] = useState("");
  const [selectedNomineeId, setSelectedNomineeId] = useState("");
  const [nomineeResults, setNomineeResults] = useState([]);

  // Tag dropdown
  const [tags, setTags] = useState([]);

  // Navigation
  const history = useHistory();

  // Destructure data for cleaner access
  const { title, content, tag } = nominationData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data } = await axiosReq.get("/tags/");
        console.log("Fetched tags:", data);
        setTags(data.results);
      } catch (err) {
        console.error("Error fetching tags:", err);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    if (nomineeInput) {
      axiosReq
        .get(`/users/?search=${nomineeInput}`)
        .then((res) => {
          setNomineeResults(res.data.results);
          console.log("Nominee results:", res.data);
        })
        .catch((err) => {
          console.error("Error fetching nominees:", err);
        });
    } else {
      setNomineeResults([]);
    }
  }, [nomineeInput]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "nominee") {
      setNomineeInput(value);
      setSelectedNomineeId("");
    } else {
      setNominationData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("nominee", selectedNomineeId);
    if (tag) formData.append("tag", tag);

    try {
      const { data } = await axiosReq.post("/nominations/", formData);
      history.push(`/nominations/${data.id}?created=true`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
      console.error(err.response?.data);
    }
  };

  const handleCancel = () => {
    history.push("/");
  };

  const handleNomineeSelect = (user) => {
    setSelectedNomineeId(user.id);
    setNomineeInput(`${user.first_name} ${user.last_name}`);
    setNomineeResults([]);
  };

  return (
    <Container>
      <PostForm
        title={title}
        content={content}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitText="Create"
        onCancel={handleCancel}
      >
        <Form.Group controlId="nominee" className={formStyles.FormMediaWrapper}>
          <div className="mb-3">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>Search for a teammate by first or last name</Tooltip>
              }
            >
              <Form.Control
                type="text"
                name="nominee"
                placeholder="Start typing a name..."
                value={nomineeInput}
                onChange={handleChange}
              />
            </OverlayTrigger>
            {nomineeResults.length > 0 && (
              <div className={formStyles.SuggestionBox}>
                {nomineeResults.map((user) => (
                  <div
                    key={user.id}
                    className={formStyles.SuggestionItem}
                    onClick={() => handleNomineeSelect(user)}
                  >
                    {user.first_name} {user.last_name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Pick a tag that reflects the nomination</Tooltip>}
          >
            <Form.Control
              as="select"
              name="tag"
              value={tag}
              onChange={handleChange}
            >
              <option value="">Select a tag</option>
              {tags.map((tagObj) => (
                <option key={tagObj.id} value={tagObj.name}>
                  {tagObj.name}
                </option>
              ))}
            </Form.Control>
          </OverlayTrigger>
          {errors?.tag?.map((message, idx) => (
            <div key={idx} className="text-danger mt-1">
              {message}
            </div>
          ))}
        </Form.Group>
      </PostForm>
    </Container>
  );
}

export default CreateNominationPage;
