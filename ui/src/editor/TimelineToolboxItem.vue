<script lang="ts" setup>
import type { Editor } from "@halo-dev/richtext-editor";
import { ToolboxItem } from "@halo-dev/richtext-editor";
import { markRaw } from "vue";
import TablerClock from "~icons/tabler/clock?width=1.2em&height=1.2em";

const props = defineProps<{
  editor: Editor;
}>();

const handleClick = () => {
  props.editor
    .chain()
    .focus()
    .setTimelineView({})
    .run();
};
</script>

<template>
  <ToolboxItem
    :editor="editor"
    :icon="markRaw(TablerClock)"
    title="时间轴"
    @click="handleClick"
  />
</template>

