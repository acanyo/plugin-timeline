<script setup lang="ts">
import {VButton} from "@halo-dev/components";
import {computed} from "vue";
import {formatDatetime} from "@/utils/date";
import type {Timeline} from "@/api/generated";
import {TimelineType} from "@/api/generated";

const props = defineProps<{
  timeline: Timeline;
  isSelected?: boolean;
}>();

const emit = defineEmits<{
  (e: "delete", timeline: Timeline): void;
  (e: "edit", timeline: Timeline): void;
}>();

const typeLabel = computed(() => {
  switch (props.timeline.spec.type) {
    case TimelineType.IMPORTANT:
      return "重要";
    case TimelineType.NORMAL:
      return "普通";
    case TimelineType.MILESTONE:
      return "里程碑";
    default:
      return "未知";
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
  <thead v-if="!timeline">
    <tr class="text-xs text-gray-700 uppercase bg-gray-50">
      <th v-permission="['plugin:timeline:manage']" scope="col" class="px-4 py-3">
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
      <th v-permission="['plugin:timeline:manage']" scope="col" class="px-4 py-3">
        <div class="w-max flex items-center"></div>
      </th>
    </tr>
  </thead>
  <tr v-else class="border-b last:border-none hover:bg-gray-100">
    <!-- 选择框 -->
    <td class="px-4 py-4">
      <slot name="checkbox" />
    </td>

    <!-- 图片 -->
    <td class="px-4 py-4 w-[60px]">
      <img
        v-if="timeline.spec.illustrated"
        :src="timeline.spec.illustrated"
        :alt="timeline.spec.title"
        class="h-12 w-12 object-cover rounded"
        referrerpolicy="no-referrer"
      />
      <span v-else>-</span>
    </td>

    <!-- 名称 -->
    <td class="px-4 py-4 table-td">
      {{ timeline.spec.title }}
    </td>

    <!-- 类型 -->
    <td class="px-4 py-4 table-td">
      {{ typeLabel }}
    </td>

    <!-- 时间 -->
    <td class="px-4 py-4 table-td">
      {{ formatDatetime(timeline.spec.timestamp) }}
    </td>

    <!-- 描述 -->
    <td class="px-4 py-4">
      {{ timeline.spec.description || '-' }}
    </td>

    <!-- 关联文章 -->
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

    <!-- 操作按钮 -->
    <td class="px-4 py-4">
      <div class="flex items-center gap-2">
        <VButton
          v-permission="['plugin:timeline:manage']"
          size="sm"
          type="default"
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
    </td>
  </tr>
</template>

<style scoped>
.table-td {
  text-align: left !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style> 
