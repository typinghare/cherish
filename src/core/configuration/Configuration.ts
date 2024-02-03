import { EasyConfiguration, EasyConfigurationStack } from '@typinghare/easy-app'
import { DatumCreator, Metadata } from '@typinghare/extrum'

export class Configuration extends EasyConfiguration<ConfigurationData, ConfigMetadata> {
    public constructor(config: ConfigurationData) {
        const datumCreator = new DatumCreator<ConfigMetadata>()
        super({
            userConfig: datumCreator
                .create(config.userConfig)
                .setMetadata({
                    description: 'The path the user\'s configuration file.',
                }),
            plugins: datumCreator
                .create(config.plugins)
                .setMetadata({
                    description: 'The list of enhancers to apply.',
                }),
            database: datumCreator
                .create('~/.mem/default/')
                .setMetadata({
                    description: 'The path of the database.',
                }),
            serverListeningPort: datumCreator
                .create(9385)
                .setMetadata({
                    description: 'The server listening port ...',
                }),
        })
    }
}

export class ConfigurationStack extends EasyConfigurationStack<ConfigurationData, ConfigMetadata> {
}

export interface ConfigurationData {
    userConfig: string | undefined
    plugins: string[]
    database: string
    serverListeningPort: number
}

export interface ConfigMetadata extends Metadata {
    // The description of a configuration item
    description: string
}
