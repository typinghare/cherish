import { Application, CommandLine, CommandLineTemplate, EntryManager, Executor, StringBuffer } from '../../core/'

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
