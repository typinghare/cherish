export class BaseEntryManager {
    private readonly keySet = new Set<string>()

    public keyExist(key: string): boolean {
        return this.keySet.has(key)
    }

    public addKey(key: string): void {
        this.keySet.add(key)
    }
}
