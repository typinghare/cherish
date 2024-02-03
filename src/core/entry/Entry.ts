import * as util from 'util'

/**
 * Represents an entry with properties of type P.
 */
export class Entry<P extends EntryProperties = any> {
    /**
     * Creates an entry.
     * @param id The ID of this entry.
     * @param properties The properties associated with this entry.
     */
    public constructor(
        private readonly id: EntryID,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        private readonly properties: P = {} satisfies P
    ) {}

    /**
     * Gets the ID of this entry.
     * @returns The ID of this entry.
     */
    public getId(): EntryID {
        return this.id
    }

    /**
     * Returns a reference to this entry with custom properties of type CP.
     * @type <CP> Custom properties.
     * @returns A reference to this entry with custom properties.
     */
    public self<CP extends EntryProperties = P>(): Entry<CP> {
        return this as unknown as Entry<CP>
    }

    /**
     * Gets the properties associated with this entry.
     * @returns The properties of this entry.
     */
    public getProperties<CP = P>(): CP {
        return this.properties as unknown as CP
    }

    /**
     * Gets the value of a specific property.
     * @param key The key of the property.
     * @returns The value of the property.
     */
    public get<K extends keyof P>(key: K): P[K] {
        return this.properties[key]
    }

    /**
     * Sets the value of a specific property.
     * @param key The key of the property.
     * @param value The value to set for the property.
     */
    public set<K extends keyof P, T extends P[K]>(key: K, value: T): void {
        this.properties[key] = value
    }

    /**
     * Converts this entry to a printable string.
     */
    public toString(): string {
        const formattedPropertiesString = util.inspect(this.properties, {
            colors: true,
        })

        return `Entry[${this.id}] ${formattedPropertiesString}`
    }
}

/**
 * Entry properties.
 */
export type EntryProperties = Record<string, any>

/**
 * Entry ID; unsigned integer.
 */
export type EntryID = number

/**
 * Entry object.
 */
export interface EntryObject extends Record<string, any> {
    id: EntryID
}
