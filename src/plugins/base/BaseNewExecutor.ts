import { Executor } from '../../command/Executor'
import { CommandLineTemplate } from '../../command/CommandLineTemplate'
import { Application } from '../../Application'
import { EntryManager } from '../../entry/EntryManager'
import { StringBuffer } from '../../io/StringBuffer'
import { CommandLine } from '../../command/CommandLine'

/**
 * Executor for command that creates an entry.
 * @example new <key> <value>
 */
export class BaseNewCommandExecutor extends Executor {
    public constructor() {
        super(new CommandLineTemplate('new', 2, []))
    }

    public override execute(application: Application, commandLine: CommandLine): StringBuffer {
        const entryManager = application.use(EntryManager)

        const [key, value] = commandLine.args
        const entry = entryManager.create({ key, value })
        const stringBuffer = new StringBuffer()
        stringBuffer.println('Created an entry: ')
        stringBuffer.println(entryManager.convertEntryToString(entry))

        return stringBuffer
    }
}
