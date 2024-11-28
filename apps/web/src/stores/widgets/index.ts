import { create } from "zustand";
import { persist } from "zustand/middleware";


export const defaultWidgets = []

export const useWidgetStore = create(persist((_set) => ({
    widgets: defaultWidgets,
}), { name: "widget-store" }));