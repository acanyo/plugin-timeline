<script lang="ts" setup>
import type {Timeline} from "@/types";
import {submitForm} from "@formkit/core";
import {axiosInstance} from "@halo-dev/api-client";
import {VAlert, VButton, VModal, VSpace} from "@halo-dev/components";
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
        displayName: "",
        image: "",
        active: false,
        relatedLinks: "",
    },
    kind: "timeline",
    apiVersion: "timeline.xhhao.com/v1alpha1",
} as Timeline;

const formState = ref<Timeline>(cloneDeep(initialFormState));
const customUrl = ref("");
const articleValue = ref<string | undefined>(undefined);
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

    // 处理关联链接：优先使用选择的文章，否则使用自定义URL
    if (articleValue.value) {
        formState.value.spec.relatedLinks = articleValue.value;
    } else if (customUrl.value) {
        formState.value.spec.relatedLinks = customUrl.value;
    } else {
        formState.value.spec.relatedLinks = "";
    }

    try {
        isSubmitting.value = true;
        if (isUpdateMode.value) {
            await axiosInstance.put(
                    `/apis/timeline.xhhao.com/v1alpha1/timelines/${formState.value.metadata.name}`,
                    formState.value
            );
        } else {
            if (props.group) {
                formState.value.spec.groupName = props.group;
            }
            const {data} = await axiosInstance.post(`/apis/timeline.xhhao.com/v1alpha1/timelines`, formState.value);
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
        // 初始化关联文章和自定义URL
        if (props.timeline.spec?.relatedLinks) {
            // 判断是URL还是文章permalink
            if (props.timeline.spec.relatedLinks.startsWith("http://") || props.timeline.spec.relatedLinks.startsWith("https://")) {
                customUrl.value = props.timeline.spec.relatedLinks;
                articleValue.value = undefined;
            } else {
                articleValue.value = props.timeline.spec.relatedLinks;
                customUrl.value = "";
            }
        } else {
            articleValue.value = undefined;
            customUrl.value = "";
        }
    } else {
        articleValue.value = undefined;
        customUrl.value = "";
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
                    <FormKit name="date" label="日期" type="date" help="格式：YYYY-MM-DD" validation="required"></FormKit>
                    <FormKit 
                        name="displayName" 
                        label="内容" 
                        type="textarea" 
                        validation="required"
                        :rows="8"
                        help="支持 Markdown 语法，如 **粗体**、*斜体*、[链接](url)、列表等"
                    ></FormKit>
                    <FormKit name="image" label="图片" type="attachment" :accepts="['image/*']"></FormKit>
                    <FormKit name="active" label="激活状态" type="checkbox" help="用于高亮显示"></FormKit>

                    <!-- 关联信息提示 -->
                    <VAlert
                        type="info"
                        title="关联信息说明"
                        description="请选择关联文章或输入自定义链接地址。文章优先级最高：如果选择了文章，将使用文章链接；否则使用自定义链接地址。"
                    />

                    <FormKit
                        v-model="articleValue"
                        type="select"
                        name="article"
                        label="关联文章"
                        :multiple="false"
                        clearable
                        searchable
                        placeholder="请选择文章（可选）"
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
                        help="如果选择文章，将使用文章链接；否则请在下方输入自定义地址"
                    ></FormKit>

                    <FormKit
                        v-model="customUrl"
                        type="url"
                        name="customUrl"
                        label="自定义URL"
                        placeholder="请输入完整的网址，如：https://example.com"
                        validation="url"
                        :validation-messages="{
                            url: '请输入有效的网址格式'
                        }"
                        help="当未选择关联文章时，将使用此URL"
                    ></FormKit>
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
