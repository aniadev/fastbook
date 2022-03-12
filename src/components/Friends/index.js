import React, { useEffect } from "react";

function Friends() {
  useEffect(() => {
    let checkConn = setInterval(() => {
      fetch("http://localhost:8599/test")
        .then((response) => {
          if (response.status === 200) {
            console.log("Connected");
          } else {
            throw Error("Error connecting");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, 5000);

    return () => {
      console.log("clearInterval");
      clearInterval(checkConn);
    };
  }, []);

  return (
    <div className="friends">
      <div
        style={{
          top: "50%",
          left: "50%",
          position: "absolute",
          textAlign: "center",
        }}
      >
        <h5>FRIENDS</h5>
        <h5>FEATURE UPDATING</h5>
      </div>
    </div>
  );
}

export default Friends;
