import { describe, expect, test } from 'vitest';
import orderService from '../orderService';
import { order } from '../../mocks/constants';

import { server } from '../../mocks/server';
import { addNetworkError } from '../../test-utils/testUtils';

describe('orderService', () => {
  describe('orderService.createOrder method is called', () => {
    test('should return order', async () => {
      const response = await orderService.createOrder();
      expect(response.data).toEqual(order);
    });

    test('should return an error when request is rejected', async () => {
      addNetworkError(server);
      await expect(orderService.createOrder()).rejects.toThrow();
    });
  });
});
