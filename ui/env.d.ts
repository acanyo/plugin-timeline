/// <reference types="@rsbuild/core/types" />
/// <reference types="unplugin-icons/types/vue" />

export {}

declare module 'axios' {
  export interface AxiosRequestConfig {
    mute?: boolean
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'timeline-view': {
        'group-name'?: string;
        orientation?: 'vertical' | 'horizontal';
      };
    }
  }
}
