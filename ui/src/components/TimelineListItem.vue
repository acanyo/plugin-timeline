<script setup lang="ts">
import {computed} from "vue";
import {VCard, VSpace, VTag, VButton, VAvatar} from "@halo-dev/components";
import {formatDistanceToNow} from "date-fns";
import {zhCN} from "date-fns/locale";
import type {Timeline} from "@/api/generated";

const props = defineProps<{
  timeline: Timeline;
  isSelected?: boolean;
}>();

const emit = defineEmits<{
  (e: "delete", timeline: Timeline): void;
  (e: "edit", timeline: Timeline): void;
}>();

const formattedDate = computed(() => {
  if (!props.timeline.spec.timestamp) return "";
  try {
    const date = new Date(props.timeline.spec.timestamp);
    return formatDistanceToNow(date, {addSuffix: true, locale: zhCN});
  } catch (e) {
    return props.timeline.spec.timestamp;
  }
});

const typeColor = computed(() => {
  switch (props.timeline.spec.type) {
    case "important":
      return "warning";
    case "urgent":
      return "danger";
    default:
      return "info";
  }
});

const typeLabel = computed(() => {
  switch (props.timeline.spec.type) {
    case "important":
      return "重要";
    case "urgent":
      return "紧急";
    default:
      return "普通";
  }
});

const handleDelete = () => {
  emit("delete", props.timeline);
};

const handleEdit = () => {
  emit("edit", props.timeline);
};
</script>

<template>
  <VCard
    :class="[
      'group relative flex cursor-pointer flex-col gap-4 p-4 transition-all hover:bg-gray-50',
      isSelected ? 'bg-gray-50' : '',
    ]"
  >
    <div class="flex items-start justify-between">
      <div class="flex flex-1 items-start gap-4">
        <slot name="checkbox" />
        <div class="flex flex-1 flex-col gap-2">
          <div class="flex items-center gap-2">
            <h3 class="text-base font-medium text-gray-900">
              {{ timeline.spec.title }}
            </h3>
            <VTag :type="typeColor">{{ typeLabel }}</VTag>
            <VTag v-if="timeline.spec.pinned" type="success">置顶</VTag>
            <VTag v-if="!timeline.spec.visible" type="warning">隐藏</VTag>
          </div>
          <p v-if="timeline.spec.description" class="text-sm text-gray-500">
            {{ timeline.spec.description }}
          </p>
          <div class="flex flex-wrap gap-2">
            <VTag
              v-for="tag in timeline.spec.tags"
              :key="tag"
              type="info"
              size="sm"
            >
              {{ tag }}
            </VTag>
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <span>{{ formattedDate }}</span>
            <span v-if="timeline.spec.relatedArticle" class="text-primary">
              关联文章: {{ timeline.spec.relatedArticle }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <VButton
          v-permission="['plugin:timeline:manage']"
          size="sm"
          @click="handleEdit"
        >
          编辑
        </VButton>
        <VButton
          v-permission="['plugin:timeline:manage']"
          size="sm"
          type="danger"
          @click="handleDelete"
        >
          删除
        </VButton>
      </div>
    </div>
    <div v-if="timeline.spec.illustrated" class="mt-2">
      <img
        :src="timeline.spec.illustrated"
        :alt="timeline.spec.title"
        class="max-h-48 rounded object-cover"
      />
    </div>
  </VCard>
</template> 