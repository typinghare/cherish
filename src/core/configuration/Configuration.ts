import { EasyConfiguration, EasyConfigurationStack } from '@typinghare/easy-app'
import { DatumCreator, Metadata } from '@typinghare/extrum'

export class Configuration extends EasyConfiguration<ConfigurationData, ConfigMetadata> {
    public constructor(config: ConfigurationData) {
        const datumCreator = new DatumCreator<ConfigMetadata>()
        super({
            'config.user': datumCreator.create(config['config.user']).setMetadata({
                description: "The path the user's configuration file.",
            }),
            'server.host': datumCreator.create(config['server.host']).setMetadata({
                description: 'The server host',
            }),
            'server.port': datumCreator.create(config['server.port']).setMetadata({
                description: 'The server port',
            }),
            'plugin.list': datumCreator.create(config['plugin.list']).setMetadata({
                description: 'The list of plugins to enable.',
            }),
            'database.path': datumCreator.create(config['database.path']).setMetadata({
                description: 'The path of the database.',
            }),
        })
    }
}

export class ConfigurationStack extends EasyConfigurationStack<ConfigurationData, ConfigMetadata> {}

export interface ConfigurationData {
    'config.user': string | undefined
    'server.host': string
    'server.port': number
    'plugin.list': string[]
    'database.path': string
}

export interface ConfigMetadata extends Metadata {
    // The description of a configuration item
    description: string
}
