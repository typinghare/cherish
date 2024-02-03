import { Executor } from '../command/Executor'
import { CommandLineTemplate } from '../command/CommandLineTemplate'
import { Application } from '../Application'
import { CommandLine } from '../command/CommandLine'
import { StringBuffer } from '../io/StringBuffer'
import { EntryManager } from '../entry/EntryManager'

export class ItemExecutor extends Executor {
    public constructor() {
        super(new CommandLineTemplate('item', 1))
    }

    public override execute(application: Application, commandLine: CommandLine): StringBuffer {
        const stringBuffer = new StringBuffer()
        const [idStr] = commandLine.args
        const id: number = parseInt(idStr)
        if (isNaN(id)) {
            stringBuffer.print(`The ID given is not an integer: ${id}`)
        } else {
            const entryManager = application.use(EntryManager)
            const entry = entryManager.getById(id)
            stringBuffer.print(entryManager.convertEntryToString(entry))
        }

        return stringBuffer
    }
}
