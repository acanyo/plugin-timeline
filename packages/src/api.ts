import type { TimelineItem, TimelineApiResponse } from './types';
import { getApiBase } from './utils';

/**
 * 从 API 获取时间轴数据
 */
export async function fetchTimelines(groupName: string): Promise<TimelineItem[]> {
  if (!groupName) {
    return [];
  }

  const apiBase = getApiBase();
  const url = `${apiBase}?group=${encodeURIComponent(groupName)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch timelines: ${response.statusText}`);
  }

  const data: TimelineApiResponse = await response.json();

  const items: TimelineItem[] = (data.items || []).map((item) => ({
    date: item.spec?.date,
    displayName: item.spec?.displayName,
    image: item.spec?.image,
    active: item.spec?.active || false,
    relatedLinks: item.spec?.relatedLinks
  }));

  // 按日期排序，最新的在前
  return items.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });
}

