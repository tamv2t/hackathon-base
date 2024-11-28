'use client';
import React, { createContext, useState } from 'react';
import { ActionContextType, useGlobalAction } from './base';
export type Plugin = {
  name: string;
  author: string;
  bootstrap: (_ctx: ActionContextType) => void;
};
export type PluginContextValue = {
  // define the properties of PluginContextValue here
  register: (params: Plugin) => void;
  plugins: Plugin[];
};

export const PluginContext = createContext<PluginContextValue>(
  {} as PluginContextValue
);

export const PluginContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const _ctx = useGlobalAction();

  const register = (params: Plugin) => {
    // Check for duplicate plugins
    if (plugins.some((plugin) => plugin.name === params.name)) {
      console.warn(`Plugin "${params.name}" is already registered.`);
      return;
    }
    setPlugins((prevPlugins) => {
      const updatedPlugins = [...prevPlugins, params];
      return updatedPlugins;
    });
    if (params.bootstrap) {
      params.bootstrap(_ctx); // Boot plugin with context
    }
  };

  return (
    <PluginContext.Provider
      value={{
        register,
        plugins,
      }}
    >
      {children}
    </PluginContext.Provider>
  );
};

export const usePluginHelper = () => React.useContext(PluginContext);
