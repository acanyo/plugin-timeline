declare module "@halo-dev/richtext-editor" {
  export interface Editor {
    isActive: (name: string) => boolean;
    chain: () => any;
    focus: () => any;
    run: () => void;
  }
  export class ToolboxItem {
    constructor(props: any);
  }
}

declare module "@tiptap/pm/state" {
  export class PluginKey {
    constructor(name: string);
  }
}

declare module "@tiptap/core" {
  export function mergeAttributes(...attrs: any[]): any;
  export interface NodeConfig {
    name: string;
    group?: string;
    atom?: boolean;
    addOptions?: () => any;
    addAttributes?: () => any;
    parseHTML?: () => any;
    renderHTML?: (props: any) => any;
    addCommands?: () => any;
    addNodeView?: () => any;
  }
  export class Node {
    static create<T extends NodeConfig>(options: T): any;
  }
}

declare module "@tiptap/vue-3" {
  export function VueNodeViewRenderer(component: any): any;
} 