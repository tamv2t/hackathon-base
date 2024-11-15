/**
 * Internal dependencies
 */

import { Hooks, StoreKey } from "../types/hooks.type";
import validateHookName from "../validate/validateHookName";

/**
 * @callback DidHook
 *
 * Returns the number of times an action has been fired.
 *
 * @param {string} hookName The hook name to check.
 *
 * @return {number | undefined} The number of times the hook has run.
 */

/**
 * Returns a function which, when invoked, will return the number of times a
 * hook has been called.
 *
 * @param {import('.').Hooks}    hooks    Hooks instance.
 * @param {import('.').StoreKey} storeKey
 *
 * @return {DidHook} Function that returns a hook's call count.
 */
function createDidHook(hooks: Hooks, storeKey: StoreKey) {
  return function didHook(hookName: string): number | undefined {
    const hooksStore = hooks[storeKey];

    if (!validateHookName(hookName)) {
      return;
    }
    return hooksStore[hookName]?.runs ?? 0;
  };
}

export default createDidHook;
