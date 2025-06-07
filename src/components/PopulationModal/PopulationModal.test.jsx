import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PopulationModal from '.';

const mockNeighborhood = {
  name: 'Centro',
  id: 1,
  setor: 'A',
  zona: 'Norte',
};

const mockPopulation = [
  { ano: '2020', populacao: 7000 },
  { ano: '2021', populacao: 7100 },
];

test('exibe nome do bairro e dados', () => {
  render(
    <PopulationModal
      onClose={() => {}}
      selectedNeighborhood={mockNeighborhood}
      selectedPopulation={mockPopulation}
    />
  );
  expect(screen.getByText(/Bairro: Centro/i)).toBeInTheDocument();
  expect(screen.getByText(/Setor:/i)).toBeInTheDocument();
  expect(screen.getByText(/Zona:/i)).toBeInTheDocument();
});
