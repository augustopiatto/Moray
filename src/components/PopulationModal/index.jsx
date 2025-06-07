import PropTypes from 'prop-types';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './styles.scss';
import CustomTooltip from './CustomTooltip';
import Button from '../../lib/Button';

PopulationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedNeighborhood: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  selectedPopulation: PropTypes.arrayOf(
    PropTypes.shape({
      ano: PropTypes.string.isRequired,
      populacao: PropTypes.number.isRequired,
    })
  ),
};

function PopulationModal({ onClose, selectedNeighborhood, selectedPopulation }) {
  const mapData = selectedPopulation.map((population) => ({
    name: population.ano,
    uv: population.populacao,
    pv: 2400,
    amt: 2400,
  }));

  const minPopulation = Math.min(...mapData.map((data) => data.uv));
  const yMin = minPopulation - 200;

  return (
    <>
      <div className="population-modal">
        <h1 className="modal__title">Bairro: {selectedNeighborhood.name}</h1>
        <Button className="modal__close-button" circle flat onClick={onClose}>
          X
        </Button>
        <LineChart
          width={500}
          height={400}
          data={mapData}
          margin={{ top: 30, right: 10, bottom: 20, left: 30 }}
        >
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" label={{ value: 'Ano', position: 'insideBottom', offset: -10 }} />
          <YAxis
            label={{
              value: 'População',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              dx: -30,
            }}
            domain={[yMin, 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </div>
    </>
  );
}

export default PopulationModal;
