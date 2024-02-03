import { Entry, EntryObject, FailToCreateEntryException, FailToRegisterEntryException, Plugin } from '../../core'
import { BaseNewCommandExecutor } from './BaseNewExecutor'

/**
 * Base plugin.
 */
export class BasePlugin extends Plugin {
    public override beforeRegister(entry: Entry, object: Partial<EntryObject>): void {
        if (!('key' in object)) {
            throw new FailToRegisterEntryException('Missing essential key: "key"')
        }

        if (!('value' in object)) {
            throw new FailToRegisterEntryException('Missing essential key: "value"')
        }

        entry.self<BasePluginProperties>().set('key', object.key)
        entry.self<BasePluginProperties>().set('value', object.value)
    }

    public override onCreate(entry: Entry, object: Partial<EntryObject>): void {
        if (!('key' in object)) {
            throw new FailToCreateEntryException('Missing essential key: "key"')
        }

        if (!('value' in object)) {
            throw new FailToCreateEntryException('Missing essential key: "value"')
        }

        entry.self<BasePluginProperties>().set('key', object.key)
        entry.self<BasePluginProperties>().set('value', object.value)
    }

    public override initializeExecutors(): void {
        super.initializeExecutors([new BaseNewCommandExecutor()])
    }
}

export interface BasePluginProperties {
    key: string
    value: string
}
