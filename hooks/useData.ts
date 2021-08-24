import useSWR, { SWRResponse } from 'swr';

const FIVE_SECONDS = 5000;
const A_MINUTE = 60000;

export function useData(url: string): SWRResponse<any, any> {
  return useSWR(
    url,
    () => fetch(url, {
      method: 'GET',
    }).then(async (response) => {
      if (response.status >= 200 && response.status < 300) {
        return await response.json();
      }

      throw new Error(`Failed status=${response.status} response=${await response.text()}`);
    }),
    {
      refreshInterval: A_MINUTE * 60,
      errorRetryInterval: FIVE_SECONDS,
      errorRetryCount: 3,
    }
  );
}