import { createContext, FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import productsService from '../services/productsService';
import { LoaderStateType, ProductsType } from '../types/types';
import { LoadingStatus } from '../enums/enums';
import { getLoadingState, loadData } from '../utils/loadData';

export type ProductsContextValueType = ProductsType | null;

export const ProductsContext = createContext<ProductsContextValueType>(null);

const ProductsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<LoaderStateType<ProductsType>>(getLoadingState);

  useEffect(() => {
    let ignore = false;

    loadData(productsService.getAllProducts).then((resultState) => {
      if (ignore) return;
      setState(resultState);
    });

    return () => {
      ignore = true;
    };
  }, []);

  const content = useMemo(() => {
    switch (state.status) {
      case LoadingStatus.loading:
        return <h1>Loading...</h1>;
      case LoadingStatus.error:
        return <h2>{state.error}</h2>;
      case LoadingStatus.success:
        return children;
      default:
        return null;
    }
  }, [state.status, state.error, children]);

  return <ProductsContext.Provider value={state.data}>{content}</ProductsContext.Provider>;
};

export default ProductsProvider;
