import { EasyApplicationBased } from '@typinghare/easy-app'
import { Application } from '../Application'
import { Entry, EntryObject } from '../entry/Entry'
import { Executor } from '../command/Executor'
import { ExecutorManager } from '../command/ExecutorManager'

/**
 * Abstract plugin.
 */
export abstract class Plugin extends EasyApplicationBased<Application> {
    /**
     * Called before an entry being registered.
     * @param entry The entry to be registered.
     * @param object The entry object to register.
     */
    public beforeRegister(entry: Entry, object: Partial<EntryObject>): void {}

    /**
     * Called when an entry is being created.
     * @param entry The entry is being created.
     * @param object The entry object.
     */
    public onCreate(entry: Entry, object: Partial<EntryObject>): void {}

    /**
     * Called when an entry is being printed to the console.
     * @param entry The entry is being printed.
     * @param object The entry object.
     */
    public onPrint(entry: Entry, object: EntryObject): void {}

    /**
     * Initializes executors.
     * @param executors The executors to be registered.
     */
    public initializeExecutors(executors: Executor[] = []): void {
        if (executors === undefined) {
            return
        }

        const executorManager = this.application.use(ExecutorManager)
        for (const executor of executors) {
            executorManager.register(executor)
        }
    }
}
