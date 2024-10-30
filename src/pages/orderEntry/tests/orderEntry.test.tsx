import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { OrderComponentPropsType } from '../../../App';
import ProductsProvider from '../../../contextProviders/productsProvider';
import OrderProvider, { OrderContextValueType } from '../../../contextProviders/orderProvider';
import OrderEntry from '../orderEntry';
import { scoops, toppings } from '../../../testHelpers/constants/productsProviderConstants';
import { orderStateWithProducts } from '../../../testHelpers/constants/orderProviderConstants';
import userEvent from '@testing-library/user-event';
import { OrderPhase } from '../../../enums/enums';

describe('OrderEntry', () => {
  describe('in initial state', () => {
    test('should render correctly', async () => {
      renderOrderEntry(getOrderEntryProps());

      await waitFor(() => {
        expect(getHeading()).toBeInTheDocument();
      });

      expect(getScoopsImages()).toHaveLength(scoops.length);
      expect(getToppingsImages()).toHaveLength(toppings.length);
      expect(getTotalSumField()).toHaveTextContent(/0/);
      expect(getOrderEntryBtn()).toBeDisabled();
    });
  });

  describe('when products added, button clicked', () => {
    test('should call setOrderPhase correctly', async () => {
      const props = getOrderEntryProps();
      renderOrderEntry(props, orderStateWithProducts);
      const user = userEvent.setup();

      await waitFor(() => {
        expect(getHeading()).toBeInTheDocument();
      });

      await user.click(getOrderEntryBtn());

      expect(getOrderEntryBtn()).toBeEnabled();
      expect(props.setOrderPhase).toBeCalledWith(OrderPhase.review);
    });
  });
});

const getOrderEntryProps = () => ({
  setOrderPhase: vi.fn(),
});

const renderOrderEntry = (props: OrderComponentPropsType, orderState?: OrderContextValueType) => {
  return render(
    <ProductsProvider>
      <OrderProvider initialState={orderState}>
        <OrderEntry {...props}></OrderEntry>
      </OrderProvider>
    </ProductsProvider>
  );
};

const getOrderEntryBtn = () => screen.getByRole('button', { name: /order sundae!/i });

const getTotalSumField = () =>
  screen.getByRole('heading', {
    name: /grand total:/i,
  });

const getHeading = () =>
  screen.getByRole('heading', {
    name: /design your sundae!/i,
  });

const getToppingsImages = () => screen.getAllByRole('img', { name: /topping/i });
const getScoopsImages = () => screen.getAllByRole('img', { name: /scoop/i });
