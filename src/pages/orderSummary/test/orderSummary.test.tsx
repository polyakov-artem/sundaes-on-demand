import { queryAllByRole, queryByRole, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import OrderProvider, { OrderContextValueType } from '../../../contextProviders/orderProvider';
import OrderSummary from '../orderSummary';
import {
  createdOrder,
  orderStateWithProducts,
} from '../../../testHelpers/constants/orderProviderConstants';
import { addNetworkError, addNetworkInfiniteDelay } from '../../../testHelpers/utils/mswUtils';
import { server } from '../../../testHelpers/http/mswServer';
import { CREATING_ORDER_MESSAGE } from '../../../components/ui/creationBanner/creationBanner';
import {
  getCreationErrorMessage,
  getCreationSuccessMessage,
} from '../../../components/ui/creationBanner/creationBannerUtils';
import { NETWORK_ERROR_MESSAGE } from '../../../utils/getErrorMessage';

describe('OrderSummary', () => {
  describe('when order is empty', () => {
    test('should render correctly', async () => {
      renderOrderSummary();

      await waitFor(() => {
        expect(getMainHeading()).toBeInTheDocument();
        expect(getScoopsHeading()).toHaveTextContent(/0/);
        expect(getToppingsHeading()).toHaveTextContent(/0/);
        expect(getTotalHeading()).toHaveTextContent(/0/);
        expect(getFormCheckbox()).not.toBeChecked();
        expect(getFormButton()).toBeDisabled();
        expect(getList(/scoops/i)).toBeNull();
        expect(getList(/toppings/i)).toBeNull();
        expect(getMessageElement()).toBeNull();
      });
    });

    test('button and checkbox should stay disabled when click on checkbox', async () => {
      const user = userEvent.setup();
      renderOrderSummary();
      const checkbox = getFormCheckbox();
      const button = getFormButton();

      await user.click(checkbox);
      await user.click(button);

      expect(getFormCheckbox()).not.toBeChecked();
      expect(getFormButton()).toBeDisabled();
    });
  });

  describe('with filled order', () => {
    test('should render correctly', async () => {
      renderOrderSummary(orderStateWithProducts);

      expect(getMainHeading()).toBeInTheDocument();
      expect(getScoopsHeading()).toHaveTextContent(/1/);
      expect(getToppingsHeading()).toHaveTextContent(/0.5/);
      expect(getTotalHeading()).toHaveTextContent(/1.5/);
      expect(getFormCheckbox()).not.toBeChecked();
      expect(getFormButton()).toBeDisabled();
      expect(getList(/toppings/)).toBeInTheDocument();
      expect(getList(/scoops/)).toBeInTheDocument();
      expect(getMessageElement()).toBeNull();
    });

    describe('with checkbox checked', () => {
      test('should disable the button and uncheck the checkbox', async () => {
        const user = userEvent.setup();
        renderOrderSummary(orderStateWithProducts);

        const checkbox = getFormCheckbox();
        await user.click(checkbox);
        await user.click(checkbox);

        expect(getFormCheckbox()).not.toBeChecked();
        expect(getFormButton()).toBeDisabled();
      });

      describe('when click on the confirmation button', () => {
        test('informational message should appear', async () => {
          const user = userEvent.setup();
          renderOrderSummary(orderStateWithProducts);
          addNetworkInfiniteDelay(server);

          await user.click(getFormCheckbox());
          await user.click(getFormButton());

          expect(getMessageElement()).toHaveTextContent(CREATING_ORDER_MESSAGE);
        });

        test('error message should be displayed if error is received', async () => {
          const user = userEvent.setup();
          renderOrderSummary(orderStateWithProducts);
          addNetworkError(server);

          await user.click(getFormCheckbox());
          await user.click(getFormButton());

          await waitFor(() => {
            expect(getMessageElement()).toHaveTextContent(
              getCreationErrorMessage(NETWORK_ERROR_MESSAGE)
            );
          });
        });

        test('when order number is received: should display: success message, continue button; should remove agreement form', async () => {
          const user = userEvent.setup();
          renderOrderSummary(orderStateWithProducts);

          await user.click(getFormCheckbox());
          await user.click(getFormButton());

          await waitFor(() => {
            expect(getMessageElement()).toHaveTextContent(
              getCreationSuccessMessage(createdOrder.orderNumber)
            );
            expect(getForm()).toBeNull();
            expect(getContinueButton()).toBeInTheDocument();
          });
        });
      });
    });

    describe('with checkbox unchecked', () => {
      test('should enable the button and check the checkbox when click on checkbox', async () => {
        const user = userEvent.setup();
        renderOrderSummary(orderStateWithProducts);

        const checkbox = getFormCheckbox();
        await user.click(checkbox);

        expect(checkbox).toBeChecked();
        expect(getFormButton()).toBeEnabled();
      });
    });
  });
});

const renderOrderSummary = (orderState?: OrderContextValueType) =>
  render(
    <OrderProvider initialState={orderState}>
      <OrderSummary setOrderPhase={vi.fn()} />
    </OrderProvider>
  );

export const getMainHeading = () => screen.getByRole('heading', { name: /order summary/i });
export const getScoopsHeading = () => screen.getByRole('heading', { name: /scoops:/i });
export const getToppingsHeading = () => screen.getByRole('heading', { name: /toppings:/i });
export const getTotalHeading = () => screen.getByRole('heading', { name: /total:/i });
export const getForm = () => screen.queryByTestId('summary-form');
export const getFormCheckbox = () => screen.getByRole('checkbox', { name: /i agree/i });
export const getFormButton = () => screen.getByRole('button', { name: /confirm order/i });
export const getList = (listName: RegExp) => screen.queryByRole('list', { name: listName });
export const getListItem = (list: HTMLElement) => queryAllByRole(list, 'listitem');
export const getListItems = (list: HTMLElement) => queryByRole(list, 'listitem');
export const getMessageElement = () => screen.queryByRole('alert');
export const getContinueButton = () => screen.getByRole('button', { name: /continue/i });
