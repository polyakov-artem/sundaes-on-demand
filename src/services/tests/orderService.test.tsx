import { describe, expect, test } from 'vitest';
import orderService from '../orderService';
import { addNetworkError } from '../../testHelpers/utils/mswUtils';
import { createdOrder } from '../../testHelpers/constants/orderProviderConstants';
import { server } from '../../testHelpers/http/mswServer';

describe('orderService', () => {
  describe('orderService.createOrder method is called', () => {
    test('should return order', async () => {
      const response = await orderService.createOrder();
      expect(response.data).toEqual(createdOrder);
    });

    test('should return an error when request is rejected', async () => {
      addNetworkError(server);
      await expect(orderService.createOrder()).rejects.toThrow();
    });
  });
});
