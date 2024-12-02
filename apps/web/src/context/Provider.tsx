"use client";
import { HookProvider, PluginContextProvider } from "@repo/plugin-sdk";
import React, { FC, PropsWithChildren } from "react";

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <HookProvider>
      <PluginContextProvider>{children}</PluginContextProvider>
    </HookProvider>
  );
};

export default Provider;
