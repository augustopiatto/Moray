import { render } from '@testing-library/react';
import { vi } from 'vitest';
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

  it('abre o modal ao clicar em uma área', async () => {
    const { container, findByTestId } = render(
      <CustomMap geojson={mockGeojson} population={mockPopulation} />
    );
    const area = container.querySelector('.leaflet-interactive');
    area && area.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(await findByTestId('population-modal')).toBeInTheDocument();
  });

  it('cria um overlay para cada feature', () => {
    const { container } = render(<CustomMap geojson={mockGeojson} population={mockPopulation} />);
    expect(container.querySelectorAll('.leaflet-interactive').length).toBeGreaterThan(0);
  });

  it('atribui cores diferentes para bairros vizinhos', () => {
    const geojson = {
      features: [
        {
          type: 'Feature',
          properties: { id: 1, name: 'A', neighbors: [2] },
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
        {
          type: 'Feature',
          properties: { id: 2, name: 'B', neighbors: [1] },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [1, 0],
                [1, 1],
                [2, 1],
                [2, 0],
                [1, 0],
              ],
            ],
          },
        },
      ],
    };
    const population = [];
    const { container } = render(<CustomMap geojson={geojson} population={population} />);

    const paths = container.querySelectorAll('.leaflet-interactive');
    expect(paths.length).toBe(2);
    const color1 = paths[0].getAttribute('fill');
    const color2 = paths[1].getAttribute('fill');
    expect(color1).not.toBe(color2);
  });
});
