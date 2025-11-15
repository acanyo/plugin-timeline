<script lang="ts" setup>
import LazyImage from "@/components/LazyImage.vue";
import TimelineEditingModal from "@/components/TimelinEditingModal.vue";
import type { Timeline, TimelineList } from "@/types";
import { axiosInstance } from "@halo-dev/api-client";
import {
    Dialog,
    IconAddCircle,
    IconArrowLeft,
    IconArrowRight,
    IconCheckboxFill,
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
import TablerClock from '~icons/tabler/clock'
import GroupList from "../components/GroupList.vue";
import {VueDraggable} from "vue-draggable-plus";

const removeFileExtension = (filename: string) => {
    return filename.replace(/\.[^/.]+$/, "");
};

const selectedTimeline = ref<Timeline | undefined>();
const selectedTimelines = ref<Set<Timeline>>(new Set<Timeline>());
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
    isLoading,
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
                const promises = Array.from(selectedTimelines.value).map((timeline) => {
                    return axiosInstance.delete(`/apis/api.timeline.xhhao.com/v1alpha1/timelines/${timeline.metadata.name}`);
                });
                await Promise.all(promises);
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
    handleCheckAll(checked);
};

const handleCheckAll = (checkAll: boolean) => {
    if (checkAll) {
        timelines.value?.forEach((timeline) => {
            selectedTimelines.value.add(timeline);
        });
    } else {
        selectedTimelines.value.clear();
    }
};

const isChecked = (timeline: Timeline) => {
    return (
            timeline.metadata.name === selectedTimeline.value?.metadata.name ||
            Array.from(selectedTimelines.value)
                    .map((item) => item.metadata.name)
                    .includes(timeline.metadata.name)
    );
};

watch(
        () => selectedTimelines.value.size,
        (newValue) => {
            checkedAll.value = newValue === timelines.value?.length;
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
                keys: ["spec.description", "metadata.name", "spec.date"],
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
        description?: string;
    }[] = attachments
            .map((attachment) => {
                const timeline: {
                    groupName: string;
                    image?: string;
                    description?: string;
                } = {
                    groupName: selectedGroup.value || "",
                };

                if (typeof attachment === "string") {
                    timeline.image = attachment;
                } else if ("url" in attachment) {
                    timeline.image = attachment.url;
                } else if ("spec" in attachment) {
                    timeline.image = attachment.status?.permalink;
                    timeline.description = attachment.spec.displayName ? removeFileExtension(attachment.spec.displayName) : undefined;
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
        return axiosInstance.post<Timeline>("/apis/api.timeline.xhhao.com/v1alpha1/timelines", {
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
    selectedTimelines.value = new Set<Timeline>();
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
                <VCard>
                    <template #header>
                        <div class=":uno: block w-full bg-gray-50 px-4 py-3">
                            <div class=":uno: relative flex flex-col items-start sm:flex-row sm:items-center">
                                <div class=":uno: mr-4 hidden items-center sm:flex">
                                    <input v-model="checkedAll" type="checkbox" @change="handleCheckAllChange" />
                                </div>
                                <div class=":uno: w-full flex flex-1 sm:w-auto">
                                    <SearchInput v-if="!selectedTimelines.size" v-model="keyword" />
                                    <VSpace v-else>
                                        <VButton type="danger" @click="handleDeleteInBatch"> 删除 </VButton>
                                    </VSpace>
                                </div>
                                <div v-if="selectedGroup" v-permission="['plugin:timeline:manage']" class=":uno: mt-4 flex sm:mt-0">
                                    <VDropdown>
                                        <VButton size="xs"> 新增 </VButton>
                                        <template #popper>
                                            <VDropdownItem @click="handleOpenEditingModal()"> 新增 </VDropdownItem>
                                            <VDropdownItem @click="attachmentModal = true"> 从附件库选择 </VDropdownItem>
                                        </template>
                                    </VDropdown>
                                </div>
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
                        <VueDraggable
                                v-model="timelines"
                                class=":uno: grid grid-cols-1 mt-2 gap-x-2 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                                group="timeline"
                                handle=".drag-element"
                                item-key="metadata.name"
                                tag="div"
                                role="list"
                        >
                            <VCard
                                    v-for="timeline in timelines"
                                    :key="timeline.metadata.name"
                                    :body-class="[':uno: !p-0']"
                                    :class="{
                  ':uno: ring-primary ring-1': isChecked(timeline),
                  ':uno: ring-1 ring-red-600': timeline.metadata.deletionTimestamp,
                }"
                                    class=":uno: hover:shadow drag-element "
                                    @click="handleOpenEditingModal(timeline)"
                            >
                                <div class=":uno: group relative bg-white">
                                    <div class=":uno: block aspect-16/9 size-full cursor-pointer overflow-hidden bg-gray-100 relative">
                                        <LazyImage
                                                v-if="timeline.spec.image"
                                                :key="timeline.metadata.name"
                                                :alt="timeline.spec.description || '时间轴'"
                                                :src="timeline.spec.image"
                                                classes="size-full pointer-events-none group-hover:opacity-75"
                                        >
                                            <template #loading>
                                                <div class=":uno: h-full flex justify-center">
                                                    <VLoading></VLoading>
                                                </div>
                                            </template>
                                            <template #error>
                                                <div class=":uno: h-full flex items-center justify-center object-cover">
                                                    <span class=":uno: text-xs text-red-400"> 加载异常 </span>
                                                </div>
                                            </template>
                                        </LazyImage>
                                        <div v-else class=":uno: h-full flex items-center justify-center bg-gray-200">
                                            <span class=":uno: text-xs text-gray-400">无图片</span>
                                        </div>
                                    </div>

                                    <div class=":uno: px-2 py-1">
                                        <p
                                                v-if="timeline.spec.date"
                                                class=":uno: text-xs text-gray-500"
                                        >
                                            {{ timeline.spec.date }}
                                        </p>
                                        <p
                                                v-tooltip="timeline.spec.description"
                                                class=":uno: block cursor-pointer truncate text-center text-xs text-gray-700 font-medium"
                                        >
                                            {{ timeline.spec.description || '无描述' }}
                                        </p>
                                    </div>

                                    <div v-if="timeline.metadata.deletionTimestamp" class=":uno: absolute top-1 right-1 text-xs text-red-300">
                                        删除中...
                                    </div>

                                    <div
                                            v-if="!timeline.metadata.deletionTimestamp"
                                            v-permission="['plugin:timeline:manage']"
                                            :class="{ ':uno: !flex': selectedTimelines.has(timeline) }"
                                            class=":uno: absolute left-0 top-0 hidden h-1/3 w-full cursor-pointer justify-end from-gray-300 to-transparent bg-gradient-to-b ease-in-out group-hover:flex"
                                            @click.stop="selectedTimelines.has(timeline) ? selectedTimelines.delete(timeline) : selectedTimelines.add(timeline)"
                                    >
                                        <IconCheckboxFill
                                                :class="{
                        ':uno: !text-primary': selectedTimelines.has(timeline),
                      }"
                                                class=":uno: hover:text-primary mr-1 mt-1 h-6 w-6 cursor-pointer text-white transition-all"
                                        />
                                    </div>
                                </div>
                            </VCard>
                        </VueDraggable>
                    </Transition>

                    <template #footer>
                        <VPagination v-model:page="page" v-model:size="size" :total="total" :size-options="[20, 30, 50, 100]" />
                    </template>
                </VCard>
            </div>
        </div>
    </div>
</template>
