import { SwapForm } from "../../screens/src/components/SwapForm";
import Market from "../../screens/src/components/Market";

import { TPluginData } from "../types/index";
export enum PluginName {
  FormatNumber = "formatNumber",
  FormatText = "formatText",
  ChangeBackground = "changeBackground",
  ChangeTimezone = "changeTimezone",
}

export const PLUGINS: TPluginData[] = [
  {
    name: "swap",
    url: "https://snaps.metamask.io/snap/npm/solflare-wallet/solana-snap/",
    description: "Coin98 Exchange",
    image: "https://coin98.s3.ap-southeast-1.amazonaws.com/Currency/solana.png",
    scope: "home-page",
    render: SwapForm,
  },
  {
    name: "market",
    url: "https://snaps.metamask.io/snap/npm/solflare-wallet/solana-snap/",
    description: "Coin98 Market",
    image: "https://coin98.s3-ap-southeast-1.amazonaws.com/Coin/ethActive2.png",
    scope: "home-page",
    render: Market,
  },
];
