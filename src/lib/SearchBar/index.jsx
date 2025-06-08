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
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && selectedItem) {
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
        Buscar
      </Button>
    </div>
  );
}

export default SearchBar;
