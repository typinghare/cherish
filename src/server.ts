import { Application } from './Application'
import { NetworkManager } from './network/NetworkManager'

const application = new Application()
const networkManager = application.use(NetworkManager)

application.init()
networkManager.server.start()
