import PropTypes from 'prop-types';

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    })
  ),
  label: PropTypes.string,
};

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid #ccc', padding: 10 }}>
        <div>
          <strong>Ano:</strong> {label}
        </div>
        <div>
          <strong>Habitantes:</strong> {payload[0].value.toLocaleString('pt-BR')}
        </div>
      </div>
    );
  }
  return null;
}

export default CustomTooltip;
