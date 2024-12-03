import { PLUGINS, TPluginData } from "@repo/constants";
import { usePluginStore, useShallow } from "@repo/store";
import { Sortable, SortableItem } from "@repo/ui";
import { closestCorners } from "@dnd-kit/core";
export const DragComponent = () => {
  const plugins = usePluginStore(useShallow((state) => state.plugins));
  const backupPlugins = usePluginStore(
    useShallow((state) => state.backupPlugins)
  );

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
              .split("x")
              .map(Number);
            return {
              gridColumn: `span ${widthRatio}`,
              gridRow: `span ${heightRatio}`,
            };
          })()
        : { display: "none" };
      const PluginComponent = matchingPlugin.plugin;

      return (
        <SortableItem
          key={storePlugin.name}
          value={storePlugin.name}
          asTrigger
          asChild
        >
          <div
            key={storePlugin.name}
            style={positionStyles}
            className="text-nowrap"
          >
            <PluginComponent />
          </div>
        </SortableItem>
      );
    });
  };
  return (
    <div className="grid grid-cols-12 gap-3">
      <Sortable
        orientation="mixed"
        collisionDetection={closestCorners}
        value={plugins}
        onValueChange={backupPlugins}
        overlay={<div className="size-full rounded-md bg-primary/10" />}
      >
        {renderPlugin()}
      </Sortable>
    </div>
  );
};
