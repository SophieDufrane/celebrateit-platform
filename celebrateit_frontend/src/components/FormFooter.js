import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import sharedStyles from "../App.module.css";
import formStyles from "../styles/PostForm.module.css";

const FormFooter = ({ submitText = "Submit", onCancel }) => {
  const history = useHistory();

  return (
    <div className={formStyles.FormButtonRow}>
      <Button type="submit" className={sharedStyles.YellowButton}>
        {submitText}
      </Button>
      <Button
        className={sharedStyles.BlueButton}
        variant="outline-secondary"
        onClick={onCancel || (() => history.goBack())}
      >
        Cancel
      </Button>
    </div>
  );
};

export default FormFooter;
