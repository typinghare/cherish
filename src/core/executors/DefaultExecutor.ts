import { Executor } from '../command/Executor'
import { Application } from '../Application'
import { CommandLine } from '../command/CommandLine'
import { StringBuffer } from '../io/StringBuffer'
import { CommandLineTemplate } from '../command/CommandLineTemplate'
import { OptionTemplate } from '../command/OptionTemplate'

/**
 * Default executor.
 */
export class DefaultExecutor extends Executor {
    public constructor() {
        super(
            new CommandLineTemplate('', 0, [
                new OptionTemplate('version', 'v', 0),
                new OptionTemplate('help', 'h', 0),
            ])
        )
    }

    public override execute(_: Application, commandLine: CommandLine): StringBuffer {
        const stringBuffer = new StringBuffer()
        if (commandLine.getOption('version') !== undefined) {
            stringBuffer.print('Cherish v1.0.0')
        }

        return stringBuffer
    }
}
