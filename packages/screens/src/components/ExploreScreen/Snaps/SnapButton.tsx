"use client";
import { TPluginData } from "@repo/constants";
import { Button } from "@repo/ui/components/ui/button";
import { toast } from "sonner";
import { usePluginManager } from "@repo/plugins";
const SnapButton = ({ snap, ...props }: { snap: TPluginData }) => {
  const { registerPlugin } = usePluginManager();
  //   const isInstalled = useMemo(
  //     () => !!snapList.find((i: TSnapData) => i.id === snap?.id),
  //     [snapList, snap]
  //   );
  const handleInstallSnap = () => {
    registerPlugin(snap.name, {
      image: snap.image,
      render: snap.render,
      scope: snap.scope,
    });
    toast.success("Add snap successed!");
    console.log(snap);
  };

  return (
    <Button
      className="rounded-xl w-14"
      variant={"outline"}
      size={"sm"}
      {...props}
      onClick={handleInstallSnap}
    >
      {/* {isInstalled ? "Remove" : "Install"} */}
      Install
    </Button>
  );
};

export default SnapButton;
