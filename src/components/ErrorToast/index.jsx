import PropTypes from 'prop-types';
import './styles.scss';
import Button from '../../lib/Button';

ErrorToast.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

function ErrorToast({ children, onClose }) {
  return (
    <div className="error-toast">
      <p className="toast__content">{children}</p>
      <Button circle color="transparent" flat onClick={onClose}>
        X
      </Button>
    </div>
  );
}

export default ErrorToast;
