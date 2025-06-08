import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import PopulationModal from '.';

const mockNeighborhood = {
  name: 'Centro',
  id: 1,
  setor: 'Oeste',
  zona: 'Norte',
};

const mockPopulation = [
  { ano: '2020', populacao: 7000 },
  { ano: '2021', populacao: 7100 },
];

describe('PopulationModal', () => {
  it('exibe nome do bairro e dados', () => {
    render(
      <PopulationModal
        onClose={() => {}}
        selectedNeighborhood={mockNeighborhood}
        selectedPopulation={mockPopulation}
      />
    );
    expect(screen.getByText(/Bairro: Centro/i)).toBeInTheDocument();
    expect(screen.getByText(/Setor:/i)).toBeInTheDocument();
    expect(screen.getByText('Oeste')).toBeInTheDocument();
    expect(screen.getByText(/Zona:/i)).toBeInTheDocument();
    expect(screen.getByText('Norte')).toBeInTheDocument();
  });

  it('chama onClose ao clicar no botão de fechar', () => {
    const onClose = vi.fn();
    render(
      <PopulationModal
        onClose={onClose}
        selectedNeighborhood={mockNeighborhood}
        selectedPopulation={mockPopulation}
      />
    );
    const closeButton = screen.getByRole('button');
    closeButton.click();
    expect(onClose).toHaveBeenCalled();
  });

  it('renderiza o gráfico de linhas', () => {
    render(
      <PopulationModal
        onClose={() => {}}
        selectedNeighborhood={mockNeighborhood}
        selectedPopulation={mockPopulation}
      />
    );
    expect(document.querySelector('.recharts-wrapper')).toBeInTheDocument();
  });
});
