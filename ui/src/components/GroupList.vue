<script lang="ts" setup>
import type { TimelineGroup, TimelineGroupList, TimelineList } from "../types/index";
import { axiosInstance } from "@halo-dev/api-client";
import {
    Dialog,
    IconList,
    VButton,
    VCard,
    VDropdownItem,
    VEmpty,
    VEntity,
    VEntityField,
    VLoading,
    VStatusDot,
} from "@halo-dev/components";
import { useQuery } from "@tanstack/vue-query";
import { useRouteQuery } from "@vueuse/router";
import { ref, watch } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import GroupEditingModal from "./GroupEditingModal.vue";

const emit = defineEmits<{
    (event: "select", group?: string): void;
}>();

const groupEditingModal = ref(false);

const updateGroup = ref<TimelineGroup>();

const selectedGroup = useRouteQuery<string>("timeline-group");

const groups = ref<TimelineGroup[]>([]);

async function computeGroupCounts() {
    if (!groups.value?.length) return;
    const promises = groups.value.map(async (group) => {
        try {
            const { data } = await axiosInstance.get<TimelineList>(
                "/apis/api.timeline.xhhao.com/v1alpha1/timelines",
                { params: { page: 1, size: 1, group: group.metadata.name } }
            );
            const count = data.total ?? (data.items?.length || 0);
            group.status = { ...(group.status || {}), timelineCount: count } as any;
        } catch (e) {
            group.status = { ...(group.status || {}), timelineCount: 0 } as any;
        }
    });
    await Promise.all(promises);
}

const { refetch, isLoading } = useQuery<TimelineGroup[]>({
    queryKey: ["plugin:timeline:groups"],
    queryFn: async () => {
        const { data } = await axiosInstance.get<TimelineGroupList>("/apis/api.timeline.xhhao.com/v1alpha1/timelinegroups");
        return data.items
                .map((group) => {
                    if (group.spec) {
                        group.spec.priority = group.spec.priority || 0;
                    }
                    return group;
                })
                .sort((a, b) => {
                    return (a.spec?.priority || 0) - (b.spec?.priority || 0);
                });
    },
    refetchInterval(data) {
        const hasDeletingGroup = data?.some((group) => !!group.metadata.deletionTimestamp);
        return hasDeletingGroup ? 1000 : false;
    },
    async onSuccess(data) {
        groups.value = data;
        await computeGroupCounts();

        if (selectedGroup.value) {
            const groupNames = data.map((group) => group.metadata.name);
            if (groupNames.includes(selectedGroup.value)) {
                emit("select", selectedGroup.value);
            } else if (data.length) {
                handleSelectedClick(data[0]);
            }
        } else if (data.length) {
            handleSelectedClick(data[0]);
        } else {
            selectedGroup.value = "";
            emit("select", "");
        }
    },
    refetchOnWindowFocus: false,
});

// compute counts when groups change (fallback)
watch(
    () => groups.value?.map(g => g.metadata.name).join(','),
    async () => {
        await computeGroupCounts();
    },
    { immediate: true }
);

const handleSaveInBatch = async () => {
    try {
        const promises = groups.value?.map((group: TimelineGroup, index: number) => {
            if (group.spec) {
                group.spec.priority = index;
            }
            return axiosInstance.put(`/apis/timeline.xhhao.com/v1alpha1/timelinegroups/${group.metadata.name}`, group);
        });
        if (promises) {
            await Promise.all(promises);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await refetch();
        await computeGroupCounts();
    }
};

const handleDelete = async (group: TimelineGroup) => {
    Dialog.warning({
        title: "确定要删除该分组吗？",
        description: "该操作不可恢复，该分组下的所有时间轴条目也将被删除。",
        confirmType: "danger",
        onConfirm: async () => {
            try {
                await axiosInstance.delete(`/apis/timeline.xhhao.com/v1alpha1/timelinegroups/${group.metadata.name}`);
            } catch (e) {
                console.error(e);
            } finally {
                await refetch();
                await computeGroupCounts();
            }
        },
    });
};

const handleOpenEditingModal = (group?: TimelineGroup) => {
    groupEditingModal.value = true;
    updateGroup.value = group;
};

const handleSelectedClick = (group: TimelineGroup) => {
    selectedGroup.value = group.metadata.name;
    emit("select", group.metadata.name);
};

defineExpose({
    refetch,
});

function onGroupEditingModalClose() {
    groupEditingModal.value = false;
    refetch();
}
</script>
<template>
    <GroupEditingModal v-if="groupEditingModal" :group="updateGroup" @close="onGroupEditingModalClose" />
        <VCard :body-class="[':uno: !p-0']" title="分组">
        <VLoading v-if="isLoading" />
        <Transition v-else-if="!groups || !groups.length" appear name="fade">
            <VEmpty message="你可以尝试刷新或者新建分组" title="当前没有分组">
                <template #actions>
                    <VSpace>
                        <VButton size="sm" @click="refetch()"> 刷新</VButton>
                    </VSpace>
                </template>
            </VEmpty>
        </Transition>
        <Transition v-else appear name="fade">
            <div class=":uno: w-full overflow-x-auto">
                <table class=":uno: w-full border-spacing-0">
                    <VueDraggable
                            v-model="groups"
                            class=":uno: divide-y divide-gray-100"
                            group="group"
                            handle=".drag-element"
                            item-key="metadata.name"
                            tag="tbody"
                            @update="handleSaveInBatch"
                    >
                        <VEntity
                                v-for="group in groups"
                                :key="group.metadata.name"
                                :is-selected="selectedGroup === group.metadata.name"
                                class=":uno: group"
                                @click="handleSelectedClick(group)"
                        >
                            <template #prepend>
                                <div
                                        class=":uno: drag-element absolute inset-y-0 left-0 hidden w-3.5 cursor-move items-center bg-gray-100 transition-all group-hover:flex hover:bg-gray-200"
                                >
                                    <IconList class=":uno: size-3.5" />
                                </div>
                            </template>

                            <template #start>
                                <VEntityField
                                        :title="group.spec?.displayName"
                                        :description="`${group.status?.timelineCount || 0} 个时间轴`"
                                ></VEntityField>
                            </template>

                            <template #end>
                                <VEntityField v-if="group.metadata.deletionTimestamp">
                                    <template #description>
                                        <VStatusDot v-tooltip="`删除中`" state="warning" animate />
                                    </template>
                                </VEntityField>
                            </template>

                            <template #dropdownItems>
                                <VDropdownItem @click="handleOpenEditingModal(group)"> 修改 </VDropdownItem>
                                <VDropdownItem type="danger" @click="handleDelete(group)"> 删除 </VDropdownItem>
                            </template>
                        </VEntity>
                    </VueDraggable>
                </table>
            </div>
        </Transition>

        <template v-if="!isLoading" #footer>
            <Transition appear name="fade">
                <!-- @unocss-skip-start -->
                <VButton
                        v-permission="['plugin:timeline:manage']"
                        block
                        type="secondary"
                        @click="handleOpenEditingModal(undefined)"
                >
                    新增分组
                </VButton>
            </Transition>
        </template>
    </VCard>
</template>
