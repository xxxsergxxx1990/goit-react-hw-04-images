import React, { useEffect,useCallback } from 'react';
import PropTypes from 'prop-types';

import s from '../Modal/Modal.module.css';

export const Modal = ({ onModalClose, largeImageURL }) => {



  const keyDown = useCallback(
    (e) => {
      if (e.keyCode === 27 || e.currentTarget === e.target) {
        onModalClose();
      }
    },
    [onModalClose]
  );


  useEffect(() => {
    window.addEventListener('keydown', keyDown);
    return window.removeEventListener('keydown', keyDown);
  }, [keyDown]);

  return (
    <div className={s.Overlay} onClick={keyDown}>
      <div className={s.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onModalClose: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
};
