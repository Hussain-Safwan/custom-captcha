import React from "react";
import Overlay from "./Overlay";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";

const CapturedImage = ({
  table,
  challenge,
  coordinates,
  handleSectionClick,
  validate,
  image,
  errorCount,
}) => {
  return (
    <div>
      <h2>{`Please select all ${challenge.iconTint} ${challenge.iconShape}s`}</h2>
      <div className="webcam-container">
        <Overlay
          table={table}
          location={coordinates}
          handleSectionClick={handleSectionClick}
        />
        <img src={image} />
      </div>
      <br />
      <div className="capture-btn">
        {errorCount === -1 ? (
          <Button
            style={{ width: "75%" }}
            variant="outlined"
            onClick={validate}
          >
            Validate
          </Button>
        ) : errorCount === 0 ? (
          <Button
            style={{ width: "75%" }}
            color="success"
            variant="outlined"
            onClick={() => alert("You are a verified human being!")}
          >
            <CheckCircleIcon color="success" />
            Validated. Click to proceed
          </Button>
        ) : (
          <Button
            style={{ width: "75%" }}
            variant="outlined"
            color="error"
            onClick={validate}
            disabled
          >
            Validation Error
          </Button>
        )}
      </div>
    </div>
  );
};

export default CapturedImage;
