import { definePlugin } from "@halo-dev/console-shared";
import { defineAsyncComponent, markRaw } from "vue";
import TablerClock from '~icons/tabler/clock'
import "uno.css";
import { VLoading } from "@halo-dev/components";

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
            icon: markRaw(TablerClock),
          },
        },
      },
    },
  ],
});
