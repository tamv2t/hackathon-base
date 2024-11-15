export type Callback = (...args: any[]) => void;

export interface HookHandler {
  callback: Callback;
  priority: number;
  namespace: string;
}

export interface HookInfo {
  name: string;
  currentIndex: number;
}

export interface HookStoreItem {
  __current: Set<HookInfo>;
  runs: number;
  handlers?: HookHandler[];
  [key: string]: any;
}

export interface Hooks {
  actions: HookStoreItem; // Store for action hooks
  filters: HookStoreItem; // Store for filter hooks

  addAction: AddHook;
  addFilter: AddHook;
  removeAction: (hookName: string, namespace: string) => number;
  removeFilter: (hookName: string, namespace: string) => number;
  hasAction: (hookName: string, namespace?: string) => boolean;
  hasFilter: (hookName: string, namespace?: string) => boolean;
  removeAllActions: (hookName: string) => number;
  removeAllFilters: (hookName: string) => number;
  doAction: (hookName: string, ...args: any[]) => void;
  doActionAsync: (hookName: string, ...args: any[]) => Promise<any>;
  applyFilters: (hookName: string, ...args: any[]) => any;
  applyFiltersAsync: (hookName: string, ...args: any[]) => Promise<any>;
  currentAction: (hookName: string) => string | null;
  currentFilter: (hookName: string) => string | null;
  doingAction: (hookName?: string) => boolean;
  doingFilter: (hookName?: string) => boolean;
  didAction: (hookName: string) => number | undefined;
  didFilter: (hookName: string) => number | undefined;

  [key: string]: HookStoreItem | any;
}

export type AddHook = (
  hookName: string,
  namespace: string,
  callback: Callback,
  priority?: number
) => void;
export type StoreKey = keyof Hooks;
