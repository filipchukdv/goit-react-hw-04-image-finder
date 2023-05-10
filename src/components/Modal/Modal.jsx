import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({ src, alt, onBackdropClick, onEscPress }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEscPress);
    return window.removeEventListener('keydown', onEscPress);
  });

  return (
    <div className={css.Overlay} onClick={onBackdropClick}>
      <div className={css.Modal}>
        <img className={css.image} src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onBackdropClick: PropTypes.func.isRequired,
};

export default Modal;
