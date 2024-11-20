/* eslint no-console: [ 'error', { allow: [ 'error' ] } ] */
import type { ComponentType } from "react";
import { applyFilters, doAction } from "@repo/hooks";
import { PLUGINS } from "@repo/constants";

/**
 * Defined behavior of a plugin type.
 */
export interface Coin98Plugin {
  /**
   * A string identifying the plugin. Must be unique across all registered plugins.
   */
  name: string;

  /**
   Image plugin
   */
  image?: string;

  /**
   * A component containing the UI elements to be rendered.
   */
  render: ComponentType;

  /**
   * The optional scope to be used when rendering inside a plugin area.
   * No scope by default.
   */
  scope?: string;
}

type PluginSettings = Omit<Coin98Plugin, "name">;

/**
 * Plugin definitions keyed by plugin name.
 */
const plugins = {} as Record<string, Coin98Plugin>;

/**
 * Registers a plugin to the editor.
 *
 * @param name     A string identifying the plugin. Must be
 *                 unique across all registered plugins.
 * @param settings The settings for this plugin.
 */
export function registerPlugin(
  name: string,
  settings: PluginSettings
): PluginSettings | null {
  if (typeof settings !== "object") {
    console.error("No settings object provided!");
    return null;
  }
  if (typeof name !== "string") {
    console.error("Plugin name must be string.");
    return null;
  }
  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    console.error(
      'Plugin name must include only lowercase alphanumeric characters or dashes, and start with a letter. Example: "my-plugin".'
    );
    return null;
  }
  if (plugins[name]) {
    console.error(`Plugin "${name}" is already registered.`);
  }

  settings = applyFilters(
    "plugins.registerPlugin",
    settings,
    name
  ) as PluginSettings;

  const { render, scope } = settings;

  if (typeof render !== "function") {
    console.error(
      'The "render" property must be specified and must be a valid function.'
    );
    return null;
  }

  if (scope) {
    if (typeof scope !== "string") {
      console.error("Plugin scope must be string.");
      return null;
    }

    if (!/^[a-z][a-z0-9-]*$/.test(scope)) {
      console.error(
        'Plugin scope must include only lowercase alphanumeric characters or dashes, and start with a letter. Example: "my-page".'
      );
      return null;
    }
  }
  const pluginData = PLUGINS.find((plugin) => plugin.name === name);
  plugins[name] = {
    name,
    image: pluginData?.image ?? "",
    ...settings,
  };

  doAction("plugins.pluginRegistered", settings, name);
  // addPlugin();
  return settings;
}

/**
 * Unregisters a plugin by name.
 */
export function unregisterPlugin(name: string): Coin98Plugin | undefined {
  if (!plugins[name]) {
    console.error('Plugin "' + name + '" is not registered.');
    return;
  }
  const oldPlugin = plugins[name];
  delete plugins[name];

  doAction("plugins.pluginUnregistered", oldPlugin, name);

  return oldPlugin;
}

/**
 * Returns a registered plugin settings.
 *
 * @param name Plugin name.
 *
 * @return Plugin setting.
 */
export function getPlugin(name: string): Coin98Plugin | undefined {
  return plugins[name];
}

/**
 * Returns all registered plugins without a scope or for a given scope.
 *
 * @param scope The scope to be used when rendering inside
 *              a plugin area. No scope by default.
 *
 * @return The list of plugins without a scope or for a given scope.
 */
export function getPlugins(scope?: string): Coin98Plugin[] {
  return Object.values(plugins).filter((plugin) => plugin.scope === scope);
}
