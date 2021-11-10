import React from "react";
import { useParams } from "react-router-dom";

function Photos() {
  let { id } = useParams();
  return (
    <React.Fragment>
      <h4>Photos</h4>
      <span>id: {id}</span>
    </React.Fragment>
  );
}

export default Photos;
