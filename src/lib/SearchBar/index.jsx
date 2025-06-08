import PropTypes from 'prop-types';
import Button from '../Button';
import './styles.scss';

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

function SearchBar({ onChange, onSearch, placeholder, value }) {
  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        placeholder={placeholder || 'Buscar...'}
        value={value}
        onChange={onChange}
        onKeyDown={(event) => event.key === 'Enter' && onSearch()}
      />
      <Button className="search-bar__button" onClick={onSearch}>
        Buscar
      </Button>
    </div>
  );
}

export default SearchBar;
