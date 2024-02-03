import { Configuration, ConfigurationStack } from './Configuration'
import { Constants } from '../Constants'
import { Manager } from '../Manager'

export class ConfigurationManager extends Manager {
    /**
     * Configuration stack.
     * @private
     */
    private readonly configurationStack = new ConfigurationStack(
        Constants.CONF_LEVEL.DEFAULT,
        new Configuration(Constants.CONF_DEFAULT)
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
    public get(): Configuration {
        return this.configurationStack.getCurrentConfiguration()
    }
}
