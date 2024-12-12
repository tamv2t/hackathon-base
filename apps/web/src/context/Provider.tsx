'use client'
import { HookProvider, PluginContextProvider } from '@repo/plugin-sdk'
import React, { FC, PropsWithChildren } from 'react'
import { AdapterProvider } from '@repo/screens'

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AdapterProvider>
      <HookProvider>
        <PluginContextProvider>{children}</PluginContextProvider>
      </HookProvider>
    </AdapterProvider>
  )
}

export default Provider
