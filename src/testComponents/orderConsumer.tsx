import { FC } from 'react';
import { useOrderContext } from '../hooks/useOrderContext';
import { useOrderDispatchContext } from '../hooks/useOrderDispatchContext';
import { changeOrderProducts, createOrder, resetOrder } from '../contextProviders/orderReducer';
import { scoops, toppings } from '../mocks/constants';
import { Products } from '../enums/enums';

export const OrderConsumer: FC = () => {
  const state = useOrderContext();
  const dispatch = useOrderDispatchContext();
  const scoop = scoops[0];
  const topping = toppings[0];

  return (
    <div>
      <div data-testid="order-state">{JSON.stringify(state)}</div>
      <input
        data-testid="scoop-input"
        onChange={(e) =>
          changeOrderProducts(dispatch, {
            count: e.currentTarget.value,
            price: scoop.price,
            productType: Products.scoops,
            productName: scoop.name,
          })
        }
        value={state.products.scoops[scoop.name]?.count || 0}
      />
      <input
        data-testid="topping-input"
        onChange={(e) =>
          changeOrderProducts(dispatch, {
            count: e.currentTarget.value,
            price: topping.price,
            productType: Products.toppings,
            productName: topping.name,
          })
        }
        value={state.products.toppings[topping.name]?.count || 0}
      />
      <button data-testid="reset-order" onClick={() => resetOrder(dispatch)} />
      <button data-testid="create-order" onClick={() => createOrder(state, dispatch)} />
    </div>
  );
};
