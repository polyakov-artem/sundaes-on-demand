import { useContext } from 'react';
import { OrderDispatchContext } from '../contextProviders/orderProvider';

export const useOrderDispatchContext = () => useContext(OrderDispatchContext);
