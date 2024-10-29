import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { logOnDev } from '../utils/logOnDev';

type RequestInterceptorType = (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
type ResponseInterceptorType = (response: AxiosResponse) => AxiosResponse;
type ErrorInterceptorType = (error: AxiosError | Error) => Promise<AxiosError>;

const BASE_URL = 'http://localhost:3030/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const requestInterceptor: RequestInterceptorType = (config) => {
  const { method, url } = config;
  logOnDev(`[REQUEST] ${method?.toUpperCase()} | ${url}`);
  return config;
};

const responseInterceptor: ResponseInterceptorType = (response) => {
  const { method, url } = response.config;
  const { status } = response;
  logOnDev(`[RESPONSE] ${method?.toUpperCase()} | ${url} | ${status}`);

  return response;
};

const errorInterceptor: ErrorInterceptorType = (error) => {
  return Promise.reject(error);
};

const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(requestInterceptor, errorInterceptor);
  instance.interceptors.response.use(responseInterceptor, errorInterceptor);

  return instance;
};

setupInterceptors(axiosInstance);

const httpService = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  patch: axiosInstance.patch,
};

export default httpService;
