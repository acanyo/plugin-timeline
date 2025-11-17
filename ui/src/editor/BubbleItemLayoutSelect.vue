<script setup lang="ts">
import type {Editor} from "@halo-dev/richtext-editor";
import { computed, ref, onMounted, onUnmounted, type Component } from "vue";
import TimelineExtension from "@/editor/timelin-edited";

const props = defineProps<{
  editor: Editor;
  isActive: ({ editor }: { editor: Editor }) => boolean;
  visible?: ({ editor }: { editor: Editor }) => boolean;
  icon?: Component;
  title?: string;
  action?: ({ editor }: { editor: Editor }) => void;
}>();

const currentOrientation = computed({
  get: () => {
    return props.editor.getAttributes(TimelineExtension.name).orientation || "vertical";
  },
  set: (value: string) => {
    props.editor.commands.updateAttributes(TimelineExtension.name, {
      orientation: value as 'vertical' | 'horizontal' | 'alternating'
    });
  }
});

const layoutOptions = [
  { value: "vertical", label: "竖向布局" },
  { value: "horizontal", label: "横向布局" },
  { value: "alternating", label: "交替布局" },
];

const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);
const dropdownPosition = ref({ top: 0, left: 0, width: 0 });

const handleChange = (value: string) => {
  currentOrientation.value = value;
  isOpen.value = false;
};

const currentLabel = computed(() => {
  return layoutOptions.find(opt => opt.value === currentOrientation.value)?.label || "竖向布局";
});

const updateDropdownPosition = () => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect();
    dropdownPosition.value = {
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    };
  }
};

const handleToggle = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    updateDropdownPosition();
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    containerRef.value &&
    !containerRef.value.contains(event.target as Node) &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target as Node)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', updateDropdownPosition, true);
  window.addEventListener('resize', updateDropdownPosition);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', updateDropdownPosition, true);
  window.removeEventListener('resize', updateDropdownPosition);
});

</script>

<template>
  <div ref="containerRef" class="likcc-timeline-layout-select-container" @click.stop>
    <div
      class="likcc-timeline-layout-select-trigger"
      @click="handleToggle"
    >
      <span class="likcc-timeline-layout-select-text">{{ currentLabel }}</span>
      <svg
        class="likcc-timeline-layout-select-arrow"
        :class="{ 'likcc-timeline-layout-select-arrow-open': isOpen }"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="dropdownRef"
      class="likcc-timeline-layout-select-dropdown"
      :style="{
        position: 'fixed',
        top: `${dropdownPosition.top}px`,
        left: `${dropdownPosition.left}px`,
        width: `${dropdownPosition.width}px`,
        zIndex: 9999,
      }"
      @click.stop
    >
      <div
        v-for="option in layoutOptions"
        :key="option.value"
        class="likcc-timeline-layout-select-option"
        :class="{ 'likcc-timeline-layout-select-option-active': option.value === currentOrientation }"
        @click="handleChange(option.value)"
      >
        {{ option.label }}
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.likcc-timeline-layout-select-container {
  position: relative;
  min-width: 120px;
}

.likcc-timeline-layout-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 32px;
}

.likcc-timeline-layout-select-trigger:hover {
  border-color: #9ca3af;
  background-color: #f9fafb;
}

.likcc-timeline-layout-select-trigger:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.likcc-timeline-layout-select-text {
  color: #374151;
  font-size: 14px;
  line-height: 1.5;
  flex: 1;
  text-align: left;
}

.likcc-timeline-layout-select-arrow {
  color: #6b7280;
  transition: transform 0.2s ease;
  flex-shrink: 0;
  margin-left: 8px;
}

.likcc-timeline-layout-select-arrow-open {
  transform: rotate(180deg);
}

.likcc-timeline-layout-select-dropdown {
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  min-width: 120px;
}

.likcc-timeline-layout-select-option {
  padding: 8px 12px;
  color: #374151;
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.likcc-timeline-layout-select-option:hover {
  background-color: #f3f4f6;
}

.likcc-timeline-layout-select-option-active {
  background-color: #eff6ff;
  color: #1e40af;
  font-weight: 500;
}

.likcc-timeline-layout-select-option-active:hover {
  background-color: #dbeafe;
}
</style>

