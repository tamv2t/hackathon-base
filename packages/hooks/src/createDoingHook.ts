/**
 * @callback DoingHook
 * Returns whether a hook is currently being executed.
 *
 * @param {string} [hookName] The name of the hook to check for.  If
 *                            omitted, will check for any hook being executed.
 *
 * @return {boolean} Whether the hook is being executed.
 */

import { HookInfo, Hooks, StoreKey } from "../types/hooks.type";

/**
 * Returns a function which, when invoked, will return whether a hook is
 * currently being executed.
 *
 * @param {import('.').Hooks}    hooks    Hooks instance.
 * @param {import('.').StoreKey} storeKey
 *
 * @return {DoingHook} Function that returns whether a hook is currently
 *                     being executed.
 */
function createDoingHook(hooks: Hooks, storeKey: StoreKey) {
  return function doingHook(hookName?: string): boolean {
    const hooksStore = hooks[storeKey];

    // If hookName is not provided, check if there are any currently executing hooks.
    if (typeof hookName === "undefined") {
      return hooksStore.__current.size > 0;
    }
    console.log({
      current: hooksStore.__current,
      hooksStore: hooksStore,
    });

    // Check if the specified `hookName` is currently being executed in `__current`.
    return Array.from(hooksStore.__current).some(
      // @ts-ignore:next-line
      (hook) => hook.name === hookName
    );
  };
}

export default createDoingHook;
