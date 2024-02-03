import { Configuration, ConfigurationData, ConfigurationStack } from './Configuration'
import { CONF_CONVENTION, CONF_DEFAULT, CONF_LEVEL } from '../Constants'
import { Manager } from '../Manager'
import path from 'node:path'
import * as fs from 'fs'
import { createDir, parseFilepath } from '../Utility'

export class ConfigurationManager extends Manager {
    /**
     * Configuration stack.
     * @private
     */
    private readonly configurationStack = new ConfigurationStack(
        CONF_LEVEL.DEFAULT,
        new Configuration(CONF_DEFAULT)
    )

    /**
     * Returns the configuration stack.
     */
    public getConfigurationStack(): ConfigurationStack {
        return this.configurationStack
    }

    /**
     * Returns current configuration.
     */
    public getCurrent(): Configuration {
        return this.configurationStack.getCurrentConfiguration()
    }

    /**
     * Saves the configuration of a specific level.
     * @param level The level of the configuration to save.
     */
    public save(level: string): void {
        const configuration = this.configurationStack.getConfiguration(level)
        const json: string = JSON.stringify(configuration.getData())

        if (level === CONF_LEVEL.CONVENTION) {
            fs.writeFileSync(parseFilepath(CONF_CONVENTION), json)
        } else if (level === CONF_LEVEL.USER) {
            const userConfigurationFilepath = this.configurationStack
                .getConfiguration(CONF_LEVEL.CONVENTION)
                .getValue('config.user')
            if (userConfigurationFilepath !== undefined) {
                fs.writeFileSync(parseFilepath(userConfigurationFilepath), json)
            } else {
                throw new Error(
                    'Fail to save user level configuration, because you ' +
                        'have yet specify the path of it in the convention.'
                )
            }
        } else {
            throw new Error(`Unknown configuration level: ${level}`)
        }
    }

    public override init(): void {
        // Loads convention configuration; creates one if it does not exist
        this.loadConfiguration(CONF_CONVENTION, CONF_LEVEL.CONVENTION)

        // Loads user config if specified
        const userConfigFilepath = this.getCurrent().getValue('config.user')
        if (userConfigFilepath !== undefined) {
            this.loadConfiguration(userConfigFilepath, CONF_LEVEL.USER)
        }
    }

    /**
     * Reads a config file and loads it. Creates a config file if it does not exist.
     * @param filepath Path to the config file (should be a JSON file).
     * @param level The level of the configuration.
     * @private
     */
    private loadConfiguration(filepath: string, level: string): void {
        filepath = parseFilepath(filepath)

        if (!fs.existsSync(filepath)) {
            createDir(path.dirname(filepath))

            // Create a configuration file
            const configuration = this.getCurrent()
            const content = JSON.stringify(configuration.getData())
            fs.writeFileSync(filepath, content)
        } else {
            const content = fs.readFileSync(filepath).toString('utf-8')
            const config: ConfigurationData = JSON.parse(content)
            const newConfiguration = new Configuration(config)
            this.configurationStack.push(level, newConfiguration)
        }
    }
}
