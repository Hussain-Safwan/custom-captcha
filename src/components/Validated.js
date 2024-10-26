import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

// component to display validation message
function Validated() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="validated">
      {/* styles applied to error message */}
      <h2 style={{ color: state.done === -1 ? "#C41E3A" : "" }}>
        {state.message}
      </h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
