import { describe, expect, test, vi } from 'vitest';
import OrderProvider from '../../../contextProviders/orderProvider';
import OrderCompletion from '../orderCompletion';
import { orderStateCreatingSuccess } from '../../../testHelpers/constants/orderProviderConstants';
import { render, screen } from '@testing-library/react';
import { OrderPhase } from '../../../enums/enums';
import userEvent from '@testing-library/user-event';

describe('OrderCompletion', () => {
  describe('in initial state', () => {
    test('should render correctly', async () => {
      renderOrderСompletion();

      expect(getBtn()).toBeInTheDocument();
      expect(getTitle()).toBeInTheDocument();
      expect(getOrderText()).toBeInTheDocument();
    });
  });

  describe('when click on button', () => {
    test('should call setOrderPhase callback', async () => {
      const user = userEvent.setup();
      const setOrderPhase = vi.fn();
      renderOrderСompletion(setOrderPhase);

      await user.click(getBtn());

      expect(setOrderPhase).toBeCalledWith(OrderPhase.inProgress);
    });
  });
});

const renderOrderСompletion = (setOrderPhase = vi.fn()) =>
  render(
    <OrderProvider initialState={orderStateCreatingSuccess}>
      <OrderCompletion setOrderPhase={setOrderPhase} />
    </OrderProvider>
  );

const getBtn = () => screen.getByRole('button', { name: /create new order/i });
const getTitle = () => screen.getByRole('heading', { name: /thank you!/i });
const getOrderText = () => screen.getByText(/order number is 10/i);
