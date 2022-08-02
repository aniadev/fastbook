import React, {useState, useEffect} from "react";
import "./OnlinePanel.css";
import {useSelector} from "react-redux";

function OnlinePanel({socket}) {
  // const onlineUsers = useSelector((state) => state.onlineUsers);
  const [onlineUsers, setOnlineUsers] = useState([
    {
      userId: 0,
      name: "default name",
      avatar: "https://i.ibb.co/PN4trdt/3240aadd89e3.jpg",
    },
    {
      userId: 1,
      name: "default name",
      avatar: "https://i.ibb.co/PN4trdt/3240aadd89e3.jpg",
    },
  ]);
  const [showPanel, setShowPanel] = useState(true);
  useEffect(() => {
    console.log(socket);
    socket.on("online", (data) => {
      console.log(data);
      setOnlineUsers(data);
    });
    socket.emit("message", "hello");

    return socket.off("online", (data) => {
      console.log(data);
      setOnlineUsers(data);
    });
  }, [socket]);

  return (
    <div className='online-panel'>
      <div
        className='o-p-header no-select pointer'
        onClick={() => setShowPanel(!showPanel)}>
        <span className='o-p-text'>
          <i className='fas fa-users'></i> Online{" "}
          <span className='o-p-count'>({onlineUsers.length})</span>
        </span>
        <div className='o-p-search'>
          <i className='fas fa-search'></i>
        </div>
      </div>
      <div className={showPanel ? "o-p-body--show" : "o-p-body--hide"}>
        {onlineUsers.map((user, index) => {
          return (
            <div className='o-p-users' key={index}>
              <div className='user-profile-item'>
                <img src={user.avatar} width='36' height='36' alt='avatar' />
                <span className='username'>{user.name}</span>
              </div>
              <i className='fas fa-circle mr-3 text-success'></i>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OnlinePanel;
