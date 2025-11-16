export interface Metadata {
  name: string;
  generateName?: string;
  labels?: {
    [key: string]: string;
  } | null;
  annotations?: {
    [key: string]: string;
  } | null;
  version?: number | null;
  creationTimestamp?: string | null;
  deletionTimestamp?: string | null;
}

export interface TimelineGroupSpec {
  displayName: string;
  priority?: number;
}

export interface TimelineGroupStatus {
  timelineCount: number;
}

export interface TimelineGroup {
  spec: TimelineGroupSpec;
  apiVersion: string;
  kind: string;
  metadata: Metadata;
  status?: TimelineGroupStatus;
}

export interface TimelineGroupList {
  page: number;
  size: number;
  total: number;
  items: Array<TimelineGroup>;
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface TimelineSpec {
  groupName: string;
  date?: string;
  displayName?: string;
  image?: string;
  active?: boolean;
  relatedLinks?: string;
}

export interface Timeline {
  spec: TimelineSpec;
  apiVersion: string;
  kind: string;
  metadata: Metadata;
}

export interface TimelineList {
  page: number;
  size: number;
  total: number;
  totalPages?: number;
  items: Array<Timeline>;
  first?: boolean;
  last?: boolean;
  hasNext?: boolean;
  hasPrevious?: boolean;
}
