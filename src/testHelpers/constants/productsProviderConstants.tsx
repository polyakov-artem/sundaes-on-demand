import { ProductsType } from '../../types/types';

export const scoops: ProductsType['scoops'] = [
  { name: 'Chocolate', imagePath: '/images/chocolate.png', price: 1 },
  { name: 'Vanilla', imagePath: '/images/vanilla.png', price: 2 },
];

export const toppings: ProductsType['toppings'] = [
  { name: 'Cherries', imagePath: '/images/cherries.png', price: 0.5 },
  { name: 'M&Ms', imagePath: '/images/m-and-ms.png', price: 0.5 },
  { name: 'Hot fudge', imagePath: '/images/hot-fudge.png', price: 0.5 },
];

export const products: ProductsType = { scoops, toppings };
