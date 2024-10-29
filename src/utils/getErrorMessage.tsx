import { isAxiosError } from 'axios';
import { logOnDev } from './logOnDev';

export const ERROR_STATUS_MESSAGES: Record<number, string> = {
  401: 'Please login to access this resource',
  403: 'Permission denied',
  404: 'The requested resource was not found',
  500: 'Internal Server Error',
};

export const DEFAULT_ERROR_MESSAGE = 'Unexpected error';
export const NETWORK_ERROR_MESSAGE = 'Unable to connect to the server';
export const CANCELLATION_ERROR_MESSAGE = 'The request was canceled';

export const ERROR_CODE_MESSAGES: Record<string, string> = {
  ERR_NETWORK: NETWORK_ERROR_MESSAGE,
  ERR_CANCELED: CANCELLATION_ERROR_MESSAGE,
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    let message = error.message;
    logOnDev(`[HTTP ERROR] ${error.message}`);

    if (isAxiosError(error)) {
      if (error.response) {
        message = ERROR_STATUS_MESSAGES[error.response.status] || message;
      } else if (error.request) {
        if (error.code) {
          message = ERROR_CODE_MESSAGES[error.code] || message;
        }
      } else {
        if (error.code) {
          message = ERROR_CODE_MESSAGES[error.code] || message;
        }
      }
    }

    return message;
  }

  return DEFAULT_ERROR_MESSAGE;
};
