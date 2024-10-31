import { OrderContextValueType, OrderProductsType } from '../../contextProviders/orderProvider';
import { getOrderInitialState } from '../../contextProviders/orderReducer';
import { Products } from '../../enums/enums';

import { scoops, toppings } from '../constants/productsProviderConstants';

export const getOrderState = (
  scoopsCounts: number[] = [],
  toppingCounts: number[] = [],
  order?: OrderContextValueType['order']
) => {
  let state = getOrderInitialState();

  if (scoopsCounts.length) {
    const currentScoops = scoops.slice(0, scoopsCounts.length);

    const scoopsState = currentScoops.reduce(
      (endState, item, i) => {
        const count = scoopsCounts[i];
        if (!count) return endState;
        endState[item.name] = { count, price: item.price };
        return endState;
      },
      {} as OrderProductsType[Products]
    );

    state.products.scoops = scoopsState;
  }

  if (toppingCounts.length) {
    const currentToppings = toppings.slice(0, scoopsCounts.length);

    const toppingsState = currentToppings.reduce(
      (endState, item, i) => {
        const count = toppingCounts[i];
        if (!count) return endState;
        endState[item.name] = { count, price: item.price };
        return endState;
      },
      {} as OrderProductsType[Products]
    );

    state.products.toppings = toppingsState;
  }

  if (order) {
    state = { ...state, order: order };
  }

  return state;
};
