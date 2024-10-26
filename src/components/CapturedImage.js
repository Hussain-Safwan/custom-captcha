import React from "react";
import Overlay from "./Overlay";
import { Button } from "@mui/material";

// component to display the captured image; rendered once the capture button is clicked
const CapturedImage = ({
  table,
  challenge,
  coordinates,
  handleSectionClick,
  validate,
  image,
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
        <Button style={{ width: "75%" }} variant="outlined" onClick={validate}>
          Validate
        </Button>
      </div>
    </div>
  );
};

export default CapturedImage;
