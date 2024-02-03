import { Manager } from '../Manager'
import * as net from 'net'
import { ConfigurationManager } from '../configuration/ConfigurationManager'

/**
 * Network manager.
 */
export class NetworkManager extends Manager {
    /**
     * Whether the network is in use.
     * @private
     */
    private internalIsInUse = false

    /**
     * Server.
     * @private
     */
    private server: undefined | net.Server = undefined

    /**
     * Returns true if the server is in use; false otherwise.
     */
    public isInUse(): boolean {
        return this.internalIsInUse
    }

    /**
     * Checks if the server is running.
     */
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    public checkServer(): Promise<void> {
        return new Promise((resolve, reject) => {
            const configuration = this.use(ConfigurationManager).get()
            const serverListeningPort = configuration.getValue('serverListeningPort')
            const serverHost = '127.0.0.1'
            const client = new net.Socket()

            const onConnected = (): net.Socket => client.end(resolve)
            client.connect(serverListeningPort, serverHost, onConnected)
            client.on('error', reject)
        })
    }

    /**
     * Initiates communication with a server, setting up callbacks for connection establishment and
     * data reception.
     * @param onConnected Callback function that is invoked when the client successfully connects to
     * the server.
     * @param onReceiveData Callback function that is invoked when data is received from the server.
     */
    public communicate(
        onConnected: (client: net.Socket) => void,
        onReceiveData: (client: net.Socket, data: Buffer) => void
    ): void {
        const configuration = this.use(ConfigurationManager).get()
        const serverListeningPort = configuration.getValue('serverListeningPort')
        const serverHost = '127.0.0.1'
        const client = new net.Socket()

        const _onConnected = (): void => {
            onConnected(client)
        }
        const _onReceiveData = (data: Buffer): void => {
            onReceiveData(client, data)
        }
        client.connect(serverListeningPort, serverHost, _onConnected)
        client.on('data', _onReceiveData)
    }

    /**
     * Actuates socket server.
     */
    public actuate(): void {
        this.server = net.createServer((socket) => {
            const onReceiveData = (data: Buffer): void => {
                const commandLineArgs: string[] = JSON.parse(data.toString('utf-8'))
                const stringBuffer = this.application.executeNatively(commandLineArgs)
                const message = stringBuffer !== undefined ? stringBuffer.toString() : ''
                socket.write(message)
            }

            socket.on('data', onReceiveData)
        })

        this.startListening()
    }

    /**
     * Starts listening on the port, which is given by configuration.
     * @private
     */
    private startListening(): void {
        const port: number = this.application.getConfiguration().getValue('serverListeningPort')
        if (this.server !== undefined) {
            this.server.listen(port, () => {
                console.log(`Cherish server is listening on port ${port} ...`)
                this.internalIsInUse = true
            })
        }
    }
}
