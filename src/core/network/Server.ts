import { EasyApplicationBased } from '@typinghare/easy-app'
import { Application } from '../Application'
import { ConfigurationManager } from '../configuration/ConfigurationManager'
import net from 'net'
import { Logger, pino } from 'pino'
import { addTrailingNewline } from '../Utility'

/**
 * Server.
 */
export class Server extends EasyApplicationBased<Application> {
    public readonly host: string

    public readonly port: number

    private server: undefined | net.Server = undefined

    private internalIsInUse: boolean = false

    private readonly logger: Logger = pino()

    public constructor(application: Application) {
        super(application)

        const configuration = this.use(ConfigurationManager).getCurrent()
        this.host = configuration.getValue('server.host')
        this.port = configuration.getValue('server.port')
    }

    /**
     * Starts this server.
     */
    public start(): void {
        this.server = net.createServer((socket) => {
            const onReceiveData = (data: Buffer): void => {
                const commandLineArgs: string[] = JSON.parse(data.toString('utf-8'))
                const clientAddress = socket.address()

                if ('address' in clientAddress && 'port' in clientAddress) {
                    const url = clientAddress.address + ':' + clientAddress.port
                    this.logger.info(`Received a command from: ${url}`)

                    // Execute the command natively
                    try {
                        const stringBuffer = this.application.executeNatively(commandLineArgs)
                        const message = stringBuffer !== undefined ? stringBuffer.toString() : ''

                        // response
                        socket.write(message)
                    } catch (e) {
                        if (e instanceof Error) {
                            socket.write(
                                'Fail to execute command: ' + addTrailingNewline(e.message)
                            )
                        }
                    }
                } else {
                    this.logger.warn('Received a command from an unknown device.')
                }
            }

            socket.on('data', onReceiveData)
        })

        if (this.server !== undefined) {
            this.server.listen(this.port, () => {
                this.logger.info(`Server is listening on port ${this.port} ...`)
                this.internalIsInUse = true
            })
        }
    }

    /**
     * Stops this server.
     */
    public stop(): void {
        this.internalIsInUse = false

        if (this.server !== undefined) {
            this.server.close(() => {
                this.logger.info('Server has been stopped.')

                // Close the application
                this.application.close()
            })
        }
    }

    /**
     * Whether this server is starting.
     */
    public isStarting(): boolean {
        return this.server !== undefined && !this.internalIsInUse
    }

    /**
     * Whether the server is in use.
     */
    public isInUse(): boolean {
        return this.internalIsInUse
    }
}
