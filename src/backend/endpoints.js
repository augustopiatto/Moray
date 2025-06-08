import { HttpResponse, http } from 'msw';
import populacao from './populacao.json';
import bairros from './bairros-geojson.json';

export const endpoints = [
  http.get('/bairros-geojson', () => {
    return HttpResponse.json(bairros);
  }),
  http.get('/populacao', () => {
    return HttpResponse.json(populacao);
  }),
];
