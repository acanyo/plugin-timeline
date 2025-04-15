import type {AxiosInstance} from "axios";
import axios from "axios";
import type {Timeline} from "./generated";
import {TimelineType} from "./generated";
import {consoleApiClient} from "@halo-dev/api-client";

export interface Option {
  label: string;
  value: string;
}

export interface TimelineList {
  page: number;
  size: number;
  total: number;
  items: Timeline[];
}

export class TimelineApi {
  private axios: AxiosInstance;
  private baseUrl: string = "/apis/timeline.lik.cc/v1alpha1";

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  /**
   * 获取时间线列表
   */
  async listTimelines(params?: {
    page?: number;
    size?: number;
    keyword?: string;
    sort?: string[];
    status?: string;
    type?: TimelineType;
    pinned?: boolean;
  }): Promise<TimelineList> {
    const { data } = await this.axios.get(
      `${this.baseUrl}/timeline`,
      {
        params: {
          page: params?.page || 1,
          size: params?.size || 20,
          keyword: params?.keyword,
          sort: params?.sort,
          status: params?.status,
          type: params?.type,
          pinned: params?.pinned,
        },
      }
    );
    return data;
  }

  /**
   * 获取单个时间线
   */
  async getTimeline(name: string): Promise<Timeline> {
    const { data } = await this.axios.get(
      `${this.baseUrl}/timeline/${name}`
    );
    return data;
  }

  /**
   * 创建时间线
   */
  async createTimeline(timeline: Timeline): Promise<Timeline> {
    const { data } = await this.axios.post(
      `${this.baseUrl}/timeline`,
      timeline
    );
    return data;
  }

  /**
   * 更新时间线
   */
  async updateTimeline(name: string, timeline: Timeline): Promise<Timeline> {
    const { data } = await this.axios.put(
      `${this.baseUrl}/timeline/${name}`,
      timeline
    );
    return data;
  }

  /**
   * 删除时间线
   */
  async deleteTimeline(name: string): Promise<void> {
    await this.axios.delete(`${this.baseUrl}/timeline/${name}`);
  }

  /**
   * 批量删除时间线
   */
  async deleteTimelines(names: string[]): Promise<void> {
    const promises = names.map((name) => this.deleteTimeline(name));
    await Promise.all(promises);
  }

  /**
   * 获取时间线类型列表
   */
  async listTimelineTypes(): Promise<Option[]> {
    try {
      const { data } = await consoleApiClient.plugin.plugin.fetchPluginConfig({
        name: 'timeline'
      });

      const { advanced } = data?.data ?? {};
      const { timelineTypes = [] } = advanced ? JSON.parse(advanced) : {};

      return timelineTypes.map((type: string) => ({
        label: type,
        value: type
      }));
    } catch (error) {
      console.error("Failed to fetch timeline config:", error);
      return [];
    }
  }
}

// 创建实例并导出
export const timelineApi = new TimelineApi(axios.create()); 
