import { Manager } from '../Manager'
import { Entry, EntryID, EntryObject } from './Entry'
import { PluginManager } from '../plugin/PluginManager'
import { Plugin } from '../plugin/Plugin'
import * as util from 'util'

/**
 * Entry manager.
 */
export class EntryManager extends Manager {
    /**
     * Mapping from entry IDs to entries.
     * @private
     */
    private readonly byId = new Map<EntryID, Entry>()

    /**
     * The max ID.
     * @private
     */
    private maxId: EntryID = 0

    /**
     * Retrieves an item by a specified ID.
     * @param id The specified ID
     */
    public getById(id: EntryID): Entry {
        const item = this.byId.get(id)

        if (item === undefined) {
            throw new EntryIdNotFoundException(id)
        }

        return item
    }

    /**
     * Registers an entry.
     */
    public register(entry: Entry): Entry {
        const id = entry.getId()
        this.maxId = Math.max(this.maxId, id)
        this.byId.set(id, entry)

        return entry
    }

    /**
     * Creates an entry.
     * @param object The object.
     */
    public create(object: Partial<EntryObject>): Entry {
        const id = ++this.maxId
        const entry = new Entry(id)

        const pluginManager = this.application.use(PluginManager)
        const plugins: Plugin[] = pluginManager.getEnabledPlugins()
        plugins.forEach((plugin) => {
            plugin.onCreate(entry, object)
        })

        return entry
    }

    /**
     * Returns all entries.
     */
    public getEntries(): IterableIterator<Entry> {
        return this.byId.values()
    }

    /**
     * Converts an entry into a printable string.
     * @param entry
     */
    public convertEntryToString(entry: Entry): string {
        const object: EntryObject = {
            id: entry.getId(),
        }

        const pluginManager = this.application.use(PluginManager)
        const plugins: Plugin[] = pluginManager.getEnabledPlugins()
        plugins.forEach((plugin) => {
            plugin.onPrint(entry, object)
        })

        return util.inspect(object, {
            colors: true,
        })
    }
}

/**
 * Thrown when fail to get the ID of an entry.
 */
export class EntryIdNotFoundException extends Error {
    public constructor(id: EntryID) {
        super(`Entry ID not found: ${id}`)
    }
}

/**
 * Thrown when trying to create an entry.
 */
export class FailToCreateEntryException extends Error {}

/**
 * Thrown when trying to register an entry.
 */
export class FailToRegisterEntryException extends Error {}
