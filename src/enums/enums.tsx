export enum Endpoints {
  scoops = 'scoops',
  toppings = 'toppings',
  order = 'order',
}

export enum Products {
  scoops = 'scoops',
  toppings = 'toppings',
}

export enum LoadingStatus {
  idle = 'idle',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export enum OrderActionCategory {
  productsChanged = 'productsChanged',
  reset = 'reset',
  creationStateChanged = 'creationStateChanged',
}
