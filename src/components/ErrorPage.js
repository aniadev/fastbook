import React from "react";
// Components
const errorStyle = {
  position: "absolute",
  left: "50%",
  top: "40%",
  transform: "translateX(-50%)",
};

function HomePage(props) {
  const message = props.message || "Có lỗi xảy xa, vui lòng thử lại . . .";
  return (
    <React.Fragment>
      <h3 style={errorStyle}>{message}</h3>
    </React.Fragment>
  );
}

export default HomePage;
