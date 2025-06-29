import PropTypes from 'prop-types';
import Button from '../Button';
import { useMemo, useState } from 'react';
import './styles.scss';

SearchBar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      properties: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
  onItemSelect: PropTypes.func,
  placeholder: PropTypes.string,
};

function SearchBar({ items = [], onItemSelect, placeholder }) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered = useMemo(() => {
    return items.filter((item) => item.properties.name.toLowerCase().includes(input.toLowerCase()));
  }, [items, input]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setSelectedItem(null);
  };

  const handleSuggestionClick = (feature) => {
    setInput(feature.properties.name);
    setSelectedItem(feature);
    if (onItemSelect) onItemSelect(feature);
  };

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        value={input}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        placeholder={placeholder}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && selectedItem) {
            if (onItemSelect) onItemSelect(selectedItem);
          }
        }}
      />
      {isFocused && filtered.length > 0 && (
        <ul className="search-bar__dropdown">
          {filtered.map((feature) => (
            <li
              className="dropdown__item"
              key={feature.properties.id}
              onClick={() => handleSuggestionClick(feature)}
            >
              {feature.properties.name}
            </li>
          ))}
        </ul>
      )}
      <Button
        className="search-bar__button"
        disabled={!selectedItem}
        onClick={() => selectedItem && onItemSelect(selectedItem)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          <path
            d="M9 2a7 7 0 105.196 12.032l3.386 3.386a1 1 0 001.415-1.415l-3.386-3.386A7 7 0 009 2zm0 2a5 5 0 110 10A5 5 0 019 4z"
            fill="currentColor"
          />
        </svg>
      </Button>
    </div>
  );
}

export default SearchBar;
