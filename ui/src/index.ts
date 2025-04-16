import {definePlugin} from "@halo-dev/console-shared";
import TimelineView from "./views/Timeline.vue";
import {markRaw} from "vue";
import IconParkTimeline from '~icons/icons8/timeline';

export default definePlugin({
  components: {},
  routes: [
    {
      parentName: "ToolsRoot",
      route: {
        path: "/timeline",
        name: "TimelineRoot",
        meta: {
          title: "时间线",
          searchable: true,
          permissions: ["plugin:timeline:view"],
          menu: {
            name: "时间线",
            group: "content",
            icon: markRaw(IconParkTimeline),
            priority: 20,
          },
        },
        children: [
          {
            path: "",
            name: "Timeline",
            component: TimelineView,
            meta: {
              title: "时间线",
              searchable: true,
              permissions: ["plugin:timeline:view"],
            },
          }
        ]
      },
    },
  ],
  extensionPoints: {},
});

