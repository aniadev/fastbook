import React from "react";
// import { useParams } from "react-router-dom";

function About({ info }) {
  // let { id } = useParams();
  return (
    <React.Fragment>
      <br />
      <h4>Information</h4>
      <ul>
        <li>
          <span>email: {info.email || "không có"}</span>
        </li>
        <li>
          <span>username: {info.username || "không có"}</span>
        </li>
        <li>
          <span>
            Age:{" "}
            {info.birthday
              ? new Date(
                  Date.now() - new Date(info.birthday)
                ).getUTCFullYear() - 1970
              : "không có"}
          </span>
        </li>
        <li>
          <span>
            Date of birth:{" "}
            {info.birthday
              ? `${new Date(info.birthday).toLocaleDateString("vi-VN")}`
              : "không có"}
          </span>
        </li>
        <li>
          <span>Address: {info.address || "không có"}</span>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default About;
