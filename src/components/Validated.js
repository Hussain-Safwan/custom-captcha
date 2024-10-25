import React from "react";

function Validated({ validated }) {
  return (
    <div className="validated">
      <h2>{validated.message}</h2>
    </div>
  );
}

export default Validated;
