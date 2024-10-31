import { OrderContextValueType } from '../../contextProviders/orderProvider';
import { CreatedOrderType } from '../../types/types';
import { NETWORK_ERROR_MESSAGE } from '../../utils/getErrorMessage';
import { getErrorState, getLoadingState, getSuccessState } from '../../utils/loadData';
import { getOrderState } from '../utils/orderProviderUtils';

export const createdOrder: CreatedOrderType = { orderNumber: 10 };

export const orderStateWithScoops: OrderContextValueType = getOrderState([1]);

export const orderStateWithMaxScoops: OrderContextValueType = getOrderState([10]);

export const orderStateWithToppings: OrderContextValueType = getOrderState([0], [1]);

export const orderStateWithProducts: OrderContextValueType = getOrderState([1], [1]);

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
  order: getSuccessState(createdOrder),
};
