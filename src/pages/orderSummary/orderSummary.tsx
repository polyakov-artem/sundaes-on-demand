import { FC, FormEventHandler, useState } from 'react';
import { OrderComponentPropsType } from '../../App';
import { countProductsPrice } from '../orderEntry/orderEntryUtils';
import { LoadingStatus, OrderPhase, Products } from '../../enums/enums';
import { useOrderContext } from '../../hooks/useOrderContext';
import { Button } from 'react-bootstrap';

import SummaryForm from '../../components/ui/summaryForm/summaryForm';
import CreationBanner from '../../components/ui/creationBanner/creationBanner';
import ProductsList from '../../components/ui/productsList/productsList';
import { createOrder } from '../../contextProviders/orderReducer';
import { useOrderDispatchContext } from '../../hooks/useOrderDispatchContext';

const OrderSummary: FC<OrderComponentPropsType> = ({ setOrderPhase }) => {
  const [accepted, setAccepted] = useState(false);
  const orderState = useOrderContext();
  const orderDispatch = useOrderDispatchContext();

  const scoopsTotal = countProductsPrice(orderState.products.scoops);
  const toppingsTotal = countProductsPrice(orderState.products.toppings);

  const isCorrectOrder = Object.keys(orderState.products.scoops).length > 0;
  const isCreated = orderState.order.data !== null;
  const isCreating = orderState.order.status === LoadingStatus.loading;

  const handleChange = () => {
    if (isCorrectOrder) {
      setAccepted((prevState) => !prevState);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createOrder(orderState, orderDispatch);
  };

  const handleClick = () => {
    setOrderPhase(OrderPhase.completed);
  };

  const agreementForm = (
    <SummaryForm
      isCreating={isCreating}
      accepted={accepted}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );

  const continueBtn = (
    <Button variant="primary" type="submit" onClick={handleClick}>
      Continue
    </Button>
  );

  return (
    <div>
      <h1 className="mb-4">Order Summary</h1>
      <h2 className="mb-3">Scoops: {scoopsTotal}$</h2>
      <ProductsList items={orderState.products.scoops} productType={Products.scoops} />
      <h2 className="mb-3">Toppings: {toppingsTotal}$</h2>
      <ProductsList items={orderState.products.toppings} productType={Products.toppings} />
      <h2 className="mb-3">Total: {toppingsTotal + scoopsTotal}$</h2>
      <CreationBanner orderState={orderState.order}></CreationBanner>
      {isCreated ? continueBtn : agreementForm}
    </div>
  );
};

export default OrderSummary;
