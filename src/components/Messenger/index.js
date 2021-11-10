import React, { useEffect, useState, useRef } from "react";
import Chatbox from "./Chatbox";
import Conversations from "./Conversations";
import "./Messenger.css";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function Messenger() {
  const [allConversations, setAllConversations] = useState([
    {
      cvId: 1,
      name: "Jack Sparrow",
      avatar: "https://i.ibb.co/H4WHmsn/default-avatar.png",
      lastMessage: "Jack Sparrow say hi",
    },
    {
      cvId: 2,
      name: "John Cena",
      avatar: "https://i.ibb.co/H4WHmsn/default-avatar.png",
      lastMessage: "John Cena say hi",
    },
  ]);
  const handleNewConversation = () => {
    console.log("new conversation");
  };

  return (
    <div className="messenger">
      <div className="messenger-bar">
        <div className="messenger-bar__header">
          <span style={{ fontSize: "24px", paddingLeft: "8px" }}>Chat</span>
          <div className="btn__new-conversation">
            <i
              type="button"
              className="far fa-edit"
              onClick={() => handleNewConversation()}
              data-target="#exampleModal"
            ></i>
          </div>
        </div>
        <div className="messenger-bar__body">
          {(allConversations.length && (
            <Conversations allConversations={allConversations} />
          )) || (
            <span style={{ fontSize: "14px", paddingLeft: "8px" }}>
              Chưa có tin nhắn
            </span>
          )}
        </div>
      </div>
      <div className="messenger-main">
        {allConversations.length ? <Chatbox /> : false}
      </div>

      {/* Modal new conversation */}
    </div>
  );
}

export default Messenger;
