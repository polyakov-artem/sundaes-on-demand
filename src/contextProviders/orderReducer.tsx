import { Dispatch } from 'react';
import { LoadingStatus, OrderActionCategory, Products } from '../enums/enums';
import { CreatedOrderType, LoaderStateType } from '../types/types';
import { getIdleState, loadData, getLoadingState } from '../utils/loadData';
import { OrderContextValueType } from './orderProvider';
import orderService from '../services/orderService';

export type OrderActionChangePayloadType = {
  productType: Products;
  productName: string;
  price: number;
  count: string;
};

type OrderActionChangeType = {
  type: OrderActionCategory.productsChanged;
  payload: OrderActionChangePayloadType;
};

type OrderActionResetType = { type: OrderActionCategory.reset };

type OrderActionCreateType = {
  type: OrderActionCategory.creationStateChanged;
  payload: LoaderStateType<CreatedOrderType>;
};

export type OrderActionType = OrderActionChangeType | OrderActionResetType | OrderActionCreateType;

export function orderReducer(
  state: OrderContextValueType,
  action: OrderActionType
): OrderContextValueType {
  switch (action.type) {
    case OrderActionCategory.productsChanged: {
      const { productType, productName, price, count } = action.payload;
      const prevProducts = state.products[productType][productName];

      let nextCount = 0;
      const parsedCount = parseInt(String(count), 10);

      if (!isNaN(parsedCount)) {
        nextCount = parsedCount <= 0 ? 0 : parsedCount > 10 ? 10 : parsedCount;
      }

      if (nextCount === 0) {
        if (!prevProducts) return state;

        const nextProductTypeState = { ...state.products[productType] };
        delete nextProductTypeState[productName];

        return {
          ...state,
          products: {
            ...state.products,
            [productType]: nextProductTypeState,
          },
        };
      }

      return {
        ...state,
        products: {
          ...state.products,
          [productType]: {
            ...state.products[productType],
            [productName]: { count: nextCount, price },
          },
        },
      };
    }

    case OrderActionCategory.reset: {
      return getOrderInitialState();
    }

    case OrderActionCategory.creationStateChanged: {
      return { ...state, order: action.payload };
    }

    default: {
      return state;
    }
  }
}

export function getOrderInitialState(): OrderContextValueType {
  return {
    products: { [Products.scoops]: {}, [Products.toppings]: {} },
    order: getIdleState(),
  };
}

export const changeOrderProducts = (
  dispatch: Dispatch<OrderActionType>,
  payload: OrderActionChangePayloadType
) => {
  dispatch({ type: OrderActionCategory.productsChanged, payload });
};

export const resetOrder = (dispatch: Dispatch<OrderActionType>) => {
  dispatch({ type: OrderActionCategory.reset });
};

export const createOrder = async (
  state: OrderContextValueType,
  dispatch: Dispatch<OrderActionType>
) => {
  const hasNoScoops = Object.keys(state.products.scoops).length === 0;
  const { status } = state.order;
  const alreadyCreatingOrCreated =
    status === LoadingStatus.loading || status === LoadingStatus.success;

  if (hasNoScoops || alreadyCreatingOrCreated) return;

  dispatch({ type: OrderActionCategory.creationStateChanged, payload: getLoadingState() });
  const payload = await loadData(orderService.createOrder);
  dispatch({ type: OrderActionCategory.creationStateChanged, payload });
};
