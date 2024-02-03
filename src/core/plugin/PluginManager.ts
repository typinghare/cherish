import { Manager } from '../Manager'
import { Plugin } from './Plugin'
import { Application } from '../Application'

/**
 * Plugin manager.
 */
export class PluginManager extends Manager {
    private readonly byClass = new Map<PluginClass, Plugin>()

    /**
     * Registers a plugin.
     * @param PluginClass The plugin class to register.
     */
    public register(PluginClass: PluginClass): Plugin {
        const plugin = new PluginClass(this.application)
        plugin.initializeExecutors()

        this.byClass.set(PluginClass, plugin)

        return plugin
    }

    /**
     * Returns all plugins.
     */
    public getAllPlugins(): Plugin[] {
        return Array.from(this.byClass.values())
    }
}

/**
 * Plugin class.
 */
export type PluginClass = new (application: Application) => Plugin
