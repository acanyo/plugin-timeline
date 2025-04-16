<script lang="ts" setup>
import {Toast, VButton, VModal, VSpace} from "@halo-dev/components";
import {computed, onMounted, ref, watch} from "vue";
import {cloneDeep} from 'lodash';
import {timelineApi} from "@/api";
import type {Option, Timeline} from "@/api/generated";
import {TimelineType} from "@/api/generated";
import {toDatetimeLocal, toISOString} from "@/utils/date";
import {FormKit} from "@formkit/vue";


const props = withDefaults(
  defineProps<{
    visible: boolean;
    timeline?: Timeline;
  }>(),
  {
    visible: false,
    timeline: undefined,
  }
);

const emit = defineEmits<{
  (event: "update:visible", value: boolean): void;
  (event: "close"): void;
}>();

const initialFormState: Timeline = {
  metadata: {
    name: "",
    generateName: "timeline-",
  },
  spec: {
    title: "",
    description: "",
    timestamp: "",
    type: TimelineType.NORMAL,
    tags: [],
    relatedArticle: "",
    illustrated: "",
    pinned: false,
    visible: true
  },
  kind: "Timeline",
  apiVersion: "timeline.lik.cc/v1alpha1",
};

const formState = ref<Timeline>(cloneDeep(initialFormState));
const saving = ref<boolean>(false);
const formVisible = ref(false);
const eventTime = ref<string | undefined>(undefined);
const timelineTypes = ref<Option[]>([]);

const validationMessages = {
  required: (ctx: { name: string }) => `${ctx.name}不能为空`,
} as const;

const isUpdateMode = computed(() => {
  return !!formState.value.metadata.creationTimestamp;
});

const modalTitle = computed(() => {
  return isUpdateMode.value ? "编辑时间线" : "新建时间线";
});

const onVisibleChange = (visible: boolean) => {
  emit("update:visible", visible);
  if (!visible) {
    emit("close");
  }
};

const handleResetForm = () => {
  formState.value = cloneDeep(initialFormState);
};

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      formVisible.value = true;
    } else {
      setTimeout(() => {
        formVisible.value = false;
        handleResetForm();
      }, 200);
    }
  }
);

watch(
  () => props.timeline,
  (timeline) => {
    if (timeline) {
      formState.value = cloneDeep(timeline);
      eventTime.value = toDatetimeLocal(formState.value.spec.timestamp);
    } else {
      eventTime.value = undefined;
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => eventTime.value,
  (value) => {
    formState.value.spec.timestamp = value ? toISOString(value) : "";
  }
);

const isFormValid = computed(() => {
  if (!formState.value.spec.title?.trim()) return false;
  if (!formState.value.spec.description?.trim()) return false;
  return !!eventTime.value;
});

const handleSaveTimeline = async () => {
  try {
    if (!isFormValid.value) {
      if (!formState.value.spec.title?.trim()) {
        Toast.error("事件标题不能为空");
        return;
      }
      if (!formState.value.spec.description?.trim()) {
        Toast.error("事件描述不能为空");
        return;
      }
      if (!eventTime.value) {
        Toast.error("请选择事件时间");
        return;
      }

      Toast.error("请检查表单填写是否正确");
      return;
    }

    saving.value = true;
    if (isUpdateMode.value) {
      await timelineApi.updateTimeline(
        formState.value.metadata.name,
        formState.value
      );
    } else {
      await timelineApi.createTimeline(formState.value);
    }

    Toast.success("保存成功");
    onVisibleChange(false);
  } catch (e) {
    console.error(e);
    Toast.error("保存失败");
  } finally {
    saving.value = false;
  }
};
onMounted(async () => {
  timelineTypes.value = await timelineApi.listTimelineTypes();
});
</script>

<template>
  <VModal
    :title="modalTitle"
    :visible="visible"
    :width="650"
    @update:visible="onVisibleChange"
  >
    <template #actions>
      <slot name="append-actions" />
    </template>

    <FormKit
      v-if="formVisible"
      id="timeline-form"
      name="timeline-form"
      type="form"
      :config="{ validationVisibility: 'submit' }"
      @submit="handleSaveTimeline"
    >
      <div class="md:grid md:grid-cols-4 md:gap-6">
        <div class="md:col-span-1">
          <div class="sticky top-0">
            <span class="text-base font-medium text-gray-900"> 基本信息 </span>
          </div>
        </div>
        <div class="mt-5 divide-y divide-gray-100 md:col-span-3 md:mt-0">
          <FormKit
            v-model="formState.spec.title"
            type="text"
            name="事件标题"
            validation="required"
            :validation-messages="validationMessages"
            label="事件标题"
          ></FormKit>
          <FormKit
            v-model="formState.spec.description"
            type="textarea"
            name="事件描述"
            validation="required"
            :validation-messages="validationMessages"
            label="事件描述"
            :rows="3"
          ></FormKit>
          <FormKit
            type="datetime-local"
            min="0000-01-01T00:00"
            max="9999-12-31T23:59"
            v-model="eventTime"
            name="timestamp"
            validation="required"
            :validation-messages="validationMessages"
            label="事件时间"
          ></FormKit>
          <FormKit
            :options="timelineTypes"
            label="事件类型"
            v-model="formState.spec.type"
            name="type"
            type="select"
            validation="required"
          ></FormKit>
          <FormKit
            v-model="formState.spec.relatedArticle"
            type="select"
            name="relatedArticle"
            label="关联文章"
            :multiple="false"
            clearable
            searchable
            action="/apis/content.halo.run/v1alpha1/posts"
            :request-option="{
              method: 'GET',
              pageField: 'page',
              sizeField: 'size',
              totalField: 'total',
              itemsField: 'items',
              labelField: 'spec.title',
              valueField: 'status.permalink',
            }"
          ></FormKit>
          <FormKit
            type="attachment"
            v-model="formState.spec.illustrated"
            name="illustrated"
            label="事件图片"
          ></FormKit>
          <FormKit
            type="text"
            v-model="formState.spec.tags"
            name="tags"
            label="标签"
          ></FormKit>
          <!-- <FormKit
            type="checkbox"
            v-model="formState.spec.pinned"
            name="pinned"
            label="置顶"
          ></FormKit> -->
          <!-- <FormKit
            type="checkbox"
            v-model="formState.spec.visible"
            name="visible"
            label="公开可见"
          ></FormKit> -->
        </div>
      </div>
    </FormKit>

    <template #footer>
      <VSpace>
        <VButton type="secondary" @click="onVisibleChange(false)">
          取消
        </VButton>
        <VButton
          :loading="saving"
          type="primary"
          :disabled="!isFormValid"
          @click="handleSaveTimeline"
        >
          确定
        </VButton>
      </VSpace>
    </template>
  </VModal>
</template>

<style scoped lang="scss">
.divide-y {
  margin-bottom: 9px;
  line-height: 1.3;
  padding-bottom: 1rem;
}
</style> 
