import React, { useState, useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";

function Chatbox() {
  const [allMessages, setAllMessages] = useState([
    {
      msgId: 0,
      origin: true,
      data: "Tin nhan 0",
    },
  ]);
  const [newMessage, setNewMessage] = useState();
  const newestMessage = useRef();
  function autoScroll() {
    if (newestMessage) {
      newestMessage.current.scrollIntoView({ behavior: "smooth" });
      // console.log(newestMessage);
    }
  }

  //   const location = useLocation();
  //   console.log("🚀 ~ file: Chatbox.js ~ line 22 ~ Chatbox ~ location", location);

  useEffect(() => {
    var val = 0;
    var getNewMessage = setInterval(function () {
      val++;
      // console.log(val);
      setNewMessage({
        msgId: val,
        origin: Math.round(Math.random()),
        data: `Tin nhan tai ${new Date()}`,
      });
    }, 8000);

    return () => {
      console.log("Clear interval");
      clearInterval(getNewMessage);
    };
  }, []);

  useEffect(() => {
    autoScroll();
    newMessage && setAllMessages([...allMessages, newMessage]);
    setNewMessage(null);
  }, [newMessage, allMessages]);

  return (
    <React.Fragment>
      <div className="messenger-header">
        <img
          src="https://i.ibb.co/H4WHmsn/default-avatar.png"
          alt="avatar"
          width="35"
        />
        <span>Lady Gaga</span>
      </div>
      {/* Chatbox */}
      <div className="messenger-chatbox">
        <div className="messenger-msg tx">
          <span>Tin nhan 1 tx</span>
        </div>
        <div className="messenger-msg rx">
          <img
            src="https://i.ibb.co/H4WHmsn/default-avatar.png"
            alt="avatar"
            width="20"
          />
          <span>Tin nhan 1 rx</span>
        </div>
        <div className="messenger-msg rx">
          <img
            src="https://i.ibb.co/H4WHmsn/default-avatar.png"
            alt="avatar"
            width="20"
          />
          <span>
            Tin nhan 2 rx Day la 1 tin nhan rat chi la dai loang ngoang ahihi{" "}
          </span>
        </div>
        {allMessages.map((message, index) => {
          return (
            <div
              className={`messenger-msg ${message.origin ? "tx" : "rx"}`}
              key={index}
              ref={newestMessage}
            >
              {!message.origin && (
                <img
                  src="https://i.ibb.co/H4WHmsn/default-avatar.png"
                  alt="avatar"
                  width="20"
                />
              )}
              <span>{message.data}</span>
            </div>
          );
        })}
      </div>
      <div className="messenger__scroll-view">
        <span>
          New message ! <i className="far fa-envelope"></i>{" "}
          <i className="fas fa-arrow-circle-down"></i>
        </span>
      </div>
      <form action="">
        <div className="messenger__text-editor">
          <input type="text" name="message" placeholder="Nhập văn bản" />
          <button type="submit">
            <i className="far fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default Chatbox;
