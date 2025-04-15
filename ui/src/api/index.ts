import {ucApiClient} from "@halo-dev/api-client";
import type {TimelineV1alpha1UcApi} from "./generated";

// 创建一个带有 timeline 属性的对象
export const timelineApiClient = {
  ...ucApiClient,
  timeline: {
    listTimelines: async (params: {
      page?: number;
      size?: number;
      keyword?: string;
      sort?: string[];
      status?: string;
    }) => {
      // 这里实现实际的 API 调用
      const response = await fetch(`/apis/timeline.lik.cc/v1alpha1/timeline?${new URLSearchParams({
        page: params.page?.toString() || '1',
        size: params.size?.toString() || '20',
        keyword: params.keyword || '',
        sort: params.sort?.join(',') || '',
        status: params.status || ''
      })}`);
      return { data: await response.json() };
    },
    deleteTimeline: async (params: { name: string }) => {
      const response = await fetch(`/apis/timeline.lik.cc/v1alpha1/timeline/${params.name}`, {
        method: 'DELETE'
      });
      return response;
    }
  } as TimelineV1alpha1UcApi
};

export * from "./generated"; 