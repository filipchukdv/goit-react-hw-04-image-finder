import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ children, onButtonClick }) => (
  <button type="button" className={css.Button} onClick={onButtonClick}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
};

export default Button;
