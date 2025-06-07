import { render } from '@testing-library/react';
import CustomMap from '.';

const mockGeojson = {
  features: [
    {
      type: 'Feature',
      properties: { id: 1, name: 'Bairro Teste' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0],
            [0, 0],
          ],
        ],
      },
    },
  ],
};

const mockPopulation = [
  { id_geometria: 1, ano: '2020', populacao: 5000 },
  { id_geometria: 1, ano: '2021', populacao: 5100 },
];

vi.mock('../PopulationModal', () => ({
  default: () => <div data-testid="population-modal">Modal</div>,
}));

describe('CustomMap', () => {
  it('renderiza o mapa e as áreas do geojson', () => {
    render(<CustomMap geojson={mockGeojson} population={mockPopulation} />);
    expect(document.querySelector('.leaflet-container')).toBeInTheDocument();
  });

  it('não quebra se geojson ou population forem nulos', () => {
    render(<CustomMap geojson={null} population={null} />);
    expect(document.querySelector('.leaflet-container')).toBeInTheDocument();
  });

  it('não renderiza o modal por padrão', () => {
    const { queryByTestId } = render(
      <CustomMap geojson={mockGeojson} population={mockPopulation} />
    );
    expect(queryByTestId('population-modal')).not.toBeInTheDocument();
  });

  it('cria um overlay para cada feature', () => {
    const { container } = render(<CustomMap geojson={mockGeojson} population={mockPopulation} />);
    expect(container.querySelectorAll('.leaflet-interactive').length).toBeGreaterThan(0);
  });
});
