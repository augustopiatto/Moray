import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';
import axios from 'axios';

vi.mock('axios');

const mockGeojson = { features: [] };
const mockPopulation = [];

describe('App', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('renderiza o mapa quando dados são carregados', async () => {
    axios.get.mockImplementation((url) => {
      if (url === '/bairros-geojson') return Promise.resolve({ data: mockGeojson });
      if (url === '/populacao') return Promise.resolve({ data: mockPopulation });
    });

    render(<App />);
    await waitFor(() => {
      expect(document.querySelector('.leaflet-container')).toBeInTheDocument();
    });
  });

  it('exibe mensagem de erro se a requisição falhar', async () => {
    axios.get.mockRejectedValueOnce(new Error('Erro'));
    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByText(/Erro na busca dos dados das coordenadas ou da população/i)
      ).toBeInTheDocument();
    });
  });
});
