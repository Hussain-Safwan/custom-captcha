import React from "react";

function Validated({ validated }) {
  return (
    <div className="validated">
      <h2 style={{ color: validated.done === -1 ? "#C41E3A" : "" }}>
        {validated.message}
      </h2>
    </div>
  );
}

export default Validated;
