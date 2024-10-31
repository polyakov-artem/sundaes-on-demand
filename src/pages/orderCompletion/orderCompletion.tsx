import { FC, useCallback } from 'react';
import { OrderComponentPropsType } from '../../App';
import { Button } from 'react-bootstrap';
import { useOrderDispatchContext } from '../../hooks/useOrderDispatchContext';
import { useOrderContext } from '../../hooks/useOrderContext';
import { resetOrder } from '../../contextProviders/orderReducer';
import { OrderPhase } from '../../enums/enums';

const OrderCompletion: FC<OrderComponentPropsType> = ({ setOrderPhase }) => {
  const orderState = useOrderContext();
  const orderDispatch = useOrderDispatchContext();

  const handleClick = useCallback(() => {
    resetOrder(orderDispatch);
    setOrderPhase(OrderPhase.inProgress);
  }, [orderDispatch, setOrderPhase]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Thank You!</h1>
      <p>Your order number is {orderState.order.data?.orderNumber}</p>
      <Button onClick={handleClick}>Create new order</Button>
    </div>
  );
};

export default OrderCompletion;
