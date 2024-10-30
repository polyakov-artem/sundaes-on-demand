import { Dispatch, FC, SetStateAction, useState } from 'react';
import './App.css';
import OrderEntry from './pages/orderEntry/orderEntry';
import { OrderPhase } from './enums/enums';

export type OrderComponentPropsType = {
  setOrderPhase: Dispatch<SetStateAction<OrderPhase>>;
};

const App: FC = () => {
  const [orderPhase, setOrderPhase] = useState<OrderPhase>(OrderPhase.inProgress);

  let Component = OrderEntry;

  switch (orderPhase) {
    case OrderPhase.inProgress:
      Component = OrderEntry;
      break;
  }

  return <Component setOrderPhase={setOrderPhase} />;
};

export default App;
