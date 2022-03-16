import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, NavLink, useParams } from "react-router-dom";
import About from "./About";
import Posts from "./Posts";
import Photos from "./Photos";
import "./Profile.css";
//api
import profileApi from "../../store/api/profileApi";

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [isSelf, setIsSelf] = useState(false);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    // console.log(id == user.userId);
    // eslint-disable-next-line eqeqeq
    setIsSelf(id == user.userId);
  }, [id, user]);
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await profileApi.getProfileData({ _id: id });
        if (response.success) {
          setProfile(response.userData);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getProfileData();
    // setProfile({
    //   userId: 9,
    //   name: "Irene",
    //   username: "irene",
    //   avatar:
    //     "https://image.thanhnien.vn/1024/uploaded/trucdl/2020_07_31/irenexinhdepchupquangcao4_qnei.png",
    //   email: "",
    // });
  }, [id]);

  const handleChangeCoverPhoto = () => {
    alert("Change cover photo \n FEATURE UPDATING");
  };
  return (
    <div className="profile">
      <div className="profile__header">
        <div className="cover-photo">
          <img
            src={
              profile.coverPhoto || "https://i.ibb.co/YPXkz60/802bbd567310.jpg"
            }
            alt="CoverPhoto"
          />
          {isSelf ? (
            <div className="cover-photo--btn">
              <button onClick={() => handleChangeCoverPhoto()}>
                <i className="fas fa-camera"></i>{" "}
                <span>Change Cover Photo</span>
              </button>
            </div>
          ) : (
            false
          )}
        </div>
        <div className="profile-avatar">
          <img
            src={
              profile.avatar || `https://i.ibb.co/H4WHmsn/default-avatar.png`
            }
            alt="ProfileAvatar"
          />
          {isSelf ? (
            <button
              className="avatar--btn"
              // onClick={() => handleChangeAvatar()}
              data-toggle="modal"
              data-target={`#avatarUploaderModal`}
            >
              <i className="fas fa-camera-retro"></i>
            </button>
          ) : (
            false
          )}
        </div>
      </div>
      <div className="profile__body">
        <div className="profile__body--name">
          <span>{profile.name || "Người dùng fakebook"} </span>
          {profile.blueTick ? (
            <span className="profile__body--name-bluetick">
              <i className="fas fa-check-circle"></i>
            </span>
          ) : (
            false
          )}
        </div>
        <div className="profile__body--tabs">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                to={`/${id}`}
                activeClassName="active"
              >
                Infor
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/${id}/posts`}
                activeClassName="active"
              >
                Posts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/${id}/photos`}
                activeClassName="active"
              >
                Photos
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="profile__body--tab-info">
          <Route exact path="/:id">
            <About info={profile} />
          </Route>
          <Route exact path="/:id/posts">
            <Posts info={profile} />
          </Route>
          <Route exact path="/:id/photos">
            <Photos />
          </Route>
        </div>
      </div>
    </div>
  );
}

export default Profile;
