import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomMap from './components/CustomMap';

function App() {
  const [geojson, setGeojson] = useState(null);
  const [population, setPopulation] = useState(null);

  const getGeojson = async () => {
    const { data } = await axios.get('/bairros-geojson');
    setGeojson(data);
  };

  const getPopulation = async () => {
    const { data } = await axios.get('/populacao');
    setPopulation(data);
  };

  useEffect(() => {
    getGeojson(), getPopulation();
  }, []);

  return <CustomMap style={{ height: '100vh' }} geojson={geojson} population={population} />;
}

export default App;
