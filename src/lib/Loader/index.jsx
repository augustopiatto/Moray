import PropTypes from 'prop-types';
import './styles.scss';

Loader.propTypes = {
  className: PropTypes.string,
};

function Loader({ className }) {
  const finalClassName = ['loader', className].filter(Boolean).join(' ');

  return (
    <div className={finalClassName} role="status">
      <div className="loader__spinner"></div>
    </div>
  );
}

export default Loader;
