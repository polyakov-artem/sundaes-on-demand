import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { getOrderInitialState } from '../orderReducer';
import OrderProvider, { OrderContextValueType } from '../orderProvider';
import { OrderConsumer } from '../../testComponents/orderConsumer';
import {
  orderStateCreatingFailed,
  orderStateCreatingSuccess,
  orderStateWithMaxScoops,
} from '../../mocks/constants';
import {
  orderStateCreatingOrder,
  orderStateWithProducts,
  orderStateWithScoops,
  orderStateWithToppings,
} from '../../mocks/constants';
import { addNetworkError, addNetworkInfiniteDelay } from '../../test-utils/testUtils';
import { server } from '../../mocks/server';

describe('OrderProvider', () => {
  describe('in initial state', () => {
    test('should provide order initial state', async () => {
      const expectedState = JSON.stringify(getOrderInitialState());

      renderOrderProvider();

      expect(getStateFieldContent()).toBe(expectedState);
    });
  });

  describe('when initial state is passed to provider', () => {
    test('should provide order initial state', async () => {
      const expectedState = JSON.stringify(orderStateWithProducts);

      renderOrderProvider(orderStateWithProducts);

      expect(getStateFieldContent()).toBe(expectedState);
    });
  });

  describe('when scoop input value is 1', () => {
    test('should update order products correctly', async () => {
      const user = userEvent.setup();
      const expectedState = JSON.stringify(orderStateWithScoops);
      renderOrderProvider();
      const input = getScoopInput();

      await user.type(input, '1');

      expect(getStateFieldContent()).toBe(expectedState);
    });
  });

  describe('when topping input value is 1', () => {
    test('should update order products correctly', async () => {
      const user = userEvent.setup();
      const expectedState = JSON.stringify(orderStateWithToppings);
      renderOrderProvider();
      const input = getToppingInput();

      await user.type(input, '1');

      expect(getStateFieldContent()).toBe(expectedState);
    });
  });

  describe('when topping input value is 1, scoop input value is 1', () => {
    test('should update order products correctly', async () => {
      const user = userEvent.setup();
      const expectedState = JSON.stringify(orderStateWithProducts);
      renderOrderProvider();
      const toppingInput = getToppingInput();
      const scoopInput = getScoopInput();

      await user.type(toppingInput, '1');
      await user.type(scoopInput, '1');

      expect(getStateFieldContent()).toBe(expectedState);
    });
  });

  describe('when input value is more than 10', () => {
    test('should update order with count 10', async () => {
      const user = userEvent.setup();
      const expectedState = JSON.stringify(orderStateWithMaxScoops);
      renderOrderProvider();
      const input = getScoopInput();

      await user.type(input, '500');

      expect(getStateFieldContent()).toBe(expectedState);
    });
  });

  describe('when input value is negative number', () => {
    test('should remove product from the state', async () => {
      const user = userEvent.setup();
      const expectedState = JSON.stringify(getOrderInitialState());
      renderOrderProvider();
      const input = getScoopInput();

      input.focus();
      await user.paste('-5');

      expect(getStateFieldContent()).toBe(expectedState);
    });
  });

  describe('when input value is empty', () => {
    test('should remove product from the state', async () => {
      const user = userEvent.setup();
      const expectedState = JSON.stringify(getOrderInitialState());
      renderOrderProvider();
      const input = getScoopInput();

      await user.type(input, '5');
      await user.clear(input);

      expect(getStateFieldContent()).toBe(expectedState);
    });
  });

  describe('when input value is 0', () => {
    test('should remove product from the state', async () => {
      const user = userEvent.setup();
      const expectedState = JSON.stringify(getOrderInitialState());
      renderOrderProvider();
      const input = getScoopInput();

      await user.type(input, '5');
      await user.clear(input);
      await user.type(input, '0');

      expect(getStateFieldContent()).toBe(expectedState);
    });
  });

  describe('when reset button is clicked with products in order ', () => {
    test('should reset state to initial', async () => {
      const user = userEvent.setup();
      const expectedState = JSON.stringify(getOrderInitialState());
      renderOrderProvider(orderStateWithProducts);

      await user.click(getResetOrderBtn());

      expect(getStateFieldContent()).toBe(expectedState);
    });
  });

  describe('when create button is clicked', () => {
    test('should update order with loading status', async () => {
      const user = userEvent.setup();
      renderOrderProvider(orderStateWithProducts);
      const expectedState = JSON.stringify(orderStateCreatingOrder);
      addNetworkInfiniteDelay(server);

      await user.click(getCreateOrderBtn());

      await waitFor(() => expect(getStateFieldContent()).toBe(expectedState));
    });
  });

  describe('when create button is clicked, request is rejected', () => {
    test('should update order with error status', async () => {
      const user = userEvent.setup();
      renderOrderProvider(orderStateWithProducts);
      const expectedState = JSON.stringify(orderStateCreatingFailed);
      addNetworkError(server);

      await user.click(getCreateOrderBtn());

      await waitFor(() => expect(getStateFieldContent()).toBe(expectedState));
    });
  });

  describe('when create button is clicked, request is resolved', () => {
    test('should update order with success status', async () => {
      const user = userEvent.setup();
      renderOrderProvider(orderStateWithProducts);
      const expectedState = JSON.stringify(orderStateCreatingSuccess);

      await user.click(getCreateOrderBtn());

      await waitFor(() => expect(getStateFieldContent()).toBe(expectedState));
    });
  });
});

const renderOrderProvider = (initialState?: OrderContextValueType) =>
  render(
    <OrderProvider initialState={initialState}>
      <OrderConsumer />
    </OrderProvider>
  );

const getStateFieldContent = () => screen.getByTestId('order-state').textContent;
const getScoopInput = () => screen.getByTestId('scoop-input');
const getToppingInput = () => screen.getByTestId('topping-input');
const getResetOrderBtn = () => screen.getByTestId('reset-order');
const getCreateOrderBtn = () => screen.getByTestId('create-order');
