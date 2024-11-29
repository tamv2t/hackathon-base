import { PLUGINS, TPluginData } from '@repo/constants';
import { usePluginStore } from '@repo/store';
import React from 'react';
export const PluginArea = () => {
  const { plugins } = usePluginStore();

  const renderPlugin = () => {
    return plugins.map((storePlugin: TPluginData) => {
      const matchingPlugin = PLUGINS.find(
        (plugin) => plugin.name === storePlugin.name
      );

      if (!matchingPlugin || !matchingPlugin.plugin) {
        return null;
      }
      const positionStyles = matchingPlugin.size
        ? (() => {
            const [widthRatio, heightRatio] = matchingPlugin.size
              .split('x')
              .map(Number);
            return {
              gridColumn: `span ${widthRatio}`,
              gridRow: `span ${heightRatio}`,
            };
          })()
        : { display: 'none' };
      const PluginComponent = matchingPlugin.plugin;

      return (
        <div
          key={storePlugin.name}
          style={positionStyles}
          className="text-nowrap"
        >
          <PluginComponent />
        </div>
      );
    });
  };
  return <div className="grid grid-cols-12 gap-3">{renderPlugin()}</div>;
};
