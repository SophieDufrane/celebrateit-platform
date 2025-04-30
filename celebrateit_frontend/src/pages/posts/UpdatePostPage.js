import React, { useState } from "react";
import { useParams } from "react-router-dom";

function UpdatePostPage() {
  const { id } = useParams();

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: null,
  });

  return (
    <div>
      <h1>Edit Post {id}</h1>
    </div>
  );
}

export default UpdatePostPage;
