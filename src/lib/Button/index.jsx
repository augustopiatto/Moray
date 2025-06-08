import PropTypes from 'prop-types';
import './styles.scss';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  circle: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  flat: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

function Button({ children, circle, className, color, disabled, flat, onClick }) {
  const finalClassName = [
    'button',
    className,
    circle ? 'button--circle' : '',
    disabled ? 'button--disabled' : '',
    flat ? 'button--flat' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={finalClassName}
      style={{ backgroundColor: color }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
