<script lang="ts" setup>
import type {Timeline} from "@/types";
import {submitForm} from "@formkit/core";
import {axiosInstance} from "@halo-dev/api-client";
import {Toast, VButton, VLoading, VModal, VSpace} from "@halo-dev/components";
import {useMagicKeys} from "@vueuse/core";
import {cloneDeep} from "lodash-es";
import {computed, nextTick, onMounted, ref, useTemplateRef, watch} from "vue";

const props = withDefaults(
        defineProps<{
            timeline?: Timeline;
            group?: string;
        }>(),
        {
            timeline: undefined,
            group: undefined,
        }
);

const emit = defineEmits<{
    (event: "close"): void;
    (event: "saved", timeline: Timeline): void;
}>();

const initialFormState: Timeline = {
    metadata: {
        name: "",
        generateName: "timeline-",
    },
    spec: {
        groupName: props.group || "",
        date: "",
        description: "",
        image: "",
        active: false,
        postName: "",
    },
    kind: "timeline",
    apiVersion: "timeline.xhhao.com/v1alpha1",
} as Timeline;

const formState = ref<Timeline>(cloneDeep(initialFormState));
const isSubmitting = ref(false);
const modal = useTemplateRef<InstanceType<typeof VModal> | null>("modal");

const isUpdateMode = computed(() => {
    return !!formState.value.metadata.creationTimestamp;
});
const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
const modalTitle = computed(() => {
    return isUpdateMode.value ? "编辑时间轴" : "添加时间轴";
});
const annotationsFormRef = ref();

const handleCreateOrUpdateTimeline = async () => {
    annotationsFormRef.value?.handleSubmit();
    await nextTick();
    const {customAnnotations, annotations, customFormInvalid, specFormInvalid} = annotationsFormRef.value || {};
    if (customFormInvalid || specFormInvalid) {
        return;
    }
    formState.value.metadata.annotations = {
        ...annotations,
        ...customAnnotations,
    };
    try {
        isSubmitting.value = true;
        if (isUpdateMode.value) {
            await axiosInstance.put(
                    `/apis/api.timeline.xhhao.com/v1alpha1/timelines/${formState.value.metadata.name}`,
                    formState.value
            );
        } else {
            if (props.group) {
                formState.value.spec.groupName = props.group;
            }
            const {data} = await axiosInstance.post(`/apis/api.timeline.xhhao.com/v1alpha1/timelines`, formState.value);
            emit("saved", data as Timeline);
        }
        modal.value?.close();
    } catch (e) {
        console.error(e);
    } finally {
        isSubmitting.value = false;
    }
};

onMounted(() => {
    if (props.timeline) {
        formState.value = cloneDeep(props.timeline);
    }
});

const {ControlLeft_Enter, Meta_Enter} = useMagicKeys();

watch(ControlLeft_Enter, (v) => {
    if (v && !isMac) {
        submitForm("timeline-form");
    }
});

watch(Meta_Enter, (v) => {
    if (v && isMac) {
        submitForm("timeline-form");
    }
});
</script>

<template>
    <VModal ref="modal" :width="650" :title="modalTitle" @close="emit('close')">
        <template #actions>
            <slot name="append-actions"/>
        </template>

        <FormKit
                id="timeline-form"
                v-model="formState.spec"
                name="timeline-form"
                :config="{ validationVisibility: 'submit' }"
                type="form"
                @submit="handleCreateOrUpdateTimeline"
        >
            <div class=":uno: md:grid md:grid-cols-4 md:gap-6">
                <div class=":uno: md:col-span-1">
                    <div class=":uno: sticky top-0">
                        <span class=":uno: text-base text-gray-900 font-medium"> 常规 </span>
                    </div>
                </div>
                <div class=":uno: mt-5 md:col-span-3 md:mt-0 divide-y divide-gray-100">
                    <FormKit name="date" label="日期" type="date" help="格式：YYYY-MM-DD"></FormKit>
                    <FormKit name="description" label="描述" type="textarea"></FormKit>
                    <FormKit name="image" label="图片" type="attachment" :accepts="['image/*']"></FormKit>
                    <FormKit name="active" label="激活状态" type="checkbox" help="用于高亮显示"></FormKit>
                    <FormKit name="postName" label="关联文章名称" type="text" help="可选，用于关联 Halo 文章"></FormKit>
                </div>
            </div>
        </FormKit>
        <div class=":uno: py-5">
            <div class=":uno: border-t border-gray-200"></div>
        </div>
        <div class=":uno: md:grid md:grid-cols-4 md:gap-6">
            <div class=":uno: md:col-span-1">
                <div class=":uno: sticky top-0">
                    <span class=":uno: text-base text-gray-900 font-medium"> 元数据 </span>
                </div>
            </div>
            <div class=":uno: mt-5 md:col-span-3 md:mt-0 divide-y divide-gray-100">
                <AnnotationsForm
                        :key="formState.metadata.name"
                        ref="annotationsFormRef"
                        :value="formState.metadata.annotations"
                        kind="timeline"
                        group="timeline.xhhao.com"
                />
            </div>
        </div>
        <template #footer>
            <VSpace>
                <!-- @vue-ignore -->
                <VButton :loading="isSubmitting" type="secondary" @click="$formkit.submit('timeline-form')"> 保存</VButton>
                <VButton @click="modal?.close()">取消</VButton>
            </VSpace>
        </template>
    </VModal>
</template>
