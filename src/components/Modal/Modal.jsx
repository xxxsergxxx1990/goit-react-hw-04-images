import React, { useEffect,useCallback } from 'react';
import PropTypes from 'prop-types';

import s from '../Modal/Modal.module.css';

export const Modal = ({ onModalClose, largeImageURL }) => {
  const keyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onModalClose();
      }
    },
    [onModalClose]
  );

  const handleClick = (e) => {
    if (e.currentTarget === e.target) {
      onModalClose();
    }
  };

  useEffect(() => {
    const onKeyDown = (e) => keyDown(e);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [keyDown]);

  return (
    <div className={s.Overlay} onClick={handleClick}>
      <div className={s.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};


