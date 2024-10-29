import { Products } from '../enums/enums';

export interface ItemType {
  name: string;
  imagePath: string;
  price: number;
}

export interface ProductsType {
  [Products.scoops]: ItemType[];
  [Products.toppings]: ItemType[];
}

export interface CreatedOrderType {
  orderNumber: number;
}
