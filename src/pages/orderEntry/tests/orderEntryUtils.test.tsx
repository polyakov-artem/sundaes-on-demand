import { describe, expect, it } from 'vitest';
import { countProductsPrice, countTotalPrice } from '../orderEntryUtils';
import { orderStateWithProducts } from '../../../testHelpers/constants/orderProviderConstants';

describe('countProductsPrice', () => {
  describe('when products are passed', () => {
    it('returns products price', () => {
      const result = countProductsPrice(orderStateWithProducts.products.scoops);
      expect(result).toBe(1);
    });
  });
});

describe('countTotalPrice', () => {
  describe('when order products are passed', () => {
    it('returns products price', () => {
      const result = countTotalPrice(orderStateWithProducts.products);
      expect(result).toBe(1.5);
    });
  });
});
