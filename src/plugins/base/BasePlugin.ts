import { BaseNewCommandExecutor } from './BaseNewExecutor'
import { BaseEntryManager } from './BaseEntryManager'
import { Entry, EntryObject } from '../../entry/Entry'
import { FailToCreateEntryException, FailToLoadEntryException } from '../../entry/EntryManager'
import { Plugin } from '../../plugin/Plugin'

/**
 * Base plugin.
 */
export class BasePlugin extends Plugin {
    public readonly baseEntryManager = new BaseEntryManager()

    public override onLoad(entry: Entry, object: Partial<EntryObject>): void {
        if (!('key' in object)) {
            throw new FailToLoadEntryException('Missing essential key: "key"')
        }

        if (!('value' in object)) {
            throw new FailToLoadEntryException('Missing essential key: "value"')
        }

        const { key, value } = object
        entry.self<BasePluginProperties>().set('key', key)
        entry.self<BasePluginProperties>().set('value', value)

        this.baseEntryManager.addKey(key as string)
    }

    public override onCreate(entry: Entry, object: Partial<EntryObject>): void {
        if (!('key' in object)) {
            throw new FailToCreateEntryException('Missing essential key: "key"')
        }

        if (!('value' in object)) {
            throw new FailToCreateEntryException('Missing essential key: "value"')
        }

        if (this.baseEntryManager.keyExist(object.key as string)) {
            throw new KeyAlreadyExistException(object.key as string)
        }

        entry.self<BasePluginProperties>().set('key', object.key)
        entry.self<BasePluginProperties>().set('value', object.value)
    }

    public override onToObject(entry: Entry, object: EntryObject): void {
        object.key = entry.self<BasePluginProperties>().get('key')
        object.value = entry.self<BasePluginProperties>().get('value')
    }

    public override onPrint(entry: Entry, object: EntryObject): void {
        this.onToObject(entry, object)
    }

    public override initExecutors(): void {
        this.registerExecutor(new BaseNewCommandExecutor(), true)
    }
}

export interface BasePluginProperties {
    key: string
    value: string
}

export class KeyAlreadyExistException extends Error {
    public constructor(key: string) {
        super(`Key already exist: ${key}`)
    }
}
