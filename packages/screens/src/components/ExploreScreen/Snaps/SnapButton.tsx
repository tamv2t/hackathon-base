"use client";
import { TPluginData } from "@repo/constants";
import { Button } from "@repo/ui/components/ui/button";
import { usePluginStore } from "@repo/store";
import { toast } from "sonner";
import { useMemo } from "react";
const SnapButton = ({ snap, ...props }: { snap: TPluginData }) => {
  const { plugins, addPlugin, removePlugin } = usePluginStore();

  const isInstalled = useMemo(
    () => !!plugins.find((i: TPluginData) => i.name === snap?.name),
    [plugins, snap]
  );
  const handleInstallSnap = () => {
    if (isInstalled) {
      removePlugin(snap.name);
      toast.success("Remove snap successed!");
    } else {
      addPlugin(snap);
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
