export interface Timeline {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    generateName?: string;
    creationTimestamp?: string;
    deletionTimestamp?: string;
    labels?: Record<string, string>;
    annotations?: Record<string, string>;
  };
  spec: {
    title: string;
    description?: string;
    timestamp: string;
    type: TimelineType;
    tags?: string[];
    relatedArticle?: string;
    illustrated?: string;
    pinned?: boolean;
    visible?: boolean;
  };
}

export enum TimelineType {
  IMPORTANT = 'important',
  NORMAL = 'normal',
  MILESTONE = 'milestone'
}

export interface ListResult<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
}

export interface TimelineList {
  items: Timeline[];
  total: number;
  page: number;
  size: number;
}

// 添加 timeline API 客户端类型定义
export interface TimelineV1alpha1UcApi {
  listTimelines(params: {
    page?: number;
    size?: number;
    keyword?: string;
    sort?: string[];
    status?: string;
  }): Promise<{ data: ListResult<Timeline> }>;
  
  createTimeline(params: { timeline: Timeline }): Promise<{ data: Timeline }>;
  
  updateTimeline(params: { name: string; timeline: Timeline }): Promise<{ data: Timeline }>;
  
  deleteTimeline(params: { name: string }): Promise<void>;

  listTimelineTypes(): Promise<{ data: { label: string; value: TimelineType }[] }>;
}

/**
 * 选项
 **/
export interface Option {
  label: string;
  value: string;
}
// 扩展 ucApiClient 类型
declare module "@halo-dev/api-client" {
  interface UcApiClient {
    timeline: TimelineV1alpha1UcApi;
  }
} 