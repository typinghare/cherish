import { Application } from '../Application'
import { CommandLineTemplate } from './CommandLineTemplate'
import { CommandLine } from './CommandLine'
import { StringBuffer } from '../io/StringBuffer'

/**
 * Abstract executor.
 */
export abstract class Executor {
    /**
     * Creates an executor
     * @param commandLineTemplate The command line template to deal with.
     */
    protected constructor(public readonly commandLineTemplate: CommandLineTemplate) {}

    /**
     * Executes a specific command.
     * @param application The application.
     * @param commandLine The command line to execute.
     * @return StringBuffer or nothing
     */
    public abstract execute(
        application: Application,
        commandLine: CommandLine
    ): StringBuffer | undefined
}
