import type { ComponentType } from "react";

export type TPluginData = {
  name: string;
  url?: string;
  description?: string;
  image?: string;
  scope?: string;
  render: ComponentType;
};
