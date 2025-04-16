import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { PluginKey } from "@tiptap/pm/state";
import TimelineView from "./TimelineView.vue";
import type { Editor } from "@halo-dev/richtext-editor";
import { ToolboxItem } from "@halo-dev/richtext-editor";
import { markRaw } from "vue";
import { IconTimerLine } from "@halo-dev/components";
import type { NodeConfig } from "@tiptap/core";
import IconParkTimeline from '~icons/icons8/timeline';
const BubbleItemTimelineEdit = {
  name: "BubbleItemTimelineEdit",
  template: `<div>编辑时间轴</div>`
};

declare global {
  namespace TipTap {
    interface Commands<ReturnType> {
      timeline: {
        setTimeline: (options: { type?: string; theme?: string }) => ReturnType;
      };
    }
  }
}

export type TimelineOptions = NodeConfig & {
  HTMLAttributes?: Record<string, any>;
}

export const TimelinePluginKey = new PluginKey("timeline");

export const Timeline = Node.create<TimelineOptions>({
  name: "timeline",
  group: "block",
  atom: true,
  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      getToolboxItems({ editor }: { editor: Editor }) {
        return {
          priority: 15,
          component: markRaw(ToolboxItem),
          props: {
            editor,
            icon: markRaw(IconParkTimeline),
            title: "插入时间轴",
            description: "插入一个时间轴组件",
            action: () => {
              editor.chain().focus().setTimeline({
                title: "新建时间轴",
                description: "请点击编辑时间轴内容"
              }).run();
            },
          },
        };
      },
      // 添加悬浮菜单
      getBubbleMenu({ editor }: { editor: any }) {
        return {
          pluginKey: TimelinePluginKey,
          shouldShow: () => {
            return editor.isActive("timeline");
          },
          items: [
            {
              priority: 10,
              props: {
                isActive: () => true,
                icon: markRaw(IconParkTimeline),
                title: "编辑时间轴",
                action: () => {
                  return markRaw(BubbleItemTimelineEdit);
                },
              },
            },
          ],
        };
      },
    };
  },

  addAttributes() {
    return {
      title: {
        default: "",
      },
      description: {
        default: "",
      },
      type: {
        default: "blog",
      },
      theme: {
        default: "light",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-type='timeline']",
      },
    ];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "timeline" }),
      0,
    ];
  },

  addCommands() {
    return {
      setTimeline:
        (options: Record<string, any> = {}) =>
        ({ commands }: { commands: { insertContent: (content: any) => boolean } }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(TimelineView);
  },
}); 