import React, { useState, useEffect } from "react";
import { Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import {
  useSetCurrentUser,
  useCurrentUser,
} from "../../contexts/CurrentUserContext";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import PeopleSearchBar from "../../components/PeopleSearchBar";
import PostForm from "../../components/PostForm";
import formStyles from "../../styles/PostForm.module.css";
import peopleSearchStyles from "../../styles/PeopleSearchBar.module.css";

function CreateNominationPage() {
  // Form fields
  const [nominationData, setNominationData] = useState({
    title: "",
    content: "",
    tag: "",
  });
  const { title, content, tag } = nominationData;

  // Nominee search & selection
  const [selectedNomineeId, setSelectedNomineeId] = useState("");
  const [nomineeNameParam, setNomineeNameParam] = useState("");

  // Tag dropdown
  const [tags, setTags] = useState([]);

  // Error state
  const [errors, setErrors] = useState({});

  // Navigation
  const history = useHistory();
  const location = useLocation();
  const setCurrentUser = useSetCurrentUser();
  const currentUser = useCurrentUser();

  // Fetch tag options for dropdown
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data } = await axiosReq.get("/tags/");
        // console.log('Fetched tags:', data);
        setTags(data.results);
      } catch (err) {
        // console.log('Error fetching tags:', err);
        // TODO: add user feedback on error
      }
    };

    fetchTags();
  }, []);

  // Prefill nominee ID from URL (when navigated from ProfilePage)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const prefillId = queryParams.get("nominee");
    const prefillName =
      queryParams.get("name") ||
      queryParams.get("nominee_fullname") ||
      queryParams.get("nominee_username") ||
      "";

    console.log("Full location.search:", location.search);
    console.log("Parsed prefillName:", prefillName);

    if (prefillId && !isNaN(prefillId)) {
      setSelectedNomineeId(parseInt(prefillId));
    }
    if (prefillName) {
      setNomineeNameParam(prefillName);
    }
  }, [location.search]);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setNominationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prevent submission without a valid nominee ID
    let localErrors = {};
    if (!selectedNomineeId || isNaN(selectedNomineeId)) {
      localErrors.nominee = ["Please select a valid teammate."];
    }

    // Prevents self nomination
    if (parseInt(selectedNomineeId) === currentUser?.currentUser?.pk) {
      setErrors({ nominee: ["You can't nominate yourself."] });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("nominee", selectedNomineeId);
    if (tag) formData.append("tag", tag);

    try {
      const { data } = await axiosReq.post("/nominations/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // PATCH 9: Rehydrate user context after creation
      setCurrentUser(
        await axiosRes.get("/dj-rest-auth/user/").then((res) => res.data)
      );
      history.push(`/nominations/${data.id}?created=true`);
    } catch (err) {
      // Combine backend errors with local ones
      const serverErrors = err.response?.data || {};
      setErrors({ ...serverErrors, ...localErrors });
    }
  };

  // Handle cancel button
  const handleCancel = () => {
    history.push("/");
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
        errors={errors}
      >
        <Form.Group controlId="nominee" className={formStyles.FormMediaWrapper}>
          <div className={peopleSearchStyles.FullWidthNomineeSearch}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  Search for a teammate by first or last name (you can't
                  nominate yourself)
                </Tooltip>
              }
            >
              <div>
                <PeopleSearchBar
                  className={peopleSearchStyles.FullWidthInput}
                  enableSelectionDisplay={true}
                  prefillValue={nomineeNameParam}
                  placeholderText="Search nominee"
                  onUserSelect={(user) => {
                    setSelectedNomineeId(user.id);
                    setErrors((prev) => ({ ...prev, nominee: "" }));
                  }}
                />
              </div>
            </OverlayTrigger>
            {/* Validation error for nominee */}
            {Array.isArray(errors?.nominee) &&
              errors.nominee.map((message, idx) => (
                <div key={idx} className="text-danger mt-1">
                  {message}
                </div>
              ))}
          </div>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Pick a tag that reflects the nomination</Tooltip>}
          >
            <Form.Control
              as="select"
              name="tag"
              value={tag}
              aria-label="Pick a tag that reflects the nomination"
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
          {Array.isArray(errors?.tag) &&
            errors.tag.map((message, idx) => (
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
