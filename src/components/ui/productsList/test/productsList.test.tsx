import { describe, expect, it } from 'vitest';
import { Products } from '../../../../enums/enums';
import { getOrderState } from '../../../../testHelpers/utils/orderProviderUtils';
import { render, screen } from '@testing-library/react';
import ProductsList from '../productsList';

describe('ProductsList', () => {
  describe('when props are passed', () => {
    it('should render list of items ', () => {
      const orderState = getOrderState([10, 5]);

      render(<ProductsList items={orderState.products.scoops} productType={Products.scoops} />);

      expect(screen.getByRole('list', { name: /scoops/i })).toBeInTheDocument();

      Object.entries(orderState.products.scoops).forEach(([name, { count }]) => {
        expect(screen.getByText(`${name} x ${count}`)).toBeInTheDocument();
      });
    });
  });
});
