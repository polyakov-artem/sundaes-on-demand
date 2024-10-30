import { FC } from 'react';

export const ContextConsumer: FC<{ useContextFn: () => unknown }> = ({ useContextFn }) => {
  const data = useContextFn();
  return <div>{JSON.stringify(data)}</div>;
};
