import { Executor } from '../command/Executor'
import { Application } from '../Application'
import { NetworkManager } from '../network/NetworkManager'
import { CommandLineTemplate } from '../command/CommandLineTemplate'

export class ServerExecutor extends Executor {
    public constructor() {
        super(new CommandLineTemplate('server', 0))
    }

    public override execute(application: Application): undefined {
        const networkManager = application.use(NetworkManager)
        networkManager.server.actuate()
    }
}
