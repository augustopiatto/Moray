import PropTypes from 'prop-types';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import Loader from '../../lib/Loader';
import { LayersControl, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import SearchBar from '../../lib/SearchBar';
import booleanTouches from '@turf/boolean-touches';
import './styles.scss';
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

const COLORS = [
  '#6C58FF', // roxo
  '#FF6B6B', // vermelho
  '#FFD43B', // amarelo
  '#51CF66', // verde
];

function CustomMap({ geojson, population }) {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedPopulation, setSelectedPopulation] = useState(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);

  const mapRef = useRef();

  const featuresWithNeighbors = geojson
    ? geojson.features.map((feature, i, features) => {
        const neighbors = [];
        features.forEach((otherFeature, j) => {
          if (i !== j && booleanTouches(feature, otherFeature)) {
            neighbors.push(otherFeature.properties.id);
          }
        });
        return {
          ...feature,
          properties: {
            ...feature.properties,
            neighbors,
          },
        };
      })
    : [];

  const buildAdjacency = (features) => {
    const adjacency = {};
    features.forEach((feature) => {
      adjacency[feature.properties.id] = feature.properties.neighbors || [];
    });
    return adjacency;
  };

  const colorGraph = (features, colors) => {
    const adjacency = buildAdjacency(features);
    const neighborhoodColors = {};

    features.forEach((feature) => {
      const id = feature.properties.id;
      const usedColors = adjacency[id]
        .map((neighborId) => neighborhoodColors[neighborId])
        .filter(Boolean);
      const availableColor = colors.find((color) => !usedColors.includes(color));
      neighborhoodColors[id] = availableColor || colors[0];
    });

    return neighborhoodColors;
  };

  const neighborhoodColors = geojson ? colorGraph(featuresWithNeighbors, COLORS) : {};

  const geoJsonStyle = useCallback(
    (feature) => ({
      color: neighborhoodColors[feature.properties.id] || COLORS[0],
      weight: highlightedId === feature.properties.id ? 6 : 2,
      fillOpacity: highlightedId === feature.properties.id ? 0.8 : 0.5,
      fillColor: neighborhoodColors[feature.properties.id] || COLORS[0],
    }),
    [highlightedId, neighborhoodColors]
  );

  const openModal = useCallback(
    (value) => {
      setIsOpened(true);
      const filteredPopulation = population.filter(
        (pop) => pop.id_geometria === value.layer.feature.properties.id
      );
      setSelectedPopulation(filteredPopulation);
      setSelectedNeighborhood(value.layer.feature.properties);
    },
    [population]
  );

  const onClose = () => setIsOpened(false);

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
        items={geojson ? geojson.features : []}
        onItemSelect={(feature) => {
          setHighlightedId(feature.properties.id);
          if (mapRef.current) {
            const layer = L.geoJSON(feature);
            mapRef.current.fitBounds(layer.getBounds());
          }
        }}
        placeholder="Buscar bairros..."
      />
      <MapContainer
        ref={mapRef}
        style={{ height: '100vh' }}
        bounds={[
          [-23.234708, -45.928813],
          [-23.198917, -45.900761],
        ]}
        zoom={15}
        zoomControl={false}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=BcCw9iWXRyBExU9XfTBr"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="bottomright" />
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
        <Suspense fallback={<Loader className="population-modal-loader" />}>
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
