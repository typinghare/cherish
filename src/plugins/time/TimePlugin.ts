import { Entry, EntryObject, Plugin } from '../../core'

export class TimePlugin extends Plugin {
    public override onCreate(entry: Entry): void {
        entry.self<TimeEnhancerProperties>().set('time', Date.now())
    }

    public override onPrint(entry: Entry, object: EntryObject): void {
        object.createdAt = entry.self<TimeEnhancerProperties>().get('time')
    }
}

export interface TimeEnhancerProperties {
    // The time (timestamp in ms) creating the entry
    time: number
}
