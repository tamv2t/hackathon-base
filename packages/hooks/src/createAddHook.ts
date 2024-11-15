/**
 * Internal dependencies
 */
import {
  AddHook,
  Callback,
  HookHandler,
  HookInfo,
  StoreKey,
} from "../types/hooks.type";
import validateHookName from "../validate/validateHookName";
import validateNamespace from "../validate/validateNamespace";

interface HookEntry {
  handlers: HookHandler[];
  runs: number;
}

/**
 * Hooks container for each store, containing hook entries and __current info.
 */
interface HooksContainer {
  [hookName: string]: HookEntry;
  // @ts-ignore:next-line
  __current: HookInfo[];
}

interface Hooks {
  [storeKey: string]: HooksContainer;
  // @ts-ignore:next-line
  doAction: (hookName: string, ...args: any[]) => void;
}

/**
 * @callback AddHook
 *
 * Adds the hook to the appropriate hooks container.
 *
 * @param {string}               hookName      Name of hook to add
 * @param {string}               namespace     The unique namespace identifying the callback in the form `vendor/plugin/function`.
 * @param {import('.').Callback} callback      Function to call when the hook is run
 * @param {number}               [priority=10] Priority of this hook
 */

/**
 * Returns a function which, when invoked, will add a hook.
 *
 * @param {import('.').Hooks}    hooks    Hooks instance.
 * @param {import('.').StoreKey} storeKey
 *
 * @return {AddHook} Function that adds a new hook.
 */

function createAddHook(hooks: Hooks, storeKey: StoreKey): AddHook {
  return function addHook(
    hookName: string,
    namespace: string,
    callback: Callback,
    priority: number = 10
  ) {
    const hooksStore = hooks[storeKey];

    if (!validateHookName(hookName)) {
      return;
    }

    if (!validateNamespace(namespace)) {
      return;
    }

    if (typeof callback !== "function") {
      // eslint-disable-next-line no-console
      console.error("The hook callback must be a function.");
      return;
    }
    // Validate numeric priority
    if (typeof priority !== "number") {
      // eslint-disable-next-line no-console
      console.error("If specified, the hook priority must be a number.");
      return;
    }

    const handler: HookHandler = { callback, priority, namespace };

    if (hooksStore[hookName]) {
      // Find the correct insert index of the new hook.
      const handlers = hooksStore[hookName].handlers;

      /** @type {number} */
      let i: number;
      for (i = handlers.length; i > 0; i--) {
        if (priority >= handlers[i - 1].priority) {
          break;
        }
      }

      if (i === handlers.length) {
        handlers[i] = handler;
      } else {
        handlers.splice(i, 0, handler);
      }
      // We may also be currently executing this hook.  If the callback
      // we're adding would come after the current callback, there's no
      // problem; otherwise we need to increase the execution index of
      // any other runs by 1 to account for the added element.

      hooksStore.__current.forEach((hookInfo) => {
        if (hookInfo.name === hookName && hookInfo.currentIndex >= i) {
          hookInfo.currentIndex++;
        }
      });
    } else {
      // This is the first hook of its type.
      hooksStore[hookName] = {
        handlers: [handler],
        runs: 0,
      };
    }
    if (hookName !== "hookAdded") {
      hooks.doAction("hookAdded", hookName, namespace, callback, priority);
    }
  };
}

export default createAddHook;
