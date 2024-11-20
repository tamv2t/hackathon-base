/**
 * Internal dependencies
 */
import createAddHook from "./createAddHook";
import createRemoveHook from "./createRemoveHook";
import createHasHook from "./createHasHook";
import createRunHook from "./createRunHook";
import createCurrentHook from "./createCurrentHook";
import createDoingHook from "./createDoingHook";
import createDidHook from "./createDidHook";
import { AddHook, HookInfo, Hooks, HookStoreItem } from "../types/hooks.type";

/**
 * Internal class for constructing hooks. Use `createHooks()` function.
 *
 * Note, it is necessary to expose this class to make its type public.
 *
 * @private
 */
export class _Hooks implements Hooks {
  [key: string]: HookStoreItem | any; // Index signature implementation

  actions: HookStoreItem;
  filters: HookStoreItem;
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

  constructor() {
    // Initialize actions and filters store
    this.actions = {
      __current: new Set<HookInfo>(),
      runs: 0,
    };
    this.filters = {
      __current: new Set<HookInfo>(),
      runs: 0,
    };

    // Hook methods
    this.addAction = createAddHook(this, "actions");
    this.addFilter = createAddHook(this, "filters");
    this.removeAction = createRemoveHook(this, "actions");
    this.removeFilter = createRemoveHook(this, "filters");
    this.hasAction = createHasHook(this, "actions");
    this.hasFilter = createHasHook(this, "filters");
    this.removeAllActions = createRemoveHook(this, "actions", true);
    this.removeAllFilters = createRemoveHook(this, "filters", true);
    this.doAction = createRunHook(this, "actions", true, false);
    this.doActionAsync = createRunHook(this, "actions", false, true);
    this.applyFilters = createRunHook(this, "filters", true, false);
    this.applyFiltersAsync = createRunHook(this, "filters", true, true);
    this.currentAction = createCurrentHook(this, "actions");
    this.currentFilter = createCurrentHook(this, "filters");
    this.doingAction = createDoingHook(this, "actions");
    this.doingFilter = createDoingHook(this, "filters");
    this.didAction = createDidHook(this, "actions");
    this.didFilter = createDidHook(this, "filters");
  }
}

/**
 * Returns an instance of the hooks object.
 *
 * @return {Hooks} A Hooks instance.
 */
function createHooks(): Hooks {
  return new _Hooks() as Hooks;
}

export default createHooks;
