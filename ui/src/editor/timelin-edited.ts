import {
  type Editor,
  isActive,
  mergeAttributes,
  Node,
  nodeInputRule,
  type Range,
  VueNodeViewRenderer,
  type EditorState, 
  BlockActionSeparator,
} from "@halo-dev/richtext-editor";
import TimelineView from "./TimelineView.vue";
import TimelineToolboxItem from "./TimelineToolboxItem.vue";
import { markRaw } from "vue";
import MdiDeleteForeverOutline from "~icons/mdi/delete-forever-outline?color=red";
import { deleteNode } from "../utils/delete-node";
import TablerClock from '~icons/tabler/clock?width=1.2em&height=1.2em';
import MdiViewAgendaOutline from '~icons/mdi/view-agenda-outline?width=1.2em&height=1.2em';
import MdiViewAgenda from '~icons/mdi/view-agenda?width=1.2em&height=1.2em';
import BubbleItemICardTitle from "@/editor/BubbleItemICardTitle.vue";
import MdiFormatTitle from '~icons/mdi/format-title?width=1.2em&height=1.2em';

declare module "@halo-dev/richtext-editor" {
  interface Commands<ReturnType> {
    "timeline-view": {
      setTimelineView: (options: { groupName?: string; orientation?: 'vertical' | 'horizontal' }) => ReturnType;
    };
  }
}

const TimelineExtension = Node.create({
  name: "timeline-view",
  fakeSelection: true,

  group() {
    return "block";
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      groupName: {
        default: "",
        parseHTML: (element: HTMLElement) => {
          return element.getAttribute("group-name") || "";
        },
        renderHTML: (attributes: { groupName?: string }) => {
          if (!attributes.groupName) {
            return {};
          }
          return {
            "group-name": attributes.groupName,
          };
        },
      },
      orientation: {
        default: "vertical",
        parseHTML: (element: HTMLElement) => {
          return element.getAttribute("orientation") || "vertical";
        },
        renderHTML: (attributes: { orientation?: string }) => {
          return {
            "orientation": attributes.orientation,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "timeline-view",
      },
    ];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
    return ["timeline-view", mergeAttributes(HTMLAttributes)];
  },
  
  addCommands() {
    return {
      setTimelineView:
        (options: { groupName?: string; orientation?: 'vertical' | 'horizontal' }) =>
          ({ commands }: { commands: any }) => {
            return commands.insertContent({
              type: this.name,
              attrs: options,
            });
          },
    };
  },
  
  addInputRules() {
    return [
      nodeInputRule({
        find: /^\$timeline-view\$$/,
        type: this.type,
      }),
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(TimelineView);
  },

  addOptions() {
    return {
      getCommandMenuItems() {
        return {
          priority: 2e2,
          icon: markRaw(TablerClock),
          title: "时间轴",
          keywords: ["timeline", "timeline-view", "时间轴"],
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor
              .chain()
              .focus()
              .setTimelineView({})
              .deleteRange(range)
              .run();
          },
        };
      },
      getToolboxItems({ editor }: { editor: Editor }) {
        return {
          priority: 59,
          component: markRaw(TimelineToolboxItem),
          props: {
            editor,
          },
        };
      },
      getBubbleMenu({ editor }: { editor: Editor }) {
        return {
          pluginKey: "timeline-view-bubble-menu",
          shouldShow: ({ state }: { state: EditorState }) => {
            return isActive(state, TimelineExtension.name);
          },
          items: [
            {
              priority: 45,
              props: {
                title:
                  editor.getAttributes(TimelineExtension.name).orientation === "horizontal"
                    ? "横向布局"
                    : "竖向布局",
                isActive: () => {
                  return editor.getAttributes(TimelineExtension.name).orientation === "horizontal";
                },
                icon: markRaw(
                  editor.getAttributes(TimelineExtension.name).orientation === "horizontal"
                    ? MdiViewAgenda
                    : MdiViewAgendaOutline
                ),
                action: () => {
                  const orientation = editor.getAttributes(TimelineExtension.name).orientation;
                  editor.commands.updateAttributes(TimelineExtension.name, { 
                    orientation: orientation === "horizontal" ? "vertical" : "horizontal" 
                  });
                },
              },
            },
            {
              priority: 46,
              props: {
                icon: markRaw(MdiFormatTitle),
                title: "修改分组名称",
                action: () => {
                  return markRaw(BubbleItemICardTitle);
                },
              },
            },
            {
              priority: 50,
              component: markRaw(BlockActionSeparator),
            },
            {
              priority: 60,
              props: {
                icon: markRaw(MdiDeleteForeverOutline),
                title: "删除",
                action: ({ editor }: { editor: Editor }) => {
                  deleteNode(TimelineExtension.name, editor);
                },
              },
            },
          ],
        };
      },
    }
  }


})

export default TimelineExtension;
