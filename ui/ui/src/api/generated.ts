export interface Timeline {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    creationTimestamp?: string;
    deletionTimestamp?: string;
    labels?: Record<string, string>;
    annotations?: Record<string, string>;
  };
  spec: {
    title: string;
    description?: string;
    timestamp: string;
    type: string;
    tags?: string[];
    relatedArticle?: string;
    illustrated?: string;
    pinned?: boolean;
    visible?: boolean;
  };
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
