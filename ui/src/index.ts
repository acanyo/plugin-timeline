import { definePlugin } from "@halo-dev/console-shared";
import { defineAsyncComponent, markRaw } from "vue";
import IconParkOutlineTimeline from '~icons/icon-park-outline/timeline'
import "uno.css";
import { VLoading } from "@halo-dev/components";
import '@xhhaocom/timeline-view';
import { TimelineExtension } from "@/editor";

export default definePlugin({
  routes: [
    {
      parentName: "Root",
      route: {
        path: "/timeline",
        name: "Timeline",
        component: defineAsyncComponent({
          loader: () => import("@/views/TimelineList.vue"),
          loadingComponent: VLoading,
        }),
        meta: {
          permissions: ["plugin:timeline:view"],
          menu: {
            name: "时间轴",
            group: "content",
            icon: markRaw(IconParkOutlineTimeline),
          },
        },
      },
    },
  ],
  extensionPoints: {
    "default:editor:extension:create": () => {
      return [TimelineExtension];
    },
  },
});
