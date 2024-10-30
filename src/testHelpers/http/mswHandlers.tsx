import { http, HttpResponse } from 'msw';
import { scoops, toppings } from '../constants/productsProviderConstants';
import { createdOrder } from '../constants/orderProviderConstants';

export const handlers = [
  http.get('http://localhost:3030/scoops', async () => {
    return HttpResponse.json(scoops);
  }),

  http.get('http://localhost:3030/toppings', async () => {
    return HttpResponse.json(toppings);
  }),

  http.post('http://localhost:3030/order', async () => {
    return HttpResponse.json(createdOrder, { status: 201 });
  }),
];
