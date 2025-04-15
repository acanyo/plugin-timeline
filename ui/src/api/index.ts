import {ucApiClient} from "@halo-dev/api-client";
import type {TimelineV1alpha1UcApi, Timeline} from "./generated";
import {TimelineType} from "./generated";

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
      type?: TimelineType;
      pinned?: boolean;
    }) => {
      const response = await fetch(`/apis/timeline.lik.cc/v1alpha1/timeline?${new URLSearchParams({
        page: params.page?.toString() || '1',
        size: params.size?.toString() || '20',
        keyword: params.keyword || '',
        sort: params.sort?.join(',') || '',
        status: params.status || '',
        type: params.type || '',
        pinned: params.pinned?.toString() || ''
      })}`);
      return { data: await response.json() };
    },
    createTimeline: async (params: { timeline: Timeline }) => {
      const response = await fetch('/apis/timeline.lik.cc/v1alpha1/timeline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params.timeline)
      });
      return { data: await response.json() };
    },
    updateTimeline: async (params: { name: string; timeline: Timeline }) => {
      const response = await fetch(`/apis/timeline.lik.cc/v1alpha1/timeline/${params.name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params.timeline)
      });
      return { data: await response.json() };
    },
    deleteTimeline: async (params: { name: string }) => {
      await fetch(`/apis/timeline.lik.cc/v1alpha1/timeline/${params.name}`, {
        method: 'DELETE'
      });
    },
    getTimeline: async (params: { name: string }) => {
      const response = await fetch(`/apis/timeline.lik.cc/v1alpha1/timeline/${params.name}`);
      return { data: await response.json() };
    },
    listTimelineTypes: async () => {
      return {
        data: [
          { label: "重要事件", value: TimelineType.IMPORTANT },
          { label: "普通事件", value: TimelineType.NORMAL },
          { label: "里程碑", value: TimelineType.MILESTONE }
        ]
      };
    }
  } as TimelineV1alpha1UcApi
};

export * from "./generated"; 