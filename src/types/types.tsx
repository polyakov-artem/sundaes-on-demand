import { LoadingStatus, Products } from '../enums/enums';

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

export type IdleStateType = { status: LoadingStatus.idle; data: null; error: null };
export type LoadingStateType = { status: LoadingStatus.loading; data: null; error: null };
export type ErrorStateType = { status: LoadingStatus.error; data: null; error: string };

export type SuccessStateType<DataType> = {
  status: LoadingStatus.success;
  data: DataType;
  error: null;
};

export type LoaderStateType<DataType> =
  | IdleStateType
  | SuccessStateType<DataType>
  | ErrorStateType
  | LoadingStateType;

export type handleProductChangeType = (productName: string, price: number, count: string) => void;

export interface ProductOptionPropsType {
  name: string;
  price: number;
  count: number;
  imagePath: string;
  onChange: handleProductChangeType;
}
