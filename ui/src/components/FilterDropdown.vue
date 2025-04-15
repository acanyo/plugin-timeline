<script setup lang="ts">
import {computed} from "vue";
import {VMenu} from "@halo-dev/components";
import IconFilterLine from "~icons/ri/filter-line";

interface FilterItem {
  label: string;
  value?: string;
}

const props = defineProps<{
  modelValue?: string;
  label: string;
  items: FilterItem[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value?: string): void;
}>();

const selectedItem = computed(() => {
  return (
    props.items.find((item) => item.value === props.modelValue) ||
    props.items[0]
  );
});

const handleSelect = (item: FilterItem) => {
  emit("update:modelValue", item.value);
};
</script>

<template>
  <VMenu>
    <template #trigger="{ toggle }">
      <button
        class="flex items-center gap-1 rounded border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        @click="toggle"
      >
        <IconFilterLine class="h-4 w-4" />
        <span>{{ label }}:</span>
        <span class="font-medium">{{ selectedItem.label }}</span>
      </button>
    </template>
    <template #default>
      <div class="min-w-[160px] p-2">
        <div
          v-for="item in items"
          :key="item.label"
          class="cursor-pointer rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          @click="handleSelect(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </template>
  </VMenu>
</template> 