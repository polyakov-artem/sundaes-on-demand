import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { getOrderInitialState } from '../orderReducer';
import OrderProvider, { OrderContextValueType } from '../orderProvider';
import { OrderConsumer } from '../../testHelpers/components/orderConsumer';

import { addNetworkError, addNetworkInfiniteDelay } from '../../testHelpers/utils/mswUtils';
import {
  orderStateCreatingFailed,
  orderStateCreatingOrder,
  orderStateCreatingSuccess,
  orderStateWithMaxScoops,
  orderStateWithProducts,
  orderStateWithScoops,
  orderStateWithToppings,
} from '../../testHelpers/constants/orderProviderConstants';
import { server } from '../../testHelpers/http/mswServer';

describe('OrderProvider', () => {
  describe('in initial state', () => {
    test('should provide order initial state', async () => {
      const expectedState = JSON.stringify(getOrderInitialState());

      const { stateField } = renderOrderProvider();

      expect(stateField.textContent).toBe(expectedState);
    });
  });

  describe('when initial state is passed to provider', () => {
    test('should provide order initial state', async () => {
      const expectedState = JSON.stringify(orderStateWithProducts);

      const { stateField } = renderOrderProvider(orderStateWithProducts);

      expect(stateField.textContent).toBe(expectedState);
    });
  });

  describe('when scoop input value is 1', () => {
    test('should update order products correctly', async () => {
      const expectedState = JSON.stringify(orderStateWithScoops);
      const { user, stateField, scoopInput } = renderOrderProvider();

      await user.type(scoopInput, '1');

      expect(stateField.textContent).toBe(expectedState);
    });
  });

  describe('when topping input value is 1', () => {
    test('should update order products correctly', async () => {
      const expectedState = JSON.stringify(orderStateWithToppings);
      const { user, stateField, toppingInput } = renderOrderProvider();

      await user.type(toppingInput, '1');

      expect(stateField.textContent).toBe(expectedState);
    });
  });

  describe('when topping input value is 1, scoop input value is 1', () => {
    test('should update order products correctly', async () => {
      const { user, stateField, toppingInput, scoopInput } = renderOrderProvider();
      const expectedState = JSON.stringify(orderStateWithProducts);

      await user.type(toppingInput, '1');
      await user.type(scoopInput, '1');

      expect(stateField.textContent).toBe(expectedState);
    });
  });

  describe('when input value is more than 10', () => {
    test('should update order with count 10', async () => {
      const expectedState = JSON.stringify(orderStateWithMaxScoops);
      const { user, stateField, scoopInput } = renderOrderProvider();

      await user.type(scoopInput, '500');

      expect(stateField.textContent).toBe(expectedState);
    });
  });

  describe('when input value is negative number', () => {
    test('should remove product from the state', async () => {
      const expectedState = JSON.stringify(getOrderInitialState());
      const { user, stateField, scoopInput } = renderOrderProvider();

      scoopInput.focus();
      await user.paste('-5');

      expect(stateField.textContent).toBe(expectedState);
    });
  });

  describe('when input value is empty', () => {
    test('should remove product from the state', async () => {
      const expectedState = JSON.stringify(getOrderInitialState());
      const { user, stateField, scoopInput } = renderOrderProvider();

      await user.type(scoopInput, '5');
      await user.clear(scoopInput);

      expect(stateField.textContent).toBe(expectedState);
    });
  });

  describe('when input value is 0', () => {
    test('should remove product from the state', async () => {
      const expectedState = JSON.stringify(getOrderInitialState());
      const { user, stateField, scoopInput } = renderOrderProvider();

      await user.type(scoopInput, '5');
      await user.clear(scoopInput);
      await user.type(scoopInput, '0');

      expect(stateField.textContent).toBe(expectedState);
    });
  });

  describe('when reset button is clicked with products in order ', () => {
    test('should reset state to initial', async () => {
      const expectedState = JSON.stringify(getOrderInitialState());
      const { user, stateField, resetOrderBtn } = renderOrderProvider(orderStateWithProducts);

      await user.click(resetOrderBtn);

      expect(stateField.textContent).toBe(expectedState);
    });
  });

  describe('when create button is clicked', () => {
    test('should update order with loading status', async () => {
      const { user, stateField, createOrderBtn } = renderOrderProvider(orderStateWithProducts);
      const expectedState = JSON.stringify(orderStateCreatingOrder);
      addNetworkInfiniteDelay(server);

      await user.click(createOrderBtn);

      await waitFor(() => expect(stateField.textContent).toBe(expectedState));
    });
  });

  describe('when create button is clicked, request is rejected', () => {
    test('should update order with error status', async () => {
      const { user, stateField, createOrderBtn } = renderOrderProvider(orderStateWithProducts);
      const expectedState = JSON.stringify(orderStateCreatingFailed);
      addNetworkError(server);

      await user.click(createOrderBtn);

      await waitFor(() => expect(stateField.textContent).toBe(expectedState));
    });
  });

  describe('when create button is clicked, request is resolved', () => {
    test('should update order with success status', async () => {
      const { user, stateField, createOrderBtn } = renderOrderProvider(orderStateWithProducts);
      const expectedState = JSON.stringify(orderStateCreatingSuccess);

      await user.click(createOrderBtn);

      await waitFor(() => expect(stateField.textContent).toBe(expectedState));
    });
  });
});

const renderOrderProvider = (initialState?: OrderContextValueType) => {
  const user = userEvent.setup();

  const utils = render(
    <OrderProvider initialState={initialState}>
      <OrderConsumer />
    </OrderProvider>
  );

  const stateField = screen.getByTestId('order-state');
  const scoopInput = screen.getByTestId('scoop-input');
  const toppingInput = screen.getByTestId('topping-input');
  const resetOrderBtn = screen.getByTestId('reset-order');
  const createOrderBtn = screen.getByTestId('create-order');

  return {
    ...utils,
    user,
    stateField,
    scoopInput,
    toppingInput,
    resetOrderBtn,
    createOrderBtn,
  };
};
