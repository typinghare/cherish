import { EasyApplication } from '@typinghare/easy-app'
import { ConfigurationManager } from './configuration/ConfigurationManager'
import { EntryManager } from './entry/EntryManager'
import { ExecutorManager } from './command/ExecutorManager'
import { PluginManager } from './plugin/PluginManager'
import { IOManager } from './io/IOManager'
import { NetworkManager } from './network/NetworkManager'
import { StringBuffer } from './io/StringBuffer'
import * as net from 'net'
import { DefaultExecutor, ItemExecutor, NewExecutor, ServerExecutor } from './executors'
import * as process from 'process'
import { BasePlugin, ConfigPlugin, TimePlugin } from './plugins'

/**
 * Application.
 */
export class Application extends EasyApplication {
    public constructor() {
        super([
            ConfigurationManager,
            EntryManager,
            ExecutorManager,
            NetworkManager,
            PluginManager,
            IOManager,
        ])
    }

    public override init(): void {
        this.initExecutors()
        this.initPlugins()
        this.initEntries()
    }

    /**
     * Initializes builtin executors.
     */
    private initExecutors(): void {
        const executorManager = this.use(ExecutorManager)
        executorManager.register(new DefaultExecutor())
        executorManager.register(new ServerExecutor())
        executorManager.register(new NewExecutor())
        executorManager.register(new ItemExecutor())
    }

    /**
     * Initializes plugins.
     * @private
     */
    private initPlugins(): void {
        const pluginManager = this.use(PluginManager)

        pluginManager.register(BasePlugin)
        pluginManager.register(TimePlugin)
        pluginManager.register(ConfigPlugin)

        // Enable some plugins
        const plugins: string[] = this.use(ConfigurationManager)
            .getCurrent()
            .getValue('plugin.list')
        for (const plugin of plugins) {
            pluginManager.enable(plugin)
        }
    }

    /**
     * Initializes entries.
     * @private
     */
    private initEntries(): void {
        this.use(EntryManager).loadFromDatabase()
    }

    /**
     * Executes a command line.
     * @param commandLineArgs Command line arguments.
     */
    public execute(commandLineArgs: string[]): void {
        const networkManager = this.use(NetworkManager)
        const executeWithServer = (): void => {
            const onConnected = (client: net.Socket): void => {
                client.write(JSON.stringify(commandLineArgs))
            }
            const onReceiveData = (client: net.Socket, data: Buffer): void => {
                client.end()
                process.stdout.write(data.toString('utf-8'))
            }
            networkManager.communicate(onConnected, onReceiveData)
        }
        const executeNatively = (): void => {
            const stringBuffer = this.executeNatively(commandLineArgs)
            if (stringBuffer !== undefined) {
                process.stdout.write(stringBuffer.toString())
            }

            // Close the application
            this.close()
        }

        void networkManager.checkServer().then(executeWithServer).catch(executeNatively)
    }

    /**
     * Executes a command natively.
     * @param commandLineArgs Command line arguments.
     */
    public executeNatively(commandLineArgs: string[]): StringBuffer | undefined {
        return this.use(ExecutorManager).execute(commandLineArgs)
    }

    /**
     * Close the application.
     */
    public close(): void {
        this.use(EntryManager).persist()
    }
}
