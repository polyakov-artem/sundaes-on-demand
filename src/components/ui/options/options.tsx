import { Row } from 'react-bootstrap';
import { Products } from '../../../enums/enums';
import { handleProductChangeType, ItemType } from '../../../types/types';
import { FC } from 'react';
import { changeOrderProducts } from '../../../contextProviders/orderReducer';
import { useOrderDispatchContext } from '../../../hooks/useOrderDispatchContext';
import { useOrderContext } from '../../../hooks/useOrderContext';
import ScoopOption from '../scoopOption/scoopOption';
import ToppingOption from '../toppingOption/toppingOption';
import { useProductsContext } from '../../../hooks/useProductsContext';

export type OptionsPropsType = {
  productType: Products;
};

const Options: FC<OptionsPropsType> = (props) => {
  const { productType } = props;

  const orderDispatch = useOrderDispatchContext();
  const orderState = useOrderContext();
  const loadedProducts = useProductsContext();

  const handleProductChange: handleProductChangeType = (productName, price, count) => {
    changeOrderProducts(orderDispatch, {
      productType,
      productName,
      price,
      count,
    });
  };

  let ListComponent = null;

  switch (productType) {
    case Products.scoops:
      ListComponent = ScoopOption;
      break;

    case Products.toppings:
      ListComponent = ToppingOption;
      break;
  }

  let optionItems = null;

  if (ListComponent && loadedProducts) {
    optionItems = loadedProducts[productType].map((item) => {
      const { name, imagePath, price } = item;

      return (
        <ListComponent
          key={name}
          name={name}
          price={price}
          count={orderState.products[productType][item.name]?.count || 0}
          imagePath={imagePath}
          onChange={handleProductChange}
        />
      );
    });
  }

  const title = productType[0].toUpperCase() + productType.slice(1).toLowerCase();

  return (
    <div className="mb-4">
      <h2>{title}</h2>
      <Row>{optionItems}</Row>
    </div>
  );
};

export default Options;
