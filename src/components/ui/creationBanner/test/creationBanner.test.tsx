import { describe, expect, test } from 'vitest';
import { CreatedOrderType, LoaderStateType } from '../../../../types/types';
import { render, screen } from '@testing-library/react';
import CreationBanner, { CREATING_ORDER_MESSAGE } from '../creationBanner';
import {
  getErrorState,
  getIdleState,
  getLoadingState,
  getSuccessState,
} from '../../../../utils/loadData';
import { createdOrder } from '../../../../testHelpers/constants/orderProviderConstants';
import { getCreationErrorMessage, getCreationSuccessMessage } from '../creationBannerUtils';
import { NETWORK_ERROR_MESSAGE } from '../../../../utils/getErrorMessage';

describe('CreationBanner', () => {
  describe('when orderState has loading status', () => {
    test('should display loading message', () => {
      renderCreationBanner(getLoadingState());

      expect(getBanner()).toHaveTextContent(CREATING_ORDER_MESSAGE);
    });
  });
  describe('when orderState has error status', () => {
    test('should display error message', () => {
      renderCreationBanner(getErrorState(NETWORK_ERROR_MESSAGE));

      expect(getBanner()).toHaveTextContent(getCreationErrorMessage(NETWORK_ERROR_MESSAGE));
    });
  });
  describe('when orderState has success status', () => {
    test('should display success message', () => {
      renderCreationBanner(getSuccessState(createdOrder));

      expect(getBanner()).toHaveTextContent(getCreationSuccessMessage(createdOrder.orderNumber));
    });
  });
  describe('when orderState has idle status', () => {
    test('should display nothing', async () => {
      renderCreationBanner(getIdleState());

      expect(getBanner()).toBeNull();
    });
  });
});

const renderCreationBanner = (orderState: LoaderStateType<CreatedOrderType>) =>
  render(<CreationBanner orderState={orderState}></CreationBanner>);

const getBanner = () => screen.queryByRole('alert');
