// import PropTypes from 'prop-types';
import './styles.scss'

// PopulationModal.propType = {
//   selectedNeighborhood: PropTypes.object
// }

function PopulationModal({onClose, selectedPopulation, selectedNeighborhood}) {
  return <>
    <div className="population-modal">
      <h1>Bairro {selectedNeighborhood.name}</h1>
      <div className="modal-content">
        {selectedPopulation && selectedPopulation.map((item, index) => {
          return (
            <div key={index}>
            <h2>Ano: {item.ano}</h2>
            <p>População: {item.populacao} habitantes</p>
            </div>
          )
        })}
      </div>
      <button onClick={onClose}>Fechar</button>
    </div>
  </>
}

export default PopulationModal
