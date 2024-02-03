import { Option } from './Option'
import { TokenQueue } from './TokenQueue'

/**
 * Option template.
 */
export class OptionTemplate {
    /**
     * Creates an option template.
     * @param longLabel Long labels start with two hyphens followed by a word or words connected by
     * hyphens.
     * @param shortLabel Short labels start with a single hyphen followed by a single letter.
     * @param numArgs The number of arguments required.
     */
    public constructor(
        public readonly longLabel: string,
        public readonly shortLabel: string,
        public readonly numArgs: number
    ) {}

    /**
     * Makes an option.
     * @param tokenQueue A token queue. The first N arguments will be shifted, where N is the number
     * of arguments in this template.
     */
    public make(tokenQueue: TokenQueue): Option {
        const args: string[] = []
        for (let i = 0; i < this.numArgs; ++i) {
            const next: string | undefined = tokenQueue.getNext()
            if (next === undefined) {
                throw new OptionInsufficientArgumentException(this, i)
            }

            args.push(next)
        }

        return new Option(this, args)
    }
}

/**
 * Thrown when making an option from an option template, but arguments given are insufficient.
 */
export class OptionInsufficientArgumentException extends Error {
    public constructor(optionTemplate: OptionTemplate, numArgsProvided: number) {
        super(`Fail to make an option due to insufficient argument. 
        The label of the option is "${optionTemplate.longLabel}". 
        ${optionTemplate.numArgs} arguments are required, 
        but only ${numArgsProvided} arguments are provided.`)
    }
}
