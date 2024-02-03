import { Manager } from '../Manager'
import { Executor } from './Executor'
import { TokenQueue } from './TokenQueue'
import { StringBuffer } from '../io/StringBuffer'

/**
 * Executor manager.
 */
export class ExecutorManager extends Manager {
    /**
     * Mapping from commands to executors.
     * @private
     */
    private readonly byName = new Map<string, Executor>()

    /**
     * Registers an executor.
     */
    public register(executor: Executor): Executor {
        const command: string = executor.commandLineTemplate.command
        if (this.byName.has(command)) {
            throw new ExecutorAlreadyExistException(command)
        }

        this.byName.set(command, executor)

        return executor
    }

    /**
     * Executes a command.
     * @param commandLineArgs The command line arguments.
     */
    public execute(commandLineArgs: string[]): StringBuffer | undefined {
        const hasCommand: boolean = !commandLineArgs[0].startsWith('-')
        const command: string = hasCommand ? commandLineArgs[0] : ''
        const executor = this.byName.get(command)
        if (executor === undefined) {
            throw new ExecutorNotFoundException(command)
        }

        const tokenQueue = new TokenQueue(commandLineArgs.slice(+hasCommand))
        const commandLine = executor.commandLineTemplate.make(tokenQueue)
        return executor.execute(this.application, commandLine)
    }
}

/**
 * This exception is triggered when attempting to register an executor, but there is an existing
 * executor already bound with the same command.
 */
export class ExecutorAlreadyExistException extends Error {
    public constructor(command: string) {
        super(`Executor already exists: ${command}`)
    }
}

/**
 * This exception is triggered when attempting to use an executor, but there is no existing executor
 * bound with the given command.
 */
export class ExecutorNotFoundException extends Error {
    public constructor(command: string) {
        super(`Executor not found: ${command}`)
    }
}
