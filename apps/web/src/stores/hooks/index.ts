import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useHookableStore = create(persist((_set) => ({
    hooks: [],
    getAvailableHooks: ($view: string) => {
        const views = Array.isArray($view) ? $view : [$view]
    }
}), { name: 'hookable-store' }));