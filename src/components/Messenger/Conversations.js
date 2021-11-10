import React from "react";
import { NavLink } from "react-router-dom";

function Conversation({ allConversations }) {
  return (
    <React.Fragment>
      <ul>
        {allConversations.map((conversation) => (
          <li key={conversation.cvId}>
            <NavLink
              exact
              to={`/messenger/${conversation.cvId}`}
              activeClassName="cv_active"
              className="conversation"
            >
              <img src={conversation.avatar} alt="cv_avatar" />
              <div className="cv_display">
                <span className="cv_name">{conversation.name}</span>
                <span className="cv_last-msg">{conversation.lastMessage}</span>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default Conversation;
