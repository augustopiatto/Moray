import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomMap from './components/CustomMap';
import ErrorToast from './components/ErrorToast';

function App() {
  const [geojson, setGeojson] = useState(null);
  const [population, setPopulation] = useState(null);
  const [error, setError] = useState(null);

  const onClose = () => {
    setError(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [geojsonRes, populationRes] = await Promise.all([
          axios.get('/bairros-geojson'),
          axios.get('/populacao'),
        ]);
        setGeojson(geojsonRes.data);
        setPopulation(populationRes.data);
      } catch (e) {
        setError(
          'Erro na busca dos dados das coordenadas ou da população. Tente recarregar a página.'
        );
        console.error(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 7000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <CustomMap style={{ height: '100vh' }} geojson={geojson} population={population} />
      {error && <ErrorToast onClose={onClose}>{error}</ErrorToast>}
    </>
  );
}

export default App;
