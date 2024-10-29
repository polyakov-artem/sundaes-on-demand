import { Endpoints } from '../enums/enums';
import { CreatedOrderType } from '../types/types';
import httpService from './httpService';

async function createOrder() {
  return httpService.post<CreatedOrderType>(Endpoints.order);
}

const orderService = {
  createOrder,
};

export default orderService;
