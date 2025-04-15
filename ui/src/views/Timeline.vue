<script setup lang="ts">
import {useRouteQuery} from "@vueuse/router";
import {computed, ref, watch, onUnmounted} from "vue";
import type {Ref} from "vue";
import {useQuery} from "@tanstack/vue-query";
import type {QueryKey} from "@tanstack/vue-query";
import {
  VPageHeader,
  VCard,
  VLoading,
  VEmpty,
  VSpace,
  VButton,
  VPagination,
  IconRefreshLine, Dialog, Toast
} from "@halo-dev/components";
import {timelineApiClient} from "../api";
import TimelineListItem from "../components/TimelineListItem.vue";
import MingcuteTimeLine from '~icons/mingcute/time-line?width=1.2em&height=1.2em';
import type {Timeline, ListResult} from "../api/generated";
import IconSearchLine from "~icons/ri/search-line";

interface TimelineListResponse {
  items: Timeline[];
  total: number;
  page: number;
  size: number;
}

const checkAll = ref(false);
const selectedTimeline = ref<Timeline>();
const selectedTimelineNames = ref<string[]>([]);

const page = useRouteQuery<number>("page", 1, {
  transform: Number,
});
const size = useRouteQuery<number>("size", 20, {
  transform: Number,
});
const selectedSort = useRouteQuery<string | undefined>("sort");
const selectedStatus = useRouteQuery<string | undefined>("status");
const keyword = useRouteQuery<string>("keyword", "");
const total = ref(0);

watch(
  () => [
    selectedStatus.value,
    selectedSort.value,
    keyword.value,
  ],
  () => {
    page.value = 1;
  },
);

const handleClearFilters = () => {
  selectedStatus.value = undefined;
  selectedSort.value = undefined;
};

const hasFilters = computed(() => {
  return (
    selectedStatus.value ||
    selectedSort.value
  );
});

// 创建一个类型断言函数
function assertTimelineList(data: any): data is ListResult<Timeline> {
  return data && Array.isArray(data.items) && typeof data.total === 'number';
}

const {
  data: timelines,
  isLoading,
  isFetching,
  refetch,
} = useQuery(
  ["timelines", page, size, keyword, selectedSort, selectedStatus],
  async () => {
    const { data } = await timelineApiClient.timeline.listTimelines({
      page: page.value,
      size: size.value,
      keyword: keyword.value,
      sort: [selectedSort.value].filter(Boolean) as string[],
      status: selectedStatus.value,
    });

    if (data && typeof data.total === 'number') {
      total.value = data.total;
    }
    return data;
  }
);

// 监听 timelines 数据变化
watch(timelines, (newData) => {
  if (newData && typeof newData.total === 'number') {
    total.value = newData.total;
  }
});

// 创建一个计算属性来安全地访问 items
const timelineItems = computed(() => {
  if (timelines.value && assertTimelineList(timelines.value)) {
    return timelines.value.items;
  }
  return [];
});

// Selection
const handleCheckAllChange = (e: Event) => {
  const { checked } = e.target as HTMLInputElement;

  if (checked) {
    selectedTimelineNames.value =
      timelineItems.value.map((timeline: Timeline) => {
        return timeline.metadata.name;
      }) || [];
  } else {
    selectedTimelineNames.value = [];
  }
};

const checkSelection = (timeline: Timeline) => {
  return (
    timeline.metadata.name === selectedTimeline.value?.metadata.name || selectedTimelineNames.value.includes(timeline.metadata.name)
  );
};

watch(
  () => selectedTimelineNames.value,
  (newValue) => {
    checkAll.value = newValue.length === timelineItems.value.length;
  }
);

const handleDeleteInBatch = async () => {
  Dialog.warning({
    title: '删除所选时间轴',
    description: '将同时删除所有选中的时间轴，该操作不可恢复。',
    confirmType: "danger",
    confirmText: '确定',
    cancelText: '取消',
    onConfirm: async () => {
      try {
        const promises = selectedTimelineNames.value.map((name) => {
          return timelineApiClient.timeline.deleteTimeline(
            {
              name: name
            }
          );
        });
        await Promise.all(promises);
        selectedTimelineNames.value = [];

        Toast.success('删除成功');
      } catch (e) {
        console.error("Failed to delete timeline", e);
      } finally {
        refetch();
      }
    },
  });
};
</script>
<template>
  <VPageHeader title="时间轴">
    <template #icon>
      <MingcuteTimeLine class="mr-2 self-center" />
    </template>
  </VPageHeader>
  <div class="m-0 md:m-4">
    <VCard :body-class="['!p-0']">
      <template #header>
        <div class="block w-full bg-gray-50 px-4 py-3">
          <div
            class="relative flex flex-col flex-wrap items-start gap-4 sm:flex-row sm:items-center"
          >
            <div
              v-permission="['plugin:timeline:manage']"
              class="hidden items-center sm:flex"
            >
              <input
                v-model="checkAll"
                type="checkbox"
                @change="handleCheckAllChange"
              />
            </div>
            <div class="flex w-full flex-1 items-center sm:w-auto">
              <SearchInput
                v-if="!selectedTimelineNames.length"
                v-model="keyword" />
              <VSpace v-else>
                <VButton type="danger" @click="handleDeleteInBatch">
                  删除
                </VButton>
              </VSpace>
            </div>
            <VSpace spacing="lg" class="flex-wrap">
              <FilterCleanButton
                v-if="hasFilters"
                @click="handleClearFilters"
              />
              <FilterDropdown
                v-model="selectedStatus"
                label="状态"
                :items="[
                  {
                    label: '全部',
                    value: undefined,
                  },
                  {
                    label: '确认',
                    value: 'confirm',
                  },
                  {
                    label: '取消',
                    value: 'cancel',
                  },
                  {
                    label: '等待',
                    value: 'pending',
                  },
                ]"
              />
              <FilterDropdown
                v-model="selectedSort"
                label="排序"
                :items="[
                  {
                    label: '默认',
                  },
                  {
                    label: '较近创建',
                    value: 'metadata.creationTimestamp,desc',
                  },
                  {
                    label: '较早创建',
                    value: 'metadata.creationTimestamp,asc',
                  },
                ]"
              />
              <div class="flex flex-row gap-2">
                <div
                  class="group cursor-pointer rounded p-1 hover:bg-gray-200"
                  @click="refetch()"
                >
                  <IconRefreshLine
                    v-tooltip="'刷新'"
                    :class="{ 'animate-spin text-gray-900': isFetching }"
                    class="h-4 w-4 text-gray-600 group-hover:text-gray-900"
                  />
                </div>
              </div>
            </VSpace>
          </div>
        </div>
      </template>
      <VLoading v-if="isLoading" />
      <Transition v-else-if="!timelineItems.length" appear name="fade">
        <VEmpty message="当前没有时间轴，你可以尝试刷新" title="没有时间轴">
          <template #actions>
            <VSpace>
              <VButton @click="refetch">
                刷新
              </VButton>
            </VSpace>
          </template>
        </VEmpty>
      </Transition>
      <Transition v-else appear name="fade">
        <ul
          class="box-border size-full divide-y divide-gray-100"
          role="list"
        >
          <li v-for="timeline in timelineItems" :key="timeline.metadata.name">
            <TimelineListItem
              :timeline="timeline"
              :is-selected="checkSelection(timeline)"
            >
              <template #checkbox>
                <input
                  v-model="selectedTimelineNames"
                  :value="timeline.metadata.name"
                  name="timeline-checkbox"
                  type="checkbox"
                />
              </template>
            </TimelineListItem>
          </li>
        </ul>
      </Transition>
      <template #footer>
        <VPagination
          v-model:page="page"
          v-model:size="size"
          page-label="页"
          size-label="条 / 页"
          :total-label="`共 ${total} 项数据`"
          :total="total"
          :size-options="[20, 30, 50, 100]"
        />
      </template>
    </VCard>
  </div>

</template> 