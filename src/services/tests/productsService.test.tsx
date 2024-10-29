import { describe, expect, test } from 'vitest';
import productsService from '../productsService';
import { scoops, toppings } from '../../mocks/constants';

import { server } from '../../mocks/server';
import { addNetworkError } from '../../test-utils/testUtils';

describe('productsService', () => {
  describe('productsService.getScoops method is called', () => {
    test('should return scoops', async () => {
      const response = await productsService.getScoops();
      expect(response.data).toEqual(scoops);
    });

    test('should return an error when request is rejected', async () => {
      addNetworkError(server);
      await expect(productsService.getScoops()).rejects.toThrow();
    });
  });

  describe('productsService.getToppings method is called', () => {
    test('should return toppings', async () => {
      const response = await productsService.getToppings();
      expect(response.data).toEqual(toppings);
    });

    test('should return an error when request is rejected', async () => {
      addNetworkError(server);
      await expect(productsService.getToppings()).rejects.toThrow();
    });
  });

  describe('productsService.getAllProducts method is called', () => {
    test('should return coops and toppings', async () => {
      const result = await productsService.getAllProducts();
      expect(result).toEqual({ data: { scoops, toppings } });
    });

    test('should return an error when request is rejected', async () => {
      addNetworkError(server);
      await expect(productsService.getAllProducts()).rejects.toThrow();
    });
  });
});
