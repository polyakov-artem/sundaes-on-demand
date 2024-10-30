import { OrderContextValueType } from '../../contextProviders/orderProvider';
import { Products } from '../../enums/enums';

export const countProductsPrice = (products: OrderContextValueType['products'][Products]) => {
  return Object.values(products).reduce((total, { count, price }) => total + count * price, 0);
};

export const countTotalPrice = (state: OrderContextValueType['products']) => {
  return Object.values(state).reduce((total, products) => total + countProductsPrice(products), 0);
};
