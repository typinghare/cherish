import { Executor } from '../command/Executor'
import { CommandLineTemplate } from '../command/CommandLineTemplate'
import { Application } from '../Application'
import { StringBuffer } from '../io/StringBuffer'
import { EntryManager } from '../entry/EntryManager'

/**
 * New executor.
 */
export class NewExecutor extends Executor {
    public constructor() {
        super(new CommandLineTemplate('new', 0))
    }

    public override execute(application: Application): StringBuffer {
        const entryManager = application.use(EntryManager)

        const entry = entryManager.create({})
        const stringBuffer = new StringBuffer()
        stringBuffer.println('Created an entry: ')
        stringBuffer.println(entryManager.convertEntryToString(entry))

        return stringBuffer
    }
}
