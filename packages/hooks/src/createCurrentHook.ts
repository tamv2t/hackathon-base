import { HookInfo, Hooks, StoreKey } from "../types/hooks.type";

/**
 * Returns a function which, when invoked, will return the name of the
 * currently running hook, or `null` if no hook of the given type is currently
 * running.
 *
 * @param {Hooks}    hooks    Hooks instance.
 * @param {StoreKey} storeKey
 *
 * @return {() => string | null} Function that returns the current hook name or null.
 */
function createCurrentHook(
  hooks: Hooks,
  storeKey: StoreKey
): () => string | null {
  return function currentHook(): string | null {
    const hooksStore = hooks[storeKey];
    const currentArray = Array.from(hooksStore.__current as Set<HookInfo>);
    return currentArray.at(-1)?.name ?? null;
  };
}

export default createCurrentHook;
