import { useContext } from 'react';
import { ProductsContext } from '../contextProviders/productsProvider';

export const useProductsContext = () => useContext(ProductsContext);
