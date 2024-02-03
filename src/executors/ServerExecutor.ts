import { Executor } from '../command/Executor'
import { Application } from '../Application'
import { NetworkManager } from '../network/NetworkManager'
import { CommandLineTemplate } from '../command/CommandLineTemplate'
import { CommandLine } from '../command/CommandLine'
import { StringBuffer } from '../io/StringBuffer'

export class ServerExecutor extends Executor {
    public constructor() {
        super(new CommandLineTemplate('server', 1))
    }

    public override execute(application: Application, commandLine: CommandLine): StringBuffer {
        const [action] = commandLine.args
        const networkManager = application.use(NetworkManager)
        const server = networkManager.server
        const stringBuffer = new StringBuffer()

        if (action === 'start') {
            if (server.isStarting()) {
                stringBuffer.print('The server is starting.')
            } else if (server.isInUse()) {
                stringBuffer.print('The server is already in use.')
            } else {
                server.start()
            }
        } else if (action === 'stop') {
            server.stop()
            stringBuffer.print('The server has been stopped.')
        }

        return stringBuffer
    }
}
