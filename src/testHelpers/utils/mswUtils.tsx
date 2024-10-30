import { delay, http, HttpResponse } from 'msw';
import { SetupServerApi } from 'msw/node';

export const infiniteDelayResolver = async () => {
  await delay('infinite');
  return new Response();
};

export const addNetworkInfiniteDelay = (server: SetupServerApi) => {
  server.use(
    http.get('*', infiniteDelayResolver),
    http.post('*', infiniteDelayResolver),
    http.put('*', infiniteDelayResolver),
    http.delete('*', infiniteDelayResolver),
    http.patch('*', infiniteDelayResolver)
  );
};

export const getNetworkErrorResolver =
  (time: number = 0) =>
  async () => {
    await delay(time);
    return HttpResponse.error();
  };

export const addNetworkError = (server: SetupServerApi, delay = 0) => {
  server.use(
    http.get('*', getNetworkErrorResolver(delay)),
    http.post('*', getNetworkErrorResolver(delay)),
    http.put('*', getNetworkErrorResolver(delay)),
    http.delete('*', getNetworkErrorResolver(delay)),
    http.patch('*', getNetworkErrorResolver(delay))
  );
};
