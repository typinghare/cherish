import { Manager } from '../Manager'
import { Plugin } from './Plugin'
import { Application } from '../Application'

/**
 * Plugin manager.
 */
export class PluginManager extends Manager {
    /**
     * Mapping from plugin classes to plugin instances.
     * @private
     */
    private readonly byClass = new Map<PluginClass, Plugin>()

    /**
     * Mapping from plugin class names to plugin instances.
     * @private
     */
    private readonly byName = new Map<string, Plugin>()

    /**
     * Enabled plugins.
     * @private
     */
    private readonly enabledPlugins = new Set<Plugin>()

    /**
     * Registers a plugin.
     * @param PluginClass The plugin class to register.
     */
    public register(PluginClass: PluginClass): Plugin {
        const plugin = new PluginClass(this.application)
        plugin.initExecutors()

        this.byClass.set(PluginClass, plugin)
        this.byName.set(PluginClass.name, plugin)

        return plugin
    }

    /**
     * Enables a plugin.
     * @param pluginName The name of the plugin to enable.
     * @throws PluginNotFoundException
     */
    public enable(pluginName: string): void {
        const plugin = this.byName.get(pluginName)
        if (plugin === undefined) {
            throw new PluginNotFoundException(pluginName)
        }

        this.enabledPlugins.add(plugin)
    }

    /**
     * Disables a plugin
     * @param pluginName The name of the plugin to disable.
     * @throws PluginNotFoundException
     */
    public disable(pluginName: string): void {
        const plugin = this.byName.get(pluginName)
        if (plugin === undefined) {
            throw new Error()
        }

        this.enabledPlugins.delete(plugin)
    }

    /**
     * Returns all enabled plugins.
     */
    public getEnabledPlugins(): Plugin[] {
        return Array.from(this.enabledPlugins)
    }
}

/**
 * Plugin class.
 */
export type PluginClass = new (application: Application) => Plugin

/**
 * Thrown when trying to enable or disable a plugin by its name.
 */
export class PluginNotFoundException extends Error {
    public constructor(pluginName: string) {
        super(`Plugin not found: ${pluginName}`)
    }
}
