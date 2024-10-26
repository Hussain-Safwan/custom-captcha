import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

// component to display validation message
function Validated() {
  // capture validation state from route data
  const { state } = useLocation();
  // navigation hook to route to video-feed page
  const navigate = useNavigate();

  return (
    <div className="validated">
      {/* styles applied to error message */}
      <h2 style={{ color: state.done === -1 ? "#C41E3A" : "" }}>
        {state.message}
      </h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* retry button - style and text set based on validation state, disables upon 3 unsuccessful attempts */}
        <Button
          variant="outlined"
          color={state.done === 1 ? "success" : "error"}
          onClick={() => navigate("/")}
          disabled={state.retryLeft < 1}
        >
          {state.done === 1
            ? "Try again?"
            : `Try again? (Retries left: ${state.retryLeft})`}
        </Button>
      </div>
    </div>
  );
}

export default Validated;
