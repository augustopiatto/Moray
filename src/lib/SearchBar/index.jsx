import PropTypes from 'prop-types';
import Button from '../Button';
import './styles.scss';

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

function SearchBar({ onChange, onSearch, placeholder, value }) {
  const isDisabled = value.trim().length < 3;

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        placeholder={placeholder || 'Buscar...'}
        value={value}
        onChange={onChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !isDisabled) {
            onSearch();
          }
        }}
      />
      <Button className="search-bar__button" disabled={isDisabled} onClick={onSearch}>
        Buscar
      </Button>
    </div>
  );
}

export default SearchBar;
