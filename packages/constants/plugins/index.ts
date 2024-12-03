import { PluginA } from "@test/pluga";
import { PluginB } from "@test/plugb";
import { PluginFeature } from "@test/plug_feature";
import { TPluginData } from "../types";

export const PLUGINS: TPluginData[] = [
  {
    id: "PluginA",
    name: "PluginA",
    url: "https://snaps.metamask.io/snap/npm/solflare-wallet/solana-snap/",
    description: "Coin98 Swap",
    image: "https://coin98.s3.ap-southeast-1.amazonaws.com/Currency/solana.png",
    position: 1,
    size: "4x6",
    plugin: PluginA,
    status: "active",
  },
  {
    id: "PluginB",
    name: "PluginB",
    url: "https://snaps.metamask.io/snap/npm/solflare-wallet/solana-snap/",
    description: "Coin98 Market",
    image: "https://coin98.s3-ap-southeast-1.amazonaws.com/Coin/ethActive2.png",
    position: 2,
    size: "8x2",
    plugin: PluginB,
    status: "active",
  },
  {
    id: "Plug Feature",
    name: "Plug Feature",
    url: "https://snaps.metamask.io/snap/npm/solflare-wallet/solana-snap/",
    description: "Format input, add more tokens,infor and content card",
    image: "https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/BNBVer2.png",
    plugin: PluginFeature,
    status: "active",
  },
];
