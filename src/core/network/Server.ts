import { EasyApplicationBased } from '@typinghare/easy-app'
import { Application } from '../Application'
import { ConfigurationManager } from '../configuration/ConfigurationManager'
import net from 'net'

/**
 * Server.
 */
export class Server extends EasyApplicationBased<Application> {
    public readonly host: string

    public readonly port: number

    private server: undefined | net.Server = undefined

    public constructor(application: Application) {
        super(application)

        const configuration = this.use(ConfigurationManager).getCurrent()
        this.host = '127.0.0.1'
        this.port = configuration.getValue('serverListeningPort')
    }

    /**
     * Actuates socket server.
     */
    public actuate(): void {
        this.server = net.createServer((socket) => {
            const onReceiveData = (data: Buffer): void => {
                const commandLineArgs: string[] = JSON.parse(data.toString('utf-8'))

                // Log the command lines


                // Execute the command natively
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
        const port: number = this.use(ConfigurationManager)
            .getCurrent()
            .getValue('serverListeningPort')

        if (this.server !== undefined) {
            this.server.listen(port, () => {
                console.log(`Cherish server is listening on port ${port} ...`)
            })
        }
    }
}
