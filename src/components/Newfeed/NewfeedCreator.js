import React from "react";
import "./Newfeed.css";
import {useSelector} from "react-redux";
// use custom hooks
import useModal from "../CustomHooks/useModal";
import ModalPostCreater from "../Tools/ModalPostCreater";

function NewfeedCreator() {
  const user = useSelector((state) => state.user);
  const {isShowing, toggleModal, hideModal} = useModal();
  // const dispatch = useDispatch();

  const showModalPostCreater = function (e) {
    toggleModal();
  };

  return (
    <div className='nf-creator'>
      <div className='nf-creator__header'>
        <img
          src={user.avatar}
          alt='artist'
          className='nf-creator__header-avatar'
        />
        <input
          type='text'
          className='nf-creator__header-input'
          placeholder={`${user.name} ơi, bạn đang nghĩ gì thế?`}
          onClick={(e) => showModalPostCreater(e)}
        />
      </div>
      <ul className='nf-creator__footer'>
        <li className='nf-creator__footer-item'>
          <span className='nf-creator__footer-item-camera-icon'>
            <i className='fas fa-camera-retro'></i>
          </span>
          Phát trực tiếp
        </li>
        <li className='nf-creator__footer-item' onClick={toggleModal}>
          <span className='nf-creator__footer-item-photo-icon'>
            <i className='fas fa-photo-video'></i>
          </span>
          Ảnh/video
        </li>
        <li className='nf-creator__footer-item'>
          <span className='nf-creator__footer-item-laugh-icon'>
            <i className='far fa-laugh'></i>
          </span>
          Cảm xúc/hoạt động
        </li>
      </ul>

      <ModalPostCreater isShowing={isShowing} hideModal={hideModal} />
    </div>
  );
}

export default NewfeedCreator;
