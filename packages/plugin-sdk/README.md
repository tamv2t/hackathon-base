# Plugin SDK

A flexible plugin system for React applications that enables dynamic plugin registration, action handling, and component rendering.

## Core Components

### base.tsx
The foundation of the plugin system that provides action handling capabilities:
- `ActionContext` - Context for managing plugin actions and filters
- `ActionProvider` - Provider component that implements action management logic
- `useGlobalAction` - Hook to access action context

Key features:
- Add/remove actions and filters
- Execute actions with `do_action`
- Apply filters with `apply_filter`
- Plugin-specific action cleanup

### context.tsx
Manages plugin registration and lifecycle:
- `PluginContext` - Context for plugin management
- `PluginContextProvider` - Provider component for plugin system
- `usePluginHelper` - Hook to access plugin context

Features:
- Plugin registration with duplicate detection
- Plugin unregistration with cleanup
- Plugin bootstrapping with context injection

### utils.tsx
Utility functions and hooks:
- `useRegisterPlugin` - Hook for easy plugin registration

### components/plugin-area/index.tsx
Plugin rendering component:
- `PluginArea` - Renders registered plugins in a grid layout
- Supports custom sizing via grid spans
- Handles plugin component resolution

## Plugin Interface


type Plugin = {
  name: string;
  author: string;
  bootstrap: (ctx: ActionContextType) => void;
};


## Usage


// Import everything
import * from '@repo/plugin-sdk'

// Import specific components
import { PluginArea } from '@repo/plugin-sdk'

<ActionProvider>
  <PluginContextProvider>
    <App />
  </PluginContextProvider>
</ActionProvider>

<PluginArea />

