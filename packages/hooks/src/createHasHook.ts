/**
 * @callback HasHook
 *
 * Returns whether any handlers are attached for the given hookName and optional namespace.
 *
 * @param {string} hookName    The name of the hook to check for.
 * @param {string} [namespace] Optional. The unique namespace identifying the callback
 *                             in the form `vendor/plugin/function`.
 *
 * @return {boolean} Whether there are handlers that are attached to the given hook.
 */

import { HookHandler, Hooks, StoreKey } from "../types/hooks.type";

/**
 * Returns a function which, when invoked, will return whether any handlers are
 * attached to a particular hook.
 *
 * @param {import('.').Hooks}    hooks    Hooks instance.
 * @param {import('.').StoreKey} storeKey
 *
 * @return {HasHook} Function that returns whether any handlers are
 *                   attached to a particular hook and optional namespace.
 */
function createHasHook(hooks: Hooks, storeKey: StoreKey) {
  return function hasHook(hookName: string, namespace?: string): boolean {
    const hooksStore = hooks[storeKey];

    // Use the namespace if provided.
    if (typeof namespace !== "undefined") {
      return (
        hookName in hooksStore &&
        hooksStore[hookName].handlers.some(
          (hook: HookHandler) => hook.namespace === namespace
        )
      );
    }

    return hookName in hooksStore;
  };
}

export default createHasHook;
