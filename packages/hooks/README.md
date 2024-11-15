# Hooks

A lightweight & efficient EventManager for TypeScript.

## Installation

Install the module

```bash
npm install @repo/hooks --save
```


### Usage

In your TypeScript project, use hooks as follows:

```TypeScript
import { createHooks } from '@repo/hooks';

myObject.hooks = createHooks();
myObject.hooks.addAction(); //etc...
```

#### The global instance

In the above example, we are creating a custom instance of the `Hooks` object and registering hooks there. The package also creates a default global instance that's accessible through the `defaultHooks` named exports, and its methods are also separately exported one-by-one.

In the Context, that enables API functions to be called via the global `hooks` object, like `hooks.addAction()`, etc.

One notable difference between the TS and hooks API is that in the TS version, `addAction()` and `addFilter()` also need to include a namespace as the second argument. Namespace uniquely identifies a callback in the form `vendor/plugin/function`.

### API Usage

-   `createHooks()`
-   `addAction( 'hookName', 'namespace', callback, priority )`
-   `addFilter( 'hookName', 'namespace', callback, priority )`
-   `removeAction( 'hookName', 'namespace' )`
-   `removeFilter( 'hookName', 'namespace' )`
-   `removeAllActions( 'hookName' )`
-   `removeAllFilters( 'hookName' )`
-   `doAction( 'hookName', arg1, arg2, moreArgs, finalArg )`
-   `doActionAsync( 'hookName', arg1, arg2, moreArgs, finalArg )`
-   `applyFilters( 'hookName', content, arg1, arg2, moreArgs, finalArg )`
-   `applyFiltersAsync( 'hookName', content, arg1, arg2, moreArgs, finalArg )`
-   `doingAction( 'hookName' )`
-   `doingFilter( 'hookName' )`
-   `didAction( 'hookName' )`
-   `didFilter( 'hookName' )`
-   `hasAction( 'hookName', 'namespace' )`
-   `hasFilter( 'hookName', 'namespace' )`
-   `actions`
-   `filters`
-   `defaultHooks`

### Events on action/filter add or remove

Whenever an action or filter is added or removed, a matching `hookAdded` or `hookRemoved` action is triggered.

-   `hookAdded` action is triggered when `addFilter()` or `addAction()` method is called, passing values for `hookName`, `functionName`, `callback` and `priority`.
-   `hookRemoved` action is triggered when `removeFilter()` or `removeAction()` method is called, passing values for `hookName` and `functionName`.

### The `all` hook

In non-minified builds developers can register a filter or action that will be called on _all_ hooks, for example: `addAction( 'all', 'namespace', callbackFunction );`. Useful for debugging, the code supporting the `all` hook is stripped from the production code for performance reasons.
