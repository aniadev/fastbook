/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import authApi from '../../store/api/authApi';
// for login
import { useDispatch } from 'react-redux';
import { signin } from '../../store/reducers/authSlice';
import { setUserData } from '../../store/reducers/userSlice';

function LoginPage() {
  const dispatch = useDispatch();

  const initialState = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  };
  const [regData, setRegData] = useState(initialState);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [regModalState, setModalState] = useState('hidden');
  const [passwordType, setPasswordType] = useState('password');
  const handleChange = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };
  const showRegisterModal = () => {
    setModalState('show');
  };
  const hideRegisterModal = () => {
    setModalState('hidden');
    setRegData(initialState);
  };

  const togglePasswordType = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
  };
  const loginHandler = async () => {
    try {
      const response = await authApi.login(loginData);
      if (response.success) {
        dispatch(signin(response.accessToken));
        dispatch(setUserData(response.userData));
      } else {
        alert('Fail: ' + response.message);
      }
    } catch (error) {
      console.log('Failed to login: ' + error.message);
    }
  };

  const registerNewAccount = async (e) => {
    if (validateRegistration()) {
      try {
        const response = await authApi.register({
          name: regData.lastname + ' ' + regData.firstname,
          username: regData.username,
          password: regData.password,
          email: regData.email,
        });

        if (response.success) {
          alert('Register successfull !');
          setRegData(initialState);
          hideRegisterModal();
          setLoginData({
            username: regData.username,
            password: regData.password,
          });
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.log('Error registering: ' + error);
      }
    } else {
      alert('Vui lòng điền đầy đủ thông tin');
    }
  };

  const validateRegistration = () => {
    if (
      !regData.firstname ||
      !regData.lastname ||
      !regData.username ||
      !regData.password
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <React.Fragment>
      <div className='grid'>
        <div className='login-page'>
          <div className='login-page__brand'>
            <div className='login-page__brand-name'>fakebook</div>
            <div className='login-page__brand-quote'>
              Fakebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
              của bạn.
              <br />
              Fakebook là 1 trang web fake đúng như tên của nó, muốn biết thêm
              chi tiết về người tạo, liên hệ tại{' '}
              <a href='https://www.facebook.com/anivia.1999' target='_blank'>
                đây
              </a>
            </div>
          </div>
          <div className='login-page__body'>
            <div className='login-container'>
              <div className='lg-form'>
                <div className='lg-form__username'>
                  <input
                    type='text'
                    className='lg-form__username-input'
                    placeholder='Email hoặc username'
                    value={loginData.username}
                    onChange={(e) => {
                      setLoginData({ ...loginData, username: e.target.value });
                    }}
                  />
                </div>
                <div className='lg-form__password'>
                  {/* <!-- <div className="lg-form__password focus"> --> */}
                  <input
                    type={passwordType}
                    className='lg-form__password-input'
                    placeholder='Mật khẩu'
                    value={loginData.password}
                    onChange={(e) => {
                      setLoginData({ ...loginData, password: e.target.value });
                    }}
                  />
                  <div
                    className='lg-form__password-toggle'
                    onClick={() => {
                      togglePasswordType();
                    }}
                  >
                    <i
                      className={
                        'far fa-eye' +
                        (passwordType === 'password' ? '' : '-slash')
                      }
                    ></i>
                    {/* <!-- <i className="far fa-eye-slash"></i> --> */}
                  </div>
                </div>
                <button
                  className='lg-form__login-btn'
                  onClick={() => {
                    loginHandler();
                  }}
                >
                  Đăng nhập
                </button>
                <div className='lg-form__reset-password'>
                  <Link to='#' className='lg-form__reset-password-link'>
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>
              <div className='register-container'>
                <button
                  className='register-btn'
                  onClick={() => {
                    showRegisterModal();
                  }}
                >
                  Tạo tài khoản mới
                </button>
              </div>
            </div>
            <div className='login-page__body-create-page'>
              <Link to='#'>Tạo Trang</Link>{' '}
              <span>
                dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={'reg-modal ' + regModalState} id='reg-modal'>
        <div className='modal__overlay'></div>
        <div className='modal__main'>
          <div className='reg-modal__header'>
            <div className='reg-modal__header-title'>Đăng ký</div>
            <div className='reg-modal__header-desc'>
              Nhanh chóng và dễ dàng.
            </div>
          </div>
          <div
            className='reg-modal__exit-btn'
            onClick={() => {
              hideRegisterModal();
            }}
          >
            <i className='fas fa-times'></i>
          </div>
          <div className='reg-modal__body'>
            <div className='reg-modal__body-name '>
              <input
                type='text'
                name='lastname'
                className='reg-modal__body-input-lastname'
                placeholder='Họ'
                required
                value={regData.lastname}
                onChange={(e) => handleChange(e)}
              />
              <input
                type='text'
                name='firstname'
                className='reg-modal__body-input-firstname'
                placeholder='Tên'
                value={regData.firstname}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className='reg-modal__body-username'>
              <input
                type='text'
                name='username'
                placeholder='Email or username'
                value={regData.username}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className='reg-modal__body-password'>
              <input
                type='password'
                name='password'
                placeholder='Mật khẩu mới'
                value={regData.password}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className='reg-modal__body-birthday'>
              <div className='reg-modal__body-birthday-title'>Sinh nhật</div>
              <span className='reg-modal__body-birthday-selector'>
                <select
                  name='birthday_day'
                  id='day'
                  title='Ngày'
                  className='reg-modal__body-birthday-day'
                  aria-label='Ngày'
                >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
                <select
                  name='birthday_month'
                  id='month'
                  title='Tháng'
                  className='reg-modal__body-birthday-month'
                  aria-label='Tháng'
                >
                  <option value='1'>Tháng 1</option>
                  <option value='2'>Tháng 2</option>
                  <option value='3'>Tháng 3</option>
                  <option value='4'>Tháng 4</option>
                  <option value='5'>Tháng 5</option>
                  <option value='6'>Tháng 6</option>
                  <option value='7'>Tháng 7</option>
                  <option value='8'>Tháng 8</option>
                  <option value='9'>Tháng 9</option>
                  <option value='10'>Tháng 10</option>
                  <option value='11'>Tháng 11</option>
                  <option value='12'>Tháng 12</option>
                </select>
                <select
                  name='birthday_year'
                  id='year'
                  title='Tháng'
                  className='reg-modal__body-birthday-year'
                  aria-label='Năm'
                >
                  <option value='2022'>2022</option>
                  <option value='2021'>2021</option>
                  <option value='2020'>2020</option>
                  <option value='2019'>2019</option>
                  <option value='2018'>2018</option>
                  <option value='2017'>2017</option>
                  <option value='2016'>2016</option>
                  <option value='2015'>2015</option>
                  <option value='2014'>2014</option>
                  <option value='2013'>2013</option>
                  <option value='2012'>2012</option>
                  <option value='2011'>2011</option>
                </select>
              </span>
            </div>
            <div className='reg-modal__body-description'>
              Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính sách
              dữ liệu và Chính sách cookie của chúng tôi.
            </div>
            <button
              className='reg-modal__body-register-btn'
              onClick={() => {
                registerNewAccount();
              }}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LoginPage;
