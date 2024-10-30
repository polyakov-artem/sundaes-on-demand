import { describe, expect, it } from 'vitest';
import { DEFAULT_ERROR_MESSAGE, getErrorMessage, NETWORK_ERROR_MESSAGE } from '../getErrorMessage';
import { addNetworkError } from '../../testHelpers/utils/mswUtils';
import axios from 'axios';
import { server } from '../../testHelpers/http/mswServer';

describe('getErrorMessage', () => {
  describe('when error is an instance of Error', () => {
    it('returns error message', () => {
      const expectedErrorMessage = 'some error text';

      const errorMessage = getErrorMessage(new Error(expectedErrorMessage));

      expect(errorMessage).toBe(expectedErrorMessage);
    });
  });

  describe('when error is not an instance of Error', () => {
    it('returns default error message', () => {
      const errorMessage = getErrorMessage('Not an Error instance');

      expect(errorMessage).toBe(DEFAULT_ERROR_MESSAGE);
    });
  });

  describe('when error is an instance of AxiosError', () => {
    it('returns status message for known HTTP status codes', async () => {
      let axiosError;
      addNetworkError(server);

      try {
        const response = await axios.get('url');
        axiosError = response;
      } catch (error) {
        axiosError = error;
      }

      expect(getErrorMessage(axiosError)).toBe(NETWORK_ERROR_MESSAGE);
    });
  });
});
