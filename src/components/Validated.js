import React from "react";
import { useLocation } from "react-router-dom";

// component to display validation message
function Validated() {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className="validated">
      {/* styles applied to error message */}
      <h2 style={{ color: state.done === -1 ? "#C41E3A" : "" }}>
        {state.message}
      </h2>
    </div>
  );
}

export default Validated;
