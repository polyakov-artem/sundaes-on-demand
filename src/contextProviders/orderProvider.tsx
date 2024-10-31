import { createContext, Dispatch, FC, ReactNode, useReducer } from 'react';
import { Products } from '../enums/enums';
import { CreatedOrderType, LoaderStateType } from '../types/types';

import { getOrderInitialState, OrderActionType, orderReducer } from './orderReducer';

export type OrderProductsType = {
  [key in Products]: Record<string, { count: number; price: number }>;
};

export type OrderContextValueType = {
  products: OrderProductsType;
  order: LoaderStateType<CreatedOrderType>;
};

export type OrderProviderPropsType = {
  children?: ReactNode;
  initialState?: OrderContextValueType;
};

export const OrderContext = createContext<OrderContextValueType>(null!);
export const OrderDispatchContext = createContext<Dispatch<OrderActionType>>(null!);

const OrderProvider: FC<OrderProviderPropsType> = ({ children, initialState }) => {
  const initialStateValue = initialState || getOrderInitialState();

  const [state, dispatch] = useReducer(orderReducer, initialStateValue);

  return (
    <OrderContext.Provider value={state}>
      <OrderDispatchContext.Provider value={dispatch}>{children}</OrderDispatchContext.Provider>
    </OrderContext.Provider>
  );
};

export default OrderProvider;
