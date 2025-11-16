<script lang="ts" setup>
import TimelineListItem from "@/components/TimelineListItem.vue";
import TimelineEditingModal from "@/components/TimelinEditingModal.vue";
import type { Timeline, TimelineList } from "@/types";
import { axiosInstance } from "@halo-dev/api-client";
import {
    Dialog,
    IconAddCircle,
    IconArrowLeft,
    IconArrowRight,
    IconRefreshLine,
    Toast,
    VButton,
    VCard,
    VDropdown,
    VDropdownItem,
    VEmpty,
    VLoading,
    VPageHeader,
    VPagination,
    VSpace,
} from "@halo-dev/components";
import type { AttachmentLike } from "@halo-dev/console-shared";
import { useQuery } from "@tanstack/vue-query";
import Fuse from "fuse.js";
import { computed, nextTick, ref, watch } from "vue";
import TablerClock from "~icons/tabler/clock";
import GroupList from "../components/GroupList.vue";

const removeFileExtension = (filename: string) => {
    return filename.replace(/\.[^/.]+$/, "");
};

const selectedTimeline = ref<Timeline | undefined>();
const selectedTimelineNames = ref<string[]>([]);
const selectedGroup = ref<string>();
const editingModal = ref(false);
const checkedAll = ref(false);
const groupListRef = ref();

const page = ref(1);
const size = ref(20);
const total = ref(0);
const keyword = ref("");
const timelines = ref<Timeline[]>([]);

const {
    data: timelinesData,
    isLoading,
    isFetching,
    refetch,
} = useQuery<Timeline[]>({
    queryKey: ["plugin:timeline:timelines", page, size, keyword, selectedGroup],
    queryFn: async () => {
        if (!selectedGroup.value) {
            return [] as Timeline[];
        }
        const { data } = await axiosInstance.get<TimelineList>(
            "/apis/api.timeline.xhhao.com/v1alpha1/timelines",
            {
                params: {
                    page: page.value,
                    size: size.value,
                    keyword: keyword.value,
                    group: selectedGroup.value,
                },
            }
        );
        total.value = data.total;
        return data.items;
    },
    refetchInterval(data) {
        const hasDeleting = data?.some((timeline) => !!timeline.metadata.deletionTimestamp);
        return hasDeleting ? 1000 : false;
    },
    onSuccess(data) {
        timelines.value = data;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
});

const handleSelectPrevious = () => {
    if (!timelines.value) {
        return;
    }

    const currentIndex = timelines.value.findIndex((timeline) => timeline.metadata.name === selectedTimeline.value?.metadata.name);

    if (currentIndex > 0) {
        selectedTimeline.value = timelines.value[currentIndex - 1];
        return;
    }

    if (currentIndex <= 0) {
        selectedTimeline.value = undefined;
    }
};

const handleSelectNext = () => {
    if (!timelines.value) {
        return;
    }

    if (!selectedTimeline.value) {
        selectedTimeline.value = timelines.value[0];
        return;
    }
    const currentIndex = timelines.value.findIndex((timeline) => timeline.metadata.name === selectedTimeline.value?.metadata.name);
    if (currentIndex !== timelines.value.length - 1) {
        selectedTimeline.value = timelines.value[currentIndex + 1];
    }
};

const handleOpenEditingModal = (timeline?: Timeline) => {
    selectedTimeline.value = timeline;
    editingModal.value = true;
};

const handleDeleteInBatch = () => {
    Dialog.warning({
        title: "是否确认删除所选的时间轴？",
        description: "删除之后将无法恢复。",
        confirmType: "danger",
        onConfirm: async () => {
            try {
                const promises = selectedTimelineNames.value.map((name) => {
                    return axiosInstance.delete(`/apis/timeline.xhhao.com/v1alpha1/timelines/${name}`);
                });
                await Promise.all(promises);
                selectedTimelineNames.value = [];
                Toast.success("删除成功");
            } catch (e) {
                console.error(e);
            } finally {
                pageRefetch();
            }
        },
    });
};

const handleCheckAllChange = (e: Event) => {
    const { checked } = (e.target as HTMLInputElement);
    if (checked) {
        selectedTimelineNames.value =
            searchResults.value?.map((timeline) => timeline.metadata.name) || [];
    } else {
        selectedTimelineNames.value = [];
    }
};

const checkSelection = (timeline: Timeline) => {
    return selectedTimelineNames.value.includes(timeline.metadata.name);
};

watch(
    () => selectedTimelineNames.value,
    (newValue) => {
        checkedAll.value = newValue.length === searchResults.value?.length;
    }
);

// search
let fuse: Fuse<Timeline> | undefined = undefined;

watch(
        () => timelines.value,
        () => {
            if (!timelines.value) {
                return;
            }

            fuse = new Fuse(timelines.value, {
                keys: ["spec.displayName", "metadata.name", "spec.date"],
                useExtendedSearch: true,
            });
        }
);

const searchResults = computed({
    get() {
        if (!fuse || !keyword.value) {
            return timelines.value || [];
        }

        return fuse?.search(keyword.value).map((item) => item.item);
    },
    set(value) {
        timelines.value = value;
    },
});

// create by attachments
const attachmentModal = ref(false);

const onAttachmentsSelect = async (attachments: AttachmentLike[]) => {
    const newTimelines: {
        groupName: string;
        image?: string;
        displayName?: string;
    }[] = attachments
            .map((attachment) => {
                const timeline: {
                    groupName: string;
                    image?: string;
                    displayName?: string;
                } = {
                    groupName: selectedGroup.value || "",
                };

                if (typeof attachment === "string") {
                    timeline.image = attachment;
                } else if ("url" in attachment) {
                    timeline.image = attachment.url;
                } else if ("spec" in attachment) {
                    timeline.image = attachment.status?.permalink;
                    timeline.displayName = attachment.spec.displayName ? removeFileExtension(attachment.spec.displayName) : undefined;
                }
                return timeline;
            })
            .filter(Boolean);

    for (const timeline of newTimelines) {
        if (!timeline.image) {
            Toast.error("只支持选择图片");
            nextTick(() => {
                attachmentModal.value = true;
            });
            return;
        }
    }

    const createRequests = newTimelines.map((timeline) => {
        return axiosInstance.post<Timeline>("/apis/timeline.xhhao.com/v1alpha1/timelines", {
            metadata: {
                name: "",
                generateName: "timeline-",
            },
            spec: timeline,
            kind: "timeline",
            apiVersion: "timeline.xhhao.com/v1alpha1",
        });
    });

    await Promise.all(createRequests);

    Toast.success(`新建成功，一共创建了 ${newTimelines.length} 个时间轴。`);
    pageRefetch();
};

const groupSelectHandle = (group?: string) => {
    selectedGroup.value = group;
};

const pageRefetch = async () => {
    await groupListRef.value.refetch();
    await refetch();
    selectedTimelineNames.value = [];
};

const onEditingModalClose = () => {
    editingModal.value = false;
    refetch();
};

</script>
<template>
    <TimelineEditingModal
            v-if="editingModal"
            :timeline="selectedTimeline"
            :group="selectedGroup"
            @close="onEditingModalClose"
            @saved="pageRefetch"
    >
        <template #append-actions>
      <span @click="handleSelectPrevious">
        <IconArrowLeft />
      </span>
            <span @click="handleSelectNext">
        <IconArrowRight />
      </span>
        </template>
    </TimelineEditingModal>
    <AttachmentSelectorModal v-model:visible="attachmentModal" :accepts="['image/*']" @select="onAttachmentsSelect" />
    <VPageHeader title="时间轴">
        <template #icon>
            <TablerClock />
        </template>
    </VPageHeader>
    <div class=":uno: p-4">
        <div class=":uno: flex flex-col gap-2 lg:flex-row">
            <div class=":uno: w-full flex-none lg:w-96">
                <GroupList ref="groupListRef" @select="groupSelectHandle" />
            </div>
            <div class=":uno: min-w-0 flex-1 shrink">
                <VCard :body-class="[':uno: !p-0']">
                    <template #header>
                        <div class=":uno: block w-full bg-gray-50 px-4 py-3">
                            <div
                                class=":uno: relative flex flex-col flex-wrap items-start gap-4 sm:flex-row sm:items-center"
                            >
                                <div
                                    v-permission="['plugin:timeline:manage']"
                                    class=":uno: hidden items-center sm:flex"
                                >
                                    <input
                                        v-model="checkedAll"
                                        type="checkbox"
                                        @change="handleCheckAllChange"
                                    />
                                </div>
                                <div class=":uno: flex w-full flex-1 items-center sm:w-auto">
                                    <SearchInput
                                        v-if="!selectedTimelineNames.length"
                                        v-model="keyword"
                                    />
                                    <VSpace v-else>
                                        <VButton type="danger" @click="handleDeleteInBatch">
                                            删除
                                        </VButton>
                                    </VSpace>
                                </div>
                                <VSpace v-if="selectedGroup" spacing="lg" class=":uno: flex-wrap">
                                    <div class=":uno: flex flex-row gap-2">
                                        <div
                                            class=":uno: group cursor-pointer rounded p-1 hover:bg-gray-200"
                                            @click="refetch()"
                                        >
                                            <IconRefreshLine
                                                v-tooltip="'刷新'"
                                                :class="{ 'animate-spin text-gray-900': isFetching }"
                                                class=":uno: h-4 w-4 text-gray-600 group-hover:text-gray-900"
                                            />
                                        </div>
                                    </div>
                                    <VDropdown v-permission="['plugin:timeline:manage']">
                                        <VButton size="xs"> 新增 </VButton>
                                        <template #popper>
                                            <VDropdownItem @click="handleOpenEditingModal()"> 新增 </VDropdownItem>
                                            <VDropdownItem @click="attachmentModal = true"> 从附件库选择 </VDropdownItem>
                                        </template>
                                    </VDropdown>
                                </VSpace>
                            </div>
                        </div>
                    </template>
                    <VLoading v-if="isLoading" />
                    <Transition v-else-if="!selectedGroup" appear name="fade">
                        <VEmpty message="请选择或新建分组" title="未选择分组"></VEmpty>
                    </Transition>
                    <Transition v-else-if="!searchResults.length" appear name="fade">
                        <VEmpty message="你可以尝试刷新或者新建时间轴" title="当前没有时间轴">
                            <template #actions>
                                <VSpace>
                                    <VButton @click="refetch"> 刷新</VButton>
                                    <VButton v-permission="['plugin:timeline:manage']" type="primary" @click="handleOpenEditingModal()">
                                        <template #icon>
                                            <IconAddCircle class=":uno: size-full" />
                                        </template>
                                        新增时间轴
                                    </VButton>
                                </VSpace>
                            </template>
                        </VEmpty>
                    </Transition>
                    <Transition v-else appear name="fade">
                        <div class=":uno: w-full overflow-x-auto">
                            <table class=":uno: w-full border-spacing-0">
                                <tbody class=":uno: divide-y divide-gray-100">
                                    <TimelineListItem
                                        v-for="timeline in searchResults"
                                        :key="timeline.metadata.name"
                                        :timeline="timeline"
                                        @edit="handleOpenEditingModal"
                                        @delete="pageRefetch"
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
                                </tbody>
                            </table>
                        </div>
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
        </div>
    </div>
</template>
