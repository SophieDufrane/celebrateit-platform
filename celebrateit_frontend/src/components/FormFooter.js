import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import sharedStyles from "../App.module.css";
import formStyles from "../styles/PostForm.module.css";

function FormFooter(props) {
  const history = useHistory();

  const {
    submitText = "Submit",
    onCancel,
    disabled = false,
    showCancel = true,
  } = props;

  return (
    <div className={formStyles.FormButtonRow}>
      <Button
        type="submit"
        className={sharedStyles.YellowButton}
        disabled={disabled}
      >
        {submitText}
      </Button>
      {showCancel && (
        <Button
          className={sharedStyles.BlueButton}
          variant="outline-secondary"
          onClick={onCancel || (() => history.goBack())}
        >
          Cancel
        </Button>
      )}
    </div>
  );
}

export default FormFooter;
