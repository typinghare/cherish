import moment from 'moment'
import { Entry, EntryObject } from '../../entry/Entry'
import { FailToLoadEntryException } from '../../entry/EntryManager'
import { Plugin } from '../../plugin/Plugin'

export class TimePlugin extends Plugin {
    public override onLoad(entry: Entry, object: Partial<EntryObject>): void {
        if (!('createdAt' in object)) {
            throw new FailToLoadEntryException('Missing essential key: "createdAt"')
        }

        entry.self<TimePluginProperties>().set('createdAt', object.createdAt)
    }

    public override onCreate(entry: Entry): void {
        entry.self<TimePluginProperties>().set('createdAt', Date.now())
    }

    public override onToObject(entry: Entry, object: EntryObject): void {
        object.createdAt = entry.self<TimePluginProperties>().get('createdAt')
    }

    public override onPrint(entry: Entry, object: EntryObject): void {
        const createdAt: number = entry.self<TimePluginProperties>().get('createdAt')
        object.createdAt = moment(createdAt).format('MMM DD, YYYY')
    }
}

export interface TimePluginProperties {
    // The time (timestamp in ms) creating the entry
    createdAt: number
}
