import { Manager } from '../Manager'
import * as net from 'net'
import { Server } from './Server'

/**
 * Network manager.
 */
export class NetworkManager extends Manager {
    /**
     * Server.
     * @private
     */
    public readonly server: Server = new Server(this.application)

    /**
     * Checks if the server is running.
     */
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    public checkServer(): Promise<void> {
        return new Promise((resolve, reject) => {
            const client = new net.Socket()

            const onConnected = (): net.Socket => client.end(resolve)
            client.connect(this.server.port, this.server.host, onConnected)
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
        const client = new net.Socket()

        const _onConnected = (): void => {
            onConnected(client)
        }
        const _onReceiveData = (data: Buffer): void => {
            onReceiveData(client, data)
        }
        client.connect(this.server.port, this.server.host, _onConnected)
        client.on('data', _onReceiveData)
    }
}
