import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

const EditProfileForm = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/user-profiles/${id}/`);
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [id]);

  return (
    <div className="container mt-4">
      <h2>Edit your profile</h2>
      {profile ? (
        <p>Current first name: {profile.first_name}</p>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default EditProfileForm;
