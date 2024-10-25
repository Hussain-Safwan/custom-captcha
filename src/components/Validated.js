import React from "react";

// component to display validation message
function Validated({ validated }) {
  return (
    <div className="validated">
      {/* styles applied to error message */}
      <h2 style={{ color: validated.done === -1 ? "#C41E3A" : "" }}>
        {validated.message}
      </h2>
    </div>
  );
}

export default Validated;
