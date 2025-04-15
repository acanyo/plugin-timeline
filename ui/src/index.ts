import { definePlugin } from "@halo-dev/console-shared";
import TimelineView from "./views/Timeline.vue";
import { markRaw } from "vue";
import MingcuteTimeLine from '~icons/mingcute/time-line?width=1.2em&height=1.2em';

export default definePlugin({
  components: {},
  routes: [
    {
      parentName: "ToolsRoot",
      route: {
        path: "/timeline",
        name: "Timeline",
        component: TimelineView,
        meta: {
          title: "时间线",
          searchable: true,
          menu: {
            name: "时间线",
            icon: markRaw(MingcuteTimeLine),
            priority: 0,
          },
        },
      },
    },
  ],
  extensionPoints: {},
});
