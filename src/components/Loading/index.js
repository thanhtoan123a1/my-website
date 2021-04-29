import React from "react";
import { Spinner } from "reactstrap";

function Loading() {
  return (
    <div className="loading-wrapper">
      <Spinner size="lg" color="info" />
    </div>
  );
}

export default Loading;
