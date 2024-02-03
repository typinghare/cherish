import { OptionTemplate } from './OptionTemplate'
import { CommandLine } from './CommandLine'
import { Option } from './Option'
import { TokenQueue } from './TokenQueue'

/**
 * Command line template.
 */
export class CommandLineTemplate {
    /**
     * Creates a command line template.
     * @param command The command string.
     * @param numArgs The number of arguments required.
     * @param optionTemplates The option template.
     */
    public constructor(
        public readonly command: string,
        public readonly numArgs: number,
        public readonly optionTemplates: OptionTemplate[] = []
    ) {}

    /**
     * Makes a command line.
     * @param tokenQueue A token queue. The first N arguments will be shifted, where N is the number
     * of arguments in this template.
     */
    public make(tokenQueue: TokenQueue): CommandLine {
        const args: string[] = []
        const options: Option[] = []
        for (let i = 0; tokenQueue.hasNext(); ++i) {
            const next: string | undefined = tokenQueue.getNext()
            if (next === undefined) break

            if (TokenQueue.isOption(next)) {
                const optionLabel: string = TokenQueue.getOptionLabel(next)
                const optionTemplate = this.findOptionTemplate(optionLabel)
                options.push(optionTemplate.make(tokenQueue))
            } else {
                args.push(next)
            }
        }

        if (args.length < this.numArgs) {
            throw new InsufficientArgumentException(this, args.length)
        }

        return new CommandLine(this, args, options)
    }

    /**
     * Finds an option label based on the given option label.
     * @param optionLabel The label of the option.
     * @private
     */
    private findOptionTemplate(optionLabel: string): OptionTemplate {
        const canBeShortLabel: boolean = optionLabel.length === 1
        for (const optionTemplate of this.optionTemplates) {
            if (optionTemplate.longLabel === optionLabel) {
                return optionTemplate
            }

            if (canBeShortLabel && optionTemplate.shortLabel === optionLabel) {
                return optionTemplate
            }
        }

        throw new OptionTemplateNotFoundException(this, optionLabel)
    }
}

export class OptionTemplateNotFoundException extends Error {
    public constructor(commandLineTemplate: CommandLineTemplate, optionLabel: string) {
        super(`Option template not found. In "${commandLineTemplate.command}", 
        there is no option template for "${optionLabel}".`)
    }
}

/**
 * Thrown when making an option from a command line template, but arguments given are insufficient.
 */
export class InsufficientArgumentException extends Error {
    public constructor(commandLineTemplate: CommandLineTemplate, numArgsProvided: number) {
        super(`Fail to make a command line due to insufficient arguments. 
        The command is ${commandLineTemplate.command}. 
        ${commandLineTemplate.numArgs} arguments are required, 
        but only ${numArgsProvided} arguments are provided.`)
    }
}
