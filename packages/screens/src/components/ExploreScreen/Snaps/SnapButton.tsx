"use client";
import { TPluginData } from "@repo/constants";
import { Button } from "@repo/ui/components/ui/button";
import { toast } from "sonner";
import { usePluginManager } from "@repo/plugins";
import { useMemo } from "react";
import { usePluginStore, useShallow } from "@repo/store";
const SnapButton = ({ snap, ...props }: { snap: TPluginData }) => {
  const { registerPlugin, unregisterPlugin } = usePluginManager();
  const pluginList = usePluginStore(useShallow((state) => state.pluginList));

  const isInstalled = useMemo(
    () => !!pluginList.find((i: TPluginData) => i.name === snap?.name),
    [pluginList, snap]
  );
  const handleInstallSnap = () => {
    if (isInstalled) {
      unregisterPlugin(snap.name);
      toast.success("Remove snap successed!");
    } else {
      registerPlugin(snap.name, {
        image: snap.image,
        render: snap.render,
        scope: snap.scope,
      });
      toast.success("Add snap successed!");
    }
  };

  return (
    <Button
      className="rounded-xl w-14"
      variant={"outline"}
      size={"sm"}
      {...props}
      onClick={handleInstallSnap}
    >
      {isInstalled ? "Remove" : "Install"}
    </Button>
  );
};

export default SnapButton;
