import PropTypes from 'prop-types';

import s from '../Button/Button.module.css';

export const Button = ({ onNextPage }) => {
  return (
    <button type="button" className={s.Button} onClick={onNextPage}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onNextPage: PropTypes.func,
};
