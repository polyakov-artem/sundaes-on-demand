import { http, HttpResponse } from 'msw';
import { order, scoops, toppings } from './constants';

export const handlers = [
  http.get('http://localhost:3030/scoops', async () => {
    return HttpResponse.json(scoops);
  }),

  http.get('http://localhost:3030/toppings', async () => {
    return HttpResponse.json(toppings);
  }),

  http.post('http://localhost:3030/order', async () => {
    return HttpResponse.json(order, { status: 201 });
  }),
];
