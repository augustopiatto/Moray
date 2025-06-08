import PropTypes from 'prop-types';
import Button from '../Button';
import './styles.scss';
import { useState } from 'react';

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  suggestions: PropTypes.array,
  onSuggestionClick: PropTypes.func,
  placeholder: PropTypes.string,
  selected: PropTypes.bool,
};

function SearchBar({
  value,
  onChange,
  onSearch,
  suggestions = [],
  onSuggestionClick,
  placeholder,
  selected,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        placeholder={placeholder || 'Buscar...'}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && selected) {
            onSearch();
          }
        }}
      />
      {isFocused && suggestions.length > 0 && (
        <ul className="search-bar__dropdown">
          {suggestions.map((feature) => (
            <li
              className="dropdown__item"
              key={feature.properties.id}
              onClick={() => onSuggestionClick(feature)}
            >
              {feature.properties.name}
            </li>
          ))}
        </ul>
      )}
      <Button className="search-bar__button" disabled={!selected} onClick={onSearch}>
        Buscar
      </Button>
    </div>
  );
}

export default SearchBar;
