import { FC } from 'react';
import { OrderProductsType } from '../../../contextProviders/orderProvider';
import { Products } from '../../../enums/enums';

interface ProductsListPropsType {
  items: OrderProductsType[Products];
  productType: Products;
}

const ProductsList: FC<ProductsListPropsType> = ({ items, productType }) => {
  return (
    <>
      {Object.keys(items).length !== 0 && (
        <ul className="mb-4" style={{ listStyle: 'none' }} aria-label={`${productType} list`}>
          {Object.entries(items).map(([name, { count }]) => (
            <li key={name}>{`${name} x ${count}`}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProductsList;
