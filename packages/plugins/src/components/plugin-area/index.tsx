import memoize from "memize";
import { PluginContextProvider } from "../plugin-context";
import { PluginErrorBoundary } from "../plugin-error-boundary";
import { Coin98Plugin, getPlugins } from "../../api";
import type { PluginContext } from "../plugin-context";
import { useMemo, useSyncExternalStore } from "react";
import { addAction, removeAction } from "@repo/hooks";
import { shallowEqual } from "shallow-equal";
import React from "react";

const getPluginContext = memoize(
  (image: PluginContext["image"], name: PluginContext["name"]) => ({
    image,
    name,
  })
);

function PluginArea({
  scope,
  onError,
}: {
  scope?: string;
  onError?: (name: Coin98Plugin["name"], error: Error) => void;
}) {
  const store = useMemo(() => {
    let lastValue: Coin98Plugin[] = [];

    return {
      subscribe(
        listener: (
          plugin: Omit<Coin98Plugin, "name">,
          name: Coin98Plugin["name"]
        ) => void
      ) {
        addAction(
          "plugins.pluginRegistered",
          "core/plugins/plugin-area/plugins-registered",
          listener
        );
        addAction(
          "plugins.pluginUnregistered",
          "core/plugins/plugin-area/plugins-unregistered",
          listener
        );
        return () => {
          removeAction(
            "plugins.pluginRegistered",
            "core/plugins/plugin-area/plugins-registered"
          );
          removeAction(
            "plugins.pluginUnregistered",
            "core/plugins/plugin-area/plugins-unregistered"
          );
        };
      },
      getValue() {
        const nextValue = getPlugins(scope);

        if (!shallowEqual(lastValue, nextValue)) {
          lastValue = nextValue;
        }

        return lastValue;
      },
    };
  }, [scope]);

  const plugins = useSyncExternalStore(
    store.subscribe,
    store.getValue,
    store.getValue
  );

  return (
    <div style={{ display: "none" }}>
      {plugins.map(({ image, name, render: Plugin }) => (
        <PluginContextProvider key={name} value={getPluginContext(image, name)}>
          <PluginErrorBoundary name={name} onError={onError}>
            <Plugin />
          </PluginErrorBoundary>
        </PluginContextProvider>
      ))}
    </div>
  );
}

export default PluginArea;
