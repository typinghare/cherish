import { CommandLineTemplate } from './CommandLineTemplate'
import { Option } from './Option'

/**
 * Command line.
 */
export class CommandLine {
    /**
     * Creates a command.
     * @param template The template creating this command line.
     * @param args The arguments.
     * @param options The options.
     */
    public constructor(
        public readonly template: CommandLineTemplate,
        public readonly args: string[],
        public readonly options: Option[]
    ) {}

    /**
     * Gets an option by long label.
     * @param longLabel The long label of the option to get.
     */
    public getOption(longLabel: string): Option | undefined {
        for (const option of this.options) {
            if (option.template.longLabel === longLabel) {
                return option
            }
        }

        return undefined
    }
}
