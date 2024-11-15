export enum PluginName {
  FormatNumber = "formatNumber",
  FormatText = "formatText",
  ChangeBackground = "changeBackground",
  ChangeTimezone = "changeTimezone",
}
type TPluginData = {
  id: number;
  name: string;
  url: string;
  description: string;
  function: string;
  image: string;
};
export const PLUGINS: TPluginData[] = [
  {
    id: 1,
    name: "Change Background Color",
    url: "https://snaps.metamask.io/snap/npm/solflare-wallet/solana-snap/",
    function: PluginName.ChangeBackground,
    description: "Change the background color of the page.",
    image: "https://coin98.s3.ap-southeast-1.amazonaws.com/Currency/solana.png",
  },
  {
    id: 2,
    name: "Format Number",
    url: "https://snaps.metamask.io/snap/npm/ethereum-wallet/eth-snap/",
    function: PluginName.FormatNumber,
    description: "Format numbers with thousand separators.",
    image: "https://coin98.s3.amazonaws.com/tALOz1NdPFfxcZjQ",
  },
  {
    id: 3,
    name: "Format Text",
    url: "https://snaps.metamask.io/snap/npm/ethereum-wallet/eth-snap/",
    function: PluginName.FormatText,
    description: "Convert text to uppercase.",
    image: "https://coin98.s3.amazonaws.com/3pLKrnItbE6FNa7J",
  },
  {
    id: 4,
    name: "Change Timezone",
    url: "https://snaps.metamask.io/snap/npm/ethereum-wallet/eth-snap/",
    function: PluginName.ChangeTimezone,
    description: "Display time based on the selected timezone.",
    image:
      "https://coin-images.coingecko.com/coins/images/18834/large/wstETH.png?1696518295",
  },
];
