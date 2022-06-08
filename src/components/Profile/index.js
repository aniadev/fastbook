import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Route, NavLink, useParams, Link} from "react-router-dom";
import "./Profile.css";
import "./Profile-mobile.css";
// components
import NewfeedPost from "../Newfeed/NewfeedPost";
import NewfeedCreator from "../Newfeed/NewfeedCreator";
import About from "./About";
//api
import profileApi from "../../store/api/profileApi";
import {
  setProfilePosts,
  setProfileData,
  reactPost,
  unReactPost,
} from "../../store/reducers/profileSlice";

function Profile() {
  const {id} = useParams();
  const [isSelf, setIsSelf] = useState(false);
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(id == user.userId);
    // eslint-disable-next-line eqeqeq
    setIsSelf(id == user.userId);
    document.body.scrollIntoView({behavior: "smooth"});
  }, [id, user]);

  // get profile from API
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await profileApi.getProfileData({_id: id});
        if (response.success) {
          dispatch(setProfileData(response.userData));
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getProfileData();
  }, [id, dispatch]);

  const handleChangeCoverPhoto = () => {
    alert("Change cover photo \n FEATURE UPDATING");
  };
  // get posts data from API
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await profileApi.getPosts({_id: id});
        if (response.success) {
          // console.log(response);
          dispatch(setProfilePosts(response.posts));
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getPosts();
  }, [id, dispatch]);

  return (
    <div className='profile'>
      <div className='profile__cover'>
        <img
          src={
            profile.userData.coverPhoto ||
            "https://i.ibb.co/YPXkz60/802bbd567310.jpg"
          }
          alt='cover'
        />
        {isSelf ? (
          <button
            className='profile__cover-btn'
            onClick={() => handleChangeCoverPhoto()}>
            <i className='fas fa-camera'></i> <span>Chỉnh sửa ảnh bìa</span>
          </button>
        ) : (
          false
        )}
      </div>
      <div className='profile__header'>
        <div className='profile__header-spacing'></div>
        <div className='profile__header-info-wrapper'>
          <div className='profile__header-avatar'>
            <Link to='#'>
              <img
                src={
                  profile.userData.avatar ||
                  `https://i.ibb.co/H4WHmsn/default-avatar.png`
                }
                alt='avatar'
                className='profile__header-avatar-img'
              />
            </Link>

            {isSelf ? (
              <div className='profile__header-avatar-btn'>
                <i className='fas fa-camera'></i>
              </div>
            ) : (
              false
            )}
          </div>
          <div className='profile__header-info'>
            <div className='profile__header-info-general'>
              <div className='profile__header-info-name'>
                {profile.userData.name || "Người dùng fakebook"}
              </div>
              <Link to='#' className='profile__header-info-friends'>
                570 bạn bè
              </Link>
            </div>
            <button className='profile__header-info-btn'>
              <i className='fas fa-pen'></i>Chỉnh sửa trang cá nhân
            </button>
          </div>
        </div>
        <div className='profile__header-tabs'>
          <ul className='profile__header-tabs-list'>
            <NavLink
              exact
              to={`/${id}`}
              className='profile__header-tabs-item'
              activeClassName='profile__header-tabs-item--active'>
              <span className='profile__header-tabs-item-link'>Bài viết</span>
            </NavLink>
            <NavLink
              exact
              to={`/${id}/about`}
              className='profile__header-tabs-item'
              activeClassName='profile__header-tabs-item--active'>
              <span className='profile__header-tabs-item-link'>Giới thiệu</span>
            </NavLink>
            <NavLink
              exact
              to={`/${id}/friends`}
              className='profile__header-tabs-item'
              activeClassName='profile__header-tabs-item--active'>
              <span className='profile__header-tabs-item-link'>Bạn bè</span>
            </NavLink>
            <NavLink
              exact
              to={`/${id}/photos`}
              className='profile__header-tabs-item'
              activeClassName='profile__header-tabs-item--active'>
              <span className='profile__header-tabs-item-link'>Ảnh</span>
            </NavLink>
          </ul>
          <span className='profile__header-tabs-option'>
            {/* <span className="profile__header-tabs-option profile__header-tabs-option--active"> */}
            <i className='fas fa-ellipsis-h'></i>
            <ul className='profile__header-tabs-option-dropdown'>
              <li className='profile__header-tabs-option-dropdown-item'>
                <Link to='#'>
                  <i className='fas fa-search'></i>Tìm kiếm trong trang cá nhân
                </Link>
              </li>
              <li className='profile__header-tabs-option-dropdown-item'>
                <Link to='#'>
                  <i className='fas fa-exclamation-triangle'></i>Trạng thái tài
                  khoản
                </Link>
              </li>
              <li className='profile__header-tabs-option-dropdown-item'>
                <Link to='#'>
                  <i className='fas fa-archive'></i>Kho lưu trữ
                </Link>
              </li>
              <li className='profile__header-tabs-option-dropdown-item'>
                <Link to='#'>
                  <i className='fas fa-user-cog'></i>Cài đặt trang cá nhân
                </Link>
              </li>
            </ul>
          </span>
        </div>
      </div>
      <div className='profile__body'>
        <Route exact path='/:id'>
          <div className='profile__body-left'>
            <About profile={profile} />
          </div>
          <div className='profile__body-right'>
            {isSelf ? <NewfeedCreator /> : false}
            {profile.posts.map((post) => {
              let postData = {
                ...post,
                avatar: profile.userData.avatar,
                name: profile.userData.name,
              };
              return <NewfeedPost key={post.postId} postData={postData} />;
            })}
          </div>
        </Route>
        <Route path='/:id/about'>
          <About profile={profile} />
        </Route>
      </div>
    </div>
  );
}

export default Profile;
