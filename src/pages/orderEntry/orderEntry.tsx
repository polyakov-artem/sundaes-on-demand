import { Button } from 'react-bootstrap';
import { FunctionComponent } from 'react';
import { OrderComponentPropsType } from '../../App';

import { OrderPhase, Products } from '../../enums/enums';
import { useOrderContext } from '../../hooks/useOrderContext';
import { countTotalPrice } from './orderEntryUtils';
import Options from '../../components/ui/options/options';

const OrderEntry: FunctionComponent<OrderComponentPropsType> = (props) => {
  const { setOrderPhase } = props;

  const orderState = useOrderContext();

  const isOrderBtnDisabled = Object.keys(orderState.products.scoops).length === 0;

  const total = countTotalPrice(orderState.products);

  const handleOrderClick = () => {
    if (!isOrderBtnDisabled) {
      setOrderPhase(OrderPhase.review);
    }
  };

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options productType={Products.scoops} />
      <Options productType={Products.toppings} />
      <h2 className="mb-4">Grand total: {`${total}$`}</h2>
      <Button disabled={isOrderBtnDisabled} onClick={handleOrderClick}>
        Order Sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;
