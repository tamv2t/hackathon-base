import { TPluginData } from "@repo/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PluginState = {
  pluginList: TPluginData[];
  addPlugin: (item: TPluginData) => void;
  removePlugin: (name: string | number) => void;
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
    }
  )
);

export default usePluginStore;
