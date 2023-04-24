import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.onEscPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onEscPress);
  }

  render() {
    const { src, alt, onBackdropClick } = this.props;
    return (
      <div className={css.Overlay} onClick={onBackdropClick}>
        <div className={css.Modal}>
          <img className={css.image} src={src} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onBackdropClick: PropTypes.func.isRequired,
};

export default Modal;
