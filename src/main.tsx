import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import ProductsProvider from './contextProviders/productsProvider.tsx';
import OrderProvider from './contextProviders/orderProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductsProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </ProductsProvider>
  </StrictMode>
);
