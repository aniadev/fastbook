import React, { useState } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../../store/reducers/authSlice';
// redux store

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const [messageDropdown, setMessageDropdown] = useState('hidden');
  // const [notiDropdown, setNotiDropdown] = useState('hidden');
  const [optionDropdown, setOptionDropdown] = useState('hidden');
  //
  const [itemDropdown, setItemDropdown] = useState(''); // message/noti/option
  const getItemDropdown = function (item) {
    if (item === itemDropdown) {
      return '';
    } else {
      return 'hidden';
    }
  };
  const toggleDropdown = function (item) {
    if (itemDropdown !== item) {
      setItemDropdown(item);
    } else {
      setItemDropdown('');
    }
  };
  const logout = () => {
    dispatch(signout());
    console.log('signed out');
  };
  return (
    <div className='navbar'>
      <div className='nav__brand'>
        <Link className='nav__brand-logo' to='/'>
          <img src='./img/logo.png' alt='logo' />
        </Link>
        <div className='nav__brand-search'>
          <div className='nav__brand-search-icon'>
            <i className='fas fa-search'></i>
          </div>
          <input
            type='text'
            name='search'
            id=''
            placeholder='Tìm kiếm trong fakebook'
            className='nav__brand-search-input'
            autoComplete='off'
          />
        </div>
      </div>
      <ul className='nav__menu'>
        <NavLink
          exact
          to='/'
          className='nav__menu-item'
          activeClassName='nav__menu-item--active'
        >
          <span>
            <i className='fas fa-home'></i>
          </span>
        </NavLink>
        <NavLink
          to='/photos'
          className='nav__menu-item'
          activeClassName='nav__menu-item--active'
        >
          <span>
            <i className='fas fa-photo-video'></i>
          </span>
        </NavLink>
        <NavLink
          to='/friends'
          className='nav__menu-item'
          activeClassName='nav__menu-item--active'
        >
          <span>
            <i className='fas fa-users'></i>
          </span>
        </NavLink>
        <NavLink
          to='/games'
          className='nav__menu-item'
          activeClassName='nav__menu-item--active'
        >
          <span>
            <i className='fas fa-gamepad'></i>
          </span>
        </NavLink>
      </ul>
      <div className='nav__tools'>
        <NavLink
          className='nav__tools-user'
          to={`/${user.userId}`}
          activeClassName='nav__tools-user--active'
        >
          <div className='nav__tools-user-avatar'>
            <img src={user.avatar} alt='avatar' />
          </div>
          <span className='nav__tools-user-name'>{user.name}</span>
        </NavLink>
        <ul className='nav__tools-list'>
          <li
            className={
              'nav__tools-item ' +
              (getItemDropdown('message') === ''
                ? 'nav__tools-item--active'
                : '')
            }
            onClick={() => {
              toggleDropdown('message');
            }}
          >
            <i className='fab fa-facebook-messenger'></i>
            <div className='nav__tools-item-counter'>2</div>
            <div
              className={`nav__tools-dropdown ${getItemDropdown('message')}`}
            >
              <div className='nav__tools-dropdown-header'>
                <span>Messenger</span>
                <ul className='nav__tools-dropdown-header-opt'>
                  <li>
                    <i className='fas fa-ellipsis-h'></i>
                  </li>
                  <li>
                    <i className='fas fa-expand-arrows-alt'></i>
                  </li>
                  <li>
                    <i className='fas fa-video'></i>
                  </li>
                  <li>
                    <i className='fas fa-plus'></i>
                  </li>
                </ul>
              </div>
              <div className='nav__tools-dropdown-main'>
                <div className='nav__tools-dropdown-search'>
                  <span className='nav__tools-dropdown-search-icon'>
                    <i className='fas fa-search'></i>
                  </span>
                  <input type='text' placeholder='Search' />
                </div>
                <ul className='nav__tools-dropdown-list'>
                  <li className='nav__tools-dropdown-item'>
                    <Link className='nav__tools-dropdown-item-link' to='#'>
                      <div className='nav__tools-dropdown-item-avatar'>
                        <img
                          src='https://scontent.fhan3-2.fna.fbcdn.net/v/t1.6435-1/95767309_1220244695034008_3848676484063428608_n.jpg?stp=dst-jpg_p100x100&_nc_cat=107&ccb=1-5&_nc_sid=7206a8&_nc_ohc=wSqB_6u1-0IAX9O16Tt&_nc_ht=scontent.fhan3-2.fna&oh=00_AT-7MXLs02cyx1eNsPyF7nOCQAaVsFgKQzHOQrPOIxeLkQ&oe=62534556'
                          alt='msg-avatar'
                        />
                      </div>
                      <div className='nav__tools-dropdown-item-info'>
                        <h4>Aroma</h4>
                        <span>This is a message</span>
                      </div>
                    </Link>
                  </li>
                  <li className='nav__tools-dropdown-item'>
                    <Link className='nav__tools-dropdown-item-link' to='#'>
                      <div className='nav__tools-dropdown-item-avatar'>
                        <img
                          src='https://scontent.fhan3-2.fna.fbcdn.net/v/t1.6435-1/95767309_1220244695034008_3848676484063428608_n.jpg?stp=dst-jpg_p100x100&_nc_cat=107&ccb=1-5&_nc_sid=7206a8&_nc_ohc=wSqB_6u1-0IAX9O16Tt&_nc_ht=scontent.fhan3-2.fna&oh=00_AT-7MXLs02cyx1eNsPyF7nOCQAaVsFgKQzHOQrPOIxeLkQ&oe=62534556'
                          alt='msg-avatar'
                        />
                      </div>
                      <div className='nav__tools-dropdown-item-info'>
                        <h4>Aroma</h4>
                        <span>This is a message</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li
            className={
              'nav__tools-item ' +
              (getItemDropdown('noti') === '' ? 'nav__tools-item--active' : '')
            }
            onClick={() => {
              toggleDropdown('noti');
            }}
          >
            <i className='fas fa-bell'></i>
            <div className='nav__tools-item-counter hidden'>2</div>
            <div className={`nav__tools-dropdown ${getItemDropdown('noti')}`}>
              <div className='nav__tools-dropdown-header'>
                <span>Thông báo</span>
                <ul className='nav__tools-dropdown-header-opt'>
                  <li>
                    <i className='fas fa-ellipsis-h'></i>
                  </li>
                </ul>
              </div>
              <div className='nav__tools-dropdown-main'>
                <ul className='nav__tools-dropdown-list'>
                  <li className='nav__tools-dropdown-item'>
                    <Link className='nav__tools-dropdown-item-link' to='#'>
                      <div className='nav__tools-dropdown-item-avatar'>
                        <img
                          src='https://scontent.fhan3-2.fna.fbcdn.net/v/t1.6435-1/95767309_1220244695034008_3848676484063428608_n.jpg?stp=dst-jpg_p100x100&_nc_cat=107&ccb=1-5&_nc_sid=7206a8&_nc_ohc=wSqB_6u1-0IAX9O16Tt&_nc_ht=scontent.fhan3-2.fna&oh=00_AT-7MXLs02cyx1eNsPyF7nOCQAaVsFgKQzHOQrPOIxeLkQ&oe=62534556'
                          alt='msg-avatar'
                        />
                      </div>
                      <div className='nav__tools-dropdown-item-info'>
                        <h4>Hôm nay bạn có thể ôn lại 1 kỉ niệm</h4>
                        <span>8 giờ trước</span>
                      </div>
                    </Link>
                  </li>
                  <li className='nav__tools-dropdown-item'>
                    <Link className='nav__tools-dropdown-item-link' to='#'>
                      <div className='nav__tools-dropdown-item-avatar'>
                        <img
                          src='https://scontent.fhan3-2.fna.fbcdn.net/v/t1.6435-1/95767309_1220244695034008_3848676484063428608_n.jpg?stp=dst-jpg_p100x100&_nc_cat=107&ccb=1-5&_nc_sid=7206a8&_nc_ohc=wSqB_6u1-0IAX9O16Tt&_nc_ht=scontent.fhan3-2.fna&oh=00_AT-7MXLs02cyx1eNsPyF7nOCQAaVsFgKQzHOQrPOIxeLkQ&oe=62534556'
                          alt='msg-avatar'
                        />
                      </div>
                      <div className='nav__tools-dropdown-item-info'>
                        <h4>
                          <strong>Kem Mit</strong> đã đăng trong{' '}
                          <strong>Arduino Việt Nam</strong> vào Chủ Nhật: Mọi
                          người cho hỏi sao b=dfg. Lorem ipsum dolor, sit amet
                          consectetur adipisicing elit.
                        </h4>
                        <span>9 giờ trước</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li
            className={
              'nav__tools-item ' +
              (getItemDropdown('option') === ''
                ? 'nav__tools-item--active'
                : '')
            }
            onClick={() => {
              toggleDropdown('option');
            }}
          >
            <i className='fas fa-caret-down'></i>
            <div
              className={'nav__tools-user-option ' + getItemDropdown('option')}
            >
              <Link to='#' className='nav__tools-user-option-profile'>
                <img
                  src={user.avatar}
                  alt='avatar'
                  className='nav__tools-option-img'
                />
                <div className='nav__tools-user-option-profile-name'>
                  <h4>{user.name}</h4>
                  <span>Xem trang cá nhân của bạn</span>
                </div>
              </Link>
              <div className='nav__tools-user-option-report-border'>
                <Link className='nav__tools-user-option-report' to='#'>
                  <div className='nav__tools-user-option-report-icon'>
                    <i className='fas fa-flag'></i>
                  </div>
                  <div>
                    <h4>Đóng góp ý kiến</h4>
                    <span>Hãy chung tay cải thiện Fakebook</span>
                  </div>
                </Link>
              </div>
              <Link className='nav__tools-user-option-item' to='#'>
                <div className='nav__tools-user-option-report-icon'>
                  <i className='fas fa-cog'></i>
                </div>
                <div>
                  <h4>Cài đặt</h4>
                </div>
              </Link>
              <Link className='nav__tools-user-option-item' to='#'>
                <div className='nav__tools-user-option-report-icon'>
                  <i className='fas fa-question-circle'></i>
                </div>
                <div>
                  <h4>Trợ giúp</h4>
                </div>
              </Link>
              <Link
                className='nav__tools-user-option-item'
                to='#'
                onClick={() => logout()}
              >
                <div className='nav__tools-user-option-report-icon'>
                  <i className='fas fa-sign-out-alt'></i>
                </div>
                <div>
                  <h4>Đăng xuất</h4>
                </div>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
