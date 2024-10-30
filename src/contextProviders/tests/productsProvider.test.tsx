import { describe, expect, test } from 'vitest';
import ProductsProvider from '../productsProvider';
import { render, screen, waitFor } from '@testing-library/react';
import { useProductsContext } from '../../hooks/useProductsContext';
import { NETWORK_ERROR_MESSAGE } from '../../utils/getErrorMessage';
import { addNetworkError, addNetworkInfiniteDelay } from '../../testHelpers/utils/mswUtils';
import { ContextConsumer } from '../../testHelpers/components/contextConsumer';
import { server } from '../../testHelpers/http/mswServer';
import { products } from '../../testHelpers/constants/productsProviderConstants';

describe('ProductsProvider', () => {
  describe('with data loading, with a child component', () => {
    test('should render only placeholder', () => {
      addNetworkInfiniteDelay(server);

      renderProviderWithText();

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
      expect(screen.queryByText(/text/i)).not.toBeInTheDocument();
    });
  });

  describe('when network error occured', () => {
    test('should render only error message', async () => {
      addNetworkError(server);

      renderProviderWithText();

      await waitFor(() => expect(screen.getByText(NETWORK_ERROR_MESSAGE)).toBeInTheDocument());
      expect(screen.queryByText(/text/i)).not.toBeInTheDocument();
    });
  });

  describe('when loading is complete', () => {
    test('should render children and provide products', async () => {
      renderProviderWithConsumer();

      const expectedData = JSON.stringify(products);

      await waitFor(() => expect(screen.getByText(expectedData)).toBeInTheDocument());
    });
  });
});

const renderProviderWithText = () => render(<ProductsProvider>text</ProductsProvider>);

const renderProviderWithConsumer = () =>
  render(
    <ProductsProvider>
      <ContextConsumer useContextFn={useProductsContext} />
    </ProductsProvider>
  );
