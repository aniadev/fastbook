import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Chatbox from "./Chatbox";
import "./Messenger.css";

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
    <div className='messenger'>
      {/* <div
        style={{
          top: "50%",
          left: "50%",
          position: "absolute",
          textAlign: "center",
          color: "white",
          transform: "translate(-80%, -50%)",
        }}>
        <h5>MESSENGER</h5>
        <h5>FEATURE UPDATING</h5>
      </div> */}
      <div className='messenger-bar'>
        <div className='messenger-bar__header'>
          <span style={{fontSize: "24px", paddingLeft: "8px"}}>Chat</span>
          <div className='btn__new-conversation'>
            <i
              type='button'
              className='far fa-edit'
              onClick={() => handleNewConversation()}
              data-target='#exampleModal'></i>
          </div>
        </div>
        <div className='messenger-bar__body'>
          {(allConversations.length && (
            <ul>
              {allConversations.map((conversation) => (
                <li key={conversation.cvId}>
                  <NavLink
                    exact
                    to={`/messenger/${conversation.cvId}`}
                    activeClassName='cv_active'
                    className='conversation'>
                    <img src={conversation.avatar} alt='cv_avatar' />
                    <div className='cv_display'>
                      <span className='cv_name'>{conversation.name}</span>
                      <span className='cv_last-msg'>
                        {conversation.lastMessage}
                      </span>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          )) || (
            <span style={{fontSize: "14px", paddingLeft: "8px"}}>
              Chưa có tin nhắn
            </span>
          )}
        </div>
      </div>
      <div className='messenger-main'>
        {allConversations.length ? <Chatbox /> : false}
      </div>

      {/* Modal new conversation */}
    </div>
  );
}

export default Messenger;
