import { Executor } from '../../command/Executor'
import { CommandLineTemplate } from '../../command/CommandLineTemplate'
import { OptionTemplate } from '../../command/OptionTemplate'
import { Application } from '../../Application'
import { StringBuffer } from '../../io/StringBuffer'
import { ConfigurationManager } from '../../configuration/ConfigurationManager'
import { objectToString } from '../../Utility'
import { ConfigurationData } from '../../configuration/Configuration'
import { CONF_LEVEL } from '../../Constants'
import { CommandLine } from '../../command/CommandLine'

export class ConfigExecutor extends Executor {
    public constructor() {
        super(
            new CommandLineTemplate('config', 0, [
                new OptionTemplate('level', 'l', 1),
                new OptionTemplate('update', 'u', 2),
            ])
        )
    }

    public override execute(application: Application, commandLine: CommandLine): StringBuffer {
        const stringBuffer = new StringBuffer()
        const configurationManager = application.use(ConfigurationManager)
        const currentConfig = configurationManager.getCurrent()
        const levelOption = commandLine.getOption('level')
        const updateOption = commandLine.getOption('update')

        if (levelOption === undefined) {
            const config = currentConfig.getData()
            if (updateOption === undefined) {
                // Print current configuration
                stringBuffer.print(objectToString(config))
            } else {
                // Update current configuration
                const [key, value] = updateOption.args
                if (!(key in currentConfig.getDataMapping())) {
                    throw new Error(`Configuration key not found: ${key}`)
                }
                currentConfig.getDatum(key as keyof ConfigurationData).setValue(value)

                // Updated
                stringBuffer.print(`[Updated] ${key}: ${value}`)
            }
        } else {
            const level: string = levelOption.args[0].toUpperCase()
            const configAtLevel = application
                .use(ConfigurationManager)
                .getConfigurationStack()
                .getConfiguration(level)

            if (updateOption === undefined) {
                // Print configuration at the specified level
                stringBuffer.print(objectToString(configAtLevel.getData()))
            } else {
                // Update configuration at the specified level
                const [key, value] = updateOption.args
                configAtLevel.getDatum(key as keyof ConfigurationData).setValue(value)
                configurationManager.save(level)

                if (level === CONF_LEVEL.CONVENTION) {
                    const userConfig = configurationManager
                        .getConfigurationStack()
                        .getConfiguration(CONF_LEVEL.USER)
                    userConfig.getDatum(key as keyof ConfigurationData).setValue(value)
                    configurationManager.save(CONF_LEVEL.USER)
                }

                // Updated
                stringBuffer.print(`[Updated] ${level} ${key}: ${value}`)
            }
        }

        return stringBuffer
    }
}
