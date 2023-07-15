import useSWR, { SWRResponse } from 'swr';
import { TopicRecoverState } from "../pages/viewtopic.php";

const FIVE_SECONDS = 5000;
const SWR_CONFIG = {
  revalidateOnMount: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 0,
  refreshWhenHidden: false,
  errorRetryInterval: FIVE_SECONDS,
  errorRetryCount: 3,
};

export function topicPageUrl(forumId: string, threadId: string, page: number) {
  return `/thread/f-${forumId}-t-${threadId}-page-${page}.json`;
}

function buildFetcher(method: string = 'GET') {
  return (url: string) =>
    fetch(url, { method })
      .then(async (response) => {
        if (response.status >= 200 && response.status < 300) {
          return await response.json();
        }

        throw new Error(`Failed status=${response.status} response=${await response.text()}`);
      });
}

async function checkForPresence(forumId: string, threadId: string, pageNumber: number): Promise<{ exists: boolean, pageNumber: number }> {
  return fetch(topicPageUrl(forumId, threadId, pageNumber), { method: 'HEAD' })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return { exists: true, pageNumber };
      }

      return { exists: false, pageNumber };
    })
}

export function useData(url: string): SWRResponse<any, any> {
  return useSWR(
    url,
    buildFetcher(),
    SWR_CONFIG
  );
}

export function useTopic(forumId: string, threadId: string, page: string | number): SWRResponse<any, any> {
  return useData(topicPageUrl(forumId, threadId, parseInt(page + '')))
}

export function useTopicRecoverState(forumId: string, threadId: string): SWRResponse<TopicRecoverState, any> {
  return useSWR(
    topicPageUrl(forumId, threadId, 1) + '?recoverTest=true' /* Added for cache */,
    (url) => buildFetcher()(url)
      .then(async (topicFirstPage) => {
        const pages = [];

        for (let i = 1; i <= topicFirstPage.totalPages; i++) {
          pages.push(i);
        }

        return Promise.all(pages.map(p => checkForPresence(forumId, threadId, p)))
          .then((presenceChecks) => {
            return {
              totalPages: topicFirstPage.totalPages,
              recoveredPages: presenceChecks
                .filter(pc => pc.exists)
                .map(pc => pc.pageNumber)
            }
          });
      }),
    SWR_CONFIG
  )
}