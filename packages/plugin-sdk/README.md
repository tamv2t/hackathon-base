# Plugin SDK Documentation

A flexible plugin system for React applications that provides hook-based extensibility and plugin management.

## Core Components

### Plugin Area (plugin-area/index.tsx)
- Renders a grid layout of registered plugins
- Supports drag-and-drop reordering using @dnd-kit
- Handles dynamic plugin sizing through configurable grid spans
- Integrates with plugin store for state management
- The PluginArea component supports a grid-based layout system where plugins can specify their size using the format "widthxheight":
const PLUGINS = [
  {
    name: 'large-plugin',
    plugin: LargePluginComponent,
    size: '6x2' // Takes 6 columns width, 2 rows height
  },
  {
    name: 'small-plugin',
    plugin: SmallPluginComponent,
    size: '3x1' // Takes 3 columns width, 1 row height
  }
];

### Plugin Context (context/pluginContext.tsx)
- Manages plugin registration and lifecycle
- Provides context for plugin operations:
  - register: Add new plugins
  - unRegister: Remove plugins
  - plugins: Access registered plugins
- Handles plugin bootstrapping with context injection

### Hook System (context/base.tsx)
- Implements WordPress-style hooks system
- Supports both actions and filters
- Key features:
  - add_hook: Register new hooks with priority
  - remove_action/filter: Remove specific hooks
  - do_action: Execute action hooks
  - apply_filter: Process filter hooks
  - remove_all_hook: Clean up plugin hooks
### Actions
```typescript
// Register an action
ctx.add_hook('hookName', callback, 'action', 'pluginName', priority);

// Execute an action
ctx.do_action('hookName', ...args);

// Check if action exists
ctx.has_action('hookName');

// Remove an action
ctx.remove_action('hookName');
// Register a filter
ctx.add_hook('hookName', callback, 'filter', 'pluginName', priority);

// Apply filters
ctx.apply_filter('hookName', ...args);

// Check if filter exists
ctx.has_filter('hookName');

// Remove a filter
ctx.remove_filter('hookName');

### Plugin Registration (utils/index.ts)
- Provides useRegisterPlugin hook for easy plugin registration
- Handles automatic plugin registration on component mount

### Hook Name Validation (validate/validateHookName.ts)
- Ensures hook names follow naming conventions:
  - Must be non-empty strings
  - Cannot start with '__'
  - Only allows letters, numbers, dashes, periods, underscores
  - Must start with a letter

## Usage Example

```typescript
// Register a new plugin
const MyPlugin = {
  name: 'my-plugin',
  author: 'Developer Name',
  bootstrap: (ctx) => {
    ctx.add_hook('init', () => {
      console.log('Plugin initialized');
    }, 'action', 'my-plugin');
  }
};

// Use in component
const MyComponent = () => {
  useRegisterPlugin(MyPlugin);
  return <div>Plugin Content</div>;
};
