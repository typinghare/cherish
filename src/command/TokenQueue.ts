/**
 * A token queue.
 */
export class TokenQueue {
    /**
     * Token list.
     * @private
     */
    private readonly tokens: string[] = []

    /**
     * Creates a token queue.
     * @param commandLineArgs The command line arguments.
     */
    public constructor(commandLineArgs: string[]) {
        // Parse the command line string
        for (const arg of commandLineArgs) {
            if (TokenQueue.isLongOption(arg)) {
                // Long option
                this.tokens.push(arg)
            } else if (TokenQueue.isOption(arg)) {
                // Short option
                for (const c of arg.substring(1)) {
                    this.tokens.push(`-${c}`)
                }
            } else {
                // Argument
                this.tokens.push(arg)
            }
        }
    }

    /**
     * Whether there are tokens remained.
     */
    public hasNext(): boolean {
        return this.tokens.length > 0
    }

    /**
     * Returns the next token; returns undefined if the token list is empty.
     */
    public getNext(): string | undefined {
        return this.tokens.length === 0 ? undefined : this.tokens.shift()
    }

    public static isOption(token: string): boolean {
        return token.startsWith('-')
    }

    public static isLongOption(token: string): boolean {
        return token.startsWith('--')
    }

    public static getOptionLabel(token: string): string {
        return token.at(1) === '-' ? token.substring(2) : token.substring(1)
    }
}
