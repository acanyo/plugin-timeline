<script lang="ts" setup>
import {
  Dialog,
  IconAddCircle,
  IconCloseCircle,
  IconRefreshLine,
  Toast,
  VButton,
  VCard,
  VDropdownItem,
  VEmpty,
  VLoading,
  VPageHeader,
  VPagination,
  VSpace
} from "@halo-dev/components";
import {useQuery} from "@tanstack/vue-query";
import {computed, ref, watch, onMounted} from "vue";
import {formatDatetime} from "@/utils/date";
import {useRouteQuery} from "@vueuse/router";
import TimelineEditingModal from "../components/TimelineEditingModal.vue";
import {timelineApi} from "@/api";
import type {Timeline} from "@/api/generated";
import IconParkTimeline from '~icons/icon-park/timeline';

defineOptions({
  name: "TimelineView",
});

const selectedTimeline = ref<Timeline | undefined>();
const selectedTimelines = ref<string[]>([]);
const checkedAll = ref(false);
const selectedSort = useRouteQuery<string | undefined>("sort");
const selectedType = useRouteQuery<string | undefined>("type");
const timelineTypes = ref<{ label: string; value: string | undefined; }[]>([
  {
    label: '全部',
    value: undefined,
  }
]);

const page = ref(1);
const size = ref(20);
const keyword = ref("");
const searchText = ref("");
const total = ref(0);
const editingModal = ref(false);

watch(
  () => [selectedSort.value, selectedType.value, keyword.value],
  () => {
    page.value = 1;
  }
);

function handleClearFilters() {
  selectedSort.value = undefined;
  selectedType.value = undefined;
}

const hasFilters = computed(() => {
  return selectedSort.value || selectedType.value;
});

const {
  data: timelines,
  isLoading,
  isFetching,
  refetch,
} = useQuery({
  queryKey: ["timelines", page, size, selectedSort, selectedType, keyword],
  queryFn: async () => {
    try {
      const response = await fetch(
        `/apis/api.timeline.lik.cc/v1alpha1/timelines?page=${page.value - 1}&size=${size.value}${
          selectedType.value ? `&type=${selectedType.value}` : ""
        }${keyword.value ? `&keyword=${encodeURIComponent(keyword.value)}` : ""}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: { items: Timeline[]; total: number } = await response.json();
      data.items = data.items.map(item => ({
        ...item,
        spec: {
          ...item.spec,
          timestamp: formatDatetime(item.spec.timestamp)
        }
      }));
      total.value = data.total;
      return data.items;
    } catch (error) {
      console.error("Failed to fetch timelines:", error);
      Toast.error("获取时间线列表失败");
      return [];
    }
  },
});

const handleCheckAllChange = (e: Event) => {
  const { checked } = e.target as HTMLInputElement;
  checkedAll.value = checked;
  if (checkedAll.value) {
    selectedTimelines.value =
      timelines.value?.map((timeline) => timeline.metadata.name) || [];
  } else {
    selectedTimelines.value.length = 0;
  }
};

const handleDeleteInBatch = () => {
  Dialog.warning({
    title: "是否确认删除所选的时间线？",
    description: "删除之后将无法恢复。",
    confirmType: "danger",
    onConfirm: async () => {
      try {
        const promises = selectedTimelines.value.map((timeline) => {
          return timelineApi.deleteTimeline(timeline);
        });
        if (promises) {
          await Promise.all(promises);
        }
        selectedTimelines.value.length = 0;
        checkedAll.value = false;
        Toast.success("删除成功");
      } catch (e) {
        console.error(e);
      } finally {
        await refetch();
      }
    },
  });
};

function handleReset() {
  keyword.value = "";
  searchText.value = "";
}

function onKeywordChange() {
  keyword.value = searchText.value;
}

const handleOpenCreateModal = (timeline?: Timeline) => {
  selectedTimeline.value = timeline;
  editingModal.value = true;
};

const onEditingModalClose = async () => {
  selectedTimeline.value = undefined;
  refetch();
};

const fetchTimelineTypes = async () => {
  try {
    const response = await timelineApi.listTimelines();
    const types = new Set(response.items.map((item: Timeline) => item.spec.type));
    
    timelineTypes.value = [
      { label: '全部', value: undefined },
      ...Array.from(types).map(type => ({
        label: type,
        value: type
      }))
    ];
  } catch (error) {
    console.error('获取时间线类型失败:', error);
  }
};

onMounted(() => {
  fetchTimelineTypes();
});
</script>

<template>
  <TimelineEditingModal
    v-model:visible="editingModal"
    :timeline="selectedTimeline"
    @close="onEditingModalClose"
  />

  <VPageHeader title="时间线">
    <template #icon>
      <IconParkTimeline />
    </template>
    <template #actions>
      <VSpace v-permission="['plugin:timeline:manage']">
        <VButton
          type="secondary"
          @click="editingModal = true"
        >
          <template #icon>
            <IconAddCircle class="h-full w-full" />
          </template>
          新建
        </VButton>
      </VSpace>
    </template>
  </VPageHeader>

  <div class="m-0 md:m-4">
    <VCard :body-class="['!p-0']">
      <template #header>
        <div class="block w-full bg-gray-50 px-4 py-3">
          <div class="relative flex flex-col flex-wrap items-start gap-4 sm:flex-row sm:items-center">
            <div
              v-permission="['plugin:timeline:manage']"
              class="hidden items-center sm:flex"
            >
              <input
                v-model="checkedAll"
                type="checkbox"
                @change="handleCheckAllChange"
              />
            </div>
            <div class="flex w-full flex-1 items-center sm:w-auto">
              <FormKit
                v-if="!selectedTimelines.length"
                v-model="searchText"
                placeholder="输入关键词搜索"
                type="text"
                outer-class="!moments-p-0 moments-mr-2"
                @keyup.enter="onKeywordChange"
              >
                <template v-if="keyword" #suffix>
                  <div
                    class="group flex h-full cursor-pointer items-center bg-white px-2 transition-all hover:bg-gray-50"
                    @click="handleReset"
                  >
                    <IconCloseCircle
                      class="h-4 w-4 text-gray-500 group-hover:text-gray-700"
                    />
                  </div>
                </template>
              </FormKit>
              <VSpace v-else v-permission="['plugin:timeline:manage']">
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
                v-model="selectedType"
                label="类型"
                :items="timelineTypes"
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

      <Transition v-else-if="!timelines?.length" appear name="fade">
        <VEmpty
          title="暂无时间线记录"
          message="暂无时间线记录"
        >
          <template #actions>
            <VSpace>
              <VButton @click="refetch()">刷新</VButton>
            </VSpace>
          </template>
        </VEmpty>
      </Transition>

      <Transition v-else appear name="fade">
        <div class="w-full relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 widefat">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th
                  v-permission="['plugin:timeline:manage']"
                  scope="col"
                  class="px-4 py-3"
                >
                  <div class="w-max flex items-center"></div>
                </th>
                <th scope="col" class="px-4 py-3">
                  <div class="w-max flex items-center">名称</div>
                </th>
                <th scope="col" class="px-4 py-3">
                  <div class="w-max flex items-center">图片</div>
                </th>
                <th scope="col" class="px-4 py-3">
                  <div class="w-max flex items-center">类型</div>
                </th>
                <th scope="col" class="px-4 py-3">
                  <div class="w-max flex items-center">时间</div>
                </th>
                <th scope="col" class="px-4 py-3">
                  <div class="w-max flex items-center">描述</div>
                </th>
                <th scope="col" class="px-4 py-3">
                  <div class="w-max flex items-center">关联文章</div>
                </th>
                <th
                  v-permission="['plugin:timeline:manage']"
                  scope="col"
                  class="px-4 py-3"
                >
                  <div class="w-max flex items-center"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="timeline in timelines"
                :key="timeline.metadata.name"
                class="border-b last:border-none hover:bg-gray-100"
              >
                <td class="px-4 py-4" v-permission="['plugin:timeline:manage']">
                  <input
                    v-model="selectedTimelines"
                    :value="timeline.metadata.name"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600"
                    name="timeline-checkbox"
                    type="checkbox"
                  />
                </td>
                <td class="px-4 py-4">{{ timeline.spec.title }}</td>
                <td class="px-4 py-4 poster">
                  <img
                    v-if="timeline.spec.illustrated"
                    :src="timeline.spec.illustrated"
                    :alt="timeline.spec.title"
                    referrerpolicy="no-referrer"
                  />
                  <span v-else>-</span>
                </td>
                <td class="px-4 py-4 table-td">
                  {{ timeline.spec.type}}
                </td>
                <td class="px-4 py-4 table-td">
                  {{ timeline.spec.timestamp }}
                </td>
                <td class="px-4 py-4">{{ timeline.spec.description || '-' }}</td>
                <td class="px-4 py-4 table-td">
                  <a
                    v-if="timeline.spec.relatedArticle"
                    :href="timeline.spec.relatedArticle"
                    target="_blank"
                    class="text-green-600 hover:underline"
                  >
                    查看文章
                  </a>
                  <span v-else>-</span>
                </td>
                <td class="px-4 py-4 table-td" v-permission="['plugin:timeline:manage']">
                  <VDropdownItem @click="handleOpenCreateModal(timeline)">
                    编辑
                  </VDropdownItem>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Transition>

      <template #footer>
        <VPagination
          v-model:page="page"
          v-model:size="size"
          :total="total"
          :size-options="[20, 30, 50, 100]"
        />
      </template>
    </VCard>
  </div>
</template>

<style scoped lang="scss">
.widefat * {
  word-wrap: break-word;
}

.widefat td {
  vertical-align: top;
}

.widefat .poster {
  width: 180px;
  img {
    max-width: 100px;
    max-height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }
}

.table-td {
  text-align: left !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style> 
