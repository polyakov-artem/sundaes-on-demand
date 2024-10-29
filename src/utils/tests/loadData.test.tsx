import { describe, expect, test } from 'vitest';
import { getErrorState, getSuccessState, loadData } from '../loadData';

describe('loadData', () => {
  describe('when request is resolved', () => {
    test('should return loading state', async () => {
      const requestFunction = async () => ({
        data: 'test data',
      });

      const response = await loadData(requestFunction);

      expect(response).toEqual(getSuccessState('test data'));
    });
  });

  describe('when request is rejected', () => {
    test('should return error state', async () => {
      const requestFunction = async () => {
        throw new Error('error text');
      };

      const response = await loadData(requestFunction);

      expect(response).toEqual(getErrorState('error text'));
    });
  });
});
