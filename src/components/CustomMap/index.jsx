import PropTypes from 'prop-types';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import { useState } from 'react';
import PopulationModal from '../PopulationModal';

CustomMap.propTypes = {
  geojson: PropTypes.object.isRequired,
  population: PropTypes.arrayOf(
    PropTypes.shape({
      id_geometria: PropTypes.number.isRequired,
      ano: PropTypes.string.isRequired,
      populacao: PropTypes.number.isRequired,
    })
  ).isRequired,
};

function getColor(id) {
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
}

function CustomMap({ geojson, population }) {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedPopulation, setSelectedPopulation] = useState(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);

  const openModal = (value) => {
    setIsOpened(true);
    const filteredPopulation = population.filter(
      (pop) => pop.id_geometria === value.layer.feature.properties.id
    );
    setSelectedPopulation(filteredPopulation);
    setSelectedNeighborhood(value.layer.feature.properties);
  };

  const onClose = () => {
    setIsOpened(false);
  };

  const geoJsonStyle = (feature) => ({
    color: getColor(feature.properties.id),
    weight: 2,
    fillOpacity: 0.5,
    fillColor: getColor(feature.properties.id),
  });

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindTooltip(feature.properties.name, {
        permanent: true,
        direction: 'center',
      });
    }
    layer.on({
      click: () => openModal({ layer }),
    });
  };

  return (
    <>
      <MapContainer
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
        {geojson && <GeoJSON data={geojson} style={geoJsonStyle} onEachFeature={onEachFeature} />}
      </MapContainer>
      {isOpened && (
        <PopulationModal
          onClose={onClose}
          selectedPopulation={selectedPopulation}
          selectedNeighborhood={selectedNeighborhood}
        />
      )}
    </>
  );
}

export default CustomMap;
