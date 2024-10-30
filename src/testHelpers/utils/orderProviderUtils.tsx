import { getOrderInitialState } from '../../contextProviders/orderReducer';
import { CreatedOrderType, LoaderStateType } from '../../types/types';
import { scoops, toppings } from '../constants/productsProviderConstants';

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
