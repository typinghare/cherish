import { Application } from './Application'
import * as process from 'process'

export const application = new Application()
application.init()

const commandLineArgs: string[] = process.argv.slice(2)
application.execute(commandLineArgs)
