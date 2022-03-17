import React from 'react';
// import { useParams } from "react-router-dom";

function About({ profile }) {
  return (
    <div className='profile__body-intro'>
      <span className='profile__body-intro-header'>Giới thiệu</span>
      <div className='profile__body-intro-item'>
        <i className='fas fa-at'></i>
        <span>Email: {profile.userData.email || 'không có'}</span>
      </div>
      <div className='profile__body-intro-item'>
        <i className='fas fa-signature'></i>
        <span>Username: {profile.userData.username || 'không có'}</span>
      </div>
      <div className='profile__body-intro-item'>
        <i className='fas fa-id-card'></i>
        <span>
          Tuổi:{' '}
          {profile.userData.birthday
            ? new Date(
                Date.now() - new Date(profile.userData.birthday)
              ).getUTCFullYear() - 1970
            : 'không có'}
        </span>
      </div>
      <div className='profile__body-intro-item'>
        <i className='fas fa-birthday-cake'></i>
        <span>
          Sinh nhật:{' '}
          {profile.userData.birthday
            ? `${new Date(profile.userData.birthday).toLocaleDateString(
                'vi-VN'
              )}`
            : 'không có'}
        </span>
      </div>
      <div className='profile__body-intro-item'>
        <i className='fas fa-map-marker-alt'></i>
        <span>Đến từ: {profile.userData.address || 'không có'}</span>
      </div>
      <button className='profile__body-intro-btn'>Chỉnh sửa chi tiết</button>
    </div>
  );
}

export default About;
