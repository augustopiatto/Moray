// import { GeoJSON } from 'react-leaflet/GeoJSON';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import PopulationModal from './components/PopulationModal'

function App() {
  const [geojson, setGeojson] = useState(null)
  const [population, setPopulation] = useState(null)
  const [selectedPopulation, setSelectedPopulation] = useState(null)
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null)
  const [isOpened, setIsOpened] = useState(false)

  const openModal = (value) => {
      setIsOpened(true)
      const filteredPopulation = population.filter((pop) => pop.id_geometria === value.layer.feature.properties.id)
      setSelectedPopulation(filteredPopulation)
      setSelectedNeighborhood(value.layer.feature.properties)
  }
  const onClose = () => {
      setIsOpened(false)
  }

  const getGeojson = async () => {
    const {data} = await axios.get('/bairros-geojson')
    setGeojson(data)
  }

  const getPopulation = async () => {
    const {data} = await axios.get('/populacao')
    setPopulation(data)
  }

  useEffect(() => {
    getGeojson(),
    getPopulation()
  }, [])

  return (
    <>
      <MapContainer
        style={{ height: '100vh' }}
        bounds={[[-23.234708, -45.928813], [-23.198917, -45.900761]]}
        zoom={15}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=BcCw9iWXRyBExU9XfTBr"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Componente que renderiza as geometrias dos bairros */}
        {geojson && (
          <GeoJSON
            data={geojson}
            style={{ color: '#6c58ff' }}
            eventHandlers={{
              click: (event) => {
                openModal(event)
              },
            }}
          />
        )}
      </MapContainer>
      {isOpened && <PopulationModal onClose={onClose} selectedPopulation={selectedPopulation} selectedNeighborhood={selectedNeighborhood} />}
    </>
  );
}

export default App;
