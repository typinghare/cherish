import { Application } from './Application'
import * as process from 'process'

export const application = new Application()
export const commandLineArgs: string[] = process.argv.slice(2)

application.init()
application.execute(commandLineArgs)
