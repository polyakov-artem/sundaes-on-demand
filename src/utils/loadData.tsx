import { AxiosResponse } from 'axios';
import { ErrorStateType, IdleStateType, LoadingStateType, SuccessStateType } from '../types/types';
import { LoadingStatus } from '../enums/enums';
import { getErrorMessage } from './getErrorMessage';

export type RequestFunctionType<DataType> = (
  signal?: AbortSignal
) => Promise<AxiosResponse<DataType>> | Promise<{ data: DataType }>;

export function getIdleState(): IdleStateType {
  return { status: LoadingStatus.idle, data: null, error: null };
}

export function getLoadingState(): LoadingStateType {
  return { status: LoadingStatus.loading, data: null, error: null };
}

export function getSuccessState<DataType>(data: DataType): SuccessStateType<DataType> {
  return {
    status: LoadingStatus.success,
    data,
    error: null,
  };
}

export function getErrorState(error: string): ErrorStateType {
  return { status: LoadingStatus.error, data: null, error };
}

export async function loadData<DataType>(
  requestFunction: RequestFunctionType<DataType>,
  signal?: AbortSignal
): Promise<SuccessStateType<DataType> | ErrorStateType | IdleStateType> {
  let resultState;

  try {
    const response = await requestFunction(signal);
    resultState = getSuccessState(response.data);
  } catch (error) {
    resultState = getErrorState(getErrorMessage(error));
  }

  return resultState;
}
