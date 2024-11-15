import React from "react";
import { createContext, useContext } from "react";
import type { Coin98Plugin } from "../../api";

// Define the interface for the context
export interface PluginContext {
  name: null | Coin98Plugin["name"];
  image: null | Coin98Plugin["image"];
}

// Initialize context with default values
const Context = createContext<PluginContext>({
  name: null,
  image: null,
});

// Provider for supplying the context
export const PluginContextProvider = Context.Provider;

/**
 * Hook to access the plugin context.
 *
 * @return {PluginContext} Plugin context
 */
export function usePluginContext(): PluginContext {
  return useContext(Context);
}

/**
 * Higher-Order Component (HOC) to inject context into a component.
 *
 * @param mapContextToProps Function that maps context to props and merges with the component's props.
 *
 * @return {React.ComponentType} Enhanced component with context as props.
 */
export const withPluginContext = <T extends object>(
  mapContextToProps: (context: PluginContext, props: T) => T & PluginContext
) => {
  return (OriginalComponent: React.ComponentType<T>) => {
    return (props: T) => (
      <Context.Consumer>
        {(context) => (
          <OriginalComponent
            {...props}
            {...mapContextToProps(context, props)} // Merge context and props into the component
          />
        )}
      </Context.Consumer>
    );
  };
};
