"use client";
import {
  addFilter,
  applyFilters,
  currentFilter,
  didFilter,
  doingFilter,
  filters,
  hasFilter,
  removeFilter,
} from "@repo/hooks";
import { PluginArea } from "@repo/plugins";
import { unregisterPlugin } from "@repo/plugins/src/api";
import { HomeScreen } from "@repo/screens/src/index";
import { useState } from "react";
import { formatNumber } from "../utils/formatNumberPlugin";

export default function Page(): JSX.Element {
  const [formattedNumber, setFormattedNumber] = useState<string | null>(null);

  const uninstallPlugin = () => {
    unregisterPlugin("plugin-bg");
  };
  const number = 12398123.122;
  addFilter("format_number", "plugin-format-number", formatNumber);

  const hanldeFilterNumber = () => {
    const result = applyFilters("format_number", number);
    setFormattedNumber(result);
    console.log(result);
  };

  const hanldeRemoveFilter = () => {
    removeFilter("format_number", "plugin-format-number");
    const result = applyFilters("format_number", number);
    setFormattedNumber(result);
    console.log("Formatted number after removal:", result);
  };

  const checkStatusFilter = () => {
    console.log({
      hasFilter: hasFilter("format_number", "plugin-format-number"),
      filters,
      doingFilter: doingFilter("format_number"),
      didFilter: didFilter("format_number"),
      currentFilter: currentFilter("format_number"),
    });
  };
  function onPluginAreaError(name: string) {
    console.error(
      'The "%s" plugin has encountered an error and cannot be rendered.',
      name
    );
  }
  return (
    <div>
      <HomeScreen />
      <PluginArea scope="home-page" onError={onPluginAreaError} />
    </div>
  );
}
