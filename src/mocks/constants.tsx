import { OrderContextValueType } from '../contextProviders/orderProvider';
import { getOrderInitialState } from '../contextProviders/orderReducer';
import { CreatedOrderType, LoaderStateType, ProductsType } from '../types/types';
import { NETWORK_ERROR_MESSAGE } from '../utils/getErrorMessage';
import { getErrorState, getLoadingState, getSuccessState } from '../utils/loadData';

export const scoops: ProductsType['scoops'] = [
  { name: 'Chocolate', imagePath: '/images/chocolate.png', price: 1 },
  { name: 'Vanilla', imagePath: '/images/vanilla.png', price: 2 },
];

export const toppings: ProductsType['toppings'] = [
  { name: 'Cherries', imagePath: '/images/cherries.png', price: 0.5 },
  { name: 'M&Ms', imagePath: '/images/m-and-ms.png', price: 0.5 },
  { name: 'Hot fudge', imagePath: '/images/hot-fudge.png', price: 0.5 },
];

export const order = { orderNumber: 10 };

export const products: ProductsType = { scoops, toppings };

export const getOrderState = (
  scoopsCount: number = 0,
  toppingsCount: number = 0,
  orderState?: LoaderStateType<CreatedOrderType>
) => {
  const scoop = scoops[0];
  const topping = toppings[0];

  let state = getOrderInitialState();
  if (scoopsCount)
    state.products.scoops = { [scoop.name]: { count: scoopsCount, price: scoop.price } };

  if (toppingsCount)
    state.products.toppings = {
      [topping.name]: { count: toppingsCount, price: topping.price },
    };

  if (orderState) {
    state = { ...state, order: orderState };
  }
  return state;
};

export const orderStateWithScoops: OrderContextValueType = getOrderState(1);

export const orderStateWithMaxScoops: OrderContextValueType = getOrderState(10);

export const orderStateWithToppings: OrderContextValueType = getOrderState(0, 1);

export const orderStateWithProducts: OrderContextValueType = getOrderState(1, 1);

export const orderStateCreatingOrder: OrderContextValueType = {
  ...orderStateWithProducts,
  order: getLoadingState(),
};

export const orderStateCreatingFailed: OrderContextValueType = {
  ...orderStateWithProducts,
  order: getErrorState(NETWORK_ERROR_MESSAGE),
};

export const orderStateCreatingSuccess: OrderContextValueType = {
  ...orderStateWithProducts,
  order: getSuccessState(order),
};
