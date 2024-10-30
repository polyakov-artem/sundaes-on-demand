import { describe, expect, test } from 'vitest';
import { Products } from '../../../../enums/enums';
import { scoops, toppings } from '../../../../testHelpers/constants/productsProviderConstants';
import { render, screen, waitFor } from '@testing-library/react';
import Options from '../options';
import ProductsProvider from '../../../../contextProviders/productsProvider';
import OrderProvider from '../../../../contextProviders/orderProvider';

describe('Options', () => {
  describe('when productType = scoops', () => {
    test('should render title and list of items correctly', async () => {
      renderOptions(Products.scoops);

      await waitFor(() => {
        expect(screen.getByText('Scoops')).toBeInTheDocument();
        expect(screen.getAllByRole('img')).toHaveLength(scoops.length);
      });
    });
  });

  describe('when productType = toppings', () => {
    test('should render correctly', async () => {
      renderOptions(Products.toppings);

      await waitFor(() => {
        expect(screen.getByText('Toppings')).toBeInTheDocument();
        expect(screen.getAllByRole('img')).toHaveLength(toppings.length);
      });
    });
  });
});

const renderOptions = (productType: Products) =>
  render(
    <ProductsProvider>
      <OrderProvider>
        <Options productType={productType}></Options>
      </OrderProvider>
    </ProductsProvider>
  );
