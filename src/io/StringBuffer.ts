export class StringBuffer {
    /**
     * The string.
     * @private
     */
    private string: string = ''

    /**
     * Prints content.
     * @param content The content to print.
     */
    public print(content: string): void {
        this.string += content
    }

    /**
     * Prints a content and then print a new line character.
     * @param content
     */
    public println(content: string): void {
        this.print(content + '\n')
    }

    /**
     * Returns the string.
     */
    public toString(): string {
        return this.string.endsWith('\n') ? this.string : this.string + '\n'
    }
}
