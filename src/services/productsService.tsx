import { Endpoints, Products } from '../enums/enums';
import { ProductsType } from '../types/types';
import httpService from './httpService';

async function getScoops() {
  return httpService.get<ProductsType[Products.scoops]>(Endpoints.scoops);
}

async function getToppings() {
  return httpService.get<ProductsType[Products.toppings]>(Endpoints.toppings);
}

async function getAllProducts() {
  const responses = await Promise.all([getScoops(), getToppings()]);
  const [scoopsResponse, toppingsResponse] = responses;

  return {
    data: { [Endpoints.scoops]: scoopsResponse.data, [Endpoints.toppings]: toppingsResponse.data },
  };
}

const productsService = {
  getScoops,
  getToppings,
  getAllProducts,
};

export default productsService;
