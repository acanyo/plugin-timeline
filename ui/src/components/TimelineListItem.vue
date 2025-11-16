<script lang="ts" setup>
import type { Timeline } from "@/types";
import {
    Dialog,
    Toast,
    VDropdownItem,
    VEntity,
    VEntityField,
    VStatusDot,
} from "@halo-dev/components";
import { axiosInstance } from "@halo-dev/api-client";
import { computed } from "vue";
import IconCalendar from "~icons/tabler/calendar";
import IconImage from "~icons/tabler/photo";
import LazyImage from "./LazyImage.vue";

const props = defineProps<{
    timeline: Timeline;
}>();

defineSlots<{
    checkbox?: () => any;
}>();

const emit = defineEmits<{
    (event: "edit", timeline: Timeline): void;
    (event: "delete", timeline: Timeline): void;
}>();


const handleDelete = () => {
    Dialog.warning({
        title: "是否确认删除该时间轴？",
        description: "删除之后将无法恢复。",
        confirmType: "danger",
        onConfirm: async () => {
            try {
                await axiosInstance.delete(
                    `/apis/timeline.xhhao.com/v1alpha1/timelines/${props.timeline.metadata.name}`
                );
                Toast.success("删除成功");
                emit("delete", props.timeline);
            } catch (e) {
                console.error(e);
                Toast.error("删除失败");
            }
        },
    });
};

const displayTitle = computed(() => {
    // 优先显示显示名称，如果没有则显示日期
    if (props.timeline.spec?.displayName) {
        return props.timeline.spec.displayName;
    }
    if (props.timeline.spec?.date) {
        return props.timeline.spec.date;
    }
    return "未命名时间轴";
});

const displayDescription = computed(() => {
    const parts: string[] = [];
    // 如果标题是显示名称，则副标题显示日期
    if (props.timeline.spec?.displayName && props.timeline.spec?.date) {
        parts.push(props.timeline.spec.date);
    }
    if (props.timeline.spec?.relatedLinks) {
        parts.push(`关联文章: ${props.timeline.spec.relatedLinks}`);
    }
    return parts.join(" | ") || (props.timeline.spec?.displayName ? "" : "无显示名称");
});

const hasImage = computed(() => !!props.timeline.spec?.image);
</script>

<template>
    <VEntity>
        <template v-if="$slots.checkbox" #checkbox>
            <slot name="checkbox" />
        </template>

        <template #start>
            <div class=":uno: flex items-center gap-3">
                <div v-if="hasImage" class=":uno: size-12 flex-shrink-0 overflow-hidden rounded">
                    <LazyImage
                        :src="timeline.spec?.image || ''"
                        :alt="displayTitle"
                        classes=":uno: size-full object-cover"
                    >
                        <template #loading>
                            <div class=":uno: size-full flex items-center justify-center bg-gray-100">
                                <IconImage class=":uno: size-6 text-gray-400" />
                            </div>
                        </template>
                        <template #error>
                            <div class=":uno: size-full flex items-center justify-center bg-gray-100">
                                <IconImage class=":uno: size-6 text-gray-400" />
                            </div>
                        </template>
                    </LazyImage>
                </div>
                <div v-else class=":uno: size-12 flex-shrink-0 flex items-center justify-center rounded bg-gray-100">
                    <IconCalendar class=":uno: size-6 text-gray-400" />
                </div>
                <VEntityField
                    :title="displayTitle"
                    :description="displayDescription"
                />
            </div>
        </template>

        <template #end>
            <VEntityField v-if="timeline.metadata.deletionTimestamp">
                <template #description>
                    <VStatusDot v-tooltip="`删除中`" state="warning" animate />
                </template>
            </VEntityField>
        </template>

        <template #dropdownItems>
            <VDropdownItem @click="emit('edit', timeline)"> 编辑 </VDropdownItem>
            <VDropdownItem type="danger" @click="handleDelete"> 删除 </VDropdownItem>
        </template>
    </VEntity>
</template>

