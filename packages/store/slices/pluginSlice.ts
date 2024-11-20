"use client";
import { PLUGINS, TPluginData } from "@repo/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PluginState = {
  pluginList: TPluginData[];
  addPlugin: (item: TPluginData) => void;
  removePlugin: (name: string) => void;
  reset: () => void;
};

const usePluginStore = create<PluginState>()(
  persist(
    (set) => ({
      pluginList: [],

      addPlugin: (item) =>
        set((state) => ({
          pluginList: [
            ...state.pluginList.filter((i) => i.name !== item.name),
            item,
          ],
        })),

      removePlugin: (name) =>
        set((state) => ({
          pluginList: state.pluginList.filter((i) => i.name !== name),
        })),

      reset: () =>
        set(() => ({
          pluginList: [],
        })),
    }),
    {
      name: "plugin-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.pluginList = state.pluginList.map((plugin) => {
            const originalPlugin = PLUGINS.find((p) => p.name === plugin.name);
            return {
              ...plugin,
              render: originalPlugin?.render || (() => null),
            };
          });
        }
      },
    }
  )
);

export default usePluginStore;
