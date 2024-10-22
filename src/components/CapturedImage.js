import React from "react";
import Overlay from "./Overlay";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";

const CapturedImage = ({
  challenge,
  coordinates,
  setIconPosition,
  handleSectionClick,
  validate,
  image,
  errorCount,
}) => {
  return (
    <div>
      {challenge && (
        <h2>{`Please select all ${challenge.tint} ${challenge.shape}s`}</h2>
      )}
      <div className="webcam-container">
        <Overlay
          location={coordinates}
          setIconPosition={setIconPosition}
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
            onClick={validate}
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
          >
            Validation Error
          </Button>
        )}
      </div>
    </div>
  );
};

export default CapturedImage;
