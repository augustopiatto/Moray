import PropTypes from 'prop-types';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import Loader from '../../lib/Loader';
import { LayersControl } from 'react-leaflet';
import SearchBar from '../../lib/SearchBar';
const PopulationModal = lazy(() => import('../PopulationModal'));

CustomMap.propTypes = {
  geojson: PropTypes.object,
  population: PropTypes.arrayOf(
    PropTypes.shape({
      id_geometria: PropTypes.number.isRequired,
      ano: PropTypes.string.isRequired,
      populacao: PropTypes.number.isRequired,
    })
  ),
};

const getColor = (id) => {
  const colors = [
    '#6C58FF',
    '#FF6B6B',
    '#51CF66',
    '#FFD43B',
    '#339AF0',
    '#F783AC',
    '#FFA94D',
    '#63E6BE',
    '#845EF7',
    '#FAB005',
  ];
  return colors[id % colors.length];
};

function CustomMap({ geojson, population }) {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedPopulation, setSelectedPopulation] = useState(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [search, setSearch] = useState('');
  const [highlightedId, setHighlightedId] = useState(null);

  const mapRef = useRef();

  const handleInputChange = useCallback((event) => {
    setSearch(event.target.value);
    if (!event.target.value) setHighlightedId(null);
  }, []);

  const handleSearch = useCallback(() => {
    if (!geojson) return;
    const found = geojson.features.find((feature) =>
      feature.properties.name.toLowerCase().includes(search.toLowerCase())
    );
    if (found) {
      setHighlightedId(found.properties.id);
      if (mapRef.current) {
        const layer = L.geoJSON(found);
        mapRef.current.fitBounds(layer.getBounds());
      }
    }
  }, [geojson, search]);

  function openModal(value) {
    setIsOpened(true);
    const filteredPopulation = population.filter(
      (pop) => pop.id_geometria === value.layer.feature.properties.id
    );
    setSelectedPopulation(filteredPopulation);
    setSelectedNeighborhood(value.layer.feature.properties);
  }

  const onClose = () => {
    setIsOpened(false);
  };

  const geoJsonStyle = useCallback(
    (feature) => ({
      color: getColor(feature.properties.id),
      weight: highlightedId === feature.properties.id ? 6 : 2,
      fillOpacity: highlightedId === feature.properties.id ? 0.8 : 0.5,
      fillColor: getColor(feature.properties.id),
    }),
    [highlightedId]
  );

  const onEachFeature = useCallback(
    (feature, layer) => {
      if (feature.properties && feature.properties.name) {
        layer.bindTooltip(feature.properties.name, {
          permanent: true,
          direction: 'center',
        });
      }
      layer.on({
        click: () => openModal({ layer }),
        mouseover: function () {
          layer.setStyle({
            fillOpacity: 0.6,
            weight: 3,
          });
          layer.bringToFront();
        },
        mouseout: function () {
          layer.setStyle({
            fillOpacity: 0.5,
            weight: 2,
          });
        },
      });
    },
    [openModal]
  );

  return (
    <>
      <SearchBar
        onChange={handleInputChange}
        onSearch={handleSearch}
        placeholder="Buscar bairros..."
        value={search}
      />
      <MapContainer
        ref={mapRef}
        style={{ height: '100vh' }}
        bounds={[
          [-23.234708, -45.928813],
          [-23.198917, -45.900761],
        ]}
        zoom={15}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=BcCw9iWXRyBExU9XfTBr"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LayersControl position="topright">
          {geojson &&
            geojson.features.map((feature) => (
              <LayersControl.Overlay
                key={feature.properties.id}
                name={feature.properties.name}
                checked
              >
                <GeoJSON data={feature} style={geoJsonStyle} onEachFeature={onEachFeature} />
              </LayersControl.Overlay>
            ))}
        </LayersControl>
      </MapContainer>
      {isOpened && (
        <Suspense fallback={<Loader />}>
          <PopulationModal
            onClose={onClose}
            selectedPopulation={selectedPopulation}
            selectedNeighborhood={selectedNeighborhood}
          />
        </Suspense>
      )}
    </>
  );
}

export default CustomMap;
