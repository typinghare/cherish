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

    public override onPrint(entry: Entry, object: EntryObject): void {
        object.key = entry.self<BasePluginProperties>().get('key')
        object.value = entry.self<BasePluginProperties>().get('value')
    }

    public override initExecutors(): void {
        this.registerExecutor(new BaseNewCommandExecutor(), true)
    }
}

export interface BasePluginProperties {
    key: string
    value: string
}
