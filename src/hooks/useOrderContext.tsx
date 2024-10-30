import { useContext } from 'react';
import { OrderContext } from '../contextProviders/orderProvider';

export const useOrderContext = () => useContext(OrderContext);
