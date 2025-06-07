import PropTypes from 'prop-types';
import './styles.scss';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  circle: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  flat: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

function Button({ children, circle, className, color, flat, onClick }) {
  const finalClassName = [
    'button',
    className,
    circle ? 'button--circle' : '',
    flat ? 'button--flat' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={finalClassName} style={{ backgroundColor: color }} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
