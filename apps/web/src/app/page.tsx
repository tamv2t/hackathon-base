"use client";
import { HomeScreen } from "@repo/screens/src/index";
import dynamic from "next/dynamic";

const PluginAreaDynamic = dynamic(
  async () => (await import("@repo/plugins")).PluginArea,
  {
    ssr: false,
    loading: () => <div>Loading PluginArea...</div>,
  }
);

export default function Page(): JSX.Element {
  function onPluginAreaError(name: string) {
    console.error(
      'The "%s" plugin has encountered an error and cannot be rendered.',
      name
    );
  }
  return (
    <div>
      <HomeScreen />
      <PluginAreaDynamic scope="home-page" onError={onPluginAreaError} />
    </div>
  );
}
