"use client";

import { Separator } from "@repo/ui/components/ui/separator";
import Link from "next/link";
import Hero from "./Hero";
import { usePluginStore } from "@repo/store";
import { PLUGINS } from "@repo/constants";
import { useGlobalAction } from "@repo/plugin-sdk";
const HomeScreen = () => {
  const { plugins } = usePluginStore();
  const { remove_all_action } = useGlobalAction();

  const renderPlugin = () => {
    return plugins.map((storePlugin) => {
      const matchingPlugin = PLUGINS.find(
        (plugin) => plugin.name === storePlugin.name
      );

      if (!matchingPlugin || !matchingPlugin.plugin) {
        return null;
      }

      let positionStyles = {};
      if (matchingPlugin.size) {
        const [widthRatio, heightRatio] = matchingPlugin.size
          .split("x")
          .map(Number);
        positionStyles = {
          gridColumn: `span ${widthRatio}`,
          gridRow: `span ${heightRatio}`,
        };
      }

      const PluginComponent = matchingPlugin.plugin;

      return (
        <div key={storePlugin.name} style={positionStyles}>
          <PluginComponent />
        </div>
      );
    });
  };
  return (
    <section className="flex flex-col gap-y-8 ">
      <Hero />
      <Separator />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Installed</h2>
        <Link
          href={"/explore"}
          className="text-textLink hover:underline hover:decoration-2"
        >
          Explore All Snaps
        </Link>
      </div>
      <div className="grid grid-cols-12 gap-3">{renderPlugin()}</div>
    </section>
  );
};

export default HomeScreen;
