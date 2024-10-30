import { FC, useMemo } from 'react';
import { LoadingStatus } from '../../../enums/enums';
import { Alert } from 'react-bootstrap';
import { CreatedOrderType, LoaderStateType } from '../../../types/types';
import { getCreationErrorMessage, getCreationSuccessMessage } from './creationBannerUtils';

export interface CreationBannerPropsType {
  orderState: LoaderStateType<CreatedOrderType>;
}

export const CREATING_ORDER_MESSAGE = 'Creating order, please wait...';

const CreationBanner: FC<CreationBannerPropsType> = ({ orderState }) => {
  const banner = useMemo(() => {
    switch (orderState.status) {
      case LoadingStatus.loading:
        return <Alert variant="info">{CREATING_ORDER_MESSAGE}</Alert>;

      case LoadingStatus.error:
        return <Alert variant="danger">{getCreationErrorMessage(orderState.error)}</Alert>;

      case LoadingStatus.success:
        return (
          <Alert variant="success">{getCreationSuccessMessage(orderState.data.orderNumber)}</Alert>
        );

      default:
        return <></>;
    }
  }, [orderState]);

  return banner;
};

export default CreationBanner;
