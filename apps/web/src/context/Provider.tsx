"use client";
import { ActionProvider, PluginContextProvider } from "@repo/plugin-sdk";
import React, { FC, PropsWithChildren } from "react";

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ActionProvider>
      <PluginContextProvider>{children}</PluginContextProvider>
    </ActionProvider>
  );
};

export default Provider;
